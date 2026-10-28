import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const quantitySchema = z.object({
  quantity: z
    .string()
    .min(1, "Must not be empty")
    .max(4, "Too Many! Is it real?")
    .regex(/^\d+$/, "Must be a number"),
});

interface EditableProps {
  quantity: number;
  onUpdate: (quantity: number) => void;
  onDelete: () => void;
}

export default function Editable({
  quantity,
  onUpdate,
  onDelete,
}: EditableProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: quantity.toString(),
    },
  });

  // function onSubmit(values: z.infer<typeof quantitySchema>) {
  //   console.log(values);
  //   // Call api
  //   toast.success("Product is added to cart successfully.");
  // }

  const currentQuantity = Number(watch("quantity"));

  const handleDecrease = () => {
    const newQuantity = Math.max(currentQuantity - 1, 0); // Min limit 0
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
    onUpdate(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(currentQuantity + 1, 9999); // Max limit 9999
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
    onUpdate(newQuantity);
  };

  return (
    <form
      // onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full justify-between"
    >
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 shrink-0 rounded-r-none"
          onClick={handleDecrease}
          disabled={currentQuantity === 0}
        >
          <Icons.minus className="size-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>

        <span className="flex h-8 w-16 items-center justify-center border-y text-center">
          {currentQuantity}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 shrink-0 rounded-l-none"
          onClick={handleIncrease}
          disabled={currentQuantity > 9999}
        >
          <Icons.plus className="size-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>
      <Button
        type="button"
        aria-label="Delete cart item"
        variant="outline"
        size="icon"
        className="size-8"
        onClick={onDelete}
      >
        <Icons.trash className="size-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </form>
  );
}
