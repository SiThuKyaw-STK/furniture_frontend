import { products, filterList } from "@/data/products";
import ProductFilter from "@/components/products/ProductFilter";
import ProductCard from "@/components/products/ProductCard";
import PaginationBottom from "@/components/products/Pagination";

const Product = () => {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <section className="flex flex-col lg:flex-row">
        <section className="my-8 lg:ml-0 w-full lg:w-1/5">
          <ProductFilter
            filterList={filterList}
          />
        </section>
        <section className="my-8 lg:ml-5 w-full lg:w-4/5">
          <h1 className="text-2xl font-bold">All Products</h1>
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <PaginationBottom />
        </section>
      </section>
    </div>
  );
};

export default Product;
