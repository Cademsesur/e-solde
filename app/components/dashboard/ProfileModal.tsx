"use client";

import { useProfile } from "@/app/lib/hooks/useProfile";
import { X } from "lucide-react";
import Image from "next/image";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { profile, isLoading } = useProfile();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#DCDCDC]">
          <h2 className="text-xl sm:text-2xl font-bold font-montserrat text-[#047236]">
            Mon Profil
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : profile ? (
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#047236] text-white font-bold text-2xl">
                      {profile.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
              </div>

              {/* NIU */}
              <div>
                <label className="text-sm font-semibold font-montserrat text-[#1E1E1E] block mb-1">
                  Numéro d&apos;Identification Unique
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-[#DCDCDC]">
                  <p className="text-base font-montserrat text-[#1E1E1E]">
                    {profile.employee_niu || profile.reference || "Non disponible"}
                  </p>
                </div>
              </div>

              {/* Nom et Prénom */}
              <div>
                <label className="text-sm font-semibold font-montserrat text-[#1E1E1E] block mb-1">
                  Nom et Prénom
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-[#DCDCDC]">
                  <p className="text-base font-montserrat text-[#1E1E1E]">
                    {profile.name || "Non disponible"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold font-montserrat text-[#1E1E1E] block mb-1">
                  Email
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-[#DCDCDC]">
                  <p className="text-base font-montserrat text-[#1E1E1E]">
                    {profile.email || "Non disponible"}
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="text-sm font-semibold font-montserrat text-[#1E1E1E] block mb-1">
                  Téléphone
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-[#DCDCDC]">
                  <p className="text-base font-montserrat text-[#1E1E1E]">
                    {profile.phone || "Non disponible"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Profil non disponible</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-[#DCDCDC]">
          <button
            onClick={onClose}
            className="px-6 py-2 font-montserrat font-semibold text-sm rounded-lg bg-[#047236] text-white hover:bg-[#036629] transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
