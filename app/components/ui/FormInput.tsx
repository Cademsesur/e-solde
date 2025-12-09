"use client";

import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, id, className, ...props }: FormInputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full">
      <label 
        htmlFor={inputId} 
        className="block text-xs sm:text-sm font-semibold font-montserrat text-[#0F2137] mb-1.5 sm:mb-2"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`
          w-full h-[44px] sm:h-[48px] md:h-[52px] px-3 sm:px-4 rounded-md text-sm sm:text-base font-montserrat bg-white
          placeholder:text-[#999999] transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#0F2137] focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-2 border-[#EF1A1A]' : 'border border-[#DCDCDC]'}
          ${className || ''}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      {error && (
        <p className="text-xs sm:text-sm font-montserrat text-[#EF1A1A] mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
