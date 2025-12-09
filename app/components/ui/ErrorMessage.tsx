"use client";

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="p-3 rounded-md bg-[#FEF2F2] border border-[#EF1A1A]">
      <p className="text-sm font-montserrat text-[#EF1A1A] text-center">
        {message}
      </p>
    </div>
  );
}
