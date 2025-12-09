"use client";

import { useProfile } from "@/app/lib/hooks/useProfile";
import Image from "next/image";
import ProfileInformation from "./ProfileInformation";
import DashboardHeader from "@/app/components/DashboardHeader";

export default function SettingsPage() {
  const { profile, isLoading } = useProfile();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header partagé */}
      <DashboardHeader />

      {/* Espacement entre le header et la section profil */}
      <div className="mt-8 sm:mt-12"></div>

      {/* Bande verte #047236 */}
      <div className="bg-[#047236] h-32 sm:h-40">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 h-full">
          <div className="flex items-center gap-6 h-full">
            {/* Espace pour l'avatar (il est positionné dans la bande blanche avec margin négatif) */}
            <div className="w-24 sm:w-32 shrink-0"></div>
            
            {/* NIU et Nom dans la partie verte */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold font-montserrat text-white mb-2">
                {isLoading ? "Chargement..." : profile?.name || "Utilisateur"}
              </h1>
              <div className="inline-block bg-white px-4 py-2 rounded-lg">
                <p className="text-sm sm:text-base font-montserrat text-[#047236] font-semibold">
                  Numéro d&apos;identification Unique : {isLoading ? "..." : profile?.employee_niu || profile?.reference || "Non disponible"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bande blanche */}
      <div className="bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center gap-6 py-6">
            {/* Avatar à gauche - 3/4 sur le vert, 1/4 sur le blanc avec bordure blanche */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200 shrink-0 -mt-20 sm:-mt-24 border-4 border-white">
              {isLoading ? (
                <div className="w-full h-full bg-gray-300 animate-pulse"></div>
              ) : profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#047236] text-white font-bold text-4xl sm:text-5xl">
                  {profile?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>

            {/* Espace vide à côté de l'avatar */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>

      {/* Contenu de la page */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16">
        <ProfileInformation />
      </div>
    </div>
  );
}
