import { Lock, Shield, RefreshCw } from "lucide-react";

const pillars = [
  {
    title: "Privacy First.",
    description: "Your content is processed securely and never stored. We respect your intellectual property.",
    icon: Lock,
  },
  {
    title: "Ethical by Design.",
    description: "Built with guardrails to encourage responsible use and proper attribution of sources.",
    icon: Shield,
  },
  {
    title: "Transparent Process.",
    description: "Clear about what we do and don't do. No hidden agendas, just better writing.",
    icon: RefreshCw,
  },
];

export default function Trust() {
  return (
    <section id="trust" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-brand px-6 py-16 sm:px-12 sm:py-20">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            Built on trust and responsibility
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/90">
            We believe in empowering authentic communication, not bypassing integrity.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="text-center">
                <div className="mx-auto inline-flex rounded-xl bg-white/20 p-4">
                  <Icon className="h-8 w-8 text-white" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-white/90">{p.description}</p>
              </div>
            );
          })}
          </div>
          <div className="mt-12 rounded-xl bg-white/10 px-6 py-4 backdrop-blur">
            <p className="text-center text-sm text-white/95">
              <strong>Responsible Use:</strong> AlphaWrite is designed to help you refine and improve your writing, not to misrepresent authorship or bypass academic integrity policies. Always follow your institution's or organization's guidelines on AI usage and proper citation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
