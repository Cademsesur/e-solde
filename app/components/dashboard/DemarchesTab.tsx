"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

interface Demarche {
  title: string;
  id: string;
}

interface DemarchesTabProps {
  handleTelecharger: (titre: string) => void;
  demarches: Demarche[];
  search?: string;
}

interface AccordionCategory {
  title: string;
  items: string[];
}

export default function DemarchesTab({ handleTelecharger }: DemarchesTabProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const categories: AccordionCategory[] = [
    {
      title: "Allocations familiales",
      items: [
        "Guide de demande d'allocations familiales",
        "Formulaire d'allocations familiales",
        "Documents requis pour allocations familiales"
      ]
    },
    {
      title: "Rappels",
      items: [
        "Procédure de rappel de salaire",
        "Guide de rappel d'avancement",
        "Formulaire de rappel de promotion"
      ]
    },
    {
      title: "Situations matrimoniales",
      items: [
        "Guide de déclaration de situation matrimoniale",
        "Formulaire de changement de situation matrimoniale",
        "Documents requis pour situation matrimoniale"
      ]
    },
    {
      title: "Échéances",
      items: [
        "Calendrier des échéances administratives",
        "Guide des délais de traitement",
        "Procédure de suivi des échéances"
      ]
    }
  ];

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {categories.map((category) => (
        <div key={category.title} className="bg-white rounded-[10px] overflow-hidden border border-gray-100">
          {/* En-tête de l'accordéon */}
          <button
            onClick={() => toggleAccordion(category.title)}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h3 
              className="font-montserrat text-left"
              style={{
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '24px',
                color: '#1E1E1E'
              }}
            >
              {category.title}
            </h3>
            {openAccordion === category.title ? (
              <ChevronUp className="w-5 h-5 text-[#1E1E1E] shrink-0" strokeWidth={2} />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#1E1E1E] shrink-0" strokeWidth={2} />
            )}
          </button>

          {/* Contenu de l'accordéon */}
          {openAccordion === category.title && (
            <div className="border-t border-gray-100">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <span 
                    className="font-montserrat flex-1"
                    style={{
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      color: '#1E1E1E'
                    }}
                  >
                    {item}
                  </span>
                  <button
                    onClick={() => handleTelecharger(item)}
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
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
