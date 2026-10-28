import { authApi } from "@/api";
import { categoriesAndTypesQuery, infinitePostQuery, infiniteProductQuery, onePostQuery, oneProductQuery, postQuery, productQuery, queryClient } from "@/api/query";
import useAuthStore, { Status } from "@/store/authStore";
import { redirect, type LoaderFunctionArgs } from "react-router";

export const loginLoader = async () => {
  try {
    await authApi.get("auth-check");

    return redirect('/');
  } catch (error) {
    console.log(error)
  }
}

export const otpLoader = async () => {
 const authStore = useAuthStore.getState();

 if(authStore.status !== Status.otp){
  return redirect('/register');
 }

 return null;
}

export const verifyOtpLoader = async () => {
 const authStore = useAuthStore.getState();

 if(authStore.status !== Status.verify){
  return redirect('/reset');
 }

 return null;
}


export const confirmPasswordLoader = async () => {
 const authStore = useAuthStore.getState();

 if(authStore.status !== Status.confirm){
  return redirect('/register');
 }

 return null;
}

export const resetPasswordLoader = async () => {
 const authStore = useAuthStore.getState();

 if(authStore.status !== Status.reset){
  return redirect('/reset');
 }

 return null;
}


// export const homeLoader = async () => {
//   try {
//     const products = await api.get("users/products/infinite?limit=8");
//     const posts = await api.get("users/posts/infinite?limit=3");
//     return {productData: products.data, postData: posts.data};
//   } catch (error) {
//     console.log(error)
//   }
// }

export const homeLoader = async () => {
  await queryClient.query(productQuery("?limit=8"));
  await queryClient.query(postQuery("?limit=3"));
  return null;
}

export const blogInfiniteLoader = async () => {
  await queryClient.infiniteQuery(infinitePostQuery());
  return null;
}

export const postDetailLoader = async ({params}: LoaderFunctionArgs) => {
  const {postId} = params;
  if(!postId) throw new Error("No Post ID provided");

  await queryClient.query(postQuery("?limit=6"));
  await queryClient.query(onePostQuery(parseInt(postId)));
  return {postId: parseInt(postId)};
}

export const productInfiniteLoader = async () => {
 await queryClient.query(categoriesAndTypesQuery());
 await queryClient.infiniteQuery(infiniteProductQuery());
 return null;
}

export const productDetailLoader = async ({params}: LoaderFunctionArgs) => {
  const {productId} = params;
  if(!productId) throw new Error("No Product ID provided");

  await queryClient.query(productQuery("?limit=6"));
  await queryClient.query(oneProductQuery(parseInt(productId)));
  return {productId: parseInt(productId)};
}