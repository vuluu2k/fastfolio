"use client";

import * as React from "react";
import {
  Frame,
  House,
  MapPin,
  PieChart,
  ChartColumnIncreasing,
  Rocket,
} from "lucide-react";

import { NavMain } from "@/components/layout/dashboard/NavMain";
import { NavPortfolio } from "@/components/layout/dashboard/NavPortfolio";
import { NavUser } from "@/components/layout/dashboard/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import SidebarLogo from "@/components/layout/dashboard/SidebarLogo";
import { useTranslations } from "next-intl";
import { routes } from "@/app/config/routes";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navMain = [
    {
      title: t("dashboard"),
      url: routes.dashboard.path,
      icon: House,
      isActive: pathname === routes.dashboard.path,
    },
    {
      title: t("analytics"),
      url: routes.analytics.path,
      icon: ChartColumnIncreasing,
      isActive: pathname === routes.analytics.path,
    },
    {
      title: t("publish"),
      url: routes.publish.path,
      icon: Rocket,
      isActive: pathname === routes.publish.path,
    },
  ];

  const portfolio = [
    {
      name: t("basic_info"),
      url: routes.basic_info.path,
      check: true,
    },
    {
      name: "AI",
      url: routes.ai.path,
    },
    {
      name: t("tools"),
      url: routes.tools.path,
    },
    {
      name: t("questions"),
      url: routes.questions.path,
    },
  ];

  const user = {
    name: session?.user?.name,
    email: session?.user?.email,
    avatar: session?.user?.image,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavPortfolio portfolio={portfolio} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
