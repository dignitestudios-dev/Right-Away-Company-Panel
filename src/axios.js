import axios from "axios";
import { ErrorToast } from "./components/global/Toaster";
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { logout } from "./redux/slices/authSlice";
import { store } from "./redux/store/store";

export const baseUrl = "https://api.rightawayapp.com/";
// export const baseUrl = "http://192.168.9.56:8080/";
const dispatch = useDispatch();
let cachedDeviceId = null;

async function getDeviceFingerprint() {
  if (cachedDeviceId) return cachedDeviceId;
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  cachedDeviceId = result.visitorId;
  return cachedDeviceId;
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // ✅ 30s safer for uploads
});

instance.interceptors.request.use(async (request) => {
  const token = Cookies.get("token");

  if (!navigator.onLine) {
    ErrorToast(
      "No internet connection. Please check your network and try again."
    );
    return Promise.reject(new Error("No internet connection"));
  }

  // ✅ Get cached fingerprint quickly (async once only)
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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      store.dispatch(logout());
      ErrorToast("Session expired. Please relogin");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
