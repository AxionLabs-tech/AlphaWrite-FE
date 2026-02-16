import Link from "next/link";
import LandingNav from "@/app/components/LandingNav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Terms of Service – AlphaWrite",
  description: "AlphaWrite Terms of Service. By using our AI humanization and detection tools, you agree to these terms.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] text-slate-900">
      <LandingNav />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link href="/" className="text-sm font-medium text-[#8B5CF6] hover:text-violet-700">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-slate-600">Last updated: February 2025</p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using AlphaWrite (&quot;Service&quot;), you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the Service. We reserve the right to update these
            terms at any time; continued use after changes constitutes acceptance.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            AlphaWrite provides AI writing tools, including text humanization and AI detection. We aim to help users
            improve clarity and originality of their writing. Use of the Service is subject to your compliance with
            these terms and any applicable plan limits (e.g., word limits, credits).
          </p>

          <h2>3. Account and Registration</h2>
          <p>
            You may sign up via email (magic link) or third-party authentication (e.g., Google). You are responsible
            for maintaining the confidentiality of your account and for all activity under your account. You must
            provide accurate information and notify us of any unauthorized use.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable law, or academic or institutional policies;</li>
            <li>Submit content that is illegal, harmful, or infringes others&apos; rights;</li>
            <li>Attempt to circumvent usage limits, security, or access controls;</li>
            <li>Resell or redistribute the Service without our written permission;</li>
            <li>Use the Service in a way that could harm, disable, or overburden our systems.</li>
          </ul>
          <p>
            We may suspend or terminate access for conduct that we reasonably believe violates these terms or is
            harmful to other users or the Service.
          </p>

          <h2>5. Intellectual Property and Your Content</h2>
          <p>
            You retain ownership of content you submit. By using the Service, you grant us a limited license to
            process your content solely to provide the Service (e.g., humanization, detection). Our name, logos,
            and the design and code of the Service are our intellectual property and may not be copied or used
            without permission.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            The Service is provided &quot;as is.&quot; We do not guarantee that humanized text will pass any specific
            detector or satisfy any institution&apos;s policies. You are responsible for how you use the output and
            for complying with your school, employer, or platform rules. We are not liable for any decisions made
            based on the Service.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, AlphaWrite and its affiliates shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, or
            business opportunities arising from your use of the Service. Our total liability shall not exceed the
            amount you paid us in the twelve months preceding the claim (or one hundred dollars if greater).
          </p>

          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your access at any time for breach of these terms or for any other reason.
            You may stop using the Service at any time. Sections that by their nature should survive (e.g.,
            disclaimers, limitation of liability, dispute resolution) will survive termination.
          </p>

          <h2>9. Governing Law and Disputes</h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which AlphaWrite operates. Any dispute
            shall be resolved in the courts of that jurisdiction, unless we agree otherwise in writing.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about these Terms of Service, contact us via the contact information provided on our
            website or in the Service.
          </p>
        </div>

        <p className="mt-12 text-sm text-slate-500">
          <Link href="/privacy" className="text-[#8B5CF6] hover:underline">Privacy Policy</Link>
          {" · "}
          <Link href="/" className="text-[#8B5CF6] hover:underline">Home</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
