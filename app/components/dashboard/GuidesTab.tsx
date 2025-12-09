"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, FileText, Download } from "lucide-react";
import type { Guide } from "@/app/types";

interface GuidesTabProps {
  guides: Guide[];
  search?: string;
  loading?: boolean;
  error?: string | null;
}

export default function GuidesTab({ guides, search = "", loading = false, error = null }: GuidesTabProps) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Filtrer les guides actifs et selon la recherche
  const filteredGuides = useMemo(() => {
    // Filtrer uniquement les guides actifs
    const activeGuides = guides.filter(guide => guide.is_active);
    
    // Si pas de recherche, retourner tous les guides actifs
    if (!search || search.trim() === "") return activeGuides;
    
    const lowerSearch = search.toLowerCase().trim();
    
    // Filtrer les guides dont le nom ou la description contient la recherche
    return activeGuides.filter(guide => 
      guide.name.toLowerCase().includes(lowerSearch) ||
      guide.description.toLowerCase().includes(lowerSearch)
    );
  }, [guides, search]);

  // Appliquer "Tout voir"
  const guidesToShow = showAll ? filteredGuides : filteredGuides.slice(0, 3);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Fonction pour formater la procédure avec retours à la ligne
  const formatProcedure = (procedure: string) => {
    return procedure.split('\n').map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">{line}</p>
    ));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#047236]"></div>
        <p className="mt-4 text-gray-500 font-montserrat">Chargement des guides...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-montserrat">{error}</p>
      </div>
    );
  }

  if (filteredGuides.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-montserrat">
          {search ? `Aucun guide trouvé pour "${search}"` : "Aucun guide disponible"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {guidesToShow.map((guide) => (
        <div key={guide.id} className="bg-white rounded-[10px] overflow-hidden border border-gray-100 shadow-sm">
          {/* En-tête de l'accordéon */}
          <button
            onClick={() => toggleAccordion(guide.id)}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1 text-left">
              <FileText className="w-5 h-5 text-[#047236] shrink-0 mt-0.5" strokeWidth={2} />
              <div className="flex-1">
                <h3 
                  className="font-montserrat"
                  style={{
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#1E1E1E'
                  }}
                >
                  {guide.name}
                </h3>
                <p className="text-sm text-gray-600 font-montserrat mt-1">
                  {guide.description}
                </p>
              </div>
            </div>
            {openAccordion === guide.id ? (
              <ChevronUp className="w-5 h-5 text-[#1E1E1E] shrink-0 ml-2" strokeWidth={2} />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#1E1E1E] shrink-0 ml-2" strokeWidth={2} />
            )}
          </button>

          {/* Contenu de l'accordéon */}
          {openAccordion === guide.id && (
            <div className="border-t border-gray-100 p-4 sm:p-6 space-y-4">
              {/* Procédure */}
              <div>
                <h4 className="font-montserrat font-semibold text-[#1E1E1E] mb-2">
                  Procédure :
                </h4>
                <div className="font-montserrat text-gray-700 text-sm leading-relaxed">
                  {formatProcedure(guide.procedure)}
                </div>
              </div>

              {/* Documents requis */}
              {guide.required_documents && guide.required_documents.length > 0 && (
                <div>
                  <h4 className="font-montserrat font-semibold text-[#1E1E1E] mb-3">
                    Documents requis :
                  </h4>
                  <div className="space-y-2">
                    {guide.required_documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                      >
                        <FileText className="w-4 h-4 text-[#047236] shrink-0 mt-0.5" strokeWidth={2} />
                        <div className="flex-1">
                          <p className="font-montserrat text-sm text-[#1E1E1E]">
                            {doc.label}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-montserrat text-gray-500 uppercase">
                              {doc.type}
                            </span>
                            {doc.is_required && (
                              <span className="text-xs font-montserrat text-red-600 font-semibold">
                                Obligatoire
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fichier de procédure (si disponible) */}
              {guide.procedure_file_path && (
                <div className="pt-3 border-t border-gray-100">
                  <a
                    href={guide.procedure_file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#047236] text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Télécharger le guide complet
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Bouton "Tout voir" / "Réduire" */}
      {filteredGuides.length > 3 && (
        <div className="flex justify-start mt-4 sm:mt-6">
          {!showAll ? (
            <button 
              onClick={() => setShowAll(true)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              style={{ backgroundColor: '#047236' }}
            >
              Tout voir ({filteredGuides.length} guides)
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
