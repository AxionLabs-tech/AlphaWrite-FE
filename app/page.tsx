import LandingNav from "./components/LandingNav";
import HeroSection from "./components/HeroSection";
import AccountSummaryCard from "./components/AccountSummaryCard";
import HumanizerDetectorSection from "./components/HumanizerDetectorSection";
import Challenges from "./components/Challenges";
// import SeeTheDifference from "./components/SeeTheDifference";

import BeforeAfter from "./components/BeforeAfter";
import Testimonials from "./components/Testimonials";
import LandingPricing from "./components/LandingPricing";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import TrustedByUniversities from "./components/Trusted";
import BypassDetectors from "./components/BypassDetectors";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] text-slate-900">
      <LandingNav />
      <main>
        <HeroSection />
        <AccountSummaryCard />
        <HumanizerDetectorSection />
        <BypassDetectors />
        <TrustedByUniversities />
        <Challenges />
        <BeforeAfter />

        <Testimonials />
        <LandingPricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
