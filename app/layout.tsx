import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlphaWrite – #1 AI Text Humanizer & Detector",
  description:
    "AlphaWrite turns AI-drafted text into authentic, human-sounding content—built to pass any AI detection check effortlessly.",
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
    title: "AlphaWrite – #1 AI Text Humanizer & Detector",
    description:
      "AlphaWrite turns AI-drafted text into authentic, human-sounding content—built to pass any AI detection check effortlessly.",
    images: [
      {
        url: "/alphawrites.png",
        width: 1200,
        height: 630,
        alt: "AlphaWrite – #1 AI Text Humanizer & Detector",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaWrite – #1 AI Text Humanizer & Detector",
    description:
      "AlphaWrite turns AI-drafted text into authentic, human-sounding content—built to pass any AI detection check effortlessly.",
    images: ["/alphawrites.png"],
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
    <html lang="en">
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
      </body>
    </html>
  );
}
