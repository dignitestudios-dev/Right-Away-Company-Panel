import React, { useState, useEffect, useRef } from "react";
import {
GoogleMap,
Marker,
Polyline,
withGoogleMap,
withScriptjs
} from "react-google-maps";
// import API_KEY from "./apiKey";

// Stops and path coordinates
const pathData = [
{ lat: 12.9802347, lng: 77.5907760 },
{ lat: 12.9793774, lng: 77.5910979 },
{ lat: 12.9795865, lng: 77.5911622 },
{ lat: 12.9771191, lng: 77.5857120 }
// add all points
];

const stops = [
{ lat: 12.9802347, lng: 77.5907760, id: "stop1" },
{ lat: 12.9787501, lng: 77.5917845, id: "stop2" },
{ lat: 12.9771191, lng: 77.5857120, id: "stop3" }
];

const vehicleIcon = {
url:
"[https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png](https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png)",
scaledSize: new window.google.maps.Size(30, 30),
anchor: new window.google.maps.Point(15, 15)
};

const Map = () => {
const [progress, setProgress] = useState([]);
const intervalRef = useRef(null);
const initialTimeRef = useRef(new Date());

const velocity = 100; // meters per second

// Compute distance traveled
const getDistance = () => ((new Date() - initialTimeRef.current) / 1000) * velocity;

// Calculate cumulative distance along the path
const pathWithDistance = pathData.map((point, i, arr) => {
if (i === 0) return { ...point, distance: 0 };
const prevLatLng = new window.google.maps.LatLng(arr[i - 1].lat, arr[i - 1].lng);
const currLatLng = new window.google.maps.LatLng(point.lat, point.lng);
const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
prevLatLng,
currLatLng
);
return { ...point, distance: (arr[i - 1].distance || 0) + distance };
});

const moveVehicle = () => {
const distance = getDistance();
if (!distance) return;

```
const completed = pathWithDistance.filter(p => p.distance <= distance);
const nextPoint = pathWithDistance.find(p => p.distance > distance);

if (!nextPoint) {
  setProgress(completed);
  clearInterval(intervalRef.current);
  return;
}

const lastPoint = completed[completed.length - 1];
const lastLatLng = new window.google.maps.LatLng(lastPoint.lat, lastPoint.lng);
const nextLatLng = new window.google.maps.LatLng(nextPoint.lat, nextPoint.lng);
const segmentDistance = nextPoint.distance - lastPoint.distance;
const ratio = (distance - lastPoint.distance) / segmentDistance;

const position = window.google.maps.geometry.spherical.interpolate(lastLatLng, nextLatLng, ratio);
setProgress([...completed, position]);
```

};

const startSimulator = () => {
clearInterval(intervalRef.current);
setProgress([]);
initialTimeRef.current = new Date();
intervalRef.current = setInterval(moveVehicle, 1000);
};

useEffect(() => {
return () => clearInterval(intervalRef.current);
}, []);

return ( <div className="relative">
<GoogleMap
defaultZoom={16}
defaultCenter={{ lat: pathData[0].lat, lng: pathData[0].lng }}
>
<Polyline path={pathData} options={{ strokeColor: "#0088FF", strokeWeight: 6 }} />

```
    {stops.map((stop, idx) => (
      <Marker key={stop.id} position={stop} label={`${idx + 1}`} title={stop.id} />
    ))}

    {progress.length > 0 && (
      <>
        <Polyline path={progress} options={{ strokeColor: "pink", strokeWeight: 4 }} />
        <Marker position={progress[progress.length - 1]} icon={vehicleIcon} />
      </>
    )}
  </GoogleMap>

  <button
    onClick={startSimulator}
    className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
  >
    Start Simulator
  </button>
</div>
);
};

const MapComponent = withScriptjs(withGoogleMap(Map));
// const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY.mapsOtherkey}`;

export default function TrackingMap() {
return (
<MapComponent
// googleMapURL={mapURL}
loadingElement={<div style={{ height: "100%" }} />}
containerElement={<div style={{ height: "600px", width: "600px" }} />}
mapElement={<div style={{ height: "100%" }} />}
/>
);
}
