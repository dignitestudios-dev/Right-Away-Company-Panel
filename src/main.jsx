import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { LoadScript } from "@react-google-maps/api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
        libraries={["places"]}
      >
        <App />
      </LoadScript>
    </BrowserRouter>
  </StrictMode>
);
