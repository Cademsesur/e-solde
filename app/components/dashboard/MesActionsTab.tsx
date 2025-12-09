"use client";

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
  return (
    <div className="space-y-3 sm:space-y-4">
      {actions.map((action) => (
        <DocumentCard
          key={action.id}
          title={action.title}
          date={action.date}
          onDownload={() => handleTelecharger(action.title)}
          showPreview={false}
        />
      ))}
    </div>
  );
}
