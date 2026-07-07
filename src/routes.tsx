import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import ErrorPage from "@/pages/Error";
import Loading from "@/components/Loading";

const AboutPage = lazy(() => import("@/pages/About"));
const BlogPage = lazy(() => import("@/pages/blogs/Blog"));
const BlogDetailPage = lazy(() => import("@/pages/blogs/BlogDetail"));
const BlogRootLayout = lazy(() => import("@/pages/blogs/BlogRootLayout"));
const ProductPage = lazy(() => import("@/pages/products/Product"));
const ProductDetailPage = lazy(() => import("@/pages/products/ProductDetail"));
const LoginPage = lazy(() => import("@/pages/auth/Login"));
const RegisterPage = lazy(() => import("@/pages/auth/Register"));
const ProductRootLayout = lazy(
  () => import("@/pages/products/ProductRootLayout"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: HomePage },
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
            element: (
              <Suspense fallback={<Loading />}>
                <BlogPage />
              </Suspense>
            ),
          },
          {
            path: ":blogId",
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
            element: (
              <Suspense fallback={<Loading />}>
                <ProductPage />
              </Suspense>
            ),
          },
          {
            path: ":productId",
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
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loading />}>
        <RegisterPage />
      </Suspense>
    ),
  },
]);
