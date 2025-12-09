"use client";

import { useState } from "react";
import { FileText, LayoutDashboard, FolderOpen, HandCoins } from "lucide-react";
import DashboardHeader from "@/app/components/DashboardHeader";
import { TabCard } from "@/app/components/ui/TabCard";
import { SearchBar } from "@/app/components/ui/SearchBar";
import BulletinsTab from "@/app/components/dashboard/BulletinsTab";
import MesActionsTab from "@/app/components/dashboard/MesActionsTab";
import GuidesTab from "@/app/components/dashboard/GuidesTab";
import DepotDossierTab from "@/app/components/dashboard/DepotDossierTab";
import PDFPreviewModal from "@/app/components/dashboard/PDFPreviewModal";
import { STATIC_BULLETINS, STATIC_ACTIONS } from "@/app/constants/static-data";
import { getPDFPath, downloadLocalFile } from "@/app/lib/utils/document.utils";
import { useGuides } from "@/app/lib/hooks";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  // Récupérer les guides depuis l'API
  const { guides, loading: guidesLoading, error: guidesError } = useGuides();

  // Fonction pour changer d'onglet et réinitialiser la recherche
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSearch("");
    setFilter("");
  };

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
    ? STATIC_BULLETINS.filter(b => {
        // Filtre de recherche
        const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.period?.toLowerCase().includes(search.toLowerCase()) ||
          b.net?.toLowerCase().includes(search.toLowerCase());
        
        if (!matchesSearch) return false;
        
        // Filtre par mois/année
        if (!filter || filter === "") return true;
        
        if (filter === "mois") {
          if (!b.issued_at) return false;
          const date = new Date(b.issued_at);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        } else if (filter === "annee") {
          if (!b.issued_at) return false;
          const date = new Date(b.issued_at);
          const currentYear = new Date().getFullYear();
          return date.getFullYear() === currentYear;
        }
        
        return true;
      })
    : [];

  const filteredActions = activeTab === 3 
    ? STATIC_ACTIONS.filter(a => {
        // Filtre de recherche
        const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
        
        if (!matchesSearch) return false;
        
        // Filtre par mois/année
        if (!filter || filter === "") return true;
        
        if (filter === "mois") {
          const date = new Date(a.date);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        } else if (filter === "annee") {
          const date = new Date(a.date);
          const currentYear = new Date().getFullYear();
          return date.getFullYear() === currentYear;
        }
        
        return true;
      })
    : [];

  // Pour les guides, le filtrage est géré dans le composant GuidesTab

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
                onClick={() => handleTabChange(index)}
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
            <GuidesTab 
              guides={guides}
              search={search}
              loading={guidesLoading}
              error={guidesError}
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
