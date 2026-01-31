import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function CTABlock() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-3xl px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20"
          style={{
            background: "linear-gradient(180deg, #5B21B6 0%, #4C1D95 50%, #3B0764 100%)",
          }}
        >
          <Sparkles className="mx-auto h-10 w-10 text-white/90" aria-hidden />
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Built for students who value authenticity
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Whether you're refining research papers, polishing essays, or improving originality, AlphaWrite helps you communicate with clarity and confidence.
          </p>
          <div className="mt-10">
            <Link
              href="/#humanizer"
              className="inline-flex rounded-2xl bg-white px-6 py-3 text-base font-semibold text-[#8B5CF6] transition hover:bg-white/95"
            >
              Try AlphaWrite
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
