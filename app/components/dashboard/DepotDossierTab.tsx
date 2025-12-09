"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import DocumentUploadModal from "./DocumentUploadModal";

export default function DepotDossierTab() {
  const [subTab, setSubTab] = useState<'deposer' | 'mesdossiers'>('deposer');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  // Données statiques
  const depots = [
    { title: 'Prestations familiales' },
    { title: 'Situations matrimoniales' },
    { title: 'Rappels' },
    { title: 'Indemnités et primes' },
  ];

  const mesDossiers = [
    { title: 'Prestations familiales', status: 'En cours', color: '#FFD600' },
    { title: 'Rappels', status: 'Terminé', color: '#079748' },
    { title: 'Situations matrimoniales', status: 'Terminé', color: '#079748' },
    { title: 'Indemnités et primes', status: 'Rejeté', color: '#EF1A1A' },
  ];

  return (
    <div>
      {/* Sous-onglets */}
      <div className="flex gap-2 mb-6">
        <div
          style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px', lineHeight: '100%', verticalAlign: 'middle' }}
          className={`px-5 py-2 cursor-pointer transition-all relative ${
            subTab === 'deposer' ? 'text-[#1E1E1E]' : 'text-gray-400'
          }`}
          onClick={() => setSubTab('deposer')}
        >
          Déposer un dossier
          {subTab === 'deposer' && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#047236] rounded-t" />
          )}
        </div>
        <div
          style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px', lineHeight: '100%', verticalAlign: 'middle' }}
          className={`px-5 py-2 cursor-pointer transition-all relative ${
            subTab === 'mesdossiers' ? 'text-[#1E1E1E]' : 'text-gray-400'
          }`}
          onClick={() => setSubTab('mesdossiers')}
        >
          Mes dossiers
          {subTab === 'mesdossiers' && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#047236] rounded-t" />
          )}
        </div>
      </div>

      {/* Contenu du sous-onglet */}
      {subTab === 'deposer' && (
        <div className="bg-white rounded-[10px] p-0">
          {depots.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4"
            >
              <span 
                className="font-montserrat flex-1"
                style={{
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '24px',
                  color: '#1E1E1E'
                }}
              >
                {item.title}
              </span>
              <button
                className="flex items-center gap-1.5 sm:gap-2 font-montserrat hover:opacity-80 cursor-pointer whitespace-nowrap px-5 py-2 rounded-lg"
                onClick={() => {
                  setSelectedTitle(item.title);
                  setIsModalOpen(true);
                }}
                style={{ 
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '20px',
                  textAlign: 'center',
                  color: '#079748', 
                  background: 'transparent' 
                }}
              >
                Soumettre un dossier
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}

      {subTab === 'mesdossiers' && (
        <div className="bg-white rounded-[10px] p-0">
          {mesDossiers.map((item, idx) => {
            let bg = '';
            let color = '';
            if (item.status === 'En cours') { 
              bg = '#355F9E1A'; 
              color = '#355F9E'; 
            }
            if (item.status === 'Terminé') { 
              bg = '#E6F5ED'; 
              color = '#079748'; 
            }
            if (item.status === 'Rejeté') { 
              bg = '#EB34261A'; 
              color = '#EB3426'; 
            }
            
            return (
              <div 
                key={idx} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4"
              >
                <span 
                  className="font-montserrat flex-1"
                  style={{
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#1E1E1E'
                  }}
                >
                  {item.title}
                </span>
                <span
                  className="px-5 py-2 font-montserrat font-semibold text-sm sm:text-base"
                  style={{ 
                    background: bg, 
                    borderRadius: 40, 
                    color, 
                    minWidth: 100, 
                    textAlign: 'center' 
                  }}
                >
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de dépôt de document */}
      <DocumentUploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTitle("");
        }}
        title={selectedTitle}
      />
    </div>
  );
}
