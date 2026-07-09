import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cartItems } from "@/data/carts";

const CartSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="relative">
          <Icons.shoppingCart className="size-4" />
          <Badge
            className="absolute -top-2 -right-2 size-6 justify-center rounded-full p-2.5"
            variant="destructive"
          >
            3
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="">
          <SheetTitle>Cart - 3</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <p></p>
        ) : (
          <div className="flex flex-col h-screen place-items-center justify-center space-y-1">
            <Icons.shoppingCart className="size-16 mb-4 text-muted-foreground " />
            <div className="text-xl font-medium text-muted-foreground">Your cart is empty</div>
          </div>
        )}
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default CartSheet;
