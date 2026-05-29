const testimonials = [
  {
    quote: "AlphaWrite made my content feel genuinely human. It's fast, simple to use, and helped reduce the AI score on detection tools — exactly what I needed.",
    boldPhrases: ["feel genuinely human"],
    author: "Sonia Jonah",
    role: "Content writer",
  },
  {
    quote: "I was skeptical until I tried it. The Humanizer doesn't just rewrite— it preserves my narrative style while enhancing readability. Essential to my editing process.",
    boldPhrases: ["narrative style", "Essential to my editing process"],
    author: "Marcus T.",
    role: "Editor",
  },
  {
    quote: "The multi-detector feature saved me from potential integrity issues. I can check against all major platforms at once. Totally worth it for peace of mind.",
    boldPhrases: ["potential integrity issues", "saved me from"],
    author: "Jordan P.",
    role: "Graduate student",
  },
  {
    quote: "AlphaWrite made my content feel genuinely human. It's fast, simple to use, and helped reduce the AI score on detection tools — exactly what I needed.",
    boldPhrases: ["feel genuinely human"],
    author: "Alex M.",
    role: "Content writer",
  },
  {
    quote: "I was skeptical until I tried it. The Humanizer doesn't just rewrite— it preserves my narrative style while enhancing readability. Essential to my editing process.",
    boldPhrases: ["narrative style", "Essential to my editing process"],
    author: "Dr. Sarah K.",
    role: "Researcher",
  },
  {
    quote: "The multi-detector feature saved me from potential integrity issues. I can check against all major platforms at once. Totally worth it for peace of mind.",
    boldPhrases: ["potential integrity issues", "saved me from"],
    author: "Sam L.",
    role: "Writer",
  },
];

function boldenQuote(quote: string, boldPhrases: string[]) {
  let result = quote;
  boldPhrases.forEach((phrase) => {
    result = result.replace(
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `<strong class="font-semibold text-slate-900">${phrase}</strong>`
    );
  });
  return result;
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.336 24 12 19.897 4.664 24 6 15.597 0 9.75l8.332-1.595z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div className="max-w-md">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8B5CF6]">
              Testimonials
            </span>
            <h2 className="mt-4 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-slate-900">
              What our users say.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3.5 sm:items-end">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-slate-700 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]">
              <span className="flex gap-0.5 text-amber-500">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </span>
              <span>
                <strong className="font-semibold text-slate-900">4.9 / 5</strong>{" "}
                <span className="text-slate-500">from 1,200+ writers</span>
              </span>
            </span>
            <p className="max-w-[32ch] text-sm leading-relaxed text-slate-600 sm:text-right">
              Discover why people love using AlphaWrite to enhance their learning and work.
            </p>
          </div>
        </div>

        {/* Testimonial grid — soft cards w/ serif quote mark */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={`${t.author}-${i}`}
              className="relative flex flex-col rounded-3xl bg-white p-7 shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_12px_32px_-16px_rgba(15,23,42,0.18),0_4px_8px_-4px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.18),0_1px_0_0_rgba(255,255,255,0.8)_inset,0_24px_48px_-20px_rgba(15,23,42,0.22),0_6px_12px_-4px_rgba(15,23,42,0.08)]"
            >
              <span
                aria-hidden
                className="absolute right-7 top-5 font-serif text-7xl leading-none text-violet-100"
              >
                &ldquo;
              </span>
              <blockquote
                className="relative flex-1 text-[15px] leading-relaxed text-slate-700 [&_strong]:font-semibold [&_strong]:text-slate-900"
                dangerouslySetInnerHTML={{
                  __html: boldenQuote(t.quote, t.boldPhrases) + "&rdquo;",
                }}
              />
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-sm shadow-violet-500/30">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-[14px] font-semibold tracking-tight text-slate-900">
                    {t.author}
                  </p>
                  <p className="text-[12px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
