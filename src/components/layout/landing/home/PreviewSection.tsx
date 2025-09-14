"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const topElementVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: "tween" as const, duration: 0.4 },
  },
};

const BUTTON_KEYS = [
  "overview",
  "projects",
  "skills",
  "background",
  "hobbies",
  "contact",
] as const;

function PreviewSection() {
  const t = useTranslations("home");
  const [activeIndex, setActiveIndex] = useState(0);

  const buttons = BUTTON_KEYS.map((key) => ({ key, name: t(key) }));

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % BUTTON_KEYS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={topElementVariants}
      className="px-4 pb-20 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6 overflow-hidden">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-2xl max-w-md sm:max-w-none">
            {buttons.map((button, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={button.key}
                  type="button"
                  className={cn(
                    "relative px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 border overflow-hidden isolate border-transparent hover:bg-secondary"
                  )}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full origin-left -z-10"
                    initial="inactive"
                    animate={isActive ? "active" : "inactive"}
                    variants={{
                      active: {
                        scaleX: 1,
                        transition: {
                          type: "tween",
                          ease: "linear",
                          duration: 2.5,
                        },
                      },
                      inactive: {
                        scaleX: 0,
                        transition: { duration: 0 },
                      },
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                  <motion.span
                    className="relative z-10"
                    initial="inactive"
                    animate={isActive ? "active" : "inactive"}
                    variants={{
                      active: {
                        color: "#ffffff",
                        transition: {
                          type: "tween",
                          ease: "linear",
                          duration: 2.5,
                        },
                      },
                      inactive: {
                        color: "#000000",
                        transition: { duration: 0 },
                      },
                    }}
                  >
                    {button.name}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div>
            <div className="relative aspect-[4/4] sm:aspect-[16/10] rounded-2xl border overflow-hidden hover:border-primary bg-card cursor-pointer group">
              <div className="absolute top-0 left-0 group-hover:opacity-100 opacity-0 flex items-center justify-center w-full h-full">
                <Button>{t("try_it_live")}</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default PreviewSection;
