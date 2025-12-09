"use client";

import React, { useState, useMemo } from "react";
import { Download, ChevronRight, ChevronDown } from "lucide-react";
import { RAPPELS_LIST, ALLOCATIONS_LIST, MATRIMONIALES_LIST } from "@/app/constants/static-data";

interface Demarche {
  title: string;
  id: string;
}

interface DemarchesTabProps {
  handleTelecharger: (titre: string) => void;
  demarches: Demarche[];
  search: string;
}

export default function DemarchesTab({ handleTelecharger, demarches: demarchesProp, search }: DemarchesTabProps) {
  const [manualOpen, setManualOpen] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const rappels: string[] = useMemo(() => RAPPELS_LIST, []);
  const allocations: string[] = useMemo(() => ALLOCATIONS_LIST, []);
  const matrimoniales: string[] = useMemo(() => MATRIMONIALES_LIST, []);

  // Calcule automatiquement quelle section doit être ouverte selon la recherche
  const autoOpen = useMemo(() => {
    if (!search) return null;
    if (rappels.some(sous => sous.toLowerCase().includes(search.toLowerCase()))) {
      return "rappels";
    }
    if (allocations.some(sous => sous.toLowerCase().includes(search.toLowerCase()))) {
      return "alloc";
    }
    if (matrimoniales.some(sous => sous.toLowerCase().includes(search.toLowerCase()))) {
      return "matrimonial";
    }
    return null;
  }, [search, rappels, allocations, matrimoniales]);

  // Utilise autoOpen si disponible, sinon manualOpen
  const open = autoOpen || manualOpen;

  // Filtrage des sous-items selon la recherche
  const filterSousItems = (items: string[]) => {
    if (!search) return items;
    return items.filter(sous => sous.toLowerCase().includes(search.toLowerCase()));
  };

  // Fonction pour filtrer les démarches selon la recherche
  const filterDemarches = (demarches: Demarche[], search: string) => {
    if (!search) return demarches;
    return demarches.filter(demarche =>
      demarche.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredDemarches = filterDemarches(demarchesProp, search);
  const demarchesToShow = showAll ? filteredDemarches : filteredDemarches.slice(0, 5);

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {demarchesToShow.map((demarche: Demarche) => {
          if (demarche.title === "Rappels") {
            const sousRappels = filterSousItems(rappels);
            return (
              <div key={demarche.id} className="w-full p-4 sm:p-6 flex flex-col rounded-[10px] bg-white">
                <button
                  className="flex items-center justify-between w-full font-montserrat text-base sm:text-lg font-bold text-[#1E1E1E] focus:outline-none mb-2"
                  onClick={() => setManualOpen(open === demarche.id ? null : demarche.id)}
                  style={{ minHeight: 48 }}
                >
                  <span>{demarche.title}</span>
                  {open === demarche.id ? (
                    <ChevronDown className="w-5 h-5 text-[#1E1E1E] transition-transform" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#1E1E1E] transition-transform" />
                  )}
                </button>
                {open === demarche.id && (
                  <div className="pt-2">
                    <ul className="space-y-3 sm:space-y-4">
                      {sousRappels.map((sous, idx) => (
                        <li key={idx} className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-[10px] bg-white">
                          <span className="text-sm sm:text-base text-[#343D48] font-montserrat flex-1">{sous}</span>
                          <button
                            onClick={() => handleTelecharger(sous)}
                            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap"
                            style={{ color: '#079748' }}
                          >
                            Télécharger
                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          if (demarche.title === "Allocations familiales") {
            const sousAlloc = filterSousItems(allocations);
            return (
              <div key={demarche.id} className="w-full p-4 sm:p-6 flex flex-col rounded-[10px] bg-white">
                <button
                  className="flex items-center justify-between w-full font-montserrat text-base sm:text-lg font-bold text-[#1E1E1E] focus:outline-none mb-2"
                  onClick={() => setManualOpen(open === demarche.id ? null : demarche.id)}
                  style={{ minHeight: 48 }}
                >
                  <span>{demarche.title}</span>
                  {open === demarche.id ? (
                    <ChevronDown className="w-5 h-5 text-[#1E1E1E] transition-transform" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#1E1E1E] transition-transform" />
                  )}
                </button>
                {open === demarche.id && (
                  <div className="pt-2">
                    <ul className="space-y-3 sm:space-y-4">
                      {sousAlloc.map((sous, idx) => (
                        <li key={idx} className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-[10px] bg-white">
                          <span className="text-sm sm:text-base text-[#343D48] font-montserrat flex-1">{sous}</span>
                          <button
                            onClick={() => handleTelecharger(sous)}
                            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap"
                            style={{ color: '#079748' }}
                          >
                            Télécharger
                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          if (demarche.title === "Situations matrimoniales") {
            const sousMatri = filterSousItems(matrimoniales);
            return (
              <div key={demarche.id} className="w-full p-4 sm:p-6 flex flex-col rounded-[10px] bg-white">
                <button
                  className="flex items-center justify-between w-full font-montserrat text-base sm:text-lg font-bold text-[#1E1E1E] focus:outline-none mb-2"
                  onClick={() => setManualOpen(open === demarche.id ? null : demarche.id)}
                  style={{ minHeight: 48 }}
                >
                  <span>{demarche.title}</span>
                  {open === demarche.id ? (
                    <ChevronDown className="w-5 h-5 text-[#1E1E1E] transition-transform" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#1E1E1E] transition-transform" />
                  )}
                </button>
                {open === demarche.id && (
                  <div className="pt-2">
                    <ul className="space-y-3 sm:space-y-4">
                      {sousMatri.map((sous, idx) => (
                        <li key={idx} className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-[10px] bg-white">
                          <span className="text-sm sm:text-base text-[#343D48] font-montserrat flex-1">{sous}</span>
                          <button
                            onClick={() => handleTelecharger(sous)}
                            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap"
                            style={{ color: '#079748' }}
                          >
                            Télécharger
                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={demarche.id} className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-[10px] bg-white">
              <span className="text-base sm:text-lg font-bold text-[#1E1E1E] font-montserrat flex-1">
                {demarche.title}
              </span>
              <button
                onClick={() => handleTelecharger(demarche.title)}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap"
                style={{ color: '#079748' }}
              >
                Télécharger
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-start mt-4 sm:mt-6">
        {!showAll ? (
          <button 
            onClick={() => setShowAll(true)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            style={{ backgroundColor: '#047236' }}
          >
            Tout voir
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
    </>
  );
}
