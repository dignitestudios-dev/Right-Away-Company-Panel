import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import instance from "../../axios";
const initialState = {
  isLoading: false,
  cancelOrderLoading: false,
  products: null,
  error: null,
  singleProduct: null,
  orders: null,
  singleOrder: null,
  Customers: null,
  CustomerOrders: null,
  pagination: null,
  ProductReview: null,
  SingleProductReview: null,
  wallet: null,
  walletTransactions: null,
  dashboardStats: null,
  popularProducts: null,
  salesGraph: null,
  transactionGraph: null,
  walletHistory: null,
  categories: null,
  categoriesLoading: false,
  notifications: null,
  notificationsLoading: false,
};

//👽 ----------- Dashboard Managment -----------👽
export const getDashboardStats = createAsyncThunk(
  "/company/dashboard/stats",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await instance.get("/company/dashboard");
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getPopularProducts = createAsyncThunk(
  "/company/dashboard/products",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get("/company/dashboard/products");
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getSalesGraph = createAsyncThunk(
  "/company/dashboard/salesGraph",
  async (params, thunkAPI) => {
    try {
      const response = await instance.get(
        "/company/dashboard/salesGraph",
        { params }, // 👈 query params
      );
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getTransactionGraph = createAsyncThunk(
  "/company/dashboard/TransactionGraph",
  async (params, thunkAPI) => {
    try {
      const response = await instance.get(
        "/company/dashboard/transaction",
        { params }, // 👈 query params
      );
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//👽 ----------- Product Managment-----------👽
export const CreateProduct = createAsyncThunk(
  "/company/product",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await instance.post("/company/product", payload, {
        "Content-Type": "multipart/form-data",
      });
      // SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const updateProduct = createAsyncThunk(
  "/company/update-product",
  async ({ id, form }, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await instance.put(`/company/product/${id}`, form);
      // SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateProductStock = createAsyncThunk(
  "company/update-product-stock",
  async ({ id, isStock }, thunkAPI) => {
    try {
      const res = await instance.patch(`/company/product/${id}`, {
        isStock,
      });
      return { id, isStock, data: res.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getProducts = createAsyncThunk(
  "company/product",
  async (
    { page = 1, limit = 10, search = "", startDate = "", endDate = "" },
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      });

      const response = await instance.get(
        `company/product?${params.toString()}`,
      );
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getProductsById = createAsyncThunk(
  "company/product/byid",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await instance.get(`/company/product/${payload}`);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const deleteProducts = createAsyncThunk(
  "company/product/:id",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await instance.delete(`company/product/${payload}`);
      // SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
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
    thunkAPI,
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

      const response = await instance.get(`/company/order?${params}`);

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getOrderById = createAsyncThunk(
  "company/order/byid",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await instance.get(`/company/order/${payload}`);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const cancelOrder = createAsyncThunk(
  "/company/order/:id/cancel",
  async ({ id, form }, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await instance.put(`/company/order/${id}/cancel`, form);
      // SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
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

      const response = await instance.get(`/company/user?${params}`);

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getCustomerOrders = createAsyncThunk(
  "company/getCustomerOrders",
  async (payload, thunkAPI) => {
    try {
      // ❌ Don't hit API if payload is missing
      if (!payload) {
        return thunkAPI.rejectWithValue("User ID is required");
      }

      const response = await instance.get(
        `/company/user/${payload}/order?search=&page=1&limit=10`,
      );

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//👽 ----------- Product Review Managment -----------👽
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

      const response = await instance.get(
        `/company/products/reviews?${params}`,
      );

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getProductReviewByID = createAsyncThunk(
  "/company/products/:id/reviews",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/company/products/${payload}/reviews`,
      );
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const ProductReviewReply = createAsyncThunk(
  "/company/products/reviews/:id",
  async (payload, thunkAPI) => {
    try {
      console.log(payload, "payload");
      const response = await instance.put(
        `company/products/reviews/${payload?.id}`,
        payload?.data,
      );
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const Reported = createAsyncThunk(
  "/company/report/",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/company/report`, payload);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//👽 ----------- Wallet Managment -----------👽
export const getWallet = createAsyncThunk(
  "/company/wallet",
  async (payload = {}, thunkAPI) => {
    try {
      const response = await instance.get(`/company/wallet`);

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getWalletTransactions = createAsyncThunk(
  "/company/wallet/transaction?page=1&limit=10",
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

      const response = await instance.get(
        `/company/wallet/transaction?${params}`,
      );

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getWalletHistory = createAsyncThunk(
  "/company/wallet/history?page=1&limit=10",
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

      const response = await instance.get(`/company/wallet/history?${params}`);

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//👽 ----------- Categories Managment -----------👽
export const getCategories = createAsyncThunk(
  "/company/category",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/company/category`);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
//👽 ----------- Notifications Managment -----------👽
export const getNotifications = createAsyncThunk(
  "/company/notification",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/notification`);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
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
      //👽 ----------- Dashboard Managment -----------👽
      .addCase(getDashboardStats.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardStats = action.payload.data;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getPopularProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularProducts = action.payload.data;
      })
      .addCase(getPopularProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getSalesGraph.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSalesGraph.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesGraph = action.payload.data;
      })
      .addCase(getSalesGraph.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getTransactionGraph.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTransactionGraph.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionGraph = action.payload.data;
      })
      .addCase(getTransactionGraph.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
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
        state.cancelOrderLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelOrderLoading = false;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelOrderLoading = false;
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
      })
      .addCase(getProductReviewByID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductReviewByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.SingleProductReview = action.payload.data;
      })
      .addCase(getProductReviewByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(Reported.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(Reported.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(Reported.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(ProductReviewReply.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ProductReviewReply.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ProductReviewReply.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      //👽 ----------- Wallet State Managment -----------👽
      .addCase(getWallet.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallet = action.payload.data;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getWalletTransactions.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWalletTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.walletTransactions = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getWalletTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getWalletHistory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWalletHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.walletHistory = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getWalletHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.payload.message;
      })
      //👽 ----------- Notifications State Managment -----------👽
      .addCase(getNotifications.pending, (state, action) => {
        state.notificationsLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notifications = action.payload.data;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.notificationsLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setToken, setRefreshToken, setUser, logout, setSingleOrder } =
  appSlice.actions;
export default appSlice.reducer;
