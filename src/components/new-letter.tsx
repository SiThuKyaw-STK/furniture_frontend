import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export function EmailForm() {
  const [spinner, setSpinner] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setSpinner(true);
  }

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid w-full"
      autoComplete="off"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="relative">
            <InputGroup>
              <InputGroupInput
                {...field}
                id="form-rhf-demo-email"
                aria-invalid={fieldState.invalid}
                placeholder="name@example.com"
                autoComplete="off"
              />
              <InputGroupAddon align="inline-end">
                {spinner ? (
                  <Icons.spinner className="animate-spin text-muted-foreground" />
                ) : (
                    <Button variant='ghost' type="submit" disabled={spinner}>
                      <Icons.send className="text-muted-foreground" />
                    </Button>
                  )}
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
