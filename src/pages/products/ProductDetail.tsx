import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";
// import { products } from "@/data/products";
import { useLoaderData, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProductCard from "@/components/products/ProductCard";
import { Icons } from "@/components/icons";
import { formatPrice } from "@/lib/utils";
import Rating from "./Rating";
// import AddToFavourite from "./AddToFavourite";
import AddToFavourite from "./AddToFavouriteTanstack";
import AddToCardForm from "@/components/products/AddToCardForm";
import { oneProductQuery, productQuery } from "@/api/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Image, Product } from "@/types";
import useCartStore from "@/store/cartStore";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useLoaderData<{ productId: string }>();
  const { data: productDetail } = useSuspenseQuery(
    oneProductQuery(Number(productId)),
  );
  const { data: productData } = useSuspenseQuery(productQuery("?limit=4"));

  const imageUrl = import.meta.env.VITE_IMG_URL;

  const { addItem } = useCartStore();

  const handleAddToCart = (quantity: number) => {
    if (productDetail) {
      const product = productDetail.product;
  
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0].path, // Assuming the first image is the main image
      });
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-0">
      <Button variant="outline" className="mt-8" onClick={() => navigate(-1)}>
        <Icons.arrowLeft /> All Products
        {/* <Link to="/products">
          <Icons.arrowLeft /> All Products
        </Link> */}
      </Button>
      <section className="my-6 flex flex-col gap-6 md:flex-row md:gap-16">
        <Carousel
          className="w-full md:w-1/2"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {productDetail?.product.images.map((image: Image) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                  <img
                    src={imageUrl + image.path}
                    alt={productDetail?.product.name}
                    loading="lazy"
                    decoding="async"
                    className="size-full rounded-md object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">
              {productDetail?.product.name}
            </h2>
            <p className="text-base text-muted-foreground">
              {formatPrice(Number(productDetail?.product.price))}
            </p>
          </div>
          <Separator className="my-1.5" />
          <p className="text-base text-muted-foreground">
            {productDetail?.product.inventory} in stock
          </p>
          <div className="flex items-center justify-between">
            <Rating rating={Number(productDetail?.product.rating)} />
            <AddToFavourite
              productId={Number(productDetail?.product.id)}
              rating={Number(productDetail?.product.rating)}
              isFavorited={productDetail.product.users.length === 1}
            />
          </div>

          <AddToCardForm
            canBuy={productDetail?.product.status === "active"}
            onHandleCart={handleAddToCart}
            idInCart={productDetail.product.id}
          />

          <Separator className="my-5" />

          <Accordion
            defaultValue={"description"}
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="description" className="">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {productDetail?.product.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="line-clamp-1 text-2xl font-bold">
          More Products From Furniture Shop
        </h2>
        <ScrollArea className="pb-4">
          <div className="flex gap-4">
            {productData?.products?.slice(0, 4).map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="min-w-65"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
};

export default ProductDetail;
