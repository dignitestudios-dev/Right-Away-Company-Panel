import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
const initialState = {
  isLoading: false,
  products: null,
  error: null,
  singleProduct: null,
  orders: null,
  singleOrder: null,
  Customers: null,
  CustomerOrders: null,
  pagination: null,
  ProductReview: null,
};
//👽 ----------- Product Managment-----------👽
export const CreateProduct = createAsyncThunk(
  "/company/product",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/company/product", payload, {
        "Content-Type": "multipart/form-data",
      });
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
  "company/product",
  async (
    { page = 1, limit = 10, search = "", startDate = "", endDate = "" },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      });

      const response = await axios.get(`company/product?${params.toString()}`);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
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
//👽 ----------- Order Managment -----------👽
export const getOrders = createAsyncThunk(
  "company/getOrders",
  async (
    {
      type,
      status,
      page = 1,
      limit = 10,
      search = "",
      startDate = "",
      endDate = "",
    },
    thunkAPI
  ) => {
    try {
      // Build query object
      const query = {
        page,
        limit,
        type,
        ...(status && { status }),
        ...(search && { search }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      };

      // Convert to URLSearchParams
      const params = new URLSearchParams(query).toString();

      const response = await axios.get(`/company/order?${params}`);

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
  async ({ id, form }, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.put(`/company/order/${id}/cancel`, form);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//👽 ----------- Customer Managment -----------👽
export const getCustomers = createAsyncThunk(
  "/company/user",
  async (payload = {}, thunkAPI) => {
    try {
      const { search = "", page = 1, limit = 10, startDate, endDate } = payload;

      // Build query object
      const query = {
        page,
        limit,
        ...(search && { search }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      };

      const params = new URLSearchParams(query).toString();

      const response = await axios.get(`/company/user?${params}`);

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCustomerOrders = createAsyncThunk(
  "/company/user/:id/order?page=1&limit=10",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.get(
        `/company/user/${payload}/order?search=""&page=${1}&limit=${10}`
      );
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//👽 ----------- Customer Managment -----------👽
export const getProductReview = createAsyncThunk(
  "/company/products/reviews",
  async (payload = {}, thunkAPI) => {
    try {
      const { search, startDate, endDate, page = 1, limit = 10 } = payload;

      // Build query object with only existing values
      const query = {
        page,
        limit,
        ...(search && { search }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      };

      const params = new URLSearchParams(query).toString();

      const response = await axios.get(`/company/products/reviews?${params}`);

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
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
    setSingleOrder: (state, action) => {
      console.log(action.payload, "setting single order");
      state.singleOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //👽 ----------- Product Managment-----------👽
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
        state.pagination = action.payload.pagination;
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
      //👽 ----------- Orders Managment-----------👽
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getOrderById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.singleOrder = action.payload.data;
        state.isLoading = false;
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
      })
      //👽 ----------- Customer Managment-----------👽
      .addCase(getCustomers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Customers = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getCustomerOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCustomerOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.CustomerOrders = action.payload.data;
      })
      .addCase(getCustomerOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      //👽 ----------- ProductReview Managment-----------👽
      .addCase(getProductReview.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProductReview = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setToken, setRefreshToken, setUser, logout, setSingleOrder } =
  appSlice.actions;
export default appSlice.reducer;
