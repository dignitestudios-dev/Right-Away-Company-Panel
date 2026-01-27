import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";
const initialState = {
  isLoading: false,
  selectedChat: null,
  chatRooms: null,
  messages: null,
  isReportLoading: false,
};

export const OpenRiderChat = createAsyncThunk(
  "/chat/:id",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`chat/${payload}`);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getChatRooms = createAsyncThunk(
  "/chat-room/",
  async ({ page = 1, limit = 10, type = "" }, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        type,
      });

      const response = await instance.get(`chat?${params.toString()}`);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getMessages = createAsyncThunk(
  "/chat/messages/:id?page=1&limit=10",
  async ({ page = 1, limit = 10, type = "", roomId }, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        type,
      });

      const response = await instance.get(
        `chat/messages/${roomId}?${params.toString()}`,
      );
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const chatReport = createAsyncThunk(
  "/chat/report/room-id",
  async ({ roomId, data }, thunkAPI) => {
    try {
      const response = await instance.post(`chat/report/${roomId}`, data);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChatState: () => initialState,
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      if (!state.messages) {
        state.messages = [action.payload];
      } else {
        state.messages = [...state.messages, action.payload];
      }
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(OpenRiderChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(OpenRiderChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedChat = action?.payload?.data?.chatRoom;
      })
      .addCase(OpenRiderChat.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getChatRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChatRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatRooms = action?.payload?.data;
      })
      .addCase(getChatRooms.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action?.payload?.data;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(chatReport.pending, (state) => {
        state.isReportLoading = true;
      })
      .addCase(chatReport.fulfilled, (state, action) => {
        state.isReportLoading = false;
      })
      .addCase(chatReport.rejected, (state) => {
        state.isReportLoading = false;
      });
  },
});

export const { setMessages, addMessage, setSelectedChat,resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
