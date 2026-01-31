import { Monitor, AlertCircle, Clock, Target } from "lucide-react";

const challenges = [
  {
    title: "AI text sounds robotic",
    description:
      "Generic phrases and unnatural patterns make your content feel artificial and disconnected.",
    icon: Monitor,
    iconGradient: "linear-gradient(135deg, #FF5B5B 0%, #FF8C00 100%)",
  },
  {
    title: "Fear of detection",
    description:
      "Worried about your content being flagged or rejected for sounding too mechanical.",
    icon: AlertCircle,
    iconGradient: "linear-gradient(135deg, #FFA726 0%, #FFD166 100%)",
  },
  {
    title: "Editing takes forever",
    description:
      "Manually rewriting AI content to sound natural consumes hours you don't have.",
    icon: Clock,
    iconGradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
  },
  {
    title: "Meaning gets lost",
    description:
      "Traditional paraphrasing tools distort your original message and key points.",
    icon: Target,
    iconGradient: "linear-gradient(135deg, #8BC34A 0%, #CDDC39 100%)",
  },
];

export default function Challenges() {
  return (
    <section id="challenges" className="bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The challenges of AI writing
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            AI tools are powerful, but the output often needs refinement to truly connect with readers.
          </p>
        </header>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div
                className="inline-flex size-12 items-center justify-center rounded-xl text-white"
                style={{ background: item.iconGradient }}
              >
                <item.icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
