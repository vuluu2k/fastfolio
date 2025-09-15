"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const topElementVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: "tween" as const, duration: 0.4 },
  },
};

const BUTTON_KEYS = [
  {
    key: "overview",
    image: "https://www.fastfol.io/landing/portfolio-preview.png",
  },
  {
    key: "projects",
    image: "https://www.fastfol.io/landing/portfolio-preview.png",
  },
  {
    key: "skills",
    image: "https://www.fastfol.io/landing/portfolio-preview.png",
  },
  {
    key: "background",
    image: "https://www.fastfol.io/landing/portfolio-preview.png",
  },
  {
    key: "hobbies",
    image: "https://www.fastfol.io/landing/portfolio-preview.png",
  },
  {
    key: "contact",
    image: "https://www.fastfol.io/landing/portfolio-preview.png",
  },
] as const;

function PreviewSection() {
  const t = useTranslations("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Drive the active button's fill progress and text color manually
  const progress = useMotionValue(0); // 0 -> 1 over 2500ms when active
  const activeColor = useTransform(progress, [0, 1], ["#000000", "#ffffff"]);
  const pausedRef = useRef(paused);
  const progressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const buttons = BUTTON_KEYS.map((button) => ({
    key: button.key,
    name: t(button.key),
    image: button.image,
  }));

  // Advance to next button when progress completes (guarded to fire once)
  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      if (v >= 1 && !completedRef.current) {
        completedRef.current = true;
        setActiveIndex((i) => (i + 1) % BUTTON_KEYS.length);
      }
    });
    return () => unsubscribe();
  }, [progress]);

  // Mount-only RAF loop that updates progress based on time and paused state
  useEffect(() => {
    const DURATION = 2500; // ms
    const tick = (time: number) => {
      const prev = prevTimeRef.current;
      prevTimeRef.current = time;
      if (prev != null && !pausedRef.current) {
        const delta = time - prev;
        const next = Math.min(1, progressRef.current + delta / DURATION);
        progressRef.current = next;
        progress.set(next);
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [progress]);

  // Keep pausedRef in sync without retriggering the RAF effect
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Reset progress when activeIndex changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: progress is a MotionValue with a stable reference; we intentionally reset only when activeIndex changes
  useEffect(() => {
    progressRef.current = 0;
    progress.set(0);
    prevTimeRef.current = null;
    completedRef.current = false;
  }, [activeIndex]);

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
                  {isActive ? (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full origin-left -z-10"
                      style={{ transformOrigin: "left", scaleX: progress }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        transformOrigin: "left",
                        transform: "scaleX(0)",
                      }}
                    />
                  )}
                  {isActive ? (
                    <motion.span
                      className="relative z-10"
                      style={{ color: activeColor }}
                    >
                      {button.name}
                    </motion.span>
                  ) : (
                    <span
                      className="relative z-10"
                      style={{ color: "#000000" }}
                    >
                      {button.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div>
            <button
              type="button"
              aria-label={t("try_it_live")}
              className="relative aspect-[4/4] sm:aspect-[16/10] w-full rounded-2xl border overflow-hidden hover:border-primary bg-card cursor-pointer group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <Image
                alt="Hobbies showcase"
                width={894}
                height={558}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02] absolute inset-0 w-full h-full"
                src={buttons[activeIndex].image}
              />
              <div className="absolute top-0 left-0 transition-all scale-75 group-hover:scale-100 group-hover:opacity-100 opacity-0 flex items-center justify-center w-full h-full">
                <Button asChild>
                  <span>{t("try_it_live")}</span>
                </Button>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default PreviewSection;
