// src/components/ui/button.tsx
"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "danger";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "px-4 py-2 rounded text-sm font-medium transition",
          {
            "bg-blue-600 text-white hover:bg-blue-700": variant === "default",
            "bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-800":
              variant === "outline",
            "bg-red-600 text-white hover:bg-red-700": variant === "danger",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
