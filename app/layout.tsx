import type { Metadata } from "next";
import { Josefin_Sans, Geist_Mono, Playfair_Display, Fraunces } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./components/Providers";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["italic"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces-raw",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AlphaWrite – Your AI Study Companion",
  description:
    "AlphaWrite is the AI study companion for students: understand your materials, build flashcards, prep for exams, and write essays that sound human.",
  keywords: [
    "AlphaWrite",
    "AI humanizer",
    "AI text humanizer",
    "AI detector",
    "AI content detector",
    "humanize AI text",
    "bypass AI detection",
    "bypass Turnitin",
    "bypass GPTZero",
    "bypass Copyleaks",
    "undetectable AI writing",
    "AI paraphraser",
    "AI rewriter",
    "make AI text human",
    "AI essay humanizer",
    "AI writing tool",
    "pass AI detection",
    "AI to human text converter",
    "anti AI detector",
    "AI text rewriter",
    "humanize ChatGPT text",
    "essay rewriter",
    "academic writing tool",
    "student writing assistant",
  ],
  authors: [{ name: "AlphaWrite Team" }],
  creator: "AlphaWrite",
  publisher: "AlphaWrite",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://alphawrite.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alphawrite.ai",
    siteName: "AlphaWrite",
    title: "AlphaWrite – Your AI Study Companion",
    description:
      "AlphaWrite is the AI study companion for students: understand your materials, build flashcards, prep for exams, and write essays that sound human.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AlphaWrite – Your AI Study Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaWrite – Your AI Study Companion",
    description:
      "AlphaWrite is the AI study companion for students: understand your materials, build flashcards, prep for exams, and write essays that sound human.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "1024x1024", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MS4GW4FQ');`,
          }}
        />
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-127844YPY8"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-127844YPY8');`,
          }}
        />
      </head>
      <body
        className={`${josefinSans.variable} ${geistMono.variable} ${playfair.variable} ${fraunces.variable} antialiased`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MS4GW4FQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>{children}</Providers>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
