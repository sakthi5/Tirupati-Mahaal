"use client";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Preloader from "../components/preloader";
import Hero from "./home/Hero";
import Gallery from "./home/Gallerysection"
import Aboutsection from "./home/Aboutsection";
import WhyWeBetter from "./home/WhyWeBetter";
import HowItWorks from "./home/HowItWorks";
import VideoHero from "./home/VideoHero";
import Calender from "./home/Availability";
// import FAndQ from "../components/home/fandq";
import CtaBot from "../components/ctabot";
import WhatsAppContact from "../components/layout/whatsapp";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Navbar />
      <Hero />
      <Gallery />   
      <Aboutsection />
      
      <HowItWorks />
      <VideoHero />
      <Calender />
      <WhyWeBetter />
      {/* <FAndQ /> */}
      <CtaBot />
      <WhatsAppContact />
      <Footer />
    </>
  );
}
