"use client";

import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Moon } from "lucide-react";

type Props = {};

const topElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.4 },
  },
};

function FeatureSection({}: Props) {
  const t = useTranslations("home");

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={topElementVariants}
      className="px-4 py-20"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {t("features")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("everything_you_need_to_succeed")}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="list-none md:col-span-2 min-h-[14rem]">
            <div className="pointer-events-none absolute -inset-px hidden rounded-[inherit] border transition-opacity opacity-100"></div>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity opacity-100">
              <div className='glow rounded-[inherit] after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]'></div>
            </div>
            <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] border-solid border-[#e5e7eb]">
              <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
                <div className="w-fit rounded-lg border border-solid border-gray-600 p-2">
                  <Moon />
                </div>
                <div className="space-y-3">
                  <h3 className="-tracking-4 pt-0.5 font-sans font-semibold text-balance text-black dark:text-white text-xl/[1.375rem] md:text-2xl/[1.875rem]">
                    Available 24/7
                  </h3>
                  <div className="font-sans text-black dark:text-neutral-400 [&amp;_b]:md:font-semibold [&amp;_strong]:md:font-semibold text-sm/[1.125rem] md:text-base/[1.375rem]">
                    Your AI twin never sleeps.
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </motion.section>
  );
}

export default FeatureSection;
