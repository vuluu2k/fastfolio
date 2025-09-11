import React from "react";
import Header from "@/components/layout/landing/Header";
import Footer from "@/components/layout/landing/Footer";

type Props = {
  children: React.ReactNode;
};

function LandingLayout({ children }: Props) {
  return (
    <main className="relative z-10 min-h-dvh">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default LandingLayout;
