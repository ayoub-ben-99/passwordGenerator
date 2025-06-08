// src/components/ui/button.tsx
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-full hover:scale-95 cursor-pointer active:scale-105 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
