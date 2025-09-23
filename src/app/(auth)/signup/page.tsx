"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { routes } from "@/app/config/routes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const requestSchema = z
  .object({
    name: z.string().min(2, { message: "validation.name_min" }),
    email: z.string().email({ message: "validation.email_invalid" }),
    password: z.string().min(6, { message: "validation.password_min" }),
    confirmPassword: z.string().min(6, { message: "validation.confirm_min" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.password_mismatch",
    path: ["confirmPassword"],
  });

const verifySchema = z.object({
  code: z.string().regex(/^\d{6}$/, { message: "validation.otp_invalid" }),
});

export default function SignUp() {
  const t = useTranslations("auth");
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? routes.home.path;

  // Build schemas after we have the translation function

  const [step, setStep] = useState<"request" | "verify">("request");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // On mount, restore step/email from URL and password from sessionStorage
  useEffect(() => {
    const stepParam = params.get("step");
    const emailParam = params.get("email");
    if (stepParam === "verify") setStep("verify");
    if (emailParam) setEmail(emailParam);

    const savedPwd =
      typeof window !== "undefined"
        ? sessionStorage.getItem("signup:password")
        : null;
    if (savedPwd && !password) setPassword(savedPwd);
  }, [params, password]);

  const requestForm = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const verifyForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  const onRequest = useCallback(
    async (values: z.infer<typeof requestSchema>) => {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Đăng ký thất bại");
        }
        setEmail(values.email);
        setName(values.name);
        setPassword(values.password);
        // persist password for refresh-safe flow
        if (typeof window !== "undefined") {
          sessionStorage.setItem("signup:password", values.password);
        }
        setStep("verify");
        // reflect verify state & email in URL so refresh keeps context
        const url = new URL(window.location.href);
        url.searchParams.set("step", "verify");
        url.searchParams.set("email", values.email);
        window.history.replaceState({}, "", url.toString());
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Đã xảy ra lỗi";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const onVerify = useCallback(
    async (values: z.infer<typeof verifySchema>) => {
      setError(null);
      setLoading(true);
      try {
        // Verify OTP first
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: values.code }),
        });
        const data = await res.json();
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Mã không hợp lệ hoặc đã hết hạn");
        }

        // Then sign in with email & password
        const pwd =
          password ||
          (typeof window !== "undefined"
            ? sessionStorage.getItem("signup:password") || ""
            : "");
        const result = await signIn("password", {
          redirect: false,
          email,
          password: pwd,
          callbackUrl,
        });

        if (!result?.ok) {
          throw new Error(result?.error || "Đăng nhập thất bại");
        }

        // clear temp password
        if (typeof window !== "undefined")
          sessionStorage.removeItem("signup:password");
        window.location.href = result.url || callbackUrl;
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Xác thực thất bại";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [callbackUrl, email, password]
  );

  async function oauthSignIn(provider: "google" | "github") {
    await signIn(provider, { callbackUrl });
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("signup.title")}
        </h1>
        <p className="text-muted-foreground mt-2">{t("signup.subtitle")}</p>
      </div>

      <div className="space-y-6">
        {step === "request" ? (
          <Form {...requestForm}>
            <form
              onSubmit={requestForm.handleSubmit(onRequest)}
              className="space-y-4"
            >
              <FormField
                control={requestForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("full_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyễn Văn A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={requestForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={requestForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={requestForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("confirm_password")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? t("actions.registering")
                  : t("actions.register_and_send_code")}
              </Button>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </form>
          </Form>
        ) : (
          <Form {...verifyForm}>
            <form
              onSubmit={verifyForm.handleSubmit(onVerify)}
              className="space-y-4"
            >
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("otp.sent_to", { email })}
                </p>
              </div>
              <FormField
                control={verifyForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("otp.label")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-between w-full gap-3">
                        <InputOTP
                          maxLength={6}
                          autoFocus
                          inputMode="numeric"
                          value={field.value}
                          onChange={(v) => {
                            field.onChange(v);
                          }}
                          onComplete={(val) => {
                            if (val.length === 6) {
                              verifyForm.handleSubmit(onVerify)();
                            }
                          }}
                          aria-label="Mã xác thực 6 chữ số"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep("request")}
                        >
                          {t("actions.edit_email")}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!email ? (
                <FormField
                  control={verifyForm.control}
                  name="code"
                  render={() => (
                    <div className="space-y-2">
                      <FormLabel>{t("email")}</FormLabel>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  )}
                />
              ) : null}
              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? t("actions.verifying")
                    : t("actions.verify_and_signin")}
                </Button>
              </div>
              {error ? (
                <p className="text-sm text-red-600">{t(error)}</p>
              ) : null}
            </form>
          </Form>
        )}

        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-muted" />
          <span className="text-xs text-muted-foreground">{t("or")}</span>
          <div className="h-px flex-1 bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button variant="outline" onClick={() => oauthSignIn("google")}>
            {t("signup.google")}
          </Button>
          <Button variant="outline" onClick={() => oauthSignIn("github")}>
            {t("signup.github")}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {t("signup.have_account")}{" "}
          <Link
            href={routes.signin.path}
            className="text-foreground underline underline-offset-4"
          >
            {t("signin.link")}
          </Link>
        </p>
      </div>
    </div>
  );
}
