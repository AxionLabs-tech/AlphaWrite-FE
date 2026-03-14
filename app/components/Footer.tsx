import Link from "next/link";
import Image from "next/image";

const productLinks = [
  { href: "/#humanizer", label: "AI Humanizer" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How it works" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "https://discord.gg/alphawrite", label: "Discord", external: true },
  { href: "/#cta", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block transition hover:opacity-80">
              <Image
                src="/alphawrites.png"
                alt="AlphaWrite"
                width={120}
                height={90}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Write smarter. Sound human. AI humanization and detection tools for
              students and writers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 transition hover:text-[#8B5CF6]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map(({ href, label, external }) => (
                <li key={href}>
                  <Link
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm text-slate-600 transition hover:text-[#8B5CF6]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 transition hover:text-[#8B5CF6]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            &copy; {year} AlphaWrite. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Need a custom plan?{" "}
            <Link
              href="/#cta"
              className="font-medium text-[#8B5CF6] transition hover:text-violet-600"
            >
              Contact sales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
