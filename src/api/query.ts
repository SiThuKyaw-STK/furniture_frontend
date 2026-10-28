import { QueryClient, keepPreviousData } from "@tanstack/react-query";
import api from ".";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // retry: 5
    },
  },
});

const fetchProducts = async (q?: string) => {
  const response = await api.get(`users/products/infinite${q ?? ""}`);
  return response.data;
};

export const productQuery = (q?: string) => ({
  queryKey: ["products", q],
  queryFn: () => fetchProducts(q),
});

const fetchPosts = (q?: string) =>
  api.get(`users/posts/infinite${q ?? ""}`).then((res) => res.data);

export const postQuery = (q?: string) => ({
  queryKey: ["posts", q],
  queryFn: () => fetchPosts(q),
});

const fetchInfinitePosts = async ({ pageParam = null }) => {
  const query = pageParam ? `?cursor=${pageParam}&limit=6` : "?limit=6";
  const response = await api.get(`users/posts/infinite${query}`);
  return response.data;
};

export const infinitePostQuery = () => ({
  queryKey: ["posts", "infinite"],
  queryFn: fetchInfinitePosts,
  initialPageParam: null,
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  // getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? undefined,
  // maxPages: 1,
});

const fetchOnePost = async (postId: number) => {
  const response = await api.get(`users/posts/${postId}`);
  if (!response)
    throw new Response("", { status: 404, statusText: "Not Found" });
  return response.data;
};

export const onePostQuery = (postId: number) => ({
  queryKey: ["posts", "detail", postId],
  queryFn: () => fetchOnePost(postId),
});

const fetchCategoriesAndTypes = async () => {
  return api.get(`users/filter/categories-and-types`).then((res) => res.data);
};

export const categoriesAndTypesQuery = () => ({
  queryKey: ["categories", "types"],
  queryFn: fetchCategoriesAndTypes,
});

const fetchInfiniteProducts = async ({
  pageParam = null,
  categories = null,
  types = null,
}: {
  pageParam?: number | null;
  categories?: string | null;
  types?: string | null;
}) => {
  let query = pageParam ? `?cursor=${pageParam}&limit=9` : "?limit=9";
  if(categories) query += `&category=${categories}`;
  if(types) query += `&type=${types}`;
  const response = await api.get(`users/products/infinite${query}`);
  return response.data;
};

export const infiniteProductQuery = (categories?: string | null, types?: string | null) => ({
  queryKey: ["products", "infinite", categories ?? undefined, types ?? undefined],
  queryFn: ({pageParam}: { pageParam?: number | null }) => fetchInfiniteProducts({ pageParam, categories, types }),
  initialPageParam: null,
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  placeholderData: keepPreviousData,
  // getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? undefined,
  // maxPages: 1,
});

const fetchOneProduct = async (productId: number) => {
  const response = await api.get(`users/products/${productId}`);
  if (!response)
    throw new Response("", { status: 404, statusText: "Not Found" });
  return response.data;
};

export const oneProductQuery = (productId: number) => ({
  queryKey: ["products", "detail", productId],
  queryFn: () => fetchOneProduct(productId),
});