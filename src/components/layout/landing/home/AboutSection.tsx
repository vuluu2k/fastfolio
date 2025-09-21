"use client";
import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const topElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.4 },
  },
};

function AboutSection() {
  const t = useTranslations("home");
  const abouts = [
    {
      key: "question_1",
      question: t("question_1"),
      answer: t("answer_1"),
    },
    {
      key: "question_2",
      question: t("question_2"),
      answer: t("answer_2"),
    },
    {
      key: "question_3",
      question: t("question_3"),
      answer: t("answer_3"),
    },
    {
      key: "question_4",
      question: t("question_4"),
      answer: t("answer_4"),
    },
    {
      key: "question_5",
      question: t("question_5"),
      answer: t("answer_5"),
    },
    {
      key: "question_6",
      question: t("question_6"),
      answer: t("answer_6"),
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={topElementVariants}
      className="py-24 px-4"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-12">
          {t("frequently_asked_questions")}
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {abouts.map((about) => (
            <AccordionItem value={about.key}>
              <AccordionTrigger>{about.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {about.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}

export default AboutSection;
