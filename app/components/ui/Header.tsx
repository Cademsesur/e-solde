"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-30 bg-transparent">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between py-2 sm:py-3">
          <div className="cursor-pointer">
            <Image 
              src="/assets/logo.png" 
              alt="Logo e-solde" 
              height={70} 
              width={210} 
              className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto drop-shadow-lg filter invert brightness-0" 
              priority 
            />
          </div>
          <Image 
            src="/assets/portail.png" 
            alt="Portail" 
            height={56} 
            width={175} 
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto drop-shadow-lg filter invert brightness-0 contrast-200" 
          />
        </div>
      </div>
    </header>
  );
}
