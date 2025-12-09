/**
 * Header du Dashboard
 * Affiche le header avec logo + portail et les informations du profil utilisateur
 */

"use client";

import React, { useState } from "react";
import { useProfile } from "@/app/lib/hooks";
import Image from "next/image";
import ProfileModal from "./dashboard/ProfileModal";

export default function DashboardHeader() {
  const { profile, isLoading } = useProfile();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      {/* Header avec logo (sans portail) */}
      <header style={{ backgroundColor: '#04723608' }}>
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between py-2 sm:py-3">
            {/* Logo à gauche */}
            <div className="cursor-default select-none">
              <Image 
                src="/assets/logo.png" 
                alt="Logo e-solde" 
                height={70} 
                width={210} 
                className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto" 
                priority 
              />
            </div>
            {/* Profil utilisateur à droite - Nom, Prénom et Avatar */}
            {!isLoading && profile && (
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-right">
                  <p className="text-sm sm:text-base font-semibold text-black font-montserrat">
                    {profile.name}
                  </p>
                </div>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 shrink-0 hover:opacity-80 transition cursor-pointer"
                >
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#047236] text-white font-bold text-sm sm:text-base">
                      {profile.name?.charAt(0) || "U"}
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenu principal sans message de bienvenue */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mt-6 sm:mt-8">
        {/* Espace vide pour le layout - peut être utilisé pour d'autres contenus */}
      </div>

      {/* Modal de profil */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </>
  );
}
