import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import AssessmentSection from "@/components/layout/AssessmentSection";
import WhyChoose from "@/components/layout/WhyChoose";
import Process from "@/components/layout/Process";
import FAQ from "@/components/layout/FaqChatbot";
import CTA from "@/components/layout/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AssessmentSection />

      <FAQ />
      <Footer />
    </>
  );
}