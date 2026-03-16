"use client";

import Footer from "@/app/components/Footer";
import LandingNav from "@/app/components/LandingNav";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] font-sans">
      <LandingNav />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-[#8B5CF6]">
              TERMS OF SERVICE
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  AGREEMENT TO OUR LEGAL TERMS
                </h2>
                <div className="space-y-4">
                  <p>
                    Axionlabs Limited (referred to as &apos;Company,&apos;
                    &apos;we,&apos; &apos;us,&apos; or &apos;our&apos;) is a
                    company incorporated in the United Kingdom.
                  </p>
                  <p>
                    Our Services include the website located at
                    https://alphawrite.ai (the &apos;Site&apos;) and all
                    associated products, features, and services that reference
                    these terms and conditions (the &apos;Terms&apos;).
                    Together, these constitute our &apos;Services&apos;.
                  </p>
                  <p>
                    AlphaWrite leverages sophisticated proprietary technology to
                    help you detect AI-generated content from ChatGPT and
                    similar platforms, then convert it into authentic,
                    human-sounding text that passes AI detection tools and
                    connects with your readers.
                  </p>
                  <p>
                    For inquiries or support, please reach out to us via email
                    at{" "}
                    <a
                      href="mailto:info@alphawrite.ai"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      info@alphawrite.ai
                    </a>
                  </p>
                  <p>
                    By accessing or using our Services, you enter into a binding
                    legal agreement with Axionlabs Limited. This applies whether
                    you are using the Services as an individual or on behalf of
                    an organization. Your use of the Services indicates that you
                    have reviewed, comprehended, and accepted these Terms in
                    their entirety. SHOULD YOU DISAGREE WITH ANY PORTION OF
                    THESE TERMS, YOU MUST IMMEDIATELY CEASE USING THE SERVICES.
                  </p>
                  <p>
                    When we make changes to our Services or these Terms, we will
                    notify you in advance. Updates to these Terms take effect
                    when we publish them on our Site or send you notification via
                    email to info@alphawrite.ai. Your continued use of the
                    Services following the effective date of any modifications
                    constitutes acceptance of the updated Terms.
                  </p>
                  <p>
                    Our Services are designed for individuals aged 13 and older.
                    Users who are considered minors in their local jurisdiction
                    (typically those under 18 years of age) must obtain parental
                    or guardian consent and be supervised while using our
                    Services. If you are a minor, a parent or guardian must
                    review and accept these Terms on your behalf before you may
                    use the Services.
                  </p>
                  <p>
                    We encourage you to save or print a copy of these Terms for
                    future reference.
                  </p>
                </div>
              </section>

              <section className="bg-violet-50 p-6 rounded-lg border border-violet-200">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  TABLE OF CONTENTS
                </h2>
                <ul className="list-none space-y-2 md:space-y-1.5">
                  <li>
                    <a
                      href="#our-services"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      1. OUR SERVICES
                    </a>
                  </li>
                  <li>
                    <a
                      href="#intellectual-property"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      2. INTELLECTUAL PROPERTY RIGHTS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#user-representations"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      3. USER REPRESENTATIONS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#user-registration"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      4. USER REGISTRATION
                    </a>
                  </li>
                  <li>
                    <a
                      href="#purchases-and-payment"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      5. PURCHASES AND PAYMENT
                    </a>
                  </li>
                  <li>
                    <a
                      href="#subscriptions"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      6. SUBSCRIPTIONS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#prohibited-activities"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      7. PROHIBITED ACTIVITIES
                    </a>
                  </li>
                  <li>
                    <a
                      href="#user-generated-contributions"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      8. USER GENERATED CONTRIBUTIONS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contribution-license"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      9. CONTRIBUTION LICENSE
                    </a>
                  </li>
                  <li>
                    <a
                      href="#social-media"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      10. SOCIAL MEDIA
                    </a>
                  </li>
                  <li>
                    <a
                      href="#third-party-websites"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      11. THIRD-PARTY WEBSITES AND CONTENT
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services-management"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      12. SERVICES MANAGEMENT
                    </a>
                  </li>
                  <li>
                    <a
                      href="#privacy-policy"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      13. PRIVACY POLICY
                    </a>
                  </li>
                  <li>
                    <a
                      href="#term-and-termination"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      14. TERM AND TERMINATION
                    </a>
                  </li>
                  <li>
                    <a
                      href="#modifications-and-interruptions"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      15. MODIFICATIONS AND INTERRUPTIONS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#governing-law"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      16. GOVERNING LAW
                    </a>
                  </li>
                  <li>
                    <a
                      href="#dispute-resolution"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      17. DISPUTE RESOLUTION
                    </a>
                  </li>
                  <li>
                    <a
                      href="#corrections"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      18. CORRECTIONS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#disclaimer"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      19. DISCLAIMER
                    </a>
                  </li>
                  <li>
                    <a
                      href="#limitations-of-liability"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      20. LIMITATIONS OF LIABILITY
                    </a>
                  </li>
                  <li>
                    <a
                      href="#indemnification"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      21. INDEMNIFICATION
                    </a>
                  </li>
                  <li>
                    <a
                      href="#user-data"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      22. USER DATA
                    </a>
                  </li>
                  <li>
                    <a
                      href="#electronic-communications"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      23. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND
                      SIGNATURES
                    </a>
                  </li>
                  <li>
                    <a
                      href="#california-users"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      24. CALIFORNIA USERS AND RESIDENTS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#miscellaneous"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      25. MISCELLANEOUS
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact-us"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      26. CONTACT US
                    </a>
                  </li>
                </ul>
              </section>

              {/* 1. OUR SERVICES */}
              <section id="our-services">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  1. OUR SERVICES
                </h2>
                <div className="space-y-4">
                  <p>
                    The content and functionality available through our Services
                    are not designed for distribution or utilization in
                    jurisdictions where such activities would contravene local
                    legislation or regulatory requirements, or where we would be
                    obligated to register as a service provider. Users accessing
                    our Services from locations outside the United Kingdom do so
                    voluntarily and assume full responsibility for ensuring their
                    use complies with all applicable local regulations.
                  </p>
                  <p>
                    Our Services are not configured to meet specialized
                    regulatory standards such as HIPAA (Health Insurance
                    Portability and Accountability Act), FISMA (Federal
                    Information Security Management Act), or similar
                    industry-specific compliance frameworks. If your use case
                    requires adherence to such regulations, our Services may not
                    be suitable for your needs. Additionally, use of our Services
                    must not contravene the provisions of the Gramm-Leach-Bliley
                    Act (GLBA) or similar financial privacy regulations.
                  </p>
                </div>
              </section>

              {/* 2. INTELLECTUAL PROPERTY RIGHTS */}
              <section id="intellectual-property">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  2. INTELLECTUAL PROPERTY RIGHTS
                </h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    Our intellectual property
                  </h3>
                  <p>
                    We are the owner or the licensee of all intellectual property
                    rights in our Services, including all source code, databases,
                    functionality, software, website designs, audio, video, text,
                    photographs, and graphics in the Services (collectively, the
                    &quot;Content&quot;), as well as the trademarks, service
                    marks, and logos contained therein (the &quot;Marks&quot;).
                  </p>
                  <p>
                    Our Content and Marks are protected by copyright and
                    trademark laws (and various other intellectual property
                    rights and unfair competition laws) and treaties in the
                    United States and around the world.
                  </p>
                  <p>
                    The Content and Marks are provided in or through the Services
                    &quot;AS IS&quot; for your personal, non-commercial use or
                    internal business purpose only.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Your use of our Services
                  </h3>
                  <p>
                    Subject to your compliance with these Legal Terms, including
                    the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant
                    you a non-exclusive, non-transferable, revocable license to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access the Services; and</li>
                    <li>
                      Download or print a copy of any portion of the Content to
                      which you have properly gained access, solely for your
                      personal, non-commercial use or internal business purpose.
                    </li>
                  </ul>
                  <p>
                    Except as set out in this section or elsewhere in our Legal
                    Terms, no part of the Services and no Content or Marks may be
                    copied, reproduced, aggregated, republished, uploaded,
                    posted, publicly displayed, encoded, translated,
                    transmitted, distributed, sold, licensed, or otherwise
                    exploited for any commercial purpose whatsoever, without our
                    express prior written permission.
                  </p>
                  <p>
                    If you wish to make any use of the Services, Content, or
                    Marks other than as set out in this section or elsewhere in
                    our Legal Terms, please address your request to:{" "}
                    <a
                      href="mailto:info@alphawrite.ai"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      info@alphawrite.ai
                    </a>
                    . If we ever grant you the permission to post, reproduce, or
                    publicly display any part of our Services or Content, you
                    must identify us as the owners or licensors of the Services,
                    Content, or Marks and ensure that any copyright or
                    proprietary notice appears or is visible on posting,
                    reproducing, or displaying our Content.
                  </p>
                  <p>
                    We reserve all rights not expressly granted to you in and to
                    the Services, Content, and Marks.
                  </p>
                  <p>
                    Any breach of these Intellectual Property Rights will
                    constitute a material breach of our Legal Terms and your
                    right to use our Services will terminate immediately.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Your submissions
                  </h3>
                  <p>
                    Please review this section and the &quot;PROHIBITED
                    ACTIVITIES&quot; section carefully prior to using our
                    Services to understand the (a) rights you give us and (b)
                    obligations you have when you post or upload any content
                    through the Services.
                  </p>
                  <p>
                    <strong>Submissions:</strong> By directly sending us any
                    question, comment, suggestion, idea, feedback, or other
                    information about the Services (&quot;Submissions&quot;), you
                    agree to assign to us all intellectual property rights in
                    such Submission. You agree that we shall own this Submission
                    and be entitled to its unrestricted use and dissemination for
                    any lawful purpose, commercial or otherwise, without
                    acknowledgment or compensation to you.
                  </p>
                  <p>
                    <strong>
                      You are responsible for what you post or upload:
                    </strong>{" "}
                    By sending us Submissions through any part of the Services
                    you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Confirm that you have read and agree with our
                      &quot;PROHIBITED ACTIVITIES&quot; and will not post, send,
                      publish, upload, or transmit through the Services any
                      Submission that is illegal, harassing, hateful, harmful,
                      defamatory, obscene, bullying, abusive, discriminatory,
                      threatening to any person or group, sexually explicit,
                      false, inaccurate, deceitful, or misleading;
                    </li>
                    <li>
                      To the extent permissible by applicable law, waive any and
                      all moral rights to any such Submission;
                    </li>
                    <li>
                      Warrant that any such Submission is original to you or that
                      you have the necessary rights and licenses to submit such
                      Submissions and that you have full authority to grant us
                      the above-mentioned rights in relation to your Submissions;
                    </li>
                    <li>
                      Warrant and represent that your Submissions do not
                      constitute confidential information.
                    </li>
                  </ul>
                  <p>
                    You are solely responsible for your Submissions and you
                    expressly agree to reimburse us for any and all losses that
                    we may suffer because of your breach of (a) this section, (b)
                    any third party&apos;s intellectual property rights, or (c)
                    applicable law.
                  </p>
                </div>
              </section>

              {/* 3. USER REPRESENTATIONS */}
              <section id="user-representations">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  3. USER REPRESENTATIONS
                </h2>
                <div className="space-y-4">
                  <p>
                    By using the Services, you represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      All registration information you submit will be true,
                      accurate, current, and complete.
                    </li>
                    <li>
                      You will maintain the accuracy of such information and
                      promptly update such registration information as necessary.
                    </li>
                    <li>
                      You have the legal capacity and you agree to comply with
                      these Legal Terms.
                    </li>
                    <li>You are not under the age of 13.</li>
                    <li>
                      You are not a minor in the jurisdiction in which you
                      reside, or if a minor, you have received parental
                      permission to use the Services.
                    </li>
                    <li>
                      You will not access the Services through automated or
                      non-human means, whether through a bot, script, or
                      otherwise.
                    </li>
                    <li>
                      You will not use the Services for any illegal or
                      unauthorized purpose.
                    </li>
                    <li>
                      Your use of the Services will not violate any applicable
                      law or regulation.
                    </li>
                  </ul>
                  <p>
                    If you provide any information that is untrue, inaccurate,
                    not current, or incomplete, we have the right to suspend or
                    terminate your account and refuse any and all current or
                    future use of the Services (or any portion thereof).
                  </p>
                </div>
              </section>

              {/* 4. USER REGISTRATION */}
              <section id="user-registration">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  4. USER REGISTRATION
                </h2>
                <p>
                  Registration may be necessary to access certain features of
                  our Services. You are responsible for maintaining the
                  confidentiality of your account credentials, including your
                  password. All activities that occur under your account are your
                  responsibility. We retain the right, at our discretion, to
                  modify, remove, or reassign any username that we deem
                  offensive, vulgar, or otherwise unacceptable.
                </p>
              </section>

              {/* 5. PURCHASES AND PAYMENT */}
              <section id="purchases-and-payment">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  5. PURCHASES AND PAYMENT
                </h2>
                <div className="space-y-4">
                  <p>
                    We currently accept payments through the following methods:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Visa</li>
                    <li>Mastercard</li>
                    <li>American Express</li>
                    <li>PayPal</li>
                  </ul>
                  <p>
                    When making purchases through our Services, you must supply
                    accurate, up-to-date, and complete billing and account
                    details. You also commit to keeping your account information
                    current, including your email address, selected payment
                    method, and credit card expiration date, to enable us to
                    process transactions and communicate with you effectively.
                    Applicable sales taxes will be calculated and added to
                    purchase prices as required. We retain the right to adjust
                    pricing at any time without prior notice. All transactions
                    are processed in US dollars.
                  </p>
                  <p>
                    By placing an order, you commit to paying the total amount
                    due at the current pricing, including any applicable fees.
                    You authorize us to process charges through your selected
                    payment method when you submit your order. We maintain the
                    right to adjust pricing errors, including retroactive
                    corrections, even after payment has been processed.
                  </p>
                  <p>
                    We may decline to process any order submitted through our
                    Services. At our discretion, we may impose purchase limits
                    per individual, household, or transaction. These limitations
                    may apply to orders associated with the same account, payment
                    method, billing address, or shipping address. We may also
                    restrict or reject orders that we reasonably believe are
                    placed by commercial resellers, distributors, or bulk
                    purchasers.
                  </p>
                </div>
              </section>

              {/* 6. SUBSCRIPTIONS */}
              <section id="subscriptions">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  6. SUBSCRIPTIONS
                </h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Payment Terms:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Service fees for all subscriptions and products available
                      on alphawrite.ai must be paid in full at the point of
                      purchase.
                    </li>
                    <li>
                      When you provide payment details, you grant us
                      authorization to process the complete transaction amount,
                      including taxes and additional fees, using your selected
                      payment method.
                    </li>
                    <li>
                      Subscription pricing is shown during checkout in your
                      local currency. We reserve the right to modify these rates
                      at any time without advance notification.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">Refund Policy:</h3>
                  <p>
                    All transactions are final. Once payment is processed, no
                    refunds will be issued for subscriptions, services, or
                    digital content.
                  </p>
                  <p>
                    By completing your purchase, you acknowledge and accept that
                    no refunds, credits, or reimbursements will be provided under
                    any circumstances, such as service dissatisfaction, unused
                    subscriptions, mistaken purchases, or cancellation before the
                    subscription period ends.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Credit Policy:</h3>
                  <p>
                    We do not provide account credits, proportional refunds, or
                    partial payment returns for any reason.
                  </p>
                  <p>
                    Any promotional credits, discount codes, or special offers we
                    may provide are subject to specific terms, cannot be
                    transferred, cannot be exchanged for cash, and will expire as
                    specified when issued.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Dispute and Chargeback Policy:
                  </h3>
                  <p>
                    When you make a purchase through alphawrite.ai, you
                    permanently forfeit your right to contest the transaction or
                    file a chargeback with your financial institution, credit
                    card company, payment service provider, or bank.
                  </p>
                  <p>
                    All transactions are considered final, properly authorized,
                    and cannot be disputed.
                  </p>
                  <p>
                    Attempting to reverse, contest, or chargeback a legitimate
                    transaction violates these Terms and may lead to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Account suspension or permanent ban;</li>
                    <li>
                      Pursuit of legal remedies to recover damages, expenses, and
                      fees we incur; and
                    </li>
                    <li>
                      Reporting of suspected fraudulent chargeback attempts to
                      credit bureaus, banks, and law enforcement agencies.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">
                    Billing and Renewal:
                  </h3>
                  <p>
                    Subscriptions are set to automatically renew unless you
                    cancel them. You authorize recurring charges to your payment
                    method without individual approval for each billing cycle,
                    until you cancel your subscription. Your billing frequency
                    depends on the subscription tier you selected during
                    registration.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Cancellation:</h3>
                  <p>
                    You may cancel your subscription at any time by reaching out
                    to us using the contact details provided. Cancellations
                    become effective at the conclusion of your current billing
                    period and do not entitle you to a refund for any remaining
                    time. For assistance or concerns about our Services, please
                    contact us at{" "}
                    <a
                      href="mailto:info@alphawrite.ai"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      info@alphawrite.ai
                    </a>
                    .
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Fee Changes:</h3>
                  <p>
                    We reserve the right to modify subscription pricing
                    periodically. When changes occur, we will notify you in
                    compliance with relevant legal requirements.
                  </p>
                </div>
              </section>

              {/* 7. PROHIBITED ACTIVITIES */}
              <section id="prohibited-activities">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  7. PROHIBITED ACTIVITIES
                </h2>
                <div className="space-y-4">
                  <p>
                    You may not access or use the Services for any purpose other
                    than that for which we make the Services available. The
                    Services may not be used in connection with any commercial
                    endeavors except those that are specifically endorsed or
                    approved by us.
                  </p>
                  <p>
                    As a user of the Services, you agree not to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Systematically retrieve data or other content from the
                      Services to create or compile, directly or indirectly, a
                      collection, compilation, database, or directory without
                      written permission from us.
                    </li>
                    <li>
                      Trick, defraud, or mislead us and other users, especially
                      in any attempt to learn sensitive account information such
                      as user passwords.
                    </li>
                    <li>
                      Circumvent, disable, or otherwise interfere with
                      security-related features of the Services, including
                      features that prevent or restrict the use or copying of any
                      Content or enforce limitations on the use of the Services
                      and/or the Content contained therein.
                    </li>
                    <li>
                      Disparage, tarnish, or otherwise harm, in our opinion, us
                      and/or the Services.
                    </li>
                    <li>
                      Use any information obtained from the Services in order to
                      harass, abuse, or harm another person.
                    </li>
                    <li>
                      Make improper use of our support services or submit false
                      reports of abuse or misconduct.
                    </li>
                    <li>
                      Use the Services in a manner inconsistent with any
                      applicable laws or regulations.
                    </li>
                    <li>
                      Engage in unauthorized framing of or linking to the
                      Services.
                    </li>
                    <li>
                      Upload or transmit (or attempt to upload or to transmit)
                      viruses, Trojan horses, or other material, including
                      excessive use of capital letters and spamming (continuous
                      posting of repetitive text), that interferes with any
                      party&apos;s uninterrupted use and enjoyment of the
                      Services or modifies, impairs, disrupts, alters, or
                      interferes with the use, features, functions, operation, or
                      maintenance of the Services.
                    </li>
                    <li>
                      Engage in any automated use of the system, such as using
                      scripts to send comments or messages, or using any data
                      mining, robots, or similar data gathering and extraction
                      tools.
                    </li>
                    <li>
                      Delete the copyright or other proprietary rights notice
                      from any Content.
                    </li>
                    <li>
                      Attempt to impersonate another user or person or use the
                      username of another user.
                    </li>
                    <li>
                      Upload or transmit (or attempt to upload or to transmit)
                      any material that acts as a passive or active information
                      collection or transmission mechanism, including without
                      limitation, clear graphics interchange formats
                      (&quot;gifs&quot;), 1×1 pixels, web bugs, cookies, or
                      other similar devices (sometimes referred to as
                      &quot;spyware&quot; or &quot;passive collection
                      mechanisms&quot; or &quot;pcms&quot;).
                    </li>
                    <li>
                      Interfere with, disrupt, or create an undue burden on the
                      Services or the networks or services connected to the
                      Services.
                    </li>
                    <li>
                      Harass, annoy, intimidate, or threaten any of our employees
                      or agents engaged in providing any portion of the Services
                      to you.
                    </li>
                    <li>
                      Attempt to bypass any measures of the Services designed to
                      prevent or restrict access to the Services, or any portion
                      of the Services.
                    </li>
                    <li>
                      Copy or adapt the Services&apos; software, including but
                      not limited to Flash, PHP, HTML, JavaScript, or other code.
                    </li>
                    <li>
                      Except as permitted by applicable law, decipher, decompile,
                      disassemble, or reverse engineer any of the software
                      comprising or in any way making up a part of the Services.
                    </li>
                    <li>
                      Except as may be the result of standard search engine or
                      Internet browser usage, use, launch, develop, or distribute
                      any automated system, including without limitation, any
                      spider, robot, cheat utility, scraper, or offline reader
                      that accesses the Services, or use or launch any
                      unauthorized script or other software.
                    </li>
                    <li>
                      Use a buying agent or purchasing agent to make purchases on
                      the Services.
                    </li>
                    <li>
                      Make any unauthorized use of the Services, including
                      collecting usernames and/or email addresses of users by
                      electronic or other means for the purpose of sending
                      unsolicited email, or creating user accounts by automated
                      means or under false pretenses.
                    </li>
                    <li>
                      Use the Services as part of any effort to compete with us
                      or otherwise use the Services and/or the Content for any
                      revenue-generating endeavor or commercial enterprise.
                    </li>
                    <li>Sell or otherwise transfer your profile.</li>
                    <li>
                      Use the Services to advertise or offer to sell goods and
                      services.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 8. USER GENERATED CONTRIBUTIONS */}
              <section id="user-generated-contributions">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  8. USER GENERATED CONTRIBUTIONS
                </h2>
                <div className="space-y-4">
                  <p>
                    The Services do not offer users the ability to submit or post
                    content. We may provide you with the opportunity to create,
                    submit, post, display, transmit, perform, publish,
                    distribute, or broadcast content and materials to us or on
                    the Services, including but not limited to text, writings,
                    video, audio, photographs, graphics, comments, suggestions,
                    or personal information or other material (collectively,
                    &quot;Contributions&quot;). Contributions may be viewable by
                    other users of the Services and through third-party websites.
                    As such, any Contributions you transmit may be treated in
                    accordance with the Services&apos; Privacy Policy.
                  </p>
                  <p>
                    When you create or make available any Contributions, you
                    thereby represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      The creation, distribution, transmission, public display,
                      or performance, and the accessing, downloading, or copying
                      of your Contributions do not and will not infringe the
                      proprietary rights, including but not limited to the
                      copyright, patent, trademark, trade secret, or moral
                      rights of any third party.
                    </li>
                    <li>
                      You are the creator and owner of or have the necessary
                      licenses, rights, consents, releases, and permissions to
                      use and to authorize us, the Services, and other users of
                      the Services to use your Contributions in any manner
                      contemplated by the Services and these Legal Terms.
                    </li>
                    <li>
                      Your Contributions are not false, inaccurate, or
                      misleading.
                    </li>
                    <li>
                      Your Contributions are not unsolicited or unauthorized
                      advertising, promotional materials, pyramid schemes, chain
                      letters, spam, mass mailings, or other forms of
                      solicitation.
                    </li>
                    <li>
                      Your Contributions are not obscene, lewd, lascivious,
                      filthy, violent, harassing, libelous, slanderous, or
                      otherwise objectionable (as determined by us).
                    </li>
                    <li>
                      Your Contributions do not ridicule, mock, disparage,
                      intimidate, or abuse anyone.
                    </li>
                    <li>
                      Your Contributions are not used to harass or threaten any
                      other person or to promote violence against a specific
                      person or class of people.
                    </li>
                    <li>
                      Your Contributions do not violate any applicable law,
                      regulation, or rule.
                    </li>
                    <li>
                      Your Contributions do not violate the privacy or publicity
                      rights of any third party.
                    </li>
                    <li>
                      Your Contributions do not violate any applicable law
                      concerning child pornography or otherwise intended to
                      protect the health or well-being of minors.
                    </li>
                    <li>
                      Your Contributions do not otherwise violate, or link to
                      material that violates, any provision of these Legal Terms,
                      or any applicable law or regulation.
                    </li>
                  </ul>
                  <p>
                    Any use of the Services in violation of the foregoing
                    violates these Legal Terms and may result in, among other
                    things, termination or suspension of your rights to use the
                    Services.
                  </p>
                </div>
              </section>

              {/* 9. CONTRIBUTION LICENSE */}
              <section id="contribution-license">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  9. CONTRIBUTION LICENSE
                </h2>
                <div className="space-y-4">
                  <p>
                    You and the Services agree that we may access, store,
                    process, and use any information and personal data that you
                    provide following the terms of the Privacy Policy and your
                    choices (including settings).
                  </p>
                  <p>
                    By submitting suggestions or other feedback regarding the
                    Services, you agree that we can use and share such feedback
                    for any purpose without compensation to you.
                  </p>
                  <p>
                    We do not assert any ownership over your Contributions. You
                    retain full ownership of all of your Contributions and any
                    intellectual property rights or other proprietary rights
                    associated with your Contributions. We are not liable for any
                    statements or representations in your Contributions provided
                    by you in any area on the Services. You are solely
                    responsible for your Contributions to the Services and you
                    expressly agree to exonerate us from any and all
                    responsibility and to refrain from any legal action against
                    us regarding your Contributions.
                  </p>
                </div>
              </section>

              {/* 10. SOCIAL MEDIA */}
              <section id="social-media">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  10. SOCIAL MEDIA
                </h2>
                <div className="space-y-4">
                  <p>
                    As part of the functionality of the Services, you may link
                    your account with online accounts you have with third-party
                    service providers (each such account, a &quot;Third-Party
                    Account&quot;) by either:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Providing your Third-Party Account login information
                      through the Services; or
                    </li>
                    <li>
                      Allowing us to access your Third-Party Account, as is
                      permitted under the applicable terms and conditions that
                      govern your use of each Third-Party Account.
                    </li>
                  </ul>
                  <p>
                    You represent and warrant that you are entitled to disclose
                    your Third-Party Account login information to us and/or grant
                    us access to your Third-Party Account, without breach by you
                    of any of the terms and conditions that govern your use of
                    the applicable Third-Party Account, and without obligating us
                    to pay any fees or making us subject to any usage limitations
                    imposed by the third-party service provider of the
                    Third-Party Account.
                  </p>
                  <p>
                    By granting us access to any Third-Party Accounts, you
                    understand that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      We may access, make available, and store (if applicable)
                      any content that you have provided to and stored in your
                      Third-Party Account (the &quot;Social Network
                      Content&quot;) so that it is available on and through the
                      Services via your account, including without limitation any
                      friend lists.
                    </li>
                    <li>
                      We may submit to and receive from your Third-Party Account
                      additional information to the extent you are notified when
                      you link your account with the Third-Party Account.
                    </li>
                    <li>
                      Depending on the Third-Party Accounts you choose and
                      subject to the privacy settings that you have set in such
                      Third-Party Accounts, personally identifiable information
                      that you post to your Third-Party Accounts may be available
                      on and through your account on the Services.
                    </li>
                  </ul>
                  <p>
                    Please note that if a Third-Party Account or associated
                    service becomes unavailable or our access to such Third-Party
                    Account is terminated by the third-party service provider,
                    then Social Network Content may no longer be available on and
                    through the Services.
                  </p>
                  <p>
                    You will have the ability to disable the connection between
                    your account on the Services and your Third-Party Accounts at
                    any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE
                    THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR
                    THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S)
                    WITH SUCH THIRD-PARTY SERVICE PROVIDERS.
                  </p>
                  <p>
                    We make no effort to review any Social Network Content for
                    any purpose, including but not limited to, for accuracy,
                    legality, or non-infringement, and we are not responsible for
                    any Social Network Content.
                  </p>
                  <p>
                    You acknowledge and agree that we may access your email
                    address book associated with a Third-Party Account and your
                    contacts list stored on your mobile device or tablet computer
                    solely for purposes of identifying and informing you of
                    those contacts who have also registered to use the Services.
                  </p>
                  <p>
                    You can deactivate the connection between the Services and
                    your Third-Party Account by contacting us using the contact
                    information below or through your account settings (if
                    applicable). We will attempt to delete any information stored
                    on our servers that was obtained through such Third-Party
                    Account, except the username and profile picture that become
                    associated with your account.
                  </p>
                </div>
              </section>

              {/* 11. THIRD-PARTY WEBSITES AND CONTENT */}
              <section id="third-party-websites">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  11. THIRD-PARTY WEBSITES AND CONTENT
                </h2>
                <div className="space-y-4">
                  <p>
                    The Services may contain (or you may be sent via the Site)
                    links to other websites (&quot;Third-Party Websites&quot;) as
                    well as articles, photographs, text, graphics, pictures,
                    designs, music, sound, video, information, applications,
                    software, and other content or items belonging to or
                    originating from third parties (&quot;Third-Party
                    Content&quot;).
                  </p>
                  <p>
                    Such Third-Party Websites and Third-Party Content are not
                    investigated, monitored, or checked for accuracy,
                    appropriateness, or completeness by us, and we are not
                    responsible for any Third-Party Websites accessed through the
                    Services or any Third-Party Content posted on, available
                    through, or installed from the Services, including the
                    content, accuracy, offensiveness, opinions, reliability,
                    privacy practices, or other policies of or contained in the
                    Third-Party Websites or the Third-Party Content.
                  </p>
                  <p>
                    Inclusion of, linking to, or permitting the use or
                    installation of any Third-Party Websites or any Third-Party
                    Content does not imply approval or endorsement thereof by us.
                    If you decide to leave the Services and access the
                    Third-Party Websites or to use or install any Third-Party
                    Content, you do so at your own risk, and you should be aware
                    these Legal Terms no longer govern.
                  </p>
                  <p>
                    You should review the applicable terms and policies,
                    including privacy and data gathering practices, of any
                    website to which you navigate from the Services or relating
                    to any applications you use or install from the Services.
                  </p>
                  <p>
                    Any purchases you make through Third-Party Websites will be
                    through other websites and from other companies, and we take
                    no responsibility whatsoever in relation to such purchases
                    which are exclusively between you and the applicable third
                    party.
                  </p>
                  <p>
                    You agree and acknowledge that we do not endorse the products
                    or services offered on Third-Party Websites and you shall
                    hold us blameless from any harm caused by your purchase of
                    such products or services. Additionally, you shall hold us
                    blameless from any losses sustained by you or harm caused to
                    you relating to or resulting in any way from any Third-Party
                    Content or any contact with Third-Party Websites.
                  </p>
                </div>
              </section>

              {/* 12. SERVICES MANAGEMENT */}
              <section id="services-management">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  12. SERVICES MANAGEMENT
                </h2>
                <div className="space-y-4">
                  <p>We reserve the right, but not the obligation, to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Monitor the Services for violations of these Legal Terms;
                    </li>
                    <li>
                      Take appropriate legal action against anyone who, in our
                      sole discretion, violates the law or these Legal Terms,
                      including without limitation, reporting such user to law
                      enforcement authorities;
                    </li>
                    <li>
                      In our sole discretion and without limitation, refuse,
                      restrict access to, limit the availability of, or disable
                      (to the extent technologically feasible) any of your
                      Contributions or any portion thereof;
                    </li>
                    <li>
                      In our sole discretion and without limitation, notice, or
                      liability, to remove from the Services or otherwise disable
                      all files and content that are excessive in size or are in
                      any way burdensome to our systems;
                    </li>
                    <li>
                      Otherwise manage the Services in a manner designed to
                      protect our rights and property and to facilitate the
                      proper functioning of the Services.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 13. PRIVACY POLICY */}
              <section id="privacy-policy">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  13. PRIVACY POLICY
                </h2>
                <div className="space-y-4">
                  <p>
                    We care about data privacy and security. Please review our
                    Privacy Policy:{" "}
                    <a
                      href="/privacy"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      https://alphawrite.ai/privacy
                    </a>
                    . By using the Services, you agree to be bound by our Privacy
                    Policy, which is incorporated into these Legal Terms.
                  </p>
                  <p>
                    Please be advised the Services are hosted in the United
                    Kingdom. If you access the Services from any other region of
                    the world with laws or other requirements governing personal
                    data collection, use, or disclosure that differ from
                    applicable laws in the United Kingdom, then through your
                    continued use of the Services, you are transferring your data
                    to the United Kingdom, and you expressly consent to have your
                    data transferred to and processed in the United Kingdom.
                  </p>
                  <p>
                    Further, we do not knowingly accept, request, or solicit
                    information from children or knowingly market to children.
                    Therefore, in accordance with the U.S. Children&apos;s
                    Online Privacy Protection Act, if we receive actual knowledge
                    that anyone under the age of 13 has provided personal
                    information to us without the requisite and verifiable
                    parental consent, we will delete that information from the
                    Services as quickly as is reasonably practical.
                  </p>
                </div>
              </section>

              {/* 14. TERM AND TERMINATION */}
              <section id="term-and-termination">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  14. TERM AND TERMINATION
                </h2>
                <div className="space-y-4">
                  <p>
                    These Legal Terms shall remain in full force and effect while
                    you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF
                    THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE
                    DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO
                    AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP
                    ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON,
                    INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
                    REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE
                    LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY
                    TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE
                    YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED
                    AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                  </p>
                  <p>
                    If we terminate or suspend your account for any reason, you
                    are prohibited from registering and creating a new account
                    under your name, a fake or borrowed name, or the name of any
                    third party, even if you may be acting on behalf of the third
                    party. In addition to terminating or suspending your account,
                    we reserve the right to take appropriate legal action,
                    including without limitation pursuing civil, criminal, and
                    injunctive redress.
                  </p>
                </div>
              </section>

              {/* 15. MODIFICATIONS AND INTERRUPTIONS */}
              <section id="modifications-and-interruptions">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  15. MODIFICATIONS AND INTERRUPTIONS
                </h2>
                <div className="space-y-4">
                  <p>
                    We reserve the right to change, modify, or remove the
                    contents of the Services at any time or for any reason at our
                    sole discretion without notice. However, we have no
                    obligation to update any information on our Services.
                  </p>
                  <p>
                    We cannot guarantee the Services will be available at all
                    times. We may experience hardware, software, or other
                    problems or need to perform maintenance related to the
                    Services, resulting in interruptions, delays, or errors. We
                    reserve the right to change, revise, update, suspend,
                    discontinue, or otherwise modify the Services at any time or
                    for any reason without notice to you.
                  </p>
                  <p>
                    You agree that we have no liability whatsoever for any loss,
                    damage, or inconvenience caused by your inability to access
                    or use the Services during any downtime or discontinuance of
                    the Services. Nothing in these Legal Terms will be construed
                    to obligate us to maintain and support the Services or to
                    supply any corrections, updates, or releases in connection
                    therewith.
                  </p>
                </div>
              </section>

              {/* 16. GOVERNING LAW */}
              <section id="governing-law">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  16. GOVERNING LAW
                </h2>
                <div className="space-y-4">
                  <p>
                    These Legal Terms are governed by and interpreted following
                    the laws of England and Wales, and the use of the United
                    Nations Convention of Contracts for the International Sale of
                    Goods is expressly excluded. If your habitual residence is in
                    the EU, and you are a consumer, you additionally possess the
                    protection provided to you by obligatory provisions of the
                    law in your country of residence.
                  </p>
                  <p>
                    Axionlabs Limited and yourself both agree to submit to the
                    non-exclusive jurisdiction of the courts of England and
                    Wales, which means that you may make a claim to defend your
                    consumer protection rights in regard to these Legal Terms in
                    England, or in the EU country in which you reside.
                  </p>
                </div>
              </section>

              {/* 17. DISPUTE RESOLUTION */}
              <section id="dispute-resolution">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  17. DISPUTE RESOLUTION
                </h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    Informal Negotiations
                  </h3>
                  <p>
                    To expedite resolution and control the cost of any dispute,
                    controversy, or claim related to these Legal Terms (each a
                    &apos;Dispute&apos; and collectively, the
                    &apos;Disputes&apos;) brought by either you or us
                    (individually, a &apos;Party&apos; and collectively, the
                    &apos;Parties&apos;), the Parties agree to first attempt to
                    negotiate any Dispute (except those Disputes expressly
                    provided below) informally for at least thirty (30) days
                    before initiating arbitration. Such informal negotiations
                    commence upon written notice from one Party to the other
                    Party.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Binding Arbitration
                  </h3>
                  <p>
                    If the Parties are unable to resolve a Dispute through
                    informal negotiations, the Dispute will be finally and
                    exclusively resolved by binding arbitration. YOU UNDERSTAND
                    THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE
                    IN COURT AND HAVE A JURY TRIAL.
                  </p>
                  <p>
                    The arbitration shall be conducted in English and the seat or
                    legal place of arbitration shall be London, England. The
                    arbitration shall be initiated and conducted under the
                    Commercial Arbitration Rules of the American Arbitration
                    Association (&apos;AAA&apos;) and, where appropriate, the
                    AAA&apos;s Supplementary Procedures for Consumer Related
                    Disputes (&apos;AAA Consumer Rules&apos;), both of which are
                    available on the AAA website.
                  </p>
                  <p>
                    Your arbitration fees and your share of arbitrator
                    compensation shall be governed by the AAA Consumer Rules and,
                    where appropriate, limited by the AAA Consumer Rules. The
                    arbitration may be conducted in person, through the
                    submission of documents, by phone, or online. The arbitrator
                    will make a decision in writing but will not provide an
                    explanation unless requested by either Party. The arbitrator
                    must follow applicable law, and any award may be challenged
                    if the arbitrator fails to do so. Except where otherwise
                    required by the applicable AAA rules or applicable law, the
                    arbitration will take place in London, England. Except as
                    otherwise provided herein, the Parties may litigate in court
                    to compel arbitration, stay proceedings pending arbitration,
                    or to confirm, modify, vacate, or enter judgment on the award
                    entered by the arbitrator.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">Restrictions</h3>
                  <p>
                    The Parties agree that any arbitration shall be limited to
                    the Dispute between the Parties individually. To the full
                    extent permitted by law, (a) no arbitration shall be joined
                    with any other proceeding; (b) there is no right or authority
                    for any Dispute to be arbitrated on a class-action basis or
                    to utilize class action procedures; and (c) there is no right
                    or authority for any Dispute to be brought in a purported
                    representative capacity on behalf of the general public or
                    any other persons.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Exceptions to Informal Negotiations and Arbitration
                  </h3>
                  <p>
                    The Parties agree that the following Disputes are not subject
                    to the above provisions concerning informal negotiations and
                    binding arbitration:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Any Disputes seeking to enforce or protect, or concerning
                      the validity of, any of the intellectual property rights of
                      a Party
                    </li>
                    <li>
                      Any Dispute related to, or arising from, allegations of
                      theft, piracy, invasion of privacy, or unauthorized use
                    </li>
                    <li>Any claim for injunctive relief</li>
                  </ul>
                  <p>
                    If this provision is found to be illegal or unenforceable,
                    then neither Party will elect to arbitrate any Dispute
                    falling within that portion of this provision found to be
                    illegal or unenforceable, and such Dispute shall be decided
                    by a court of competent jurisdiction within the courts listed
                    for jurisdiction above, and the Parties agree to submit to
                    the personal jurisdiction of that court.
                  </p>
                </div>
              </section>

              {/* 18. CORRECTIONS */}
              <section id="corrections">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  18. CORRECTIONS
                </h2>
                <p>
                  There may be information on the Services that contains
                  typographical errors, inaccuracies, or omissions, including
                  descriptions, pricing, availability, and various other
                  information. We reserve the right to correct any errors,
                  inaccuracies, or omissions and to change or update the
                  information on the Services at any time, without prior notice.
                </p>
              </section>

              {/* 19. DISCLAIMER */}
              <section id="disclaimer">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  19. DISCLAIMER
                </h2>
                <div className="space-y-4">
                  <p>
                    THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.
                    YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE
                    RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM
                    ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE
                    SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION,
                    THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                    PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO
                    WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                    COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF
                    ANY WEBSITES LINKED TO THE SERVICES AND WE WILL ASSUME NO
                    LIABILITY OR RESPONSIBILITY FOR ANY:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS
                    </li>
                    <li>
                      PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE
                      WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
                      SERVICES
                    </li>
                    <li>
                      ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
                      AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL
                      INFORMATION STORED THEREIN
                    </li>
                    <li>
                      ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM
                      THE SERVICES
                    </li>
                    <li>
                      ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE
                      TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY
                    </li>
                    <li>
                      ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR
                      ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE
                      USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE
                      AVAILABLE VIA THE SERVICES
                    </li>
                  </ul>
                  <p>
                    WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
                    RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR
                    OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY
                    HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION
                    FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT
                    BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
                    TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF
                    PRODUCTS OR SERVICES.
                  </p>
                  <p>
                    AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY
                    MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST
                    JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                  </p>
                </div>
              </section>

              {/* 20. LIMITATIONS OF LIABILITY */}
              <section id="limitations-of-liability">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  20. LIMITATIONS OF LIABILITY
                </h2>
                <div className="space-y-4">
                  <p>
                    TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE
                    OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR
                    ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
                    EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES,
                    INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER
                    DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE
                    HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                  <p>
                    NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN,
                    OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS
                    OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO
                    THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6)
                    MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN
                    US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS
                    ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF
                    CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF
                    THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU,
                    AND YOU MAY HAVE ADDITIONAL RIGHTS.
                  </p>
                </div>
              </section>

              {/* 21. INDEMNIFICATION */}
              <section id="indemnification">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  21. INDEMNIFICATION
                </h2>
                <div className="space-y-4">
                  <p>
                    You agree to defend, indemnify, and hold us harmless,
                    including our subsidiaries, affiliates, and all of our
                    respective officers, agents, partners, and employees, from
                    and against any loss, damage, liability, claim, or demand,
                    including reasonable attorneys&apos; fees and expenses, made
                    by any third party due to or arising out of:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>(1) your Contributions</li>
                    <li>(2) use of the Services</li>
                    <li>(3) breach of these Legal Terms</li>
                    <li>
                      (4) any breach of your representations and warranties set
                      forth in these Legal Terms
                    </li>
                    <li>
                      (5) your violation of the rights of a third party,
                      including but not limited to intellectual property rights
                    </li>
                    <li>
                      (6) any overt harmful act toward any other user of the
                      Services with whom you connected via the Services
                    </li>
                  </ul>
                  <p>
                    Notwithstanding the foregoing, we reserve the right, at your
                    expense, to assume the exclusive defense and control of any
                    matter for which you are required to indemnify us, and you
                    agree to cooperate, at your expense, with our defense of such
                    claims. We will use reasonable efforts to notify you of any
                    such claim, action, or proceeding which is subject to this
                    indemnification upon becoming aware of it.
                  </p>
                </div>
              </section>

              {/* 22. USER DATA */}
              <section id="user-data">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  22. USER DATA
                </h2>
                <div className="space-y-4">
                  <p>
                    We will maintain certain data that you transmit to the
                    Services for the purpose of managing the performance of the
                    Services, as well as data relating to your use of the
                    Services. Although we perform regular routine backups of
                    data, you are solely responsible for all data that you
                    transmit or that relates to any activity you have undertaken
                    using the Services.
                  </p>
                  <p>
                    You agree that we shall have no liability to you for any loss
                    or corruption of any such data, and you hereby waive any
                    right of action against us arising from any such loss or
                    corruption of such data.
                  </p>
                </div>
              </section>

              {/* 23. ELECTRONIC COMMUNICATIONS */}
              <section id="electronic-communications">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  23. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                </h2>
                <div className="space-y-4">
                  <p>
                    Visiting the Services, sending us emails, and completing
                    online forms constitute electronic communications. You
                    consent to receive electronic communications, and you agree
                    that all agreements, notices, disclosures, and other
                    communications we provide to you electronically, via email
                    and on the Services, satisfy any legal requirement that such
                    communication be in writing.
                  </p>
                  <p>
                    YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                    CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC
                    DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS
                    INITIATED OR COMPLETED BY US OR VIA THE SERVICES.
                  </p>
                  <p>
                    You hereby waive any rights or requirements under any
                    statutes, regulations, rules, ordinances, or other laws in
                    any jurisdiction which require an original signature or
                    delivery or retention of non-electronic records, or to
                    payments or the granting of credits by any means other than
                    electronic means.
                  </p>
                </div>
              </section>

              {/* 24. CALIFORNIA USERS AND RESIDENTS */}
              <section id="california-users">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  24. CALIFORNIA USERS AND RESIDENTS
                </h2>
                <p>
                  If any complaint with us is not satisfactorily resolved, you
                  can contact the Complaint Assistance Unit of the Division of
                  Consumer Services of the California Department of Consumer
                  Affairs in writing at 1625 North Market Blvd., Suite N 112,
                  Sacramento, California 95834, or by telephone at (800)
                  952-5210 or (916) 445-1254.
                </p>
              </section>

              {/* 25. MISCELLANEOUS */}
              <section id="miscellaneous">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  25. MISCELLANEOUS
                </h2>
                <div className="space-y-4">
                  <p>
                    These Legal Terms and any policies or operating rules posted
                    by us on the Services or in respect to the Services
                    constitute the entire agreement and understanding between you
                    and us. Our failure to exercise or enforce any right or
                    provision of these Legal Terms shall not operate as a waiver
                    of such right or provision.
                  </p>
                  <p>
                    These Legal Terms operate to the fullest extent permissible
                    by law. We may assign any or all of our rights and
                    obligations to others at any time. We shall not be
                    responsible or liable for any loss, damage, delay, or failure
                    to act caused by any cause beyond our reasonable control.
                  </p>
                  <p>
                    If any provision or part of a provision of these Legal Terms
                    is determined to be unlawful, void, or unenforceable, that
                    provision or part of the provision is deemed severable from
                    these Legal Terms and does not affect the validity and
                    enforceability of any remaining provisions.
                  </p>
                  <p>
                    There is no joint venture, partnership, employment, or agency
                    relationship created between you and us as a result of these
                    Legal Terms or use of the Services.
                  </p>
                  <p>
                    You agree that these Legal Terms will not be construed
                    against us by virtue of having drafted them. You hereby waive
                    any and all defenses you may have based on the electronic
                    form of these Legal Terms and the lack of signing by the
                    parties hereto to execute these Legal Terms.
                  </p>
                </div>
              </section>

              {/* 26. CONTACT US */}
              <section id="contact-us">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  26. CONTACT US
                </h2>
                <div className="space-y-2">
                  <p>
                    In order to resolve a complaint regarding the Services or to
                    receive further information regarding use of the Services,
                    please contact us at:
                  </p>
                  <p className="font-semibold">Axionlabs Limited</p>
                  <p>
                    <a
                      href="mailto:info@alphawrite.ai"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      info@alphawrite.ai
                    </a>
                  </p>
                  <p>London</p>
                  <p>United Kingdom</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
