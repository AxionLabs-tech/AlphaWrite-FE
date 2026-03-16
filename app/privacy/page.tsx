"use client";

import Footer from "@/app/components/Footer";
import LandingNav from "@/app/components/LandingNav";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F7F5FF] font-sans">
      <LandingNav />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-[#8B5CF6]">
              PRIVACY POLICY
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
                  This Privacy Policy for Axionlabs Limited
                </h2>
              </section>

              {/* SUMMARY OF KEY POINTS */}
              <section className="bg-violet-50 p-6 rounded-lg border border-violet-200">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  SUMMARY OF KEY POINTS
                </h2>
                <p className="mb-4">
                  This overview highlights the main points of our Privacy
                  Policy. For comprehensive details on any topic, follow the
                  links provided or navigate to the relevant section using the
                  table of contents.
                </p>
                <ul className="list-none space-y-3">
                  <li>
                    <strong>
                      What personal information do we process?
                    </strong>{" "}
                    The types of personal data we handle depend on your
                    interactions with our Services, the features you use, and
                    the preferences you select.{" "}
                    <a
                      href="#what-information-do-we-collect"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      Discover what personal information you provide to us.
                    </a>
                  </li>
                  <li>
                    <strong>
                      Do we process any sensitive personal information?
                    </strong>{" "}
                    Certain categories of data, such as information about your
                    race, ethnicity, sexual orientation, or religious beliefs,
                    may be classified as &quot;special&quot; or
                    &quot;sensitive&quot; in some regions. We do not collect or
                    process sensitive personal information.
                  </li>
                  <li>
                    In addition to information you provide directly, we may
                    gather data from publicly available sources, marketing
                    affiliates, social networking sites, and other external
                    providers.{" "}
                    <a
                      href="#what-information-do-we-collect"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      Find out more about data collected from external sources.
                    </a>
                  </li>
                  <li>
                    <strong>How do we process your information?</strong> We use
                    your data to deliver, enhance, and manage our Services,
                    maintain communication with you, ensure security and prevent
                    fraud, and meet legal obligations. With your permission, we
                    may also use your information for additional purposes. We
                    only process your data when we have a legitimate legal
                    basis.{" "}
                    <a
                      href="#how-do-we-process-your-information"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      Read more about our data processing practices.
                    </a>
                  </li>
                  <li>
                    <strong>
                      In what situations and with which parties do we share
                      personal information?
                    </strong>{" "}
                    We may disclose information under specific circumstances and
                    to particular third-party partners.{" "}
                    <a
                      href="#when-and-with-whom-do-we-share"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      Understand when and with whom we share your data.
                    </a>
                  </li>
                  <li>
                    <strong>How do we keep your information safe?</strong> We
                    employ robust organizational and technical safeguards to
                    protect your personal data. However, no method of electronic
                    transmission or data storage can be completely secure. While
                    we implement strong security measures, we cannot guarantee
                    absolute protection against unauthorized access, theft, or
                    modification by malicious actors.{" "}
                    <a
                      href="#how-do-we-keep-your-information-safe"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      Explore our security measures in detail.
                    </a>
                  </li>
                  <li>
                    <strong>What are your rights?</strong> Your location may
                    grant you specific privacy rights under applicable data
                    protection legislation.{" "}
                    <a
                      href="#what-are-your-privacy-rights"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      See what privacy rights you have.
                    </a>
                  </li>
                  <li>
                    <strong>How do you exercise your rights?</strong> To
                    exercise your privacy rights, you can submit a data access
                    request or contact us directly. We will review and respond
                    to all requests in compliance with relevant data protection
                    regulations.
                  </li>
                  <li>
                    Interested in learning more about how we handle the
                    information we collect?{" "}
                    <a
                      href="#what-information-do-we-collect"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      Read the complete Privacy Policy.
                    </a>
                  </li>
                </ul>
              </section>

              {/* TABLE OF CONTENTS */}
              <section className="bg-violet-50 p-6 rounded-lg border border-violet-200">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  TABLE OF CONTENTS
                </h2>
                <ul className="list-none space-y-2 md:space-y-1.5">
                  <li>
                    <a
                      href="#what-information-do-we-collect"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      1. WHAT INFORMATION DO WE COLLECT?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-do-we-process-your-information"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      2. HOW DO WE PROCESS YOUR INFORMATION?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#what-legal-bases"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR
                      INFORMATION?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#when-and-with-whom-do-we-share"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL
                      INFORMATION?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cookies-and-tracking"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#ai-based-products"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      6. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#social-logins"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-long-do-we-keep"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      8. HOW LONG DO WE KEEP YOUR INFORMATION?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-do-we-keep-your-information-safe"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      9. HOW DO WE KEEP YOUR INFORMATION SAFE?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#what-are-your-privacy-rights"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      10. WHAT ARE YOUR PRIVACY RIGHTS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#do-not-track"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      11. CONTROLS FOR DO-NOT-TRACK FEATURES
                    </a>
                  </li>
                  <li>
                    <a
                      href="#us-residents-rights"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      12. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY
                      RIGHTS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#updates-to-policy"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      13. DO WE MAKE UPDATES TO THIS POLICY?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact-us"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      14. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#review-update-delete"
                      className="block text-[#8B5CF6] hover:text-violet-700 hover:underline transition-colors py-1 text-sm md:text-base"
                    >
                      15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE
                      COLLECT FROM YOU?
                    </a>
                  </li>
                </ul>
              </section>

              {/* 1. WHAT INFORMATION DO WE COLLECT? */}
              <section id="what-information-do-we-collect">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  1. WHAT INFORMATION DO WE COLLECT?
                </h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    Personal information you disclose to us
                  </h3>
                  <p>
                    <strong>In Short:</strong> We collect personal information
                    that you provide to us.
                  </p>
                  <p>
                    We gather personal information that you choose to share with
                    us when creating an account, requesting information about
                    our products or Services, engaging with our platform
                    features, or reaching out to us for support.
                  </p>
                  <p>
                    <strong>Personal Information Provided by You.</strong> The
                    specific data we collect varies based on how you interact
                    with our platform, the options you select, and which
                    services and tools you utilize. Examples of personal
                    information we may collect include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>names</li>
                    <li>phone numbers</li>
                    <li>email addresses</li>
                    <li>usernames</li>
                    <li>passwords</li>
                    <li>billing addresses</li>
                    <li>debit/credit card numbers</li>
                  </ul>
                  <p>
                    <strong>Sensitive Information.</strong> We do not process
                    sensitive information.
                  </p>
                  <p>
                    <strong>Payment Data.</strong> We may collect data necessary
                    to process your payment if you choose to make purchases,
                    such as your payment instrument number, and the security
                    code associated with your payment instrument. All payment
                    data is handled and stored by Stripe. You may find their
                    privacy policy link(s) here:{" "}
                    <a
                      href="https://stripe.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      https://stripe.com/privacy
                    </a>
                  </p>
                  <p>
                    <strong>Social Media Login Data.</strong> We may provide you
                    with the option to register with us using your existing
                    social media account details, like your Facebook, X, or
                    other social media account. If you choose to register in
                    this way, we will collect certain profile information about
                    you from the social media provider, as described in the
                    section called &quot;HOW DO WE HANDLE YOUR SOCIAL
                    LOGINS?&quot; below.
                  </p>
                  <p>
                    All personal information that you provide to us must be
                    true, complete, and accurate, and you must notify us of any
                    changes to such personal information.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Information automatically collected
                  </h3>
                  <p>
                    <strong>In Short:</strong> Some information — such as your
                    Internet Protocol (IP) address and/or browser and device
                    characteristics — is collected automatically when you visit
                    our Services.
                  </p>
                  <p>
                    When you access or use our Services, we automatically gather
                    certain technical and usage data. While this information
                    doesn&apos;t directly identify you (such as your name or
                    email), it may encompass device details, IP addresses,
                    browser specifications, operating system information,
                    language settings, referral sources, device identifiers,
                    geographic location, usage patterns, timestamps, and other
                    technical metrics. We primarily use this data to ensure
                    platform security, optimize performance, and for internal
                    analysis and reporting.
                  </p>
                  <p>
                    Similar to most online services, we utilize cookies and
                    comparable tracking technologies to collect this
                    information.
                  </p>
                  <p>The information we collect includes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Log and Usage Data.</strong> Log and usage data is
                      service-related, diagnostic, usage, and performance
                      information our servers automatically collect when you
                      access or use our Services and which we record in log
                      files. Depending on how you interact with us, this log
                      data may include your IP address, device information,
                      browser type, and settings and information about your
                      activity in the Services (such as the date/time stamps
                      associated with your usage, pages and files viewed,
                      searches, and other actions you take such as which
                      features you use), device event information (such as
                      system activity, error reports (sometimes called
                      &apos;crash dumps&apos;), and hardware settings).
                    </li>
                    <li>
                      <strong>Device Data.</strong> We collect device data such
                      as information about your computer, phone, tablet, or
                      other device you use to access the Services. Depending on
                      the device used, this device data may include information
                      such as your IP address (or proxy server), device and
                      application identification numbers, location, browser
                      type, hardware model, Internet service provider and/or
                      mobile carrier, operating system, and system configuration
                      information.
                    </li>
                    <li>
                      <strong>Location Data.</strong> We collect location data
                      such as information about your device&apos;s location,
                      which can be either precise or imprecise. How much
                      information we collect depends on the type and settings of
                      the device you use to access the Services. For example, we
                      may use GPS and other technologies to collect geolocation
                      data that tells us your current location (based on your IP
                      address). You can opt out of allowing us to collect this
                      information either by refusing access to the information
                      or by disabling your Location setting on your device.
                      However, if you choose to opt out, you may not be able to
                      use certain aspects of the Services.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 2. HOW DO WE PROCESS YOUR INFORMATION? */}
              <section id="how-do-we-process-your-information">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  2. HOW DO WE PROCESS YOUR INFORMATION?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> We handle your data to deliver,
                    enhance, and operate our Services, maintain communication,
                    protect against security threats and fraudulent activity, and
                    fulfill legal requirements. With your authorization, we may
                    also use your information for additional purposes.
                  </p>
                  <p>
                    The purposes for which we process your personal information
                    vary based on your usage patterns and include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>
                        To facilitate account creation and authentication and
                        otherwise manage user accounts.
                      </strong>{" "}
                      We may process your information so you can create and log
                      in to your account, as well as keep your account in
                      working order.
                    </li>
                    <li>
                      <strong>
                        To deliver and facilitate delivery of services to the
                        user.
                      </strong>{" "}
                      We may process your information to provide you with the
                      requested service.
                    </li>
                    <li>
                      <strong>
                        To respond to user inquiries/offer support to users.
                      </strong>{" "}
                      We may process your information to respond to your
                      inquiries and solve any potential issues you might have
                      with the requested service.
                    </li>
                    <li>
                      <strong>
                        To send administrative information to you.
                      </strong>{" "}
                      We may process your information to send you details about
                      our products and services, changes to our terms and
                      policies, and other similar information.
                    </li>
                    <li>
                      <strong>To fulfill and manage your orders.</strong> We may
                      process your information to fulfill and manage your
                      orders, payments, returns, and exchanges made through the
                      Services.
                    </li>
                    <li>
                      <strong>
                        To enable user-to-user communications.
                      </strong>{" "}
                      We may process your information if you choose to use any
                      of our offerings that allow for communication with another
                      user.
                    </li>
                    <li>
                      <strong>To request feedback.</strong> We may process your
                      information when necessary to request feedback and to
                      contact you about your use of our Services.
                    </li>
                    <li>
                      <strong>
                        To send you marketing and promotional communications.
                      </strong>{" "}
                      We may process the personal information you send to us for
                      our marketing purposes, if this is in accordance with your
                      marketing preferences. You can opt out of our marketing
                      emails at any time. For more information, see &quot;WHAT
                      ARE YOUR PRIVACY RIGHTS?&quot; below.
                    </li>
                    <li>
                      <strong>
                        To deliver targeted advertising to you.
                      </strong>{" "}
                      We may process your information to develop and display
                      personalized content and advertising tailored to your
                      interests, location, and more.
                    </li>
                    <li>
                      <strong>To protect our Services.</strong> We may process
                      your information as part of our efforts to keep our
                      Services safe and secure, including fraud monitoring and
                      prevention.
                    </li>
                    <li>
                      <strong>To identify usage trends.</strong> We may process
                      information about how you use our Services to better
                      understand how they are being used so we can improve them.
                    </li>
                    <li>
                      <strong>
                        To determine the effectiveness of our marketing and
                        promotional campaigns.
                      </strong>{" "}
                      We may process your information to better understand how
                      to provide marketing and promotional campaigns that are
                      most relevant to you.
                    </li>
                    <li>
                      <strong>
                        To save or protect an individual&apos;s vital interest.
                      </strong>{" "}
                      We may process your information when necessary to save or
                      protect an individual&apos;s vital interest, such as to
                      prevent harm.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3. WHAT LEGAL BASES */}
              <section id="what-legal-bases">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR
                  INFORMATION?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> We only process your personal
                    information when we believe it is necessary and we have a
                    valid legal reason (i.e., legal basis) to do so under
                    applicable law, like with your consent, to comply with laws,
                    to provide you with services to enter into or fulfill our
                    contractual obligations, to protect your rights, or to
                    fulfill our legitimate business interests.
                  </p>

                  <p className="font-semibold">
                    If you are located in the EU or UK, this section applies to
                    you.
                  </p>
                  <p>
                    The General Data Protection Regulation (GDPR) and UK GDPR
                    require us to explain the valid legal bases we rely on in
                    order to process your personal information. As such, we may
                    rely on the following legal bases to process your personal
                    information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Consent.</strong> We may process your information
                      if you have given us permission (i.e., consent) to use
                      your personal information for a specific purpose. You can
                      withdraw your consent at any time. Learn more about
                      withdrawing your consent.
                    </li>
                    <li>
                      <strong>Performance of a Contract.</strong> We may process
                      your personal information when we believe it is necessary
                      to fulfill our contractual obligations to you, including
                      providing our Services or at your request prior to
                      entering into a contract with you.
                    </li>
                    <li>
                      <strong>Legitimate Interests.</strong> We may process your
                      information when we believe it is reasonably necessary to
                      achieve our legitimate business interests and those
                      interests do not outweigh your interests and fundamental
                      rights and freedoms. For example, we may process your
                      personal information for some of the purposes described in
                      order to:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          Send users information about special offers and
                          discounts on our products and services.
                        </li>
                        <li>
                          Develop and display personalized and relevant
                          advertising content for our users.
                        </li>
                        <li>
                          Analyze how our Services are used so we can improve
                          them to engage and retain users.
                        </li>
                        <li>Support our marketing activities.</li>
                        <li>
                          Diagnose problems and/or prevent fraudulent
                          activities.
                        </li>
                        <li>
                          Understand how our users use our products and services
                          so we can improve user experience.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>Legal Obligations.</strong> We may process your
                      information where we believe it is necessary for
                      compliance with our legal obligations, such as to
                      cooperate with a law enforcement body or regulatory
                      agency, exercise or defend our legal rights, or disclose
                      your information as evidence in litigation in which we are
                      involved.
                    </li>
                    <li>
                      <strong>Vital Interests.</strong> We may process your
                      information where we believe it is necessary to protect
                      your vital interests or the vital interests of a third
                      party, such as situations involving potential threats to
                      the safety of any person.
                    </li>
                  </ul>

                  <p className="font-semibold mt-6">
                    If you are located in Canada, this section applies to you.
                  </p>
                  <p>
                    We may process your information if you have given us
                    specific permission (i.e., express consent) to use your
                    personal information for a specific purpose, or in
                    situations where your permission can be inferred (i.e.,
                    implied consent). You can withdraw your consent at any time.
                  </p>
                  <p>
                    In some exceptional cases, we may be legally permitted under
                    applicable law to process your information without your
                    consent, including, for example:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      If collection is clearly in the interests of an individual
                      and consent cannot be obtained in a timely way.
                    </li>
                    <li>
                      For investigations and fraud detection and prevention.
                    </li>
                    <li>
                      For business transactions provided certain conditions are
                      met.
                    </li>
                    <li>
                      If it is contained in a witness statement and the
                      collection is necessary to assess, process, or settle an
                      insurance claim.
                    </li>
                    <li>
                      For identifying injured, ill, or deceased persons and
                      communicating with next of kin.
                    </li>
                    <li>
                      If we have reasonable grounds to believe an individual has
                      been, is, or may be victim of financial abuse.
                    </li>
                    <li>
                      If it is reasonable to expect collection and use with
                      consent would compromise the availability or the accuracy
                      of the information and the collection is reasonable for
                      purposes related to investigating a breach of an agreement
                      or a contravention of the laws of Canada or a province.
                    </li>
                    <li>
                      If disclosure is required to comply with a subpoena,
                      warrant, court order, or rules of the court relating to
                      the production of records.
                    </li>
                    <li>
                      If it was produced by an individual in the course of their
                      employment, business, or profession and the collection is
                      consistent with the purposes for which the information was
                      produced.
                    </li>
                    <li>
                      If the collection is solely for journalistic, artistic, or
                      literary purposes.
                    </li>
                    <li>
                      If the information is publicly available and is specified
                      by the regulations.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 4. WHEN AND WITH WHOM DO WE SHARE */}
              <section id="when-and-with-whom-do-we-share">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> We may share information in
                    specific situations described in this section and/or with
                    the following third parties.
                  </p>
                  <p>
                    We may need to share your personal information in the
                    following situations:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Business Transfers.</strong> We may share or
                      transfer your information in connection with, or during
                      negotiations of, any merger, sale of company assets,
                      financing, or acquisition of all or a portion of our
                      business to another company.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 5. COOKIES AND TRACKING */}
              <section id="cookies-and-tracking">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> We may use cookies and other
                    tracking technologies to collect and store your information.
                  </p>
                  <p>
                    We may use cookies and similar tracking technologies (like
                    web beacons and pixels) to gather information when you
                    interact with our Services. Some online tracking
                    technologies help us maintain the security of our Services
                    and your account, prevent crashes, fix bugs, save your
                    preferences, and assist with basic site functions.
                  </p>
                  <p>
                    We also permit third parties and service providers to use
                    online tracking technologies on our Services for analytics
                    and advertising, including to help manage and display
                    advertisements, to tailor advertisements to your interests,
                    or to send abandoned shopping cart reminders (depending on
                    your communication preferences). The third parties and
                    service providers use their technology to provide advertising
                    about products and services tailored to your interests which
                    may appear either on our Services or on other websites.
                  </p>
                  <p>
                    To the extent these online tracking technologies are deemed
                    to be a &quot;sale&quot;/&quot;sharing&quot; (which includes
                    targeted advertising, as defined under the applicable laws)
                    under applicable US state laws, you can opt out of these
                    online tracking technologies by submitting a request as
                    described below under section &quot;DO UNITED STATES
                    RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?&quot;
                  </p>
                  <p>
                    Specific information about how we use such technologies and
                    how you can refuse certain cookies is set out in our Cookie
                    Policy.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Google Analytics
                  </h3>
                  <p>
                    We may share your information with Google Analytics to track
                    and analyze the use of the Services. The Google Analytics
                    Advertising Features that we may use include: Google
                    Analytics Demographics and Interests Reporting and
                    Remarketing with Google Analytics. To opt out of being
                    tracked by Google Analytics across the Services, visit{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      https://tools.google.com/dlpage/gaoptout
                    </a>
                    . You can opt out of Google Analytics Advertising Features
                    through Ads Settings and Ad Settings for mobile apps. Other
                    opt-out means include{" "}
                    <a
                      href="http://optout.networkadvertising.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      http://optout.networkadvertising.org/
                    </a>{" "}
                    and{" "}
                    <a
                      href="http://www.networkadvertising.org/mobile-choice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      http://www.networkadvertising.org/mobile-choice
                    </a>
                    . For more information on the privacy practices of Google,
                    please visit the Google Privacy &amp; Terms page.
                  </p>
                </div>
              </section>

              {/* 6. AI-BASED PRODUCTS */}
              <section id="ai-based-products">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  6. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> We offer products, features, or
                    tools powered by artificial intelligence, machine learning,
                    or similar technologies.
                  </p>
                  <p>
                    As part of our Services, we offer products, features, or
                    tools powered by artificial intelligence, machine learning,
                    or similar technologies (collectively, &quot;AI
                    Products&quot;). These tools are designed to enhance your
                    experience and provide you with innovative solutions. The
                    terms in this Privacy Policy govern your use of the AI
                    Products within our Services.
                  </p>

                  <h3 className="text-xl font-semibold mt-4">
                    Our AI Products
                  </h3>
                  <p>
                    Our AI Products are designed for the following functions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>AI applications</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-4">
                    How We Process Your Data Using AI
                  </h3>
                  <p>
                    All personal information processed using our AI Products is
                    handled in line with our Privacy Policy and our agreement
                    with third parties. This ensures high security and
                    safeguards your personal information throughout the process,
                    giving you peace of mind about your data&apos;s safety.
                  </p>
                </div>
              </section>

              {/* 7. SOCIAL LOGINS */}
              <section id="social-logins">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> If you choose to register or log
                    in to our Services using a social media account, we may have
                    access to certain information about you.
                  </p>
                  <p>
                    Our Services offer you the ability to register and log in
                    using your third-party social media account details (like
                    your Facebook or X logins). Where you choose to do this, we
                    will receive certain profile information about you from your
                    social media provider. The profile information we receive may
                    vary depending on the social media provider concerned, but
                    will often include your name, email address, friends list,
                    and profile picture, as well as other information you choose
                    to make public on such a social media platform.
                  </p>
                  <p>
                    We will use the information we receive only for the purposes
                    that are described in this Privacy Policy or that are
                    otherwise made clear to you on the relevant Services. Please
                    note that we do not control, and are not responsible for,
                    other uses of your personal information by your third-party
                    social media provider. We recommend that you review their
                    privacy policy to understand how they collect, use, and
                    share your personal information, and how you can set your
                    privacy preferences on their sites and apps.
                  </p>
                </div>
              </section>

              {/* 8. HOW LONG DO WE KEEP */}
              <section id="how-long-do-we-keep">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  8. HOW LONG DO WE KEEP YOUR INFORMATION?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> We keep your information for as
                    long as necessary to fulfill the purposes outlined in this
                    Privacy Policy unless otherwise required by law.
                  </p>
                  <p>
                    We will only keep your personal information for as long as
                    it is necessary for the purposes set out in this Privacy
                    Policy, unless a longer retention period is required or
                    permitted by law (such as tax, accounting, or other legal
                    requirements). No purpose in this Policy will require us
                    keeping your personal information for longer than the period
                    of time in which users have an account with us.
                  </p>
                  <p>
                    When we have no ongoing legitimate business need to process
                    your personal information, we will either delete or
                    anonymize such information, or, if this is not possible (for
                    example, because your personal information has been stored
                    in backup archives), then we will securely store your
                    personal information and isolate it from any further
                    processing until deletion is possible.
                  </p>
                </div>
              </section>

              {/* 9. HOW DO WE KEEP YOUR INFORMATION SAFE */}
              <section id="how-do-we-keep-your-information-safe">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  9. HOW DO WE KEEP YOUR INFORMATION SAFE?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> We aim to protect your personal
                    information through a system of organizational and technical
                    security measures.
                  </p>
                  <p>
                    We have implemented appropriate and reasonable technical and
                    organizational security measures designed to protect the
                    security of any personal information we process. However,
                    despite our safeguards and efforts to secure your
                    information, no electronic transmission over the Internet or
                    information storage technology can be guaranteed to be 100%
                    secure, so we cannot promise or guarantee that hackers,
                    cybercriminals, or other unauthorized third parties will not
                    be able to defeat our security and improperly collect,
                    access, steal, or modify your information.
                  </p>
                  <p>
                    Although we will do our best to protect your personal
                    information, transmission of personal information to and
                    from our Services is at your own risk. You should only
                    access the Services within a secure environment.
                  </p>
                </div>
              </section>

              {/* 10. WHAT ARE YOUR PRIVACY RIGHTS */}
              <section id="what-are-your-privacy-rights">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  10. WHAT ARE YOUR PRIVACY RIGHTS?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> Depending on your state of
                    residence in the US or in some regions, such as the European
                    Economic Area (EEA), United Kingdom (UK), Switzerland, and
                    Canada, you have rights that allow you greater access to and
                    control over your personal information. You may review,
                    change, or terminate your account at any time, depending on
                    your country, province, or state of residence.
                  </p>
                  <p>
                    In some regions (like the EEA, UK, Switzerland, and Canada),
                    you have certain rights under applicable data protection
                    laws. These may include the right (i) to request access and
                    obtain a copy of your personal information, (ii) to request
                    rectification or erasure; (iii) to restrict the processing
                    of your personal information; (iv) if applicable, to data
                    portability; and (v) not to be subject to automated
                    decision-making. In certain circumstances, you may also have
                    the right to object to the processing of your personal
                    information. You can make such a request by contacting us by
                    using the contact details provided in the section &apos;HOW
                    CAN YOU CONTACT US ABOUT THIS POLICY?&apos; below.
                  </p>
                  <p>
                    We will consider and act upon any request in accordance with
                    applicable data protection laws.
                  </p>
                  <p>
                    If you are located in the EEA or UK and you believe we are
                    unlawfully processing your personal information, you also
                    have the right to complain to your local data protection
                    authority:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>EU Data Protection Authorities</li>
                    <li>UK Information Commissioner&apos;s Office</li>
                  </ul>
                  <p>
                    If you are located in Switzerland, you may contact the
                    Federal Data Protection and Information Commissioner.
                  </p>
                  <p>
                    <strong>Withdrawing your consent:</strong> If we are relying
                    on your consent to process your personal information, which
                    may be express and/or implied consent depending on the
                    applicable law, you have the right to withdraw your consent
                    at any time. You can withdraw your consent at any time by
                    contacting us by using the contact details provided in the
                    section &quot;HOW CAN YOU CONTACT US ABOUT THIS
                    POLICY?&quot; below.
                  </p>
                  <p>
                    However, please note that this will not affect the
                    lawfulness of the processing before its withdrawal nor, when
                    applicable law allows, will it affect the processing of your
                    personal information conducted in reliance on lawful
                    processing grounds other than consent.
                  </p>
                  <p>
                    <strong>
                      Opting out of marketing and promotional communications:
                    </strong>{" "}
                    You can unsubscribe from our marketing and promotional
                    communications at any time by clicking on the unsubscribe
                    link in the emails that we send, or by contacting us using
                    the details provided in the section &quot;HOW CAN YOU
                    CONTACT US ABOUT THIS POLICY?&quot; below. You will then be
                    removed from the marketing lists. However, we may still
                    communicate with you — for example, to send you
                    service-related messages that are necessary for the
                    administration and use of your account, to respond to
                    service requests, or for other non-marketing purposes.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Account Information
                  </h3>
                  <p>
                    If you would at any time like to review or change the
                    information in your account or terminate your account, you
                    can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Log in to your account settings and update your user
                      account.
                    </li>
                  </ul>
                  <p>
                    Upon your request to terminate your account, we will
                    deactivate or delete your account and information from our
                    active databases. However, we may retain some information in
                    our files to prevent fraud, troubleshoot problems, assist
                    with any investigations, enforce our legal terms and/or
                    comply with applicable legal requirements.
                  </p>
                  <p>
                    <strong>Cookies and similar technologies:</strong> Most Web
                    browsers are set to accept cookies by default. If you
                    prefer, you can usually choose to set your browser to remove
                    cookies and to reject cookies. If you choose to remove
                    cookies or reject cookies, this could affect certain features
                    or services of our Services.
                  </p>
                  <p>
                    If you have questions or comments about your privacy rights,
                    you may email us at{" "}
                    <a
                      href="mailto:info@alphawrite.ai"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      info@alphawrite.ai
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* 11. DO-NOT-TRACK */}
              <section id="do-not-track">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  11. CONTROLS FOR DO-NOT-TRACK FEATURES
                </h2>
                <div className="space-y-4">
                  <p>
                    Most web browsers and some mobile operating systems and
                    mobile applications include a Do-Not-Track (&quot;DNT&quot;)
                    feature or setting you can activate to signal your privacy
                    preference not to have data about your online browsing
                    activities monitored and collected.
                  </p>
                  <p>
                    At this stage, no uniform technology standard for
                    recognizing and implementing DNT signals has been finalized.
                    As such, we do not currently respond to DNT browser signals
                    or any other mechanism that automatically communicates your
                    choice not to be tracked online.
                  </p>
                  <p>
                    If a standard for online tracking is adopted that we must
                    follow in the future, we will inform you about that practice
                    in a revised version of this Privacy Policy.
                  </p>
                </div>
              </section>

              {/* 12. US RESIDENTS RIGHTS */}
              <section id="us-residents-rights">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  12. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> If you are a resident of
                    California, Colorado, Connecticut, Delaware, Florida,
                    Indiana, Iowa, Kentucky, Minnesota, Montana, Nebraska, New
                    Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, or
                    Virginia, you may have the right to request access to and
                    receive details about the personal information we maintain
                    about you and how we have processed it, correct
                    inaccuracies, get a copy of, or delete your personal
                    information. You may also have the right to withdraw your
                    consent to our processing of your personal information.
                    These rights may be limited in some circumstances by
                    applicable law. More information is provided below.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    Categories of Personal Information We Collect
                  </h3>
                  <p>
                    We have collected the following categories of personal
                    information in the past twelve (12) months:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-sm">
                      <thead>
                        <tr className="bg-violet-50">
                          <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                            Category
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                            Examples
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left font-semibold">
                            Collected
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            A. Identifiers
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Contact details, such as real name, alias, postal
                            address, telephone or mobile contact number, unique
                            personal identifier, online identifier, Internet
                            Protocol address, email address, and account name.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            YES
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            B. Personal information (California Customer
                            Records)
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Name, contact information, education, employment,
                            employment history, and financial information.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            YES
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            C. Protected classification characteristics
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Gender, age, date of birth, race and ethnicity,
                            national origin, marital status, and other
                            demographic data.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            YES
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            D. Commercial information
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Transaction information, purchase history, financial
                            details, and payment information.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            YES
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            G. Geolocation data
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Device location.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            YES
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            H. Audio, electronic, sensory, or similar
                            information
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Images and audio, video or call recordings created
                            in connection with our business activities.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            NO
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            I. Professional or employment-related information
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Business contact details in order to provide you our
                            Services at a business level or job title, work
                            history, and professional qualifications if you
                            apply for a job with us.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            NO
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            J. Education Information
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Student records and directory information.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            NO
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2">
                            K. Inferences drawn from collected personal
                            information
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            Inferences drawn from any of the collected personal
                            information listed above to create a profile or
                            summary about, for example, an individual&apos;s
                            preferences and characteristics.
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            NO
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>
                    We may also collect other personal information outside of
                    these categories through instances where you interact with
                    us in person, online, or by phone or mail in the context of:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Receiving help through our customer support channels;
                    </li>
                    <li>
                      Participation in customer surveys or contests; and
                    </li>
                    <li>
                      Facilitation in the delivery of our Services and to
                      respond to your inquiries.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6">
                    How We Use and Share Personal Information
                  </h3>
                  <p>
                    Learn more about how we use your personal information in the
                    section, &quot;HOW DO WE PROCESS YOUR INFORMATION?&quot;
                  </p>
                  <p>
                    <strong>
                      Will your information be shared with anyone else?
                    </strong>
                  </p>
                  <p>
                    We may disclose your personal information with our service
                    providers pursuant to a written contract between us and each
                    service provider. Learn more about how we disclose personal
                    information in the section, &quot;WHEN AND WITH WHOM DO WE
                    SHARE YOUR PERSONAL INFORMATION?&quot;
                  </p>
                  <p>
                    We may use your personal information for our own business
                    purposes, such as for undertaking internal research for
                    technological development and demonstration. This is not
                    considered to be &quot;selling&quot; of your personal
                    information.
                  </p>
                  <p>
                    We have not disclosed, sold, or shared any personal
                    information to third parties for a business or commercial
                    purpose in the preceding twelve (12) months. We will not
                    sell or share personal information in the future belonging
                    to website visitors, users, and other consumers.
                  </p>
                </div>
              </section>

              {/* 13. UPDATES TO POLICY */}
              <section id="updates-to-policy">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  13. DO WE MAKE UPDATES TO THIS POLICY?
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>In Short:</strong> Yes, we will update this Policy
                    as necessary to stay compliant with relevant laws.
                  </p>
                  <p>
                    We may update this Privacy Policy from time to time. The
                    updated version will be indicated by an updated
                    &quot;Revised&quot; date at the top of this Privacy Policy.
                    If we make material changes to this Privacy Policy, we may
                    notify you either by prominently posting a notice of such
                    changes or by directly sending you a notification. We
                    encourage you to review this Privacy Policy frequently to be
                    informed of how we are protecting your information.
                  </p>
                </div>
              </section>

              {/* 14. CONTACT US */}
              <section id="contact-us">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  14. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
                </h2>
                <div className="space-y-2">
                  <p>
                    If you have questions or comments about this Policy, you may
                    email us at{" "}
                    <a
                      href="mailto:info@alphawrite.ai"
                      className="text-[#8B5CF6] hover:underline"
                    >
                      info@alphawrite.ai
                    </a>{" "}
                    or contact us by post at:
                  </p>
                  <p className="font-semibold">Axionlabs Limited</p>
                  <p>London</p>
                  <p>United Kingdom</p>
                </div>
              </section>

              {/* 15. REVIEW, UPDATE, DELETE */}
              <section id="review-update-delete">
                <h2 className="text-2xl font-semibold mb-4 text-[#8B5CF6]">
                  15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?
                </h2>
                <p>
                  You have the right to request access to the personal
                  information we collect from you, details about how we have
                  processed it, correct inaccuracies, or delete your personal
                  information. You may also have the right to withdraw your
                  consent to our processing of your personal information. These
                  rights may be limited in some circumstances by applicable law.
                </p>
                <p className="mt-4">
                  To request to review, update, or delete your personal
                  information, please fill out and submit a data subject access
                  request by contacting us at{" "}
                  <a
                    href="mailto:info@alphawrite.ai"
                    className="text-[#8B5CF6] hover:underline"
                  >
                    info@alphawrite.ai
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
