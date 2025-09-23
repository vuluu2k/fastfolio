"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations("auth_layout");

  return (
    <div className="relative min-h-dvh lg:h-dvh grid lg:grid-cols-2 overflow-hidden">
      {/* Top-left logo back to home */}
      <div className="absolute left-4 top-4 z-20">
        <Link
          href="/"
          aria-label="FastFolio Home"
          className="flex items-center gap-2 px-1 py-1 text-black transition-opacity hover:opacity-80"
        >
          <Image
            src="https://www.fastfol.io/logo/fastfolio-light.svg"
            alt="FastFolio"
            width={20}
            height={20}
          />
          <span className="hidden sm:inline text-sm font-semibold">FastFolio</span>
        </Link>
      </div>
      {/* Left: Animated container for page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center justify-center px-6 py-12 lg:px-12 h-full overflow-auto"
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </motion.div>

      {/* Right: AI Background Showcase (theme-neutral by default; pages can be colorful) */}
      <div className="relative hidden lg:block overflow-hidden">
        {/* Gradient background: grayscale by default */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-neutral-800 to-gray-700 opacity-95" />
        {/* Noise overlay */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        {/* Glass portfolio preview card */}
        <div className="relative h-full w-full flex items-center justify-center p-10">
          <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">{t("header_title")}</div>
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 rounded-lg bg-white/10 p-4">
                <p className="text-sm/5 opacity-90">{t("featured_title")}</p>
                <h3 className="mt-1 text-base font-medium">{t("project_title")}</h3>
                <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                  <li className="rounded-full bg-white/15 px-2 py-1">Next.js 15</li>
                  <li className="rounded-full bg-white/15 px-2 py-1">Tailwind 4</li>
                  <li className="rounded-full bg-white/15 px-2 py-1">NextAuth</li>
                </ul>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="text-sm/5 opacity-90">{t("highlights_title")}</p>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• {t("highlight_1")}</li>
                  <li>• {t("highlight_2")}</li>
                  <li>• {t("highlight_3")}</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-white/20 bg-white/5 p-4 text-sm/6">
              <p className="opacity-90">{t("quote_text")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
