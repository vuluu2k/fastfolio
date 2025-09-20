"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const topElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.4 },
  },
};

function FeedbackSection() {
  const t = useTranslations("home");

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={topElementVariants}
      className="bg-background text-foreground py-12 sm:py-24 md:py-32 overflow-x-hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 ">
          <h2 className="max-w-5xl text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {t("loved_by_professionals")}
          </h2>
          <p className="text-md max-w-[800px] font-light text-muted-foreground sm:text-xl">
            {t("loved_by_professionals_description")} <br />
            {t("loved_by_professionals_description_2")}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default FeedbackSection;
