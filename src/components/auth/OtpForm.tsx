import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as { message?: string } | undefined;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);

    submit(data, {
      method: "POST",
      action: "/register/otp",
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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

            <span className="sr-only">OTP Verify Form</span>
          </Link>

          <h1 className="mb-6 text-xl font-bold">
            We've sent OTP to your phone.
          </h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <Field>
              <FieldLabel htmlFor="otp">
                OTP - One-Time Password
              </FieldLabel>

              <InputOTP
                id="otp"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={form.watch("otp")}
                onChange={(value) => form.setValue("otp", value)}
                aria-invalid={!!form.formState.errors.otp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>

                <InputOTPSeparator />

                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>

                <InputOTPSeparator />

                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <FieldDescription>
                Please enter the one-time password sent to your phone.
              </FieldDescription>

              {form.formState.errors.otp && (
                <FieldError>
                  {form.formState.errors.otp.message}
                </FieldError>
              )}
            </Field>

            {actionData?.message && (
              <p className="text-xs text-red-400">
                {actionData.message}
              </p>
            )}

            <div className="grid gap-4">
              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={navigation.state === "submitting"}
              >
                {navigation.state === "submitting"
                  ? "Submitting..."
                  : "Verify"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}