import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Cookies from "js-cookie";
const initialState = {
  isLoading: false,
  token: null,
  refreshToken: null,
  company: null,
  isAuthenticated: false,  
  stores:null,
  Banks:null,
  isDeleteLoading:false
};

export const Register = createAsyncThunk(
  "/register",
  async (payload, thunkAPI) => {
    try {
      console.log("Incoming payload:", payload);

      // 1️⃣ Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      const user = userCredential.user;

      // 2️⃣ Get Firebase ID Token
      const idToken = await user.getIdToken();
      console.log("Generated Firebase idToken:", idToken);
      const finalPayload = {
        name: payload.businessName || "",
        email: payload.email || "",
        phone: "+1" + payload.phoneNumber || "",
        companyRegistrationNo: payload.registerNumber || "",
        businessAddress: payload.address || "",
        password: payload.password || "",
        idToken,
      };

      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/signUp/company", finalPayload);
      console.log(response);
      Cookies.set("token", response?.data?.data?.token, { expires: 7 });
      SuccessToast(response?.data?.message || "Registration successful!");
      return response?.data;
    } catch (error) {
      console.error("Registration error:", error);
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const CompanyLogin = createAsyncThunk(
  "/auth/signIn",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/signIn", payload);
      Cookies.set("token", response?.data?.data?.token, { expires: 7 });
      SuccessToast(response?.data?.message || "CompanyLogin successful!");
      return response?.data;
    } catch (error) {
      console.error("CompanyLogin error:", error);
      const message =
        error.response?.data?.message || error.message || "CompanyLogin failed";
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "/auth/resendLoginOTP",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/resendLoginOTP", payload);
      Cookies.set("token", response?.data?.data?.token, { expires: 7 });
      SuccessToast(response?.data?.message || "Forget password successful!");
      return response?.data;
    } catch (error) {
      console.error("Forget password error:", error);
      const message =
        error.response?.data?.message || error.message || "Forget password failed";
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const SendOtpAccountVerification = createAsyncThunk(
  "/account-verify",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/emailVerificationOTP");
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.error("Registration error:", error);
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const VerifyEmail = createAsyncThunk(
  "/verify-email",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/verifyEmail", payload);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const UploadCompanyDocuments = createAsyncThunk(
  "/company/documents",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/company/documents", payload);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const CompleteCompanyProfile = createAsyncThunk(
  "/company/profile/complete",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/company/profile/complete", payload);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const CreateStore = createAsyncThunk(
  "/company/store",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/company/store", payload);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const EditStore = createAsyncThunk(
  "edit/company/store",
  async (payload, thunkAPI) => {
    try {
      console.log(payload,"payload")
      // 4️⃣ Send request to backend
      const response = await axios.put(`/company/store/${payload?.id}`, payload?.data);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getStore = createAsyncThunk(
  "get/company/store",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.get("/company/store");
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteStore = createAsyncThunk(
  "delete/company/store",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.delete(`company/store/${payload}`);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const CreateBank = createAsyncThunk(
  "/company/bank",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/company/bank", payload);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
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
      // Onboarding
      .addCase(Register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload?.data?.company;
        state.token = action.payload?.data?.token;
        state.isAuthenticated = true;
      })
      .addCase(Register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(VerifyEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(VerifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(VerifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(UploadCompanyDocuments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(UploadCompanyDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(UploadCompanyDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(CompleteCompanyProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CompleteCompanyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CompleteCompanyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(CreateStore.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CreateStore.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CreateStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getStore.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores=action.payload.data
      })
      .addCase(getStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteStore.pending, (state, action) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.isDeleteLoading = false;
        state.error = action.payload.message;
      })
      .addCase(CreateBank.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CreateBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Banks=action.payload.data
      })
      .addCase(CreateBank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // CompanyLogin
       .addCase(CompanyLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CompanyLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload?.data?.company;
        state.token = action.payload?.data?.token;
        state.isAuthenticated = true;
      })
      .addCase(CompanyLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
       .addCase(forgetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;       
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
  },
});

export const { setToken, setRefreshToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
