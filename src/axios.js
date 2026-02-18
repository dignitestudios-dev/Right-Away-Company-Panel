import axios from "axios";
import { ErrorToast } from "./components/global/Toaster";
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";


export const baseUrl = "https://api.rightawayapp.com/";
// export const baseUrl = "https://toneless-aprioristically-sacha.ngrok-free.dev/";

// ❌ remove — cannot use useDispatch outside React component
// const dispatch = useDispatch();

let cachedDeviceId = null;

// 🔐 Get device fingerprint (cached after first call)
async function getDeviceFingerprint() {
  if (cachedDeviceId) return cachedDeviceId;

  const fp = await FingerprintJS.load();
  const result = await fp.get();
  cachedDeviceId = result.visitorId;

  return cachedDeviceId;
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // 30s timeout
});

// =========================
// 🔥 Request Interceptor
// =========================
instance.interceptors.request.use(async (request) => {
  const token = Cookies.get("token");

  if (!navigator.onLine) {
    ErrorToast("No internet connection. Please check your network.");
    return Promise.reject(new Error("No internet connection"));
  }

  const deviceId = await getDeviceFingerprint();

  request.headers = {
    ...request.headers,
    Accept: "application/json, text/plain, */*",
    devicemodel: deviceId,
    deviceuniqueid: deviceId,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  return request;
});

// =========================
// 🔥 Response Interceptor
// =========================
instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.code === "ECONNABORTED") {
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    // ❗ DO NOT CALL useDispatch globally — wrong usage
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");

      // ❗ dispatch cannot be used here — reference error
      // await dispatch(logout()).unwrap();

      ErrorToast("Session expired. Please relogin");
      // window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
