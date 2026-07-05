import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import type { Category } from "@/types";

interface FilterProps {
  filterList: {
    categories: Category[];
    types: Category[];
  };
}

const FormSchema = z.object({
  categories: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one categories.",
  // }),
  types: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one types.",
  // }),
});

type FilterFormData = z.infer<typeof FormSchema>;

const ProductFilter = ({ filterList }: FilterProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
      types: [],
    },
  });

  function onSubmit(data: FilterFormData) {
    console.log(data);
    // You can add filter logic here
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLabel>Furniture Made By</FieldLabel>
        <FieldGroup className="gap-3">
          {filterList.categories.map((e) => (
            <Controller
              key={e.id}
              control={control}
              name="categories"
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id={`${e.label}-${e.id}`}
                    // Check if the original ID exists in the field value
                    checked={field.value?.includes(e.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        // Add the original ID to the array
                        field.onChange([...(field.value || []), e.id]);
                      } else {
                        // Remove the original ID from the array
                        field.onChange(
                          field.value?.filter((value) => value !== e.id),
                        );
                      }
                    }}
                  />
                  <FieldLabel
                    htmlFor={`${e.label}-${e.id}`}
                    className="font-normal"
                  >
                    {e.label}
                  </FieldLabel>
                </Field>
              )}
            />
          ))}
        </FieldGroup>
        {errors.categories && (
          <p className="text-xs text-red-500 mt-1">
            {errors.categories.message}
          </p>
        )}

        <FieldLabel className="mt-4">Furniture Type By</FieldLabel>
        <FieldGroup className="gap-3">
          {filterList.types.map((e) => (
            <Controller
              key={e.id}
              control={control}
              name="types"
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id={`${e.label}-${e.id}`}
                    // Check if the original ID exists in the field value
                    checked={field.value?.includes(e.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        // Add the original ID to the array
                        field.onChange([...(field.value || []), e.id]);
                      } else {
                        // Remove the original ID from the array
                        field.onChange(
                          field.value?.filter((value) => value !== e.id),
                        );
                      }
                    }}
                  />
                  <FieldLabel
                    htmlFor={`${e.label}-${e.id}`}
                    className="font-normal"
                  >
                    {e.label}
                  </FieldLabel>
                </Field>
              )}
            />
          ))}
        </FieldGroup>
        {errors.types && (
          <p className="text-xs text-red-500 mt-1">{errors.types.message}</p>
        )}

        <Button type="submit" variant="outline" className="mt-4">
          Apply Filters
        </Button>
      </FieldSet>
    </form>
  );
};

export default ProductFilter;
