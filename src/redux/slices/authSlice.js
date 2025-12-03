import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Cookies from "js-cookie";
const initialState = {
  isLoading: false,
  isResendLoading: false,
  token: null,
  refreshToken: null,
  company: null,
  isAuthenticated: false,
  isOnboardingStep: 0,
  stores: null,
  Banks: null,
  isDeleteLoading: false,
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
export const SocialLogin = createAsyncThunk(
  "/auth/socialRegister",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/socialRegister", payload);
      Cookies.set("token", response?.data?.data?.token, { expires: 7 });
      SuccessToast(response?.data?.message || "Company Login successful!");
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

export const SendOtpFa = createAsyncThunk(
  "/auth/resendLoginOTP",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/resendLoginOTP", payload);
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
export const VerifyLoginOtp = createAsyncThunk(
  "/auth/login-verifyOTP",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/verifyOTP", payload);
      SuccessToast(response?.data?.message);
      Cookies.set("token", response?.data?.data?.token, { expires: 7 });
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ReSendOtpFa = createAsyncThunk(
  "/auth/resendFALoginOTP",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/resendLoginOTP", payload);
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
        error.response?.data?.message ||
        error.message ||
        "Forget password failed";
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const ResendForgetOtp = createAsyncThunk(
  "/auth/resendForgetPasswordOTP",
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
        error.response?.data?.message ||
        error.message ||
        "Forget password failed";
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
export const ReSendOtpAccountVerification = createAsyncThunk(
  "/resend-account-verify",
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

export const VerifyForgotPassword = createAsyncThunk(
  "/auth/verifyOTP",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/verifyOTP", payload);
      Cookies.set("token", response?.data?.data?.token, { expires: 7 });
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateForgotPassword = createAsyncThunk(
  "/auth/updatePassword",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/updatePassword", payload);
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
export const UpdateCompanyProfile = createAsyncThunk(
  "/company/profile/update",
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
      console.log(payload, "payload");
      // 4️⃣ Send request to backend
      const response = await axios.put(
        `/company/store/${payload?.id}`,
        payload?.data
      );
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
export const GetBanks = createAsyncThunk(
  "get/company/bank",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.get("/company/bank");
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const EditBank = createAsyncThunk(
  "update/company/bank",
  async ({ data, bankId }, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.put(`/company/bank/${bankId}`, data);
      SuccessToast(response?.data?.message);
      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const DeleteBank = createAsyncThunk(
  "delete/company/bank",
  async (bankId, thunkAPI) => {
    try {
      const response = await axios.delete(`/company/bank/${bankId}`);
      SuccessToast(response?.data?.message || "Bank deleted successfully");
      return bankId; // returning bankId so reducer can remove it from state
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const ConectStripeAccount = createAsyncThunk(
  "/company/account/link",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("/company/account/link", payload);
      SuccessToast(response?.data?.message);

      const url = response?.data?.data?.url;
      if (url) {
        window.open(url, "_blank"); // "_blank" opens in new tab
      }

      // ✅ Dispatch the resetOnboarding action properly

      thunkAPI.dispatch(resetOnboarding());

      return response?.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      ErrorToast(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const ChangePassword = createAsyncThunk(
  "/auth/changePassword",
  async (payload, thunkAPI) => {
    try {
      // 4️⃣ Send request to backend
      const response = await axios.post("/auth/changePassword", payload);
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
    setOnboardingStep(state, action) {
      state.isOnboardingStep = action.payload;
    },
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
      state.company = null;
      state.isAuthenticated = false;
    },
    resetOnboarding(state) {
      state.isOnboardingStep = 0;
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
      .addCase(VerifyForgotPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(VerifyForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload?.data?.company;
        state.token = action.payload?.data?.token;
        state.isAuthenticated = true;
      })
      .addCase(VerifyForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateForgotPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateForgotPassword.rejected, (state, action) => {
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
        state.company = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(CompleteCompanyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(UpdateCompanyProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(UpdateCompanyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload?.data;
        state.isAuthenticated = true;
      })
      .addCase(UpdateCompanyProfile.rejected, (state, action) => {
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
        state.stores = action.payload.data;
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
      })
      .addCase(CreateBank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(GetBanks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(GetBanks.fulfilled, (state, action) => {
        state.Banks = action.payload.data;
        state.isLoading = false;
      })
      .addCase(GetBanks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(DeleteBank.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(DeleteBank.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(DeleteBank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(EditBank.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(EditBank.fulfilled, (state, action) => {
        state.Banks = action.payload.data;
        state.isLoading = false;
      })
      .addCase(EditBank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(ConectStripeAccount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ConectStripeAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Banks = action.payload.data;
      })
      .addCase(ConectStripeAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // CompanyLogin
      .addCase(CompanyLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CompanyLogin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CompanyLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(SocialLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(SocialLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload?.data?.company;
        state.token = action.payload?.data?.token;
        state.isAuthenticated = true;
      })
      .addCase(SocialLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(VerifyLoginOtp.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(VerifyLoginOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload?.data?.company;
        state.token = action.payload?.data?.token;
        state.isAuthenticated = true;
      })
      .addCase(VerifyLoginOtp.rejected, (state, action) => {
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
      .addCase(ResendForgetOtp.pending, (state, action) => {
        state.isResendLoading = true;
      })
      .addCase(ResendForgetOtp.fulfilled, (state, action) => {
        state.isResendLoading = false;
      })
      .addCase(ResendForgetOtp.rejected, (state, action) => {
        state.isResendLoading = false;
        state.error = action.payload.message;
      })
      .addCase(ReSendOtpFa.pending, (state, action) => {
        state.isResendLoading = true;
      })
      .addCase(ReSendOtpFa.fulfilled, (state, action) => {
        state.isResendLoading = false;
      })
      .addCase(ReSendOtpFa.rejected, (state, action) => {
        state.isResendLoading = false;
        state.error = action.payload.message;
      })
      .addCase(ReSendOtpAccountVerification.pending, (state, action) => {
        state.isResendLoading = true;
      })
      .addCase(ReSendOtpAccountVerification.fulfilled, (state, action) => {
        state.isResendLoading = false;
      })
      .addCase(ReSendOtpAccountVerification.rejected, (state, action) => {
        state.isResendLoading = false;
        state.error = action.payload.message;
      })
      .addCase(ChangePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const {
  setToken,
  setRefreshToken,
  setUser,
  logout,
  setOnboardingStep,
  resetOnboarding,
} = authSlice.actions;
export default authSlice.reducer;
