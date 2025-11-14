import Image from "next/image";
import { Mail, Phone, Link2, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] font-open-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Ligne 1 - Logos et liens */}
  <div className="relative flex items-center justify-between py-5 sm:py-6 md:py-7">
          <div className="h-12 sm:h-14 md:h-16 lg:h-[70px] w-[150px] sm:w-[180px] md:w-[200px] lg:w-[210px] relative">
            <Image
              src="/assets/logo.png"
              alt="Logo e-solde"
              fill
              className="object-contain"
            />
          </div>
          
          {/* Liens centrés - masqués sur mobile */}
          <div className="absolute left-0 right-0 hidden lg:flex justify-center gap-10 xl:gap-12 pointer-events-none">
            <a href="#" className="pointer-events-auto text-[#0F2137] text-base xl:text-lg hover:text-[#0F2137]/80 font-open-sans font-medium transition-colors">
              Se connecter
            </a>
            <a href="#" className="pointer-events-auto text-[#0F2137] text-base xl:text-lg hover:text-[#0F2137]/80 font-open-sans font-medium transition-colors">
              Contactez-nous
            </a>
          </div>
          
          <div className="h-10 sm:h-12 md:h-14 lg:h-[56px] w-[125px] sm:w-[150px] md:w-[165px] lg:w-[175px] relative">
            <Image
              src="/assets/portail.png"
              alt="Portail"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Liens visibles sur mobile */}
        <div className="flex lg:hidden justify-center gap-6 sm:gap-8 py-4 sm:py-5 border-b border-gray-200">
          <a href="#" className="text-[#0F2137] text-sm sm:text-base hover:text-[#0F2137]/80 font-open-sans font-medium transition-colors">
            Se connecter
          </a>
          <a href="#" className="text-[#0F2137] text-sm sm:text-base hover:text-[#0F2137]/80 font-open-sans font-medium transition-colors">
            Contactez-nous
          </a>
        </div>

        <div className="flex flex-col space-y-5 sm:space-y-6 py-6 sm:py-7 md:py-8">
          {/* Ligne 2 - Contacts */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 text-[#343D48] text-sm lg:text-base font-open-sans">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 lg:h-5 lg:w-5 shrink-0 text-[#0F2137]" /> 
              <span>bulletin.cg</span>
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 lg:h-5 lg:w-5 shrink-0 text-[#0F2137]" /> 
              <span>+242 0699934662</span>
            </span>
            <span className="flex items-center gap-2">
              <Link2 className="h-4 w-4 lg:h-5 lg:w-5 shrink-0 text-[#0F2137]" /> 
              <span>www.tax.cg</span>
            </span>
          </div>

          {/* Ligne 3 - Réseaux sociaux */}
          <div className="flex justify-center items-center gap-2.5">
            <a 
              href="#" 
              className="flex items-center justify-center rounded-full bg-[#0F2137] w-9 h-9 hover:bg-[#0F2137]/90 transition-all hover:scale-105"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a 
              href="#" 
              className="flex items-center justify-center rounded-full bg-[#0F2137] w-9 h-9 hover:bg-[#0F2137]/90 transition-all hover:scale-105"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 text-white" />
            </a>
            <a 
              href="#" 
              className="flex items-center justify-center rounded-full bg-[#0F2137] w-9 h-9 hover:bg-[#0F2137]/90 transition-all hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            <a 
              href="#" 
              className="flex items-center justify-center rounded-full bg-[#0F2137] w-9 h-9 hover:bg-[#0F2137]/90 transition-all hover:scale-105"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Ligne 4 - Copyright */}
          <div className="flex justify-center items-center">
            <span className="text-[#343D48] text-xs sm:text-sm lg:text-base font-open-sans text-center">
              cg© 2025 Tous droits réservés
            </span>
          </div>

          {/* Ligne 5 - Bande couleurs */}
          <div className="flex justify-center items-center pt-2 pb-3">
            <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl h-2.5 rounded-full overflow-hidden">
              <div className="h-full flex-1 bg-[#009543]"></div>
              <div className="h-full flex-1 bg-[#FFD600]"></div>
              <div className="h-full flex-1 bg-[#EF1A1A]"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}