import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  /** sm = mobile header; md = sidebar (default) */
  size?: "sm" | "md";
  variant?: "light" | "dark";
};

export function BrandLogo({
  className,
  size = "md",
  variant = "light",
}: BrandLogoProps) {
  const markSize = size === "sm" ? 32 : 40;
  const alphaClass = size === "sm" ? "text-lg" : "text-[1.35rem]";
  const writesClass = size === "sm" ? "text-lg" : "text-[1.4rem]";

  const alphaColor = variant === "light" ? "text-[#1A1233]" : "text-white";
  const writesColor =
    variant === "light" ? "text-[#8D69F3]" : "text-[#B9A3F0]";
  const markSrc =
    variant === "light"
      ? "/logos/Alpha-Writes-Logo/mark/alpha-writes-mark-purple.png"
      : "/logos/Alpha-Writes-Logo/mark/alpha-writes-mark-white.png";

  return (
    <span
      className={cn("inline-flex items-center gap-2.5 leading-none", className)}
    >
      <Image
        src={markSrc}
        alt=""
        width={markSize}
        height={markSize}
        className="shrink-0 object-contain"
        style={{ width: markSize, height: markSize }}
        priority
      />
      <span className="flex items-baseline gap-1">
        <span
          style={{ fontFamily: "var(--font-fraunces-raw)" }}
          className={cn(
            "font-semibold tracking-tight",
            alphaClass,
            alphaColor,
          )}
        >
          Alpha
        </span>
        <span
          style={{ fontFamily: "var(--font-playfair)" }}
          className={cn(
            "font-medium italic tracking-tight",
            writesClass,
            writesColor,
          )}
        >
          Writes
        </span>
      </span>
    </span>
  );
}
