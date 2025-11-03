import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import Cookies from "js-cookie";
const initialState = {
  isLoading: false,
  products: null,
  error: null,
  singleProduct: null,
  orders: null,
  singleOrder: null,
};

export const CreateProduct = createAsyncThunk(
  "/company/product",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/company/product", payload);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "/company/update-product",
  async ({ id, form }, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.put(`/company/product/${id}`, form);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "company/product?page=1&limit=10",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.get(`company/product?page=${1}&limit=${10}`);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getProductsById = createAsyncThunk(
  "company/product/byid",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.get(`/company/product/${payload}`);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "company/product/:id",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.delete(`company/product/${payload}`);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "company/order?page=1&limit=10",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.get(`company/order?page=${1}&limit=${10}`);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getOrderById = createAsyncThunk(
  "company/order/byid",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.get(`/company/order/${payload}`);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "/company/order/:id/cancel",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.get(`/company/order/${payload}/cancel`);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Products
      .addCase(CreateProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CreateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CreateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getProductsById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload.data;
      })
      .addCase(getProductsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getOrderById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload.data;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(cancelOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setToken, setRefreshToken, setUser, logout } = appSlice.actions;
export default appSlice.reducer;
