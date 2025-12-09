"use client";

interface FormTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export function FormTitle({ children, subtitle }: FormTitleProps) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-montserrat text-[#0F2137] leading-tight mb-2 sm:mb-4">
        {children}
      </h1>
      {subtitle && (
        <p className="text-sm sm:text-base font-montserrat text-[#343D48]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
