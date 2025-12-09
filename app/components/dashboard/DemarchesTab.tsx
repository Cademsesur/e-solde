"use client";

import { DocumentCard } from "@/app/components/ui/DocumentCard";

interface Demarche {
  title: string;
  id: string;
}

interface DemarchesTabProps {
  handleTelecharger: (titre: string) => void;
  demarches: Demarche[];
  search?: string;
}

export default function DemarchesTab({ handleTelecharger, demarches }: DemarchesTabProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {demarches.map((demarche) => (
        <DocumentCard
          key={demarche.id}
          title={demarche.title}
          onDownload={() => handleTelecharger(demarche.title)}
          showPreview={false}
        />
      ))}
    </div>
  );
}
