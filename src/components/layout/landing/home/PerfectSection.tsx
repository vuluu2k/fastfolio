"use client";
import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type Props = {};

const topElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.4 },
  },
};

function PerfectSection({}: Props) {
  const t = useTranslations("home");

  const perfectsList = [
    {
      value: "develop",
      label: t("developers"),
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={topElementVariants}
      className="px-4 py-20 overflow-x-hidden"
    >
      <div className="max-w-4xl mx-auto overflow-hidden"></div>
    </motion.section>
  );
}

export default PerfectSection;
