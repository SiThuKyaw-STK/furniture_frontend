import { useSubmit, useNavigation, useActionData } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icons } from "../icons";

const FormSchema = z.object({
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(12, "Phone number is too long")
    .regex(/^\d+$/, "Phone number must be numbers"),
});

export const ResetPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    submit(values, { method: "post", action: "." });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Icons.logo className="mr-2 size-6" />
              </div>
              <span className="sr-only">Furniture Shop.</span>
            </a>
            <h1 className="text-xl font-bold">Reset Password.</h1>
            <FieldDescription>
              Remember your password? <a href="/login">Sign in</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="0977**********"
              required
              {...form.register("phone")}
            />
            <FieldError errors={[form.formState.errors.phone]} />
          </Field>
          {actionData && (
            <p className="text-xs text-red-400">{actionData?.message}</p>
          )}
          <Field>
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting"
                ? "Submitting..."
                : "Reset"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};
