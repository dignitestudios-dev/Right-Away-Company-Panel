import axios from "axios";
import { ErrorToast } from "./components/global/Toaster";
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const baseUrl = "https://api.rightawayapp.com/";

async function getDeviceFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // unique ID
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

// ✅ Request Interceptor
instance.interceptors.request.use(async (request) => {
  const token = Cookies.get("token");

  // Handle offline
  if (!navigator.onLine) {
    ErrorToast(
      "No internet connection. Please check your network and try again."
    );
    return Promise.reject(new Error("No internet connection"));
  }

  // Get unique device ID asynchronously
  const deviceId = await getDeviceFingerprint();

  request.headers = {
    ...request.headers,
    Accept: "application/json, text/plain, */*",
    devicemodel: deviceId, // ✅ now contains actual value
    deviceuniqueid: deviceId, // ✅ same here
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  return request;
});

// ✅ Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      ErrorToast("Session expired. Please relogin");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default instance;
