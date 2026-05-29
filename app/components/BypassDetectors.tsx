import Image from "next/image";
import { Check } from "lucide-react";

const detectors: {
  name: string;
  icon: string;
  tone: "blue" | "slate" | "green" | "bluish";
}[] = [
  { name: "turnitin",   icon: "/logos/turnitin.png",   tone: "blue" },
  { name: "Copyleaks",  icon: "/logos/copyleaks.png",  tone: "slate" },
  { name: "ZeroGPT",    icon: "/logos/zerogpt.png",    tone: "slate" },
  { name: "QuillBot",   icon: "/logos/quillbot.png",   tone: "green" },
  { name: "grammarly",  icon: "/logos/grammarly.png",  tone: "slate" },
  { name: "GPTZero",    icon: "/logos/gptzero.png",    tone: "bluish" },
];

const toneClass: Record<(typeof detectors)[number]["tone"], string> = {
  blue:   "text-[#2196F3]",
  slate:  "text-slate-800",
  green:  "text-[#2e9c5a]",
  bluish: "text-[#3b82f6]",
};

export default function BypassDetectors() {
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          <Check className="size-3.5 text-emerald-500" strokeWidth={3} aria-hidden />
          Tested against the 6 detectors that matter
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {detectors.map((d) => (
            <span
              key={d.name}
              className={`inline-flex items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] shadow-[0_0_0_1px_rgba(15,23,42,0.05),0_1px_2px_rgba(15,23,42,0.04)] ${toneClass[d.tone]}`}
            >
              <Image
                src={d.icon}
                alt=""
                width={22}
                height={22}
                className="size-[22px] object-contain"
              />
              {d.name}
              <Check
                className="size-3.5 text-emerald-500"
                strokeWidth={3}
                aria-hidden
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
