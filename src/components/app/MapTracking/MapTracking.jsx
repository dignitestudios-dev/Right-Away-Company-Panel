import { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "../../../../socket";
import { ErrorToast } from "../../global/Toaster";
import {
  GoogleMap,
  Marker,
  Polyline,
  DirectionsService,
} from "@react-google-maps/api";
import { MarkImage } from "../../../assets/export";

export default function TrackingMap({ order, setIsOpen }) {
  const isLoaded = window.google && window.google.maps;

  const [pathData, setPathData] = useState([]);
  const [progress, setProgress] = useState([]);
  const [heading, setHeading] = useState(0);
  const [directions, setDirections] = useState(null);

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

      const currentPos = data?.data?.currentCoordinates;
      if (currentPos) {
        setProgress([currentPos]);
      }
    });

    socket.on("order:track:error", (err) => {
      setIsOpen(false);
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
        lat: progress[progress.length - 1]?.lat,
        lng: progress[progress.length - 1]?.lng,
        id: "start",
      },
      {
        ...(order?.rideStatus === "delivery"
          ? {
              lat: order.address.location.coordinates[1],
              lng: order.address.location.coordinates[0],
            }
          : {
              lat: order.store.location.coordinates[1],
              lng: order.store.location.coordinates[0],
            }),
        id: "end",
      },
    ];
  }, [order, progress]);

  // ================= IS AT STORE =================
  const isAtStore = useMemo(() => {
    if (!progress.length || stops.length < 1) return false;
    const pos = progress[0];
    const store = stops[0];
    const d = window.google.maps.geometry.spherical.computeDistanceBetween(
      new window.google.maps.LatLng(pos.lat, pos.lng),
      new window.google.maps.LatLng(store.lat, store.lng)
    );
    return d < 50; // 50 meters
  }, [progress, stops]);

  const phase = isAtStore ? "to_drop" : "to_store";

  // ================= VEHICLE ICON =================
  const vehicleIcon = {
    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    fillColor: "#FFFFFF", // White icon
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 5,
    rotation: heading,
    anchor: new window.google.maps.Point(0, 3),
  };

  // ================= VEHICLE BACKGROUND =================
  const vehicleBg = {
    path: window.google.maps.SymbolPath.CIRCLE,
    fillColor: "#0FAF87", // Green background
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 22,
    anchor: new window.google.maps.Point(0, 0),
  };

  // ================= DESTINATION ICON =================
  const destinationIcon = isLoaded
    ? {
        url: MarkImage,
        scaledSize: new window.google.maps.Size(60, 60),
        anchor: new window.google.maps.Point(30, 60),
      }
    : null;

  // ================= PATH DISTANCE =================
  const pathWithDistance = useMemo(() => {
    if (!isLoaded || !Array.isArray(pathData) || pathData.length === 0)
      return [];

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
  }, [isLoaded, pathData, progress]);

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
  if (!isLoaded) {
    return <p>Waiting for route…</p>;
  }

  return (
    <>
      <GoogleMap
        zoom={16}
        center={pathData[0]}
        mapContainerStyle={{ height: "600px" }}
      >
        <Polyline
          path={pathData}
          options={{ strokeColor: "#03958A", strokeWeight: 7 }}
        />

        {stops.map((s) => (
          <Marker icon={destinationIcon} key={s.id} position={s} />
        ))}

        {progress.length > 0 && (
          <>
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

      {stops.length === 2 && !directions && (
        <DirectionsService
          options={{
            destination: stops[1],
            origin: stops[0],
            travelMode: "DRIVING",
          }}
          callback={(response) => {
            if (response !== null && response.status === "OK") {
              setDirections(response);
              const path = response.routes[0].overview_path;
              setPathData(path);
            } else {
              console.error("Directions request failed:", response);
            }
          }}
        />
      )}
    </>
  );
}
