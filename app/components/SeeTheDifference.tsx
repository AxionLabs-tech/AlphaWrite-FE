import { BookOpen, TrendingUp, Mail } from "lucide-react";

const examples = [
  {
    type: "Academic Writing",
    icon: BookOpen,
    before: "The findings of this study demonstrate that there is a significant correlation between the implementation of gamification elements and the enhancement of user engagement metrics within educational technology platforms.",
    issues: ["Overly formal", "Wordy", "Passive voice"],
    after: "This study shows that adding game-like elements to educational apps significantly boosts user engagement.",
    improvements: ["Direct & clear", "Active voice", "Natural flow"],
  },
  {
    type: "Marketing Copy",
    icon: TrendingUp,
    before: "Our innovative solution leverages cutting-edge technology to facilitate the optimization of workflow processes, thereby enabling organizations to achieve unprecedented levels of operational efficiency.",
    issues: ["Buzzword heavy", "Generic", "Lacks personality"],
    after: "Our tool helps teams work smarter by streamlining their processes, so they can get more done with less effort.",
    improvements: ["Conversational", "Specific benefits", "Reader-focused"],
  },
  {
    type: "Professional Email",
    icon: Mail,
    before: "I am writing to inquire about the possibility of scheduling a meeting at your earliest convenience to discuss the aforementioned project deliverables and associated timelines.",
    issues: ["Too stiff", "Unnecessarily formal", "Robotic"],
    after: "Could we schedule a meeting soon to discuss the project deliverables and timelines? I'd love to align on next steps.",
    improvements: ["Warm tone", "Natural phrasing", "Professional yet friendly"],
  },
];

const metrics = [
  { value: "94%", label: "More natural tone", bg: "bg-[#8B5CF6]", text: "text-white" },
  { value: "2-5s", label: "Average processing time", bg: "bg-violet-100", text: "text-[#8B5CF6]" },
  { value: "100%", label: "Meaning preserved", bg: "bg-emerald-100", text: "text-emerald-700" },
];

export default function SeeTheDifference() {
  return (
    <section id="see-the-difference" className="border-t border-slate-200 bg-slate-50/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See the difference
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Real examples of how AlphaWrite transforms robotic text into authentic, engaging writing.
          </p>
        </div>
        <div className="mt-12 space-y-10">
          {examples.map((ex) => (
            <div
              key={ex.type}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-4 flex items-center gap-2 text-[#8B5CF6]">
                <ex.icon className="h-5 w-5" aria-hidden />
                <span className="font-semibold">{ex.type}</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">BEFORE AI-Generated</p>
                  <p className="rounded-lg bg-rose-50 p-4 text-sm text-slate-700">{ex.before}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {ex.issues.map((issue) => (
                      <li key={issue} className="text-xs font-medium text-rose-600">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">AFTER Humanized</p>
                  <p className="rounded-lg bg-emerald-50 p-4 text-sm text-slate-700">{ex.after}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {ex.improvements.map((imp) => (
                      <li key={imp} className="text-xs font-medium text-emerald-600">
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className={`rounded-xl p-6 text-center ${m.bg} ${m.text}`}>
              <p className="text-2xl font-bold sm:text-3xl">{m.value}</p>
              <p className="mt-1 text-sm font-medium opacity-90">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
