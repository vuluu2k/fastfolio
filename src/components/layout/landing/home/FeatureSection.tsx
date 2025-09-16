"use client";

import { Moon, ChartNoAxesColumnIncreasing } from "lucide-react";
import { useRef, useState } from "react";
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

interface ArticleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ArticleCard = (props: ArticleCardProps) => {
  const { title, description, icon } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update CSS variables for gradient position
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Define a type for our custom CSS properties
  type CustomCSSProperties = React.CSSProperties & {
    "--gradient-size"?: string;
    "--gradient-blur"?: string;
    "--gradient-opacity"?: string;
    "--gradient-bg"?: string;
  };

  const gradientStyle: CustomCSSProperties = {
    "--gradient-size": "150px",
    "--gradient-blur": "12px",
  };

  return (
    <article
      ref={cardRef}
      className="group relative h-full rounded-2xl border overflow-hidden p-2 md:rounded-3xl md:p-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      style={gradientStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 overflow-visible"
        style={
          {
            "--gradient-opacity": isHovered ? "1" : "0",
            "--gradient-bg": `radial-gradient(
        circle var(--gradient-size, 150px) at var(--mouse-x, 0) var(--mouse-y, 0),
        rgba(99, 102, 241, 0.9) 0%,
        rgba(139, 92, 246, 0.7) 30%,
        rgba(236, 72, 153, 0.5) 60%,
        rgba(244, 63, 94, 0.2) 90%,
        transparent 100%
      )`,
            opacity: "var(--gradient-opacity, 0)",
            background: "var(--gradient-bg, transparent)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor" as const,
            maskComposite: "exclude" as const,
            padding: "1.5px",
            filter: "blur(var(--gradient-blur, 12px))",
            transition: "opacity 0.3s ease, background 0.1s ease-out",
          } as CustomCSSProperties
        }
      ></div>
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] border-solid border-[#e5e7eb] bg-white dark:bg-gray-900">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div className="w-fit rounded-lg border border-solid border-gray-600 p-2">
            {icon}
          </div>
          <div className="space-y-3">
            <h3 className="-tracking-4 pt-0.5 font-sans font-semibold text-balance text-black dark:text-white text-lg/[1.375rem] md:text-xl/[1.875rem]">
              {title}
            </h3>
            <div className="font-sans text-black dark:text-neutral-400 [&amp;_b]:md:font-semibold [&amp;_strong]:md:font-semibold text-sm/[1.125rem] md:text-base/[1.375rem]">
              {description}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

function FeatureSection() {
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
            <ArticleCard
              title={t("available_24_7")}
              description={t("available_24_7_description")}
              icon={<Moon />}
            />
          </li>
          <li className="list-none md:col-span-1 min-h-[10rem]">
            <ArticleCard
              title={t("improve_your_engagement")}
              description={t("improve_your_engagement_description")}
              icon={<ChartNoAxesColumnIncreasing />}
            />
          </li>
        </ul>
      </div>
    </motion.section>
  );
}

export default FeatureSection;
