'use client';

import Image from 'next/image';

const logos = [
  { src: '/ply.svg', alt: 'Ply' },
  { src: '/harvard.svg', alt: 'Harvard' },
  { src: '/stanford.svg', alt: 'Stanford' },
  { src: '/durham.svg', alt: 'Durham' },
];

export default function TrustedByUniversities() {
  return (
    <section
      className="mb-20 flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-48 mt-16 lg:mt-32 gap-8"
      aria-labelledby="trusted-heading"
    >
      {/* Heading block */}
      <div className="w-full text-center">
        <h2
          id="trusted-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
        >
          Trusted by Students in Top
          <br className="hidden sm:block" /> Universities
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Join thousands of students leveling up
          <br className="hidden sm:block" /> their academics worldwide.
        </p>
      </div>

      {/* Carousel container */}
      <div className="group relative w-full max-w-full overflow-hidden">
        {/* Left gradient edge */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
        {/* Right gradient edge */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10 bg-gradient-to-l from-white to-transparent"
          aria-hidden
        />

        {/* Marquee strip: two identical sets for seamless -50% loop */}
        <div
          className="flex items-center gap-12 sm:gap-16 md:gap-24 lg:gap-28 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused] animate-trusted-marquee"
          style={{ width: 'max-content' }}
        >
          {/* Set 1: full opacity */}
          {logos.map(({ src, alt }) => (
            <div key={`a-${alt}`} className="shrink-0">
              <Image
                src={src}
                alt={alt}
                width={120}
                height={48}
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
          {/* Set 2: same four, de-emphasized and ignored by assistive tech */}
          {logos.map(({ src, alt }) => (
            <div key={`b-${alt}`} className="shrink-0 opacity-70" aria-hidden>
              <Image
                src={src}
                alt=""
                width={120}
                height={48}
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes trusted-marquee-keyframes {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-trusted-marquee {
          animation: trusted-marquee-keyframes 14s linear infinite;
        }
      `}</style>
    </section>
  );
}
