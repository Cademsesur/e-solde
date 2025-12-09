"use client";

interface FormSectionTitleProps {
  children: React.ReactNode;
}

export function FormSectionTitle({ children }: FormSectionTitleProps) {
  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-montserrat text-[#0F2137] mb-2 sm:mb-3 text-center">
      {children}
    </h2>
  );
}
