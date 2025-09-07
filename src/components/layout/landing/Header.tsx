import { useTranslations } from "next-intl";
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
      <div className="container mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">FastFolio</div>

          <div>
            <MenuPaths menusPath={menusPath} />
          </div>

          <div></div>
        </div>
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
