import LandingNav from "./components/LandingNav";
import HeroSection from "./components/HeroSection";
import HumanizerDetectorSection from "./components/HumanizerDetectorSection";
import Challenges from "./components/Challenges";
import HowItWorks from "./components/HowItWorks";
import SeeTheDifference from "./components/SeeTheDifference";
import Features from "./components/Features";
import CTABlock from "./components/CTABlock";
import Testimonials from "./components/Testimonials";
import Trust from "./components/Trust";
import LandingPricing from "./components/LandingPricing";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import TrustedByUniversities from "./components/Trusted";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] text-slate-900">
      <LandingNav />
      <main>
        <HeroSection />
        <HumanizerDetectorSection />
        <TrustedByUniversities />
        <Challenges />
        <HowItWorks />
        <SeeTheDifference />
        <Features />
        {/* <CTABlock /> */}
        <Testimonials />
        <Trust />
        <LandingPricing />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
