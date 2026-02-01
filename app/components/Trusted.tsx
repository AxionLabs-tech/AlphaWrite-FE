'use client'
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const universityImages = [
  {
    src: "/harvard-university.png",
    alt: "Harvard University",
  },
  {
    src: "/stanford.png",
    alt: "Stanford University",
  },
  {
    src: "/mitu.png",
    alt: "MIT",
  },
  {
    src: "/UofO.jpg",
    alt: "Oxford University",
  },
  {
    src: "/UofT.jpg",
    alt: "University of Toronto",
  },
];

export default function TrustedByUniversities() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % universityImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center justify-center">
      {/* Heading */}
      <div className="text-center max-w-3xl mb-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Trusted by Students in Top Universities
        </h2>
        <p className="mt-4 text-base md:text-lg text-muted-foreground">
          Join thousands of students leveling up their academics worldwide.
        </p>
      </div>

      {/* Slideshow */}
      <div className="relative w-full max-w-3xl h-56 md:h-72 rounded-2xl overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={universityImages[index].src}
              alt={universityImages[index].alt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex gap-2 mt-6">
        {universityImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6" : "w-2.5 opacity-50"
            } bg-black/70`}
          />
        ))}
      </div>
    </section>
  );
}
