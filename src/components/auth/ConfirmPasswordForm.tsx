import { useState } from "react";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers."),

  confirmPassword: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers."),
});

type ConfirmPasswordFormValues = z.infer<typeof FormSchema>;

export const ConfirmPasswordForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const submit = useSubmit();
  const navigation = useNavigation();

  const actionData = useActionData() as
    | { message?: string }
    | undefined;

  const [clientError, setClientError] = useState<string | null>(null);

  const form = useForm<ConfirmPasswordFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ConfirmPasswordFormValues) => {
    if (values.password !== values.confirmPassword) {
      setClientError("Passwords do not match.");
      return;
    }

    setClientError(null);

    submit(values, {
      method: "post",
      action: "/register/confirm-password",
    });
  };

  const isSubmitting = navigation.state === "submitting";

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link
            to="/"
            className="flex flex-col items-center gap-2 font-medium"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <Icons.logo
                className="mr-2 h-6 w-6"
                aria-hidden="true"
              />
            </div>

            <span className="sr-only">Confirm Password</span>
          </Link>

          <h1 className="text-xl font-bold">
            Please confirm your password
          </h1>

          <div className="text-center text-sm">
            Passwords must be 8 digits long and contain only numbers.
            They must match.
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <Field
            data-invalid={!!form.formState.errors.password}
          >
            <FieldLabel htmlFor="password">
              Password
            </FieldLabel>

            <PasswordInput
              id="password"
              required
              inputMode="numeric"
              {...form.register("password")}
              aria-invalid={!!form.formState.errors.password}
            />

            {form.formState.errors.password && (
              <FieldError
                errors={[form.formState.errors.password]}
              />
            )}
          </Field>

          <Field
            data-invalid={!!form.formState.errors.confirmPassword}
          >
            <FieldLabel htmlFor="confirmPassword">
              Confirm Password
            </FieldLabel>

            <PasswordInput
              id="confirmPassword"
              required
              inputMode="numeric"
              {...form.register("confirmPassword")}
              aria-invalid={
                !!form.formState.errors.confirmPassword
              }
            />

            {form.formState.errors.confirmPassword && (
              <FieldError
                errors={[form.formState.errors.confirmPassword]}
              />
            )}
          </Field>

          {actionData?.message && (
            <div className="flex gap-2">
              <p className="text-xs text-red-400">
                {actionData.message}
              </p>

              <Link
                to="/register"
                className="text-xs underline underline-offset-4"
              >
                Go back to register
              </Link>
            </div>
          )}

          {clientError && (
            <p className="text-xs text-red-400">
              {clientError}
            </p>
          )}

          <div className="grid gap-4">
            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}