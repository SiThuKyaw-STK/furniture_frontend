// import { products, filterList } from "@/data/products";
import ProductFilter from "@/components/products/ProductFilter";
import ProductCard from "@/components/products/ProductCard";
import useUrlStore from "@/store/urlStore";
// import PaginationBottom from "@/components/products/Pagination";
import { useSuspenseQuery, useInfiniteQuery } from "@tanstack/react-query";
import { infiniteProductQuery, categoriesAndTypesQuery } from "@/api/query";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get("categories");
  const rawType = searchParams.get("types");

  console.log("Raw Category from URL:", rawCategory);

  const setUrl = useUrlStore((state) => state.setUrl);

  useEffect(() => {
    setUrl(searchParams.toString());
  }, [searchParams, setUrl]);

  // decode the query params into arrays of numbers
  const selectedCategories = rawCategory
    ? decodeURIComponent(rawCategory)
        .split(",")
        .map((cat) => Number(cat.trim()))
        .filter((cat) => !isNaN(cat))
    : [];
  const selectedTypes = rawType
    ? decodeURIComponent(rawType)
        .split(",")
        .map((type) => Number(type.trim()))
        .filter((type) => !isNaN(type))
    : [];

  const cat =
    selectedCategories.length > 0 ? selectedCategories.toString() : "";
  const type = selectedTypes.length > 0 ? selectedTypes.toString() : "";

  // console.log("Selected Categories from URL:", selectedCategories);
  // console.log("Selected Types from URL:", selectedTypes);

  const { data: cateType } = useSuspenseQuery(categoriesAndTypesQuery());
  // console.log("cateType", cateType);
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(infiniteProductQuery(cat, type));

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  const handleFilterChange = (categories: number[], types: number[]) => {
    const newParams = new URLSearchParams();
    if (categories.length > 0) {
      newParams.set("categories", categories.toString());
    }
    if (types.length > 0) {
      newParams.set("types", types.toString());
    }
    setSearchParams(newParams);
    refetch(); // Refetch the products based on the new filters
  };

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="container mx-auto px-4 md:px-0">
      <section className="flex flex-col lg:flex-row">
        <section className="my-8 lg:ml-0 w-full lg:w-1/5">
          <ProductFilter
            filterList={cateType?.data || []}
            selectedCategories={selectedCategories}
            selectedTypes={selectedTypes}
            onFilterChange={handleFilterChange}
          />
        </section>
        <section className="my-8 lg:ml-5 w-full lg:w-4/5">
          <h1 className="text-2xl font-bold">All Products</h1>
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="my-4 flex justify-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              variant={!hasNextPage ? "ghost" : "secondary"}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
            </Button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
          {/* <PaginationBottom /> */}
        </section>
      </section>
    </div>
  );
};

export default Product;
