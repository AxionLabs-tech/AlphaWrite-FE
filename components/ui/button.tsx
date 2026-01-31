import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" &&
            "bg-[#8B5CF6] text-white shadow-lg shadow-violet-500/25 hover:bg-violet-600",
          variant === "secondary" && "bg-slate-100 text-slate-900 hover:bg-slate-200",
          variant === "outline" &&
            "border-2 border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-slate-50",
          variant === "ghost" && "text-slate-700 hover:bg-slate-100",
          size === "default" && "h-11 px-6 py-2 text-base",
          size === "sm" && "h-9 px-4 text-sm",
          size === "lg" && "h-12 px-8 text-base",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
