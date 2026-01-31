import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-slate-600">
            Need a custom plan?{" "}
            <Link href="/pricing" className="font-medium text-[#8B5CF6] hover:underline">
              Contact our sales team
            </Link>
          </p>
          <nav className="flex gap-6 text-sm text-slate-600">
            <Link href="/pricing" className="hover:text-slate-900">
              Pricing
            </Link>
            <Link href="#features" className="hover:text-slate-900">
              Features
            </Link>
            <Link href="#trust" className="hover:text-slate-900">
              Trust
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} AlphaWrite. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
