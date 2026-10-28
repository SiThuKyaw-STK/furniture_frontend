import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { cartItems } from "@/data/carts";
import { Link } from "react-router";
import CartItem from "@/components/carts/CartItem";
import { formatPrice } from "@/lib/utils";
import useCartStore from "@/store/cartStore";

const CartSheet = () => {
  const itemCount = useCartStore((state) => state.getTotalItems());
  const amountTotal = useCartStore((state) => state.getTotalPrice());
  const cartItems = useCartStore((state) => state.carts);
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="relative">
          <Icons.shoppingCart className="size-4" />
          {itemCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 size-6 justify-center rounded-full p-2.5"
              variant="destructive"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="px-4">
        <SheetHeader className="">
          <SheetTitle>{itemCount > 0 ? `Cart - ${itemCount}` : 'Empty Cart'}</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="h-[calc(100vh-9rem)] pb-10">
              {cartItems.map((cart) => (
                <CartItem key={cart.id} cart={cart} />
              ))}
            </ScrollArea>
            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatPrice(amountTotal)}</span>
                </div>
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" asChild>
                  <Link to="/checkout">Check Out</Link>
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col h-screen place-items-center justify-center space-y-1">
            <Icons.shoppingCart className="size-16 mb-4 text-muted-foreground " />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default CartSheet;
