import HeroSection from "./HeroSection";
import MissionSection from "./MissionSection";
import ScriptureSection from "./ScriptureSection";
import TimelineSection from "./TimelineSection";
import AISection from "./AISection";
import QuoteSection from "./QuoteSection";
import CTASection from "./CTASection";

export default function About() {
  return (
    <main className="bg-[#050816] text-white overflow-x-hidden">
      <HeroSection />
      <MissionSection />
      <ScriptureSection />
      <TimelineSection />
      <AISection />
      <QuoteSection />
      <CTASection />
    </main>
  );
}