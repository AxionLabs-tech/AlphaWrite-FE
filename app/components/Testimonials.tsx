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
      `<strong class="font-semibold text-[#8B5CF6]">${phrase}</strong>`
    );
  });
  return result;
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50/80 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-[#8B5CF6]">
              Testimonials
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What our user says
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-slate-600 sm:text-right sm:text-sm">
            Discover why people love using AlphaWrite to enhance their learning and work.
          </p>
        </div>

        {/* Testimonial grid — stepped left borders (|  |    |) */}
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const col = i % 3;
            const stepClass = col === 0 ? "lg:ml-0" : col === 1 ? "lg:ml-8" : "lg:ml-16";
            return (
            <div
              key={`${t.author}-${i}`}
              className={`relative border-l-2 border-violet-200/80 pl-6 ${stepClass}`}
            >
              <span
                className="absolute -left-px top-0 text-4xl font-serif leading-none text-violet-200"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote
                className="relative pt-4 text-slate-700 italic leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#8B5CF6] [&_strong]:not-italic"
                dangerouslySetInnerHTML={{
                  __html: boldenQuote(t.quote, t.boldPhrases) + "&rdquo;",
                }}
              />
              <div className="mt-6 flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-100 to-violet-50 text-sm font-semibold text-[#8B5CF6] ring-2 ring-white">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{t.author}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
