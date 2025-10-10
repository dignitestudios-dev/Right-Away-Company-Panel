import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import riderReducer from "./slices/riderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rider: riderReducer,
  },
});
