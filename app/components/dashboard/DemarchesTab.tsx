"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

interface Demarche {
  title: string;
  id: string;
}

interface DemarchesTabProps {
  handleTelecharger: (titre: string) => void;
  demarches: Demarche[];
  search?: string;
  filter?: string;
}

interface AccordionCategory {
  title: string;
  items: string[];
}

export default function DemarchesTab({ handleTelecharger, search = "" }: DemarchesTabProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories: AccordionCategory[] = useMemo(() => [
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
  ], []);

  // Filtrer les catégories et items selon la recherche
  const filteredCategories = useMemo(() => {
    // Si pas de recherche, retourner toutes les catégories
    if (!search || search.trim() === "") return categories;
    
    const lowerSearch = search.toLowerCase().trim();
    
    return categories
      .map(category => {
        // Vérifier si le titre de la catégorie correspond
        const categoryTitleMatches = category.title.toLowerCase().includes(lowerSearch);
        
        // Filtrer les items qui correspondent à la recherche
        const filteredItems = category.items.filter(item =>
          item.toLowerCase().includes(lowerSearch)
        );
        
        // Inclure la catégorie dans les résultats si :
        // 1. Le titre de la catégorie correspond à la recherche, OU
        // 2. Au moins un item correspond à la recherche
        if (categoryTitleMatches || filteredItems.length > 0) {
          return {
            ...category,
            // Si le titre de la catégorie correspond, montrer TOUS ses items
            // Sinon, montrer UNIQUEMENT les items qui correspondent à la recherche
            items: categoryTitleMatches ? category.items : filteredItems
          };
        }
        
        // La catégorie ne correspond pas, la supprimer des résultats
        return null;
      })
      // Filtrer les catégories nulles (qui ne correspondent pas)
      .filter((category): category is AccordionCategory => category !== null);
  }, [search, categories]);

  // Appliquer "Tout voir"
  const categoriesToShow = showAll ? filteredCategories : filteredCategories.slice(0, 3);

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  // Fonction pour mettre en évidence le texte de recherche
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    // Échapper les caractères spéciaux de regex
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedHighlight = escapeRegex(highlight);
    
    try {
      const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
      return (
        <span>
          {parts.map((part, index) => 
            part.toLowerCase() === highlight.toLowerCase() ? (
              <mark key={index} className="bg-yellow-200 font-semibold rounded px-0.5">{part}</mark>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    } catch {
      // En cas d'erreur regex, retourner le texte sans mise en évidence
      return text;
    }
  };

  if (filteredCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-montserrat">Aucune démarche trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Indicateur de résultats de recherche */}
      {search && search.trim() !== "" && (
        <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-montserrat text-blue-800">
            <strong>{filteredCategories.length}</strong> catégorie{filteredCategories.length > 1 ? 's' : ''} trouvée{filteredCategories.length > 1 ? 's' : ''} pour &ldquo;{search}&rdquo;
          </p>
        </div>
      )}
      
      {categoriesToShow.map((category) => (
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
              {search ? highlightText(category.title, search) : category.title}
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
                    {search ? highlightText(item, search) : item}
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
      {filteredCategories.length > 3 && (
        <div className="flex justify-start mt-4 sm:mt-6">
          {!showAll ? (
            <button 
              onClick={() => setShowAll(true)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              style={{ backgroundColor: '#047236' }}
            >
              Tout voir ({filteredCategories.length} catégories)
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
