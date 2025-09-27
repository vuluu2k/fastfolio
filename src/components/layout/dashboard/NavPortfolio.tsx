"use client";

import { Check, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function NavPortfolio({
  portfolio,
}: {
  portfolio: {
    name: string;
    url: string;
    icon?: LucideIcon;
    check?: boolean;
  }[];
}) {
  const t = useTranslations("dashboard");

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("portfolio")}</SidebarGroupLabel>
      <SidebarMenu>
        {portfolio.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link
                href={item.url}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon size={16} />}
                  <span>{item.name}</span>
                </div>
                {item.check && <Check color="green" />}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
