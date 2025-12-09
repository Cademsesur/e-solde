/**
 * Header partagé du Dashboard et Settings
 * Affiche le header avec logo + portail et les informations du profil utilisateur
 */

"use client";

import React from "react";
import { useProfile } from "@/app/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { profile, isLoading } = useProfile();
  const router = useRouter();

  return (
    <header style={{ backgroundColor: '#04723608' }}>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo à gauche - cliquable pour revenir au dashboard */}
          <button 
            onClick={() => router.push('/dashboard')}
            className="cursor-pointer hover:opacity-80 transition"
          >
            <Image 
              src="/assets/logo.png" 
              alt="Logo e-solde" 
              height={70} 
              width={210} 
              className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto" 
              priority 
            />
          </button>
          {/* Profil utilisateur à droite - Nom, Prénom et Avatar */}
          {!isLoading && profile && (
            <button
              onClick={() => router.push('/settings')}
              className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition cursor-pointer"
            >
              <div className="text-right">
                <p style={{ 
                  fontFamily: 'Montserrat', 
                  fontWeight: 500, 
                  fontSize: '20px', 
                  lineHeight: '100%', 
                  color: '#000000' 
                }}>
                  {profile.name}
                </p>
                <p className="text-xs sm:text-sm font-montserrat text-gray-600 mt-1">
                  Directeur Général
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
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
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
