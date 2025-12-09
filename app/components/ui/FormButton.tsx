"use client";

import { ButtonHTMLAttributes } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  loadingText?: string;
}

export function FormButton({ 
  variant = 'primary', 
  isLoading = false,
  loadingText = "Chargement...",
  children,
  className,
  disabled,
  ...props 
}: FormButtonProps) {
  const baseClasses = `
    w-full h-[52px] px-6 rounded-lg text-base font-semibold font-montserrat
    transition-colors duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
  `.trim().replace(/\s+/g, ' ');
  
  const variantClasses = variant === 'primary'
    ? 'bg-[#047236] text-white hover:bg-[#035a2a]'
    : 'bg-white text-[#047236] border-2 border-[#047236] hover:bg-[#0472360D]';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className || ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
