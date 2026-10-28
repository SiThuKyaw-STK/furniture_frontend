import { Field, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/cartStore";
import { useEffect } from "react";

const quantitySchema = z.object({
  quantity: z.string().min(1).default(1),
});

interface AddToCardFormProps {
  canBuy: boolean;
  onHandleCart: (quantity: number) => void;
  idInCart: number;
}

const AddToCardForm = ({ canBuy, onHandleCart, idInCart }: AddToCardFormProps) => {
  const cartItem = useCartStore((state) => state.carts.find((cart) => cart.id === idInCart))
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: cartItem ? cartItem.quantity.toString() : '1',
    },
  });

  // // Watch the quantity value from react-hook-form
  const currentQuantity = Number(watch("quantity"));

  const handleDecrease = () => {
    const newQuantity = Math.max(currentQuantity - 1, 0); // Min limit 0
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(currentQuantity + 1, 9999); // Max limit 9999
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
  };

  const onSubmit = (data: z.infer<typeof quantitySchema>) => {
    onHandleCart(Number(data.quantity));
    toast.success("Product is added to cart successfully.");
  };

  useEffect(() => {
    if(cartItem){
      setValue("quantity", cartItem.quantity.toString(),{shouldValidate: true})
    }
  },[cartItem,setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-30">
      <FieldSet className="flex flex-row gap-0">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-tr-none rounded-br-none"
          onClick={handleDecrease}
          disabled={currentQuantity <= 1}
        >
          <Icons.minus />
        </Button>
        <Controller
          control={control}
          name="quantity"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Input
                type="number"
                {...field}
                min={1}
                max={9999}
                inputMode="numeric"
                className="rounded-none w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </Field>
          )}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-tl-none rounded-bl-none"
          onClick={handleIncrease}
          disabled={currentQuantity >= 9999}
        >
          <Icons.plus />
        </Button>
      </FieldSet>
      <div className="flex items-center space-x-1.5 mt-4">
        <Button
          type="button"
          size="sm"
          // variant={!canBuy ? "outline" : "default"}
          className={cn("w-full bg-own font-bold", !canBuy && "bg-slate-400")}
        >
          Buy Now
        </Button>
        <Button
          type="submit"
          size="sm"
          // variant={!canBuy ? "outline" : "default"}
          className={cn("w-full font-semibold")}
        >
          {cartItem ? "Update Cart" : "Add To Cart"}
        </Button>
      </div>
    </form>
  );
};

export default AddToCardForm;
