"use client";
import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import TextAnimation from "@/components/common/TextAnimation";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";

const topElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.4 },
  },
};

function PerfectSection() {
  const t = useTranslations("home");

  const perfectsList = [
    {
      value: "develop",
      label: t("developers"),
    },
    {
      value: "content_creator",
      label: t("content_creators"),
    },
    {
      value: "freelancer",
      label: t("freelancers"),
    },
    {
      value: "student",
      label: t("students"),
    },
    {
      value: "designer",
      label: t("designers"),
    },
    {
      value: "digital_pros",
      label: t("digital_pros"),
    },
  ];

  const classIcon =
    "h-6 w-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer";

  const socials = [
    {
      key: "instagram",
      icon: <Instagram className={classIcon} />,
    },
    {
      key: "linkedin",
      icon: <Linkedin className={classIcon} />,
    },
    {
      key: "github",
      icon: <Github className={classIcon} />,
    },
    {
      key: "youtube",
      icon: <Youtube className={classIcon} />,
    },
    {
      key: "facebook",
      icon: <Facebook className={classIcon} />,
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={topElementVariants}
      className="px-4 py-20 overflow-x-hidden"
    >
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="text-left mb-10 mx-auto">
          <div className="text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground">
            {t("perfect_for")}&nbsp;
            <TextAnimation options={perfectsList} />
          </div>
        </div>
        <div className="grid grid-cols-2 text-left max-w-4xl gap-3 mx-auto">
          {perfectsList
            .concat([{ value: "etc", label: t("etc") }])
            .map((item) => (
              <div
                key={item.value}
                className="group relative rounded-2xl p-3 pl-0 transition-all"
                style={{ opacity: 1, transform: "none" }}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {item.label}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-24">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
              <span className="font-extralight">{t("share")}</span>{" "}
              {t("anywhere")}
            </h2>
            <div className="flex gap-6 flex-wrap items-center justify-start">
              {socials.map((social) => (
                <div
                  key={social.key}
                  className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default PerfectSection;
