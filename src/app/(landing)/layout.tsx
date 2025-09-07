import React from "react";
import Header from '@/components/layout/landing/Header'
import Footer from '@/components/layout/landing/Footer'

type Props = {
  children: React.ReactNode;
};

function LandingLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default LandingLayout;
