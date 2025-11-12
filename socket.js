import { io } from "socket.io-client";
import { baseUrl } from "./src/axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const socket = io(baseUrl, {
  autoConnect: true,
  transports: ["websocket"],
  auth: {
    token: `Bearer ${token}`, // ✅ must be "token", not "authorization"
  },
});
socket.on("connect", () => {
  console.log("Socket connected ✅", socket.id);
});
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.warn("Socket disconnected:", reason);
});
