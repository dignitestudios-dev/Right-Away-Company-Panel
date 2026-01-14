import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { baseUrl } from "../axios";

const DEFAULT_URL = baseUrl;

export function createSocket({ url = DEFAULT_URL, token } = {}) {
  const authToken = Cookies.get("token");

  const socket = io(url, {
    autoConnect: false,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    // Provide token in several places to maximize compatibility with different server setups
    auth: { token: `Bearer ${authToken}` },
    query: { token: `Bearer ${authToken}` },
    transportOptions: {
      polling: {
        extraHeaders: authToken
          ? {
              token: `Bearer ${authToken}`,
              authorization: `Bearer ${authToken}`,
            }
          : {},
      },
    },
  });

  socket.on("connect", () => console.log("Socket connected"));

  const connect = () => socket.connect();
  const disconnect = () => socket.disconnect();

  // Safe emit wrapper
  const emit = (event, ...args) => {
    if (socket && socket.connected) socket.emit(event, ...args);
  };

  return {
    socket,
    connect,
    disconnect,
    emit,
  };
}

export default createSocket;
