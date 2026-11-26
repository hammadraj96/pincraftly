import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemShowcase from "@/components/ProblemShowcase";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TemplatesShowcase from "@/components/TemplatesShowcase";
import WhoItsFor from "@/components/WhoItsFor";
import WaysToEarn from "@/components/WaysToEarn";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import MythVsFact from "@/components/MythVsFact";
import Learn from "@/components/Learn";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <TopBanner />
      <Header />
      <Hero />
      <ProblemShowcase />
      <HowItWorks />
      <Features />
      <TemplatesShowcase />
      <WhoItsFor />
      <WaysToEarn />
      <Pricing />
      <Reviews />
      <MythVsFact />
      <Learn />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
