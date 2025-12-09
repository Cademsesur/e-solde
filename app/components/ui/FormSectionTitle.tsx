"use client";

interface FormSectionTitleProps {
  children: React.ReactNode;
}

export function FormSectionTitle({ children }: FormSectionTitleProps) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0F2137] mb-3 text-center">
      {children}
    </h2>
  );
}
