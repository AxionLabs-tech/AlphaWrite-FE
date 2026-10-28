import LandingNav from "./components/LandingNav";
import HeroSection from "./components/HeroSection";
import PillarsSection from "./components/PillarsSection";
import StudyFlow from "./components/StudyFlow";
import BeforeAfter from "./components/BeforeAfter";
import BypassDetectors from "./components/BypassDetectors";
import TrustedByUniversities from "./components/Trusted";
import Testimonials from "./components/Testimonials";
import LandingPricing from "./components/LandingPricing";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] text-slate-900">
      <LandingNav />
      <main>
        <HeroSection />
        <PillarsSection />
        <StudyFlow />
        {/* Academic Writing deep-dive: our shipped strength */}
        <BeforeAfter />
        <BypassDetectors />
        <TrustedByUniversities />
        <Testimonials />
        <LandingPricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
