"use client";

interface FormTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export function FormTitle({ children, subtitle }: FormTitleProps) {
  return (
    <div className="mb-4 sm:mb-6 text-center">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold font-montserrat text-[#0F2137] leading-tight mb-1 sm:mb-2 md:mb-4">
        {children}
      </h1>
      {subtitle && (
        <p className="text-xs sm:text-sm md:text-base font-montserrat text-[#343D48]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
