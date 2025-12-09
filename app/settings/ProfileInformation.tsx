"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/app/lib/hooks/useProfile";
import { Eye, Download, LogOut } from "lucide-react";
import { ROUTES } from "@/app/constants";

export default function ProfileInformation() {
  const { profile, isLoading } = useProfile();
  const router = useRouter();
  const [subTab, setSubTab] = useState<'informations' | 'documents'>('informations');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Documents personnels
  const documents = [
    { title: "Acte de naissance" },
    { title: "Attestation de travail" }
  ];

  const handleApercu = (titre: string) => {
    console.log("Aperçu:", titre);
    // TODO: Implémenter l'aperçu
  };

  const handleTelecharger = (titre: string) => {
    console.log("Télécharger:", titre);
    // TODO: Implémenter le téléchargement
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion
    router.push(ROUTES.HOME);
  };


  return (
    <div>
      {/* Sous-onglets */}
      <div className="flex gap-2 mb-6">
        <div
          style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px', lineHeight: '100%', verticalAlign: 'middle' }}
          className={`px-5 py-2 cursor-pointer transition-all relative ${
            subTab === 'informations' ? 'text-[#1E1E1E]' : 'text-gray-400'
          }`}
          onClick={() => setSubTab('informations')}
        >
          Informations personnelles
          {subTab === 'informations' && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#047236] rounded-t" />
          )}
        </div>
        <div
        style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px', lineHeight: '100%', verticalAlign: 'middle' }}
          className={`px-5 py-2 cursor-pointer transition-all relative ${
            subTab === 'documents' ? 'text-[#1E1E1E]' : 'text-gray-400'
          }`}
          onClick={() => setSubTab('documents')}
        >
          Mes documents
          {subTab === 'documents' && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#047236] rounded-t" />
          )}
        </div>
      </div>

      {/* Contenu de l'onglet Informations personnelles */}
      {subTab === 'informations' && (
        <>
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : profile ? (
            <div className="space-y-6">
              {/* NIU */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Numéro d&apos;Identification Unique
                </label>
                <p style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  {profile.employee_niu || profile.reference || "87675645677644554"}
                </p>
              </div>

              {/* Nom */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Nom
                </label>
                <p style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  {profile.name?.split(' ')[0] || "DOTA"}
                </p>
              </div>

              {/* Prénom */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Prénom
                </label>
                <p style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  {profile.name?.split(' ').slice(1).join(' ') || "Jules Rodrigo"}
                </p>
              </div>

              {/* Numéro de téléphone */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Numéro de téléphone
                </label>
                <p style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  {profile.phone || "+242 06890989767"}
                </p>
              </div>

              {/* Adresse e-mail */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Adresse e-mail
                </label>
                <p style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  {profile.email || "jules@gmail.com"}
                </p>
              </div>

              {/* Date de naissance */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Date de naissance
                </label>
                <p style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  11/11/1990
                </p>
              </div>

              {/* Localisation */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Localisation
                </label>
                <p style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  72 Rue Mouleke, Brazzaville
                </p>
              </div>

              {/* Sexe */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <label style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Sexe
                </label>
                <p style={{ fontFamily: 'Open Sans', fontWeight: 400, fontSize: '16px', lineHeight: '100%' }} className="text-[#1E1E1E]">
                  Masculin
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 font-montserrat">
              Impossible de charger les informations du profil.
            </p>
          )}
        </>
      )}

      {/* Contenu de l'onglet Mes documents */}
      {subTab === 'documents' && (
        <div className="space-y-3 sm:space-y-4">
          {documents.map((document, index) => (
            <div 
              key={index} 
              className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-[10px] bg-white border border-gray-100"
            >
              <div className="flex-1 min-w-0">
                <div 
                  className="font-montserrat"
                  style={{
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#1E1E1E'
                  }}
                >
                  {document.title}
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <button 
                  onClick={() => handleApercu(document.title)}
                  className="flex items-center gap-1.5 sm:gap-2 font-montserrat hover:opacity-80 cursor-pointer whitespace-nowrap" 
                  style={{ 
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '20px',
                    textAlign: 'center',
                    color: '#0F2137'
                  }}
                >
                  Aperçu
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => handleTelecharger(document.title)}
                  className="flex items-center gap-1.5 sm:gap-2 font-montserrat hover:opacity-80 cursor-pointer whitespace-nowrap" 
                  style={{ 
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '20px',
                    textAlign: 'center',
                    color: '#079748'
                  }}
                >
                  Télécharger
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton de déconnexion */}
      <div className="mt-8 pt-8 border-t border-gray-200 flex justify-center">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-montserrat font-semibold text-lg rounded-lg transition-colors shadow-md hover:shadow-lg disabled:cursor-not-allowed"
        >
          <LogOut className="w-5 h-5" />
          {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
        </button>
      </div>
    </div>
  );
}
