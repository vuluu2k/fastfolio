"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { routes } from "@/app/config/routes";

function Header() {
  const t = useTranslations("header");
  const router = useRouter();

  const menusPath = [
    {
      name: t("home"),
      href: routes.home.path,
    },
    {
      name: t("examples"),
      href: routes.examples.path,
    },
    {
      name: t("pricing"),
      href: routes.pricing.path,
    },
  ];

  const onSignIn = () => {
    router.push(routes.signin.path);
  };

  const onSignUp = () => {
    router.push(routes.signup.path);
  };

  return (
    <header>
      <div className="container mx-auto w-full bg-transparent">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Image
                src="https://www.fastfol.io/logo/fastfolio-light.svg"
                alt="logo"
                width={20}
                height={20}
              />
              <span className="text-md font-semibold">FastFolio</span>
            </Link>
          </div>

          <div className="flex lg:hidden"></div>

          <div className="hidden lg:flex lg:gap-x-8">
            <MenuPaths menusPath={menusPath} />
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => onSignIn()}>
                {t("sign_in")}
              </Button>
              <Button size="sm" variant="outline" onClick={() => onSignUp()}>
                {t("sign_up")}
              </Button>
            </div>
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
  const linkActive = usePathname();

  return (
    <>
      {menusPath.map((menu) => (
        <Link
          className={cn(
            "text-sm font-light leading-6 transition-colors border-foreground text-black",
            {
              "border-b-2": linkActive === menu.href,
            }
          )}
          key={menu.name}
          href={menu.href}
        >
          {menu.name}
        </Link>
      ))}
    </>
  );
}

export default Header;
