import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

type Props = {};

function Header({}: Props) {
  const t = useTranslations("header");

  const menusPath = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("examples"),
      href: "/examples",
    },
    {
      name: t("pricing"),
      href: "/pricing",
    },
  ];

  return (
    <header>
      <div className="container mx-auto w-full bg-transparent">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="text-md font-semibold">FastFolio</span>
            </Link>
          </div>

          <div className="flex lg:hidden"></div>

          <div className="hidden lg:flex lg:gap-x-8">
            <MenuPaths menusPath={menusPath} />
          </div>

          <div className="flex items-center gap-2">
            <Button>{t("sign_in")}</Button>
            <Button variant="outline">{t("sign_up")}</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MenuPaths({
  menusPath,
}: {
  menusPath: { name: string; href: string }[];
}) {
  return (
    <div className="flex items-center gap-8">
      {menusPath.map((menu) => (
        <a key={menu.name} href={menu.href}>
          {menu.name}
        </a>
      ))}
    </div>
  );
}

export default Header;
