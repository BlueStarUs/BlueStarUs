import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold font-heading transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantClasses = {
      primary:
        "bg-brand-blue text-white border-[1.5px] border-brand-blue hover:bg-brand-navy hover:border-brand-navy shadow-sm",
      outline:
        "bg-white text-brand-blue border-[1.5px] border-brand-blue hover:bg-brand-sky",
      white:
        "bg-white text-brand-navy border-[1.5px] border-white hover:bg-brand-sky hover:border-brand-sky shadow-sm",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-xs",
      md: "px-[22px] py-3 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    const combinedClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

