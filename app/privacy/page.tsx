import Link from "next/link";
import LandingNav from "@/app/components/LandingNav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Privacy Policy – AlphaWrite",
  description: "AlphaWrite Privacy Policy. How we collect, use, and protect your information when you use our AI humanization and detection tools.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] text-slate-900">
      <LandingNav />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link href="/" className="text-sm font-medium text-[#8B5CF6] hover:text-violet-700">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-slate-600">Last updated: February 2025</p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
          <h2>1. Introduction</h2>
          <p>
            AlphaWrite (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our website and
            services, including our AI humanization and detection tools.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect:</p>
          <ul>
            <li><strong>Account information:</strong> email address, name, and profile picture (e.g., from Google sign-in) when you create an account.</li>
            <li><strong>Content you submit:</strong> text you paste or upload for humanization or detection. We process this to provide the Service and do not use it for training general-purpose AI models without your consent.</li>
            <li><strong>Usage data:</strong> how you use the Service (e.g., feature usage, credits consumed) to operate, improve, and secure the Service.</li>
            <li><strong>Technical data:</strong> device and browser information, IP address, and similar data for security and analytics.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve the Service;</li>
            <li>Authenticate you and manage your account and subscription;</li>
            <li>Process your text for humanization or detection as requested;</li>
            <li>Send you service-related communications (e.g., magic link emails, important updates);</li>
            <li>Detect and prevent fraud, abuse, and security issues;</li>
            <li>Comply with legal obligations and enforce our terms.</li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain your account data for as long as your account is active. Content you submit for processing
            may be retained only as long as necessary to provide the Service and for legitimate operational,
            security, or legal purposes. You may request deletion of your account and associated data subject
            to applicable law.
          </p>

          <h2>5. Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share information with service providers who
            assist us (e.g., hosting, email, analytics) under strict confidentiality and data-processing
            agreements. We may also disclose information if required by law, to protect our rights or safety,
            or in connection with a merger or sale of assets (with notice where required).
          </p>

          <h2>6. Security</h2>
          <p>
            We use industry-standard measures to protect your information, including encryption in transit and
            at rest, access controls, and secure authentication. No method of transmission or storage is 100%
            secure; we encourage you to use a strong password and keep your account credentials private.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, delete, or port your
            personal data, or to object to or restrict certain processing. You can update account details in
            your dashboard. To exercise other rights or ask questions, contact us using the details below.
          </p>

          <h2>8. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to keep you signed in, remember preferences, and understand
            how the Service is used. You can adjust your browser settings to limit or block cookies; some
            features may not work correctly if you disable them.
          </p>

          <h2>9. Children</h2>
          <p>
            The Service is not intended for users under 13 (or the applicable age in your jurisdiction). We do
            not knowingly collect personal information from children. If you believe we have collected such
            information, please contact us so we can delete it.
          </p>

          <h2>10. International Transfers</h2>
          <p>
            Your information may be processed in countries other than your own. We ensure appropriate
            safeguards (e.g., standard contractual clauses) where required by law for such transfers.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the updated policy on this page
            and update the &quot;Last updated&quot; date. Continued use of the Service after changes constitutes
            acceptance. For material changes, we may provide additional notice (e.g., by email or in-product).
          </p>

          <h2>12. Contact Us</h2>
          <p>
            For privacy-related questions or to exercise your rights, contact us via the contact information
            provided on our website or in the Service.
          </p>
        </div>

        <p className="mt-12 text-sm text-slate-500">
          <Link href="/terms" className="text-[#8B5CF6] hover:underline">Terms of Service</Link>
          {" · "}
          <Link href="/" className="text-[#8B5CF6] hover:underline">Home</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
