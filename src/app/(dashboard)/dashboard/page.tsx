"use client";

import { Settings } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

function Dashboard() {
  const t = useTranslations("dashboard");

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground">
            {t("draft")}
          </div>
        </div>
      </div>

      <div className="group relative flex items-center gap-3 p-4 border rounded-xl overflow-hidden transition-all">
        <div className="relative flex items-center gap-3 w-full">
          <div className="flex items-center gap-2 flex-1 cursor-pointer hover:bg-secondary rounded-lg p-2 -m-2">
            <span className="font-mono text-sm font-medium text-primary">
              https://www.fastfol.io/vuluu
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/dashboard"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8"
            >
              <Settings />
            </Link>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 text-xs cursor-pointer">
              {t("visit")}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-none">
          <div className="p-6">
            <div className="text-2xl font-bold">
              3
              <span className="text-sm font-normal text-muted-foreground">
                /50
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Total messages used
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-none">
          <div className="p-6">
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground mt-1">Messages today</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow relative overflow-hidden">
        <div className="p-0">
          <div className="relative">
            <div className="relative h-[400px] w-full overflow-hidden">
              {/** biome-ignore lint/performance/noImgElement: <explanation> */}
              <img
                src="https://www.fastfol.io/landing/portfolio-preview.png"
                alt="Portfolio preview"
                className="object-cover blur-sm opacity-30 absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
