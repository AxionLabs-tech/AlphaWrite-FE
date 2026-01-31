import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition",
        variant === "default" && "bg-[#8B5CF6] text-white",
        variant === "secondary" && "bg-slate-100 text-slate-700",
        variant === "outline" && "border border-slate-200 bg-transparent text-slate-700",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
