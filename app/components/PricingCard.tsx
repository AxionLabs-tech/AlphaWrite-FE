import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  cta: string;
  ctaHref: string;
  features: string[];
  popular?: boolean;
}

export default function PricingCard({
  name,
  description,
  price,
  cta,
  ctaHref,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`relative flex flex-col ${
        popular ? "border-[#8B5CF6] ring-2 ring-[#8B5CF6]/20" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#8B5CF6] px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </div>
      )}
      <CardHeader>
        <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
        <p className="text-sm text-slate-600">{description}</p>
        <p className="text-2xl font-bold text-slate-900">{price}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0">
        <Link
          href={ctaHref}
          className={`inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
            popular
              ? "bg-[#8B5CF6] text-white shadow-lg shadow-violet-500/25 hover:bg-violet-600"
              : "border-2 border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-slate-50"
          }`}
        >
          {cta}
        </Link>
        <ul className="mt-6 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
