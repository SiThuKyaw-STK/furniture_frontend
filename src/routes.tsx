/* eslint-disable react-refresh/only-export-components */

import { createBrowserRouter, redirect } from "react-router";
import { lazy, Suspense } from "react";
import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import ErrorPage from "@/pages/Error";
import Loading from "@/components/Loading";
import {
  blogInfiniteLoader,
  confirmPasswordLoader,
  homeLoader,
  loginLoader,
  otpLoader,
  postDetailLoader,
  productDetailLoader,
  productInfiniteLoader,
  resetPasswordLoader,
  verifyOtpLoader,
} from "@/router/loader";
import {
  confirmPasswordAction,
  // favouriteAction,
  loginAction,
  logoutAction,
  otpAction,
  registerAction,
  resetAction,
  resetPasswordAction,
  verifyOtpAction,
} from "@/router/action";
import SingUpRootLayout from "@/pages/auth/SingUpRootLayout";
import SignUpPage from "@/pages/auth/SignUp";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import OtpPage from "@/pages/auth/OTP";
import ConfirmPasswordPage from "./pages/auth/ConfirmPassword";
import VerifyOtpPage from "./pages/auth/VerifyOTP";
import NewPasswordPage from "./pages/auth/NewPassword";

const AboutPage = lazy(() => import("@/pages/About"));
const BlogPage = lazy(() => import("@/pages/blogs/Blog"));
const BlogDetailPage = lazy(() => import("@/pages/blogs/BlogDetail"));
const BlogRootLayout = lazy(() => import("@/pages/blogs/BlogRootLayout"));
const ProductPage = lazy(() => import("@/pages/products/Product"));
const ProductDetailPage = lazy(() => import("@/pages/products/ProductDetail"));
const LoginPage = lazy(() => import("@/pages/auth/Login"));
// const RegisterPage = lazy(() => import("@/pages/auth/Register"));
const ProductRootLayout = lazy(
  () => import("@/pages/products/ProductRootLayout"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<Loading />}>
            <BlogRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            loader: blogInfiniteLoader,
            element: (
              <Suspense fallback={<Loading />}>
                <BlogPage />
              </Suspense>
            ),
          },
          {
            path: ":postId",
            loader: postDetailLoader,
            element: (
              <Suspense fallback={<Loading />}>
                <BlogDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            loader: productInfiniteLoader,
            element: (
              <Suspense fallback={<Loading />}>
                <ProductPage />
              </Suspense>
            ),
          },
          {
            path: ":productId",
            loader: productDetailLoader,
            // action: favouriteAction,
            element: (
              <Suspense fallback={<Loading />}>
                <ProductDetailPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    action: loginAction,
    loader: loginLoader,
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: <SingUpRootLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />,
        action: registerAction,
        loader: loginLoader,
      },
      {
        path: "/register/otp",
        element: <OtpPage />,
        action: otpAction,
        loader: otpLoader,
      },
      {
        path: "/register/confirm-password",
        element: <ConfirmPasswordPage />,
        action: confirmPasswordAction,
        loader: confirmPasswordLoader,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
  {
    path: "/reset",
    element: <SingUpRootLayout />,
    children: [
      {
        index: true,
        element: <ResetPasswordPage />,
        action: resetAction,
      },
     {
        path: "verify",
        element: <VerifyOtpPage />,
        action: verifyOtpAction,
        loader: verifyOtpLoader,
      },
      {
        path: "new-password",
        element: <NewPasswordPage />,
        action: resetPasswordAction,
        loader: resetPasswordLoader,
      },
    ],
  },
]);
