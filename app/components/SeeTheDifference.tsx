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
  { value: "2-5s", label: "Average processing time", bg: "bg-violet-50", text: "text-[#8B5CF6]" },
  { value: "100%", label: "Meaning preserved", bg: "bg-emerald-50", text: "text-emerald-700" },
];

export default function SeeTheDifference() {
  return (
    <section id="see-the-difference" className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8B5CF6]">
            Before & After
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See the difference
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Real examples of how AlphaWrite transforms robotic text into authentic, engaging writing.
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {examples.map((ex) => (
            <div
              key={ex.type}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/80 transition hover:shadow-lg hover:shadow-slate-200/50"
            >
              <div className="flex items-center gap-2.5 border-b border-slate-100 px-6 py-4">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#8B5CF6]/10">
                  <ex.icon className="size-4 text-[#8B5CF6]" aria-hidden />
                </div>
                <span className="text-sm font-semibold text-slate-900">{ex.type}</span>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className="border-b border-slate-100 p-6 sm:border-b-0 sm:border-r">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-rose-500">Before</p>
                  <p className="rounded-xl bg-rose-50/60 p-4 text-sm leading-relaxed text-slate-700">{ex.before}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ex.issues.map((issue) => (
                      <span key={issue} className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600 ring-1 ring-rose-200/60">
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">After</p>
                  <p className="rounded-xl bg-emerald-50/60 p-4 text-sm leading-relaxed text-slate-700">{ex.after}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ex.improvements.map((imp) => (
                      <span key={imp} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 ring-1 ring-emerald-200/60">
                        {imp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className={`rounded-2xl p-6 text-center ${m.bg} ${m.text}`}>
              <p className="text-3xl font-bold">{m.value}</p>
              <p className="mt-1 text-sm font-medium opacity-80">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
