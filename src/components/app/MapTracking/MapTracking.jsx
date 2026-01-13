import { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "../../../../socket";
import { ErrorToast } from "../../global/Toaster";

export default function TrackingMap({ order }) {
  const isLoaded = window.google && window.google.maps;

  const [pathData, setPathData] = useState([]);
  const [progress, setProgress] = useState([]);
  const [heading, setHeading] = useState(0);

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const velocity = 40;

  // ================= SOCKET =================
  useEffect(() => {
    if (!order?._id) return;

    // 🔹 SEND ORDER ID
    socket.emit("order:track", {
      id: order._id,
    });

    // 🔹 RECEIVE PATH
    socket.on("order:track:success", (data) => {
      console.log(data, "datacomes from socket");
      if (!Array.isArray(data?.path)) return;

      setPathData(data.path);
      setProgress([]);
      startTimeRef.current = Date.now();

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(moveVehicle, 1000);
    });

    socket.on("order:track:error", (err) => {
      ErrorToast(err?.message);
    });

    return () => {
      socket.off("order:track:success");
      socket.off("order:track:error");
    };
  }, [order?._id]);

  // ================= STOPS =================
  const stops = useMemo(() => {
    if (!order) return [];

    return [
      {
        lat: order.store.location.coordinates[0],
        lng: order.store.location.coordinates[1],
        id: "start",
      },
      {
        lat: order.address.location.coordinates[0],
        lng: order.address.location.coordinates[1],
        id: "end",
      },
    ];
  }, [order]);

  // ================= PATH DISTANCE =================
  const pathWithDistance = useMemo(() => {
    if (!isLoaded || pathData.length === 0) return [];

    return pathData.reduce((acc, point, i) => {
      if (i === 0) {
        acc.push({ ...point, distance: 0 });
      } else {
        const prev = acc[i - 1];
        const d = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(prev.lat, prev.lng),
          new window.google.maps.LatLng(point.lat, point.lng)
        );
        acc.push({ ...point, distance: prev.distance + d });
      }
      return acc;
    }, []);
  }, [isLoaded, pathData]);

  // ================= MOVE VEHICLE =================
  const moveVehicle = () => {
    if (!startTimeRef.current || pathWithDistance.length === 0) return;

    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const distanceCovered = elapsed * velocity;

    const completed = pathWithDistance.filter(
      (p) => p.distance <= distanceCovered
    );
    const next = pathWithDistance.find((p) => p.distance > distanceCovered);

    if (!next) {
      setProgress(completed);
      clearInterval(intervalRef.current);
      return;
    }

    const last = completed[completed.length - 1];
    if (!last) return;

    const ratio =
      (distanceCovered - last.distance) / (next.distance - last.distance);

    const pos = window.google.maps.geometry.spherical.interpolate(
      new window.google.maps.LatLng(last.lat, last.lng),
      new window.google.maps.LatLng(next.lat, next.lng),
      ratio
    );

    setHeading(getBearing(last, next));
    setProgress([...completed, { lat: pos.lat(), lng: pos.lng() }]);
  };

  // ================= CLEANUP =================
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  if (!isLoaded || pathData.length === 0) {
    return <p>Waiting for route…</p>;
  }

  return (
    <GoogleMap
      zoom={16}
      center={pathData[0]}
      mapContainerStyle={{ height: "600px", width: "600px" }}
    >
      <Polyline
        path={pathData}
        options={{ strokeColor: "#03958A", strokeWeight: 7 }}
      />

      {stops.map((s) => (
        <Marker key={s.id} position={s} />
      ))}

      {progress.length > 0 && (
        <>
          <Polyline
            path={progress}
            options={{ strokeColor: "#22B573", strokeWeight: 4 }}
          />

          <Marker
            position={progress[progress.length - 1]}
            icon={vehicleBg}
            zIndex={1}
          />
          <Marker
            position={progress[progress.length - 1]}
            icon={vehicleIcon}
            zIndex={2}
          />
        </>
      )}
    </GoogleMap>
  );
}
