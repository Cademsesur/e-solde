"use client";

import { useState } from "react";
import { DocumentCard } from "@/app/components/ui/DocumentCard";

interface Action {
  title: string;
  date: string;
  id: string;
}

interface MesActionsTabProps {
  handleTelecharger: (titre: string) => void;
  actions: Action[];
}

export default function MesActionsTab({ handleTelecharger, actions }: MesActionsTabProps) {
  const [showAll, setShowAll] = useState(false);

  const actionsToShow = showAll ? actions : actions.slice(0, 5);

  if (actions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-montserrat">Aucune action trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {actionsToShow.map((action) => (
        <DocumentCard
          key={action.id}
          title={action.title}
          date={action.date}
          onDownload={() => handleTelecharger(action.title)}
          showPreview={false}
        />
      ))}
      {actions.length > 5 && (
        <div className="flex justify-start mt-4 sm:mt-6">
          {!showAll ? (
            <button 
              onClick={() => setShowAll(true)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              style={{ backgroundColor: '#047236' }}
            >
              Tout voir ({actions.length} actions)
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
