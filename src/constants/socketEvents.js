export const SOCKET_EVENTS = {
  ORDER: {
    UPDATE_STATUS: "order:update:status",
    UPDATED_STATUS: "order:updated:status",
    ERROR: "order:update:status:error",

    TRACK: "order:track",
    TRACK_SUCCESS: "order:track:success",
    TRACK_ERROR: "order:track:error",
  },
  CHAT: {
    JOIN: "chat:join",
    READ: "chat:read",
    READ_ERROR: "chat:read:error",

    SEND_MESSAGE: "chat:send",
    RECEIVE_MESSAGE: "chat:receive",

    RECEIVE_UPDATED: "chat:receive:updated",
  },
};
