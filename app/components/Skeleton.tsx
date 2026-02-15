import { type HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional className to add to the wrapper */
  className?: string;
}

/**
 * Skeleton placeholder with pulse animation. Use for loading states.
 */
export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-pulse rounded-md bg-slate-200 ${className}`}
      {...props}
    />
  );
}
