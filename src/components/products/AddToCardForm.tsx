import React, { useState } from "react";

import { Field, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const quantitySchema = z.object({
  qty: z.number().min(1).default(1),
});

function onSubmit(data: z.infer<typeof quantitySchema>) {
  console.log(data);
  toast.success("Product is added to cart successfully.");
}

interface canBuyProps {
  canBuy: boolean;
}

const AddToCardForm = ({ canBuy }: canBuyProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      qty: 1,
    },
  });

  // // Watch the qty value from react-hook-form
  // const qty = watch("qty");

  // const handleIncrement = () => {
  //   setValue("qty", qty + 1);
  // };

  // const handleDecrement = () => {
  //   if (qty > 1) {
  //     setValue("qty", qty - 1);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-30">
      <FieldSet className="flex flex-row gap-0">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-tr-none rounded-br-none"
        >
          <Icons.minus />
        </Button>
        <Controller
          control={control}
          name="qty"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Input
                type="number"
                {...field}
                min={1}
                inputMode="numeric"
                className="rounded-none w-16 text-center"
              />
            </Field>
          )}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-tl-none rounded-bl-none"
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
          Add To Cart
        </Button>
      </div>
    </form>
  );
};

export default AddToCardForm;