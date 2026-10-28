import React from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import useCartStore from "@/store/cartStore";

interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
}

const ProductCard = ({ product, className }: ProductProps) => {
  const { addItem, carts } = useCartStore();
  const isInCart = carts.find((cart) => cart.id === product.id);
  const imageUrl = import.meta.env.VITE_IMG_URL;

  const handleCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0].path,
    });
  };
  return (
    <Card className={cn("size-full overflow-hidden rounded-lg p-0", className)}>
      <Link to={`/products/${product.id}`} aria-label={product.name}>
        <CardHeader className="p-0">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <img
              src={imageUrl + product.images[0].path}
              alt="product image"
              loading="lazy"
              decoding="async"
              className="size-full object-contain"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {formatPrice(product.price)}
            {product.discount > 0 && (
              <span className="ml-2 font-extralight line-through">
                {formatPrice(product.discount)}
              </span>
            )}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="">
        {product.status === "sold" ? (
          <Button
            size="sm"
            disabled={true}
            aria-label="Sold Out"
            className="h-8 w-full rounded-sm font-bold"
          >
            Sold Out
          </Button>
        ) : (
          <Button
            size="sm"
            className="h-8 w-full rounded-sm bg-own font-bold"
            onClick={handleCart}
            disabled={!!isInCart}
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
