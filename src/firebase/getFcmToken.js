// getFCMToken.js
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const getFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BIn9iQRsQNorh7AyYFioh_GxcxYyfpxphWleHOwYkrmozJtrPnDw8xr7kgxBYWx6IhZjhbYKfJJvBOXhxwHwLO8", // Update VAPID KEY with your projects VAPID KEY
      });
      return token;
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

const getFCM = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BIn9iQRsQNorh7AyYFioh_GxcxYyfpxphWleHOwYkrmozJtrPnDw8xr7kgxBYWx6IhZjhbYKfJJvBOXhxwHwLO8", // Update VAPID KEY with your projects VAPID KEY
      });
      return token;
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export default getFCMToken;
export { getFCM };
