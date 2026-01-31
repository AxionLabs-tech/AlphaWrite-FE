import { Sparkles, ShieldCheck, PenLine, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "sparkles": Sparkles,
  "shield-check": ShieldCheck,
  "pen-line": PenLine,
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const Icon = iconMap[icon] ?? Sparkles;
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="inline-flex rounded-xl bg-violet-100 p-3 text-[#8B5CF6]">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}
