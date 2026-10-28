import api, { authApi } from "@/api";
import { queryClient } from "@/api/query";
import useAuthStore, { Status } from "@/store/authStore";
import axios from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const authData = {
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  try {
    await authApi.post("login", authData);

    const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";

    return redirect(redirectTo);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data || "Login error!";
    }
    throw error;
  }
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authStore = useAuthStore.getState();

  const authData = {
    phone: formData.get("phone"),
  };

  try {
    const response = await authApi.post("register", authData);

    authStore.setAuth(response.data.phone, response.data.token, Status.otp);

    return redirect("/register/otp");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data || "Sendint OTP failed!";
    }
    throw error;
  }
};

export const otpAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authStore = useAuthStore.getState();

  const authData = {
    phone: authStore.phone,
    token: authStore.token,
    otp: formData.get("otp"),
  };

  try {
    const response = await authApi.post("verify-otp", authData);

    authStore.setAuth(response.data.phone, response.data.token, Status.confirm);

    return redirect("/register/confirm-password");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data || "Sendint OTP failed!";
    }
    throw error;
  }
};

export const confirmPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authStore = useAuthStore.getState();

  const authData = {
    phone: authStore.phone,
    token: authStore.token,
    password: formData.get("password"),
  };

  try {
    await authApi.post("confirm-password", authData);

    authStore.clearAuth();

    return redirect("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data || "Sendint OTP failed!";
    }
    throw error;
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");

    return redirect("/login");
  } catch (error) {
    console.error("Logout Failed!", error);
  }
};

export const favouriteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  if (!params.productId) throw new Error("No Product ID provided");

  const data = {
    productId: Number(params.productId),
    favourite: formData.get("favourite") === "true",
  };

  try {
    await api.patch("users/products/toggle-favourite", data);

    await queryClient.invalidateQueries({
      queryKey: ["products", "detail", Number(params.productId)],
    });

    return null;
  } catch (error) {
    console.error("Favourite Action Failed!", error);
    throw error;
  }
};

export const resetAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authStore = useAuthStore.getState();

  const authData = {
    phone: formData.get("phone"),
  };

  try {
    const response = await authApi.post("forget-password", authData);

    authStore.setAuth(response.data.phone, response.data.token, Status.verify);

    return redirect("/reset/verify");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data || "Sendint OTP failed!";
    }
    throw error;
  }
};

export const verifyOtpAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authStore = useAuthStore.getState();

  const authData = {
    phone: authStore.phone,
    token: authStore.token,
    otp: formData.get("otp"),
  };

  try {
    const response = await authApi.post("verify-otp-for-password-reset", authData);

    authStore.setAuth(response.data.phone, response.data.token, Status.reset);

    return redirect("/reset/new-password");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data || "Sendint OTP failed!";
    }
    throw error;
  }
};

export const resetPasswordAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authStore = useAuthStore.getState();

  const authData = {
    phone: authStore.phone,
    token: authStore.token,
    password: formData.get("password"),
  };

  try {
    await authApi.post("reset-password", authData);

    authStore.clearAuth();

    return redirect("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error?.response?.data || "Sendint OTP failed!";
    }
    throw error;
  }
};
