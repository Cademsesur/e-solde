"use client";

import { useState } from "react";
import { FileText, LayoutDashboard, FolderOpen, HandCoins } from "lucide-react";
import DashboardHeader from "@/app/components/DashboardHeader";
import { TabCard } from "@/app/components/ui/TabCard";
import { SearchBar } from "@/app/components/ui/SearchBar";
import BulletinsTab from "@/app/components/dashboard/BulletinsTab";
import MesActionsTab from "@/app/components/dashboard/MesActionsTab";
import DemarchesTab from "@/app/components/dashboard/DemarchesTab";
import DepotDossierTab from "@/app/components/dashboard/DepotDossierTab";
import PDFPreviewModal from "@/app/components/dashboard/PDFPreviewModal";
import { STATIC_BULLETINS, STATIC_ACTIONS, STATIC_DEMARCHES } from "@/app/constants/static-data";
import { getPDFPath, downloadLocalFile } from "@/app/lib/utils/document.utils";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const tabs = [
    {
      icon: FileText,
      name: "Bulletins de soldes",
      description: "Retrouvez vos bulletins de solde",
    },
    {
      icon: LayoutDashboard,
      name: "Guide",
      description: "Consultez les procédures",
    },
    {
      icon: FolderOpen,
      name: "Dépôt de dossier",
      description: "Soumettez vos dossiers",
    },
    {
      icon: HandCoins,
      name: "Mes activités",
      description: "Consultez vos actions passées",
    }
  ];

  const handleApercu = (titre: string) => {
    setPreviewTitle(titre);
    setShowPreview(true);
  };

  const handleTelecharger = (titre: string) => {
    const file = getPDFPath(titre, activeTab);
    downloadLocalFile(file, titre);
  };

  // Filtrage des données selon l'onglet actif
  const filteredBulletins = activeTab === 0 
    ? STATIC_BULLETINS.filter(b => 
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.period?.toLowerCase().includes(search.toLowerCase()) ||
        b.net?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const filteredActions = activeTab === 3 
    ? STATIC_ACTIONS.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  const filteredDemarches = activeTab === 1 
    ? STATIC_DEMARCHES.filter(d => d.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 md:py-12">
        {/* Onglets */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {tabs.map((tab, index) => (
              <TabCard
                key={index}
                tab={tab}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Barre de recherche */}
        {(activeTab === 0 || activeTab === 1 || activeTab === 3) && (
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            filter={filter} 
            onFilterChange={setFilter} 
          />
        )}

        {/* Contenu de l'onglet actif */}
        <div className="p-4 sm:p-6 md:p-8">
          {activeTab === 0 && (
            <BulletinsTab
              handleApercu={handleApercu}
              handleTelecharger={handleTelecharger}
              bulletins={filteredBulletins}
            />
          )}

          {activeTab === 1 && (
            <DemarchesTab 
              handleTelecharger={handleTelecharger} 
              demarches={filteredDemarches} 
              search={search} 
            />
          )}

          {activeTab === 2 && <DepotDossierTab />}

          {activeTab === 3 && (
            <MesActionsTab 
              handleTelecharger={handleTelecharger} 
              actions={filteredActions} 
            />
          )}
        </div>

        {/* Modale d'aperçu PDF */}
        <PDFPreviewModal
          show={showPreview}
          title={previewTitle}
          onClose={() => setShowPreview(false)}
        />
      </main>
    </div>
  );
}
