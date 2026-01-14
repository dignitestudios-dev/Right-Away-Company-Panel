import React, { createContext, useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
import { SOCKET_EVENTS } from "../constants/socketEvents";
import createSocket from "../socket";
import { setSingleOrder } from "../redux/slices/AppSlice";
import { useDispatch } from "react-redux";

const SocketContext = createContext(null);

export const SocketProvider = ({ children, url }) => {
  const [client, setClient] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));
  const dispatch = useDispatch();
  // Check token changes periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get("token");
      if (newToken !== token) {
        setToken(newToken);
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (!token) {
      // Disconnect if no token
      if (client) {
        client.disconnect();
        setClient(null);
      }
      return;
    }

    const { socket, connect, disconnect, emit } = createSocket({ url, token });

    setClient({ socket, connect, disconnect, emit });

    // auto connect
    connect();
    // Add event listeners
    socket.on(SOCKET_EVENTS.ORDER.UPDATED_STATUS, (data) => {
      dispatch(setSingleOrder(data?.data));
      console.log("received:", data);
    });
    socket.on(SOCKET_EVENTS.ORDER.ERROR, (data) => {
      console.log("Order Error:", data);
    });

    function handleVisibility() {
      if (document.visibilityState === "hidden") {
        // keep socket but optionally emit away/on events
      } else {
        // try to reconnect when user returns
        if (socket && !socket.connected) socket.connect();
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      socket.off(SOCKET_EVENTS.ORDER.UPDATED_STATUS);
      socket.off(SOCKET_EVENTS.ORDER.ERROR);
      try {
        disconnect();
      } catch (e) {
        // ignore
      }
    };
  }, [token, url]);

  const value = useMemo(
    () => ({
      socket: client?.socket,
      connect: client?.connect,
      disconnect: client?.disconnect,
      emit: client?.emit,
      // Order Events
      updateOrder: (payload, callback) => {
        client?.emit(SOCKET_EVENTS.ORDER.UPDATE_STATUS, payload, callback);
      },
      // ===== CHAT =====
      joinChat: (roomId) => {
        client?.emit(SOCKET_EVENTS.CHAT.JOIN, { roomId });
      },

      readChat: (roomId) => {
        client?.emit(SOCKET_EVENTS.CHAT.READ, { roomId });
      },

      sendMessage: (payload) => {
        client?.emit(SOCKET_EVENTS.CHAT.SEND_MESSAGE, payload);
      },
    }),
    [client]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
