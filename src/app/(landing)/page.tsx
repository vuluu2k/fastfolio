import TitleSection from "@/components/layout/landing/home/TitleSection";
import FeatureSection from "@/components/layout/landing/home/FeatureSection";
import PerfectSection from "@/components/layout/landing/home/PerfectSection";
import FeedbackSection from "@/components/layout/landing/home/FeedbackSection";
import PreviewSection from "@/components/layout/landing/home/PreviewSection";
import AboutSection from "@/components/layout/landing/home/AboutSection";

export default function Home() {
  return (
    <>
      <TitleSection />
      <PreviewSection />
      <FeatureSection />
      <PerfectSection />
      <FeedbackSection />
      <AboutSection />
    </>
  );
}
