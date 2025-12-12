import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustBadgesSection from "@/components/sections/TrustBadgesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhyItWorksSection from "@/components/sections/WhyItWorksSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has already seen loading screen this session
    const hasSeenLoading = sessionStorage.getItem("slimvita-loaded");
    if (hasSeenLoading) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("slimvita-loaded", "true");
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {showContent && (
        <div className="min-h-screen">
          <Header />
          <main>
            <HeroSection />
            <TrustBadgesSection />
            <HowItWorksSection />
            <WhyItWorksSection />
            <BenefitsSection />
            <TestimonialsSection />
            <CTASection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
