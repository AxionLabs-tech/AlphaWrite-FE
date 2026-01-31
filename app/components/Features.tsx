import { Heart, RefreshCw, Globe, Shield, Lock, Zap } from "lucide-react";

const features = [
  {
    title: "Meaning-preserving rewrites",
    description: "Our AI understands context and intent, ensuring your core message stays intact while improving readability.",
    icon: Heart,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    title: "Natural tone variation",
    description: "Choose from multiple humanized versions with different tones and styles to match your needs.",
    icon: RefreshCw,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Multi-language support",
    description: "Humanize content in over 30 languages with native-level fluency and cultural awareness.",
    icon: Globe,
    iconBg: "bg-purple-100",
    iconColor: "text-[#8B5CF6]",
  },
  {
    title: "Responsible AI usage",
    description: "Built with ethical guardrails to encourage authentic writing and proper attribution.",
    icon: Shield,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Privacy-first processing",
    description: "Your text is processed securely and never stored. We prioritize your data privacy and confidentiality.",
    icon: Lock,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Context-aware intelligence",
    description: "Advanced AI that adapts to academic, professional, creative, and casual writing contexts.",
    icon: Zap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Powerful feature, simple experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Everything you need to transform AI text into authentic, professional writing.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className={`inline-flex rounded-xl p-3 ${item.iconBg} ${item.iconColor}`}>
                <item.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
