"use client";

import { useState } from "react";
import { Eye, Download } from "lucide-react";

interface Bulletin {
  title: string;
  id: string;
  period?: string;
  net?: string;
  issued_at?: string;
  currency?: string;
}

interface BulletinsTabProps {
  handleApercu: (titre: string) => void;
  handleTelecharger: (titre: string) => void;
  bulletins: Bulletin[];
}

export default function BulletinsTab({ handleApercu, handleTelecharger, bulletins }: BulletinsTabProps) {
  const [showAll, setShowAll] = useState(false);

  const bulletinsToShow = showAll ? bulletins : bulletins.slice(0, 5);

  if (bulletins.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-montserrat">Aucun bulletin trouvé</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {bulletinsToShow.map((bulletin) => (
        <div 
          key={bulletin.id} 
          className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-[10px] bg-white border border-gray-100"
        >
          <div className="flex-1 min-w-0">
            <div 
              className="font-montserrat mb-1"
              style={{
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '24px',
                color: '#1E1E1E'
              }}
            >
              {bulletin.title}
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button 
              onClick={() => handleApercu(bulletin.title)}
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
              onClick={() => handleTelecharger(bulletin.title)}
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
      {bulletins.length > 5 && (
        <div className="flex justify-start mt-4 sm:mt-6">
          {!showAll ? (
            <button 
              onClick={() => setShowAll(true)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              style={{ backgroundColor: '#047236' }}
            >
              Tout voir ({bulletins.length} bulletins)
            </button>
          ) : (
            <button 
              onClick={() => setShowAll(false)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              style={{ backgroundColor: '#047236' }}
            >
              Réduire
            </button>
          )}
        </div>
      )}
    </div>
  );
}
