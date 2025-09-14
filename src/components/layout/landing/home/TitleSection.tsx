"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const topElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.4 },
  },
};

const MessageUsed = ({ count }: { count: number }) => {
  const t = useTranslations("home");

  return (
    <div className="flex items-center justify-center">
      <div className="mb-4 inline-block">
        <div className="bg-background inline-flex items-center rounded-full p-1">
          <div className="bg-background inline-flex items-center rounded-full p-1">
            <div className="flex -space-x-1.5">
              {[0, 1, 2].map((item) => (
                <Avatar
                  className="ring-background rounded-full ring-1"
                  key={item}
                  style={{ width: "20px", height: "20px" }}
                >
                  <AvatarImage src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=faces" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <div className="text-muted-foreground px-2 text-xs">
            <strong className="text-foreground font-medium">{count}+</strong>{" "}
            {t("messages_exchanged")}
          </div>
        </div>
      </div>
    </div>
  );
};

function TitleSection() {
  const t = useTranslations("home");

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={topElementVariants}
      className="relative px-4 py-20 md:pt-28 md:pb-20"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div>
          <MessageUsed count={10} />
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {t("get_your_ai_portfolio")}
          </h1>
          <h3 className="text-muted-foreground font-light mb-8">
            {t("create_conversational_portfolio")}
            <br />
            {t("questions_about_you_24_7")}
          </h3>
        </div>
      </div>
    </motion.section>
  );
}

export default TitleSection;
