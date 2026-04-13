"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import WhyCoHost from "@/components/WhyCoHost";
import HowItWorks from "@/components/HowItWorks";
import Markets from "@/components/Markets";
import Testimonials from "@/components/Testimonials";
import Marquee from "@/components/Marquee";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const OwnerPortal = dynamic(() => import("@/components/OwnerPortal"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyCoHost />
      <HowItWorks />
      <OwnerPortal />
      <Markets />
      <Testimonials />
      <Marquee />
      <ContactCTA />
      <Footer />
    </>
  );
}
