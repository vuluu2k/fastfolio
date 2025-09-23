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

const schema = z.object({
  name: z.string().min(2, { message: "Tên tối thiểu 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự" }),
});

export default function SignUp() {
  const t = useTranslations("auth");
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? routes.home.path;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit() {
    // TODO: Implement custom sign-up (database) if needed
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {t("signup.submit")}
            </Button>
          </form>
        </Form>

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
