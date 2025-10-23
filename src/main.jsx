import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { LoadScript } from "@react-google-maps/api";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store.js"; // Import the store from your redux store file
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
            libraries={["places"]}
          >
            <ToasterContainer />
            <App />
          </LoadScript>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
