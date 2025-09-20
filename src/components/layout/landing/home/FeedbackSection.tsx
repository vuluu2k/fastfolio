"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

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

  const peoples = [
    {
      key: 1,
      name: "Emma Thompson",
      username: "@emmaai",
      link: "https://twitter.com/emmaai",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      feedback: "My AI portfolio answers questions about my work 24/7.",
    },
    {
      key: 2,
      name: "David Park",
      username: "@davidtech",
      link: "https://twitter.com/davidtech",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      feedback:
        "FastFolio helped me create an interactive portfolio in minutes. LOVE ITTTT",
    },
    {
      key: 3,
      name: "Sofia Rodriguez",
      username: "@sofiaml",
      link: "https://twitter.com/sofiaml",
      avatar:
        "	https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      feedback:
        "Recruiters love being able to ask specific questions about my projects.",
    },
    {
      key: 4,
      name: "Michael Chen",
      username: "@mikedesign",
      link: "https://twitter.com/mikedesign",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      feedback: "So much more engaging than a static website.",
    },
    {
      key: 5,
      name: "Sarah Johnson",
      username: "@sarahdev",
      link: "https://twitter.com/sarahdev",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      feedback:
        "It feels like visitors are having a real conversation with me.",
    },
    {
      key: 6,
      name: "Alex Kumar",
      username: "@alexcode",
      link: "https://twitter.com/alexcode",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      feedback: "It's like having a personal assistant that never sleeps!",
    },
    {
      key: 7,
      name: "Emily Davis",
      username: "@emilydavis",
      link: "https://twitter.com/emilydavis",
      avatar:
        "	https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
      feedback: "BANGERRR",
    },
    {
      key: 8,
      name: "Julia Marie",
      username: "@juliamarie",
      link: "https://twitter.com/juliamarie",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      feedback: "I love how the AI adapts to different questions.",
    },
  ];

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

        <div className="flex flex-col gap-6 px-4 w-full sm:hidden">
          {peoples.map((people) => (
            <div className="w-full flex justify-center" key={people.key}>
              <Link
                href={people.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-lg bg-gradient-to-b from-muted/50 to-muted/10 p-4 text-start sm:p-6 hover:from-muted/60 hover:to-muted/20 sm:max-w-[320px] transition-colors duration-300 w-full max-w-full border"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
                    {/** biome-ignore lint/performance/noImgElement: <explanation> */}
                    <img
                      className="aspect-square h-full w-full"
                      alt={people.name}
                      src={people.avatar}
                    />
                  </span>
                  <div className="flex flex-col items-start">
                    <h3 className="text-md font-semibold leading-none">
                      {people.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {people.username}
                    </p>
                  </div>
                </div>
                <p className="sm:text-md mt-4 text-sm text-muted-foreground">
                  {people.feedback}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex relative w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:100s] max-w-full">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {peoples.concat(peoples).map((people) => (
                <Link
                  key={people.key}
                  href={people.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col rounded-lg border-t bg-gradient-to-b from-muted/50 to-muted/10 p-4 text-start sm:p-6 hover:from-muted/60 hover:to-muted/20 max-w-[320px] sm:max-w-[320px] transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
                      {/** biome-ignore lint/performance/noImgElement: <explanation> */}
                      <img
                        className="aspect-square h-full w-full"
                        alt={people.name}
                        src={people.avatar}
                      />
                    </span>
                    <div className="flex flex-col items-start">
                      <h3 className="text-md font-semibold leading-none">
                        {people.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {people.username}
                      </p>
                    </div>
                  </div>

                  <p className="sm:text-md mt-4 text-sm text-muted-foreground">
                    {people.feedback}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default FeedbackSection;
