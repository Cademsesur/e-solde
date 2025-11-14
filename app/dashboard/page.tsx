"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Eye, Download, FileText, LayoutDashboard, FolderOpen, HandCoins, ChevronRight, ChevronDown } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";

// Header du dashboard importé

// Composant Tab Card
type TabCardProps = {
  tab: {
    icon: React.ElementType;
    name: string;
    description: string;
    color?: string;
    bgColor?: string;
  };
  isActive: boolean;
  onClick: () => void;
};

const TabCard = ({ tab, isActive, onClick }: TabCardProps) => {
  const Icon = tab.icon;
  
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 transition-all duration-300 hover:scale-105 cursor-pointer text-left w-full"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px'
      }}
    >
      <div 
        className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{ 
          backgroundColor: isActive ? '#0F2137' : '#0F21370D'
        }}
      >
        <Icon 
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" 
          strokeWidth={1.5}
          style={{ color: isActive ? '#FFFFFF' : '#0F2137' }} 
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#0F2137] font-montserrat mb-1 sm:mb-2">
          {tab.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#343D48] font-montserrat leading-relaxed">
          {tab.description}
        </p>
      </div>
    </button>
  );
};

// Composant Search Bar
const SearchBar = ({ value, onChange, filter, onFilterChange }: { value: string; onChange: (v: string) => void; filter: string; onFilterChange: (v: string) => void; }) => (
  <div className="flex justify-center mb-6">
    <div className="max-w-5xl w-full flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
      <div 
        className="sm:flex-2 relative flex items-center"
        style={{
          backgroundColor: '#F2F2F2',
          border: '1px solid #F2F2F2',
          borderRadius: '8px'
        }}
      >
        <Search 
          className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
          strokeWidth={1.5}
        />
        <input
          type="text"
          placeholder="Rechercher"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 bg-transparent text-sm sm:text-base font-montserrat text-[#343D48] placeholder-gray-400 outline-none"
        />
      </div>
      <div 
        className="sm:flex-1 relative flex items-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4"
        style={{
          backgroundColor: '#F2F2F2',
          border: '1px solid #F2F2F2',
          borderRadius: '8px'
        }}
      >
        <Filter 
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#343D48] shrink-0"
          strokeWidth={1.5}
        />
        <select 
          className="flex-1 bg-transparent text-sm sm:text-base font-montserrat text-[#343D48] font-semibold outline-none cursor-pointer"
          value={filter}
          onChange={e => onFilterChange(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="mois">Par mois</option>
          <option value="annee">Par année</option>
        </select>
      </div>
    </div>
  </div>
);

// Composant Document Card
type DocumentCardProps = {
  title: string;
  onPreview?: () => void;
  onDownload: () => void;
  date?: string;
  showPreview?: boolean;
};

const DocumentCard = ({
  title,
  onPreview,
  onDownload,
  date,
  showPreview = true,
}: DocumentCardProps) => (
  <div 
    className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
    style={{
      borderRadius: '10px',
      backgroundColor: '#FFFFFF'
    }}
  >
    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#343D48] font-montserrat flex-1">
      {title}
    </h3>
    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
      {date && (
        <p className="text-xs sm:text-sm text-gray-500 font-montserrat whitespace-nowrap">
          {date}
        </p>
      )}
      {showPreview && onPreview && (
        <button 
          onClick={onPreview}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap" 
          style={{ color: '#0C5CB4' }}
        >
          Aperçu
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
        </button>
      )}
      <button 
        onClick={onDownload}
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap" 
        style={{ color: '#079748' }}
      >
        Télécharger
        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
      </button>
    </div>
  </div>
);

// Composant Tab Bulletins de Soldes
const BulletinsTab = ({ handleApercu, handleTelecharger, bulletins }: { handleApercu: (titre: string) => void; handleTelecharger: (titre: string) => void; bulletins: { title: string; id: string; period?: string; net?: string; issued_at?: string; currency?: string; }[] }) => {
  const [showAll, setShowAll] = useState(false);
  const bulletinsToShow = showAll ? bulletins : bulletins.slice(0, 5);
  return (
    <div className="space-y-3 sm:space-y-4">
      {bulletinsToShow.map((bulletin) => (
        <div key={bulletin.id} className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-[10px] bg-white border border-gray-100">
          <div className="flex-1 min-w-0">
            <div className="font-montserrat font-semibold text-[#0F2137] text-base sm:text-lg mb-1">{bulletin.title}</div>
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-[#343D48] font-montserrat">
              {bulletin.period && <span>Période : {bulletin.period}</span>}
              {bulletin.issued_at && <span>Émis le : {new Date(bulletin.issued_at).toLocaleDateString()}</span>}
              {bulletin.net && <span>Net à payer : <span className="font-bold text-green-700">{bulletin.net} {bulletin.currency || 'XAF'}</span></span>}
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button 
              onClick={() => handleApercu(bulletin.title)}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap" 
              style={{ color: '#0C5CB4' }}
            >
              Aperçu
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => handleTelecharger(bulletin.title)}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap" 
              style={{ color: '#079748' }}
            >
              Télécharger
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-start mt-4 sm:mt-6">
        {!showAll ? (
          <button 
            onClick={() => setShowAll(true)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            style={{ backgroundColor: '#0F2137' }}
          >
            Tout voir
          </button>
        ) : (
          <button 
            onClick={() => setShowAll(false)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            style={{ backgroundColor: '#0F2137' }}
          >
            Réduire
          </button>
        )}
      </div>
    </div>
  );
};

// Composant Tab Mes Actions
type MesActionsTabProps = {
  handleTelecharger: (titre: string) => void;
  actions: { title: string; date: string; id: string }[];
};

const MesActionsTab = ({ handleTelecharger, actions }: MesActionsTabProps) => {
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
};

// DemarchesTab avec dropdowns pour sous-sections
const DemarchesTab = ({
  handleTelecharger,
  demarches: demarchesProp,
  search
}: {
  handleTelecharger: (titre: string) => void;
  demarches: { title: string; id: string }[];
  search: string;
}) => {
  const [open, setOpen] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  // Types pour les sous-items
  interface Demarche {
    title: string;
    id: string;
  }
  const rappels: string[] = React.useMemo(() => [
    "Rappels d’activités",
    "Rappels d’allocations Familiales",
    "Rappel de promotion",
    "Rappel d’avancement",
    "Rappel de promotion sur liste d’aptitude",
    "Rappel de reclassement (Rappel de reconstitution de carrière)",
    "Rappel de révision de situation administrative",
    "Rappel de titularisation",
    "Rappel de reversement",
    "Rappel de remboursement",
    "Rappel de remboursement IRPP.",
    "Rappel de réalignement ou suspension",
    "Rappel Radiation",
    "Rappel de levée de mesure",
    "Rappel agent code 90 réhabilité",
    "Rappel disponibilité",
    "Rappel retraite (Indemnité de Fin de Carrière)",
    "Rappel retraite (Congé payé)",
    "Rappel décès (Capital décès)",
    "Rappel décès (Congé payé).",
    "Rappel de nomination",
    "Rappel de congé diplomatique",
    "Rappel de mise équipement",
    "Rappel de congé de rapatriement",
    "Rappel indemnité de représentation.",
    "Rappel indemnités et primes",
    "Rappel de mise équipement",
    "Rappel d’affectation (civils)",
    "Rappel d’indemnité de logement"
  ], []);
  const allocations: string[] = React.useMemo(() => ["Demande d'allocations familiales"], []);
  const matrimoniales: string[] = React.useMemo(() => ["Déclaration de situation matrimoniale"], []);

  // Détecte si la recherche correspond à un sous-item et ouvre le dropdown automatiquement
  React.useEffect(() => {
    if (search) {
      if (rappels.some(sous => sous.toLowerCase().includes(search.toLowerCase()))) {
        setOpen("rappels");
      } else if (allocations.some(sous => sous.toLowerCase().includes(search.toLowerCase()))) {
        setOpen("alloc");
      } else if (matrimoniales.some(sous => sous.toLowerCase().includes(search.toLowerCase()))) {
        setOpen("matrimonial");
      }
    }
  }, [search, rappels, allocations, matrimoniales]);

  // Filtrage des sous-items selon la recherche
  const filterSousItems = (items: string[]) => {
    if (!search) return items;
    return items.filter(sous => sous.toLowerCase().includes(search.toLowerCase()));
  };

  // Fonction pour filtrer les démarches selon la recherche
  function filterDemarches(demarches: { title: string; id: string }[], search: string) {
    if (!search) return demarches;
    return demarches.filter(demarche =>
      demarche.title.toLowerCase().includes(search.toLowerCase())
    );
  }

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
                  className="flex items-center justify-between w-full font-montserrat text-base sm:text-lg font-bold text-[#0F2137] focus:outline-none mb-2"
                  onClick={() => setOpen(open === demarche.id ? null : demarche.id)}
                  style={{ minHeight: 48 }}
                >
                  <span>{demarche.title}</span>
                  {open === demarche.id ? (
                    <ChevronDown className="w-5 h-5 text-[#0F2137] transition-transform" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#0F2137] transition-transform" />
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
                  className="flex items-center justify-between w-full font-montserrat text-base sm:text-lg font-bold text-[#0F2137] focus:outline-none mb-2"
                  onClick={() => setOpen(open === demarche.id ? null : demarche.id)}
                  style={{ minHeight: 48 }}
                >
                  <span>{demarche.title}</span>
                  {open === demarche.id ? (
                    <ChevronDown className="w-5 h-5 text-[#0F2137] transition-transform" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#0F2137] transition-transform" />
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
                  className="flex items-center justify-between w-full font-montserrat text-base sm:text-lg font-bold text-[#0F2137] focus:outline-none mb-2"
                  onClick={() => setOpen(open === demarche.id ? null : demarche.id)}
                  style={{ minHeight: 48 }}
                >
                  <span>{demarche.title}</span>
                  {open === demarche.id ? (
                    <ChevronDown className="w-5 h-5 text-[#0F2137] transition-transform" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#0F2137] transition-transform" />
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
              <span className="text-base sm:text-lg font-bold text-[#0F2137] font-montserrat flex-1">{demarche.title}</span>
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
            style={{ backgroundColor: '#0F2137' }}
          >
            Tout voir
          </button>
        ) : (
          <button 
            onClick={() => setShowAll(false)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-montserrat font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            style={{ backgroundColor: '#0F2137' }}
          >
            Réduire
          </button>
        )}
      </div>
    </>
  );
};

// Composant Dépôt de dossier avec sous-onglets
const DepotDossierTab = () => {
  const [subTab, setSubTab] = useState<'deposer' | 'mesdossiers'>('deposer');
  // Données statiques pour l'exemple
  const depots = [
    { title: 'Prestations familiales' },
    { title: 'Situations matrimoniales' },
    { title: 'Rappels' },
    { title: 'Indemnités et primes' },
  ];
  const mesDossiers = [
    { title: 'Prestations familiales', status: 'En cours', color: '#FFD600' },
    { title: 'Rappels', status: 'Terminé', color: '#079748' },
    { title: 'Situations matrimoniales', status: 'Terminé', color: '#079748' },
    { title: 'Indemnités et primes', status: 'Rejeté', color: '#EF1A1A' },
  ];
  return (
    <div>
      {/* Sous-onglets */}
      <div className="flex gap-2 mb-6">
        <div
          className={`px-5 py-2 font-montserrat font-semibold text-sm sm:text-base cursor-pointer transition-all relative ${subTab === 'deposer' ? 'text-[#0F2137]' : 'text-gray-400'}`}
          onClick={() => setSubTab('deposer')}
        >
          Déposer un dossier
          {subTab === 'deposer' && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#0F2137] rounded-t" />
          )}
        </div>
        <div
          className={`px-5 py-2 font-montserrat font-semibold text-sm sm:text-base cursor-pointer transition-all relative ${subTab === 'mesdossiers' ? 'text-[#0F2137]' : 'text-gray-400'}`}
          onClick={() => setSubTab('mesdossiers')}
        >
          Mes dossiers
          {subTab === 'mesdossiers' && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#0F2137] rounded-t" />
          )}
        </div>
      </div>
      {/* Contenu du sous-onglet */}
      {subTab === 'deposer' && (
        <div className="bg-white rounded-[10px] p-0">
          {depots.map((item, idx) => (
            <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 ${idx !== depots.length - 1 ? '' : ''}`}>
              <span className="text-base sm:text-lg font-bold text-[#0F2137] font-montserrat flex-1">{item.title}</span>
              <button
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap px-5 py-2 rounded-lg"
                onClick={() => alert(`Soumission d'un dossier pour : ${item.title}`)}
                style={{ color: '#079748', background: 'transparent' }}
              >
                Soumettre un dossier
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
      {subTab === 'mesdossiers' && (
        <div className="bg-white rounded-[10px] p-0">
          {mesDossiers.map((item, idx) => {
            let bg = '';
            let color = '';
            if (item.status === 'En cours') { bg = '#355F9E1A'; color = '#355F9E'; }
            if (item.status === 'Terminé') { bg = '#E6F5ED'; color = '#079748'; }
            if (item.status === 'Rejeté') { bg = '#EB34261A'; color = '#EB3426'; }
            return (
              <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4`}>
                <span className="text-base sm:text-lg font-bold text-[#0F2137] font-montserrat flex-1">{item.title}</span>
                <span
                  className="px-5 py-2 font-montserrat font-semibold text-sm sm:text-base"
                  style={{ background: bg, borderRadius: 40, color, minWidth: 100, textAlign: 'center' }}
                >
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Composant Principal Dashboard
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  // Barre de recherche et filtre par vue
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const handleApercu = (titre: string) => {
    alert(`Aperçu de : ${titre}\n\nCette fonctionnalité ouvrira le document en mode visualisation.`);
  };

  const handleTelecharger = (titre: string) => {
    alert(`Téléchargement en cours...\n\nDocument : ${titre}\n\nLe téléchargement a commencé avec succès !`);
  };

  const tabs = [
    {
      icon: FileText,
      name: "Bulletins de soldes",
      description: "Retrouvez vos bulletins de solde",
      color: "#009543",
      bgColor: "#E6F5ED66"
    },
    {
      icon: LayoutDashboard,
      name: "Guide",
      description: "Consultez les procédures",
      color: "#FFD600",
      bgColor: "#FDEBE966"
    },
    {
      icon: FolderOpen,
      name: "Dépôt de dossier",
      description: "Soumettez vos dossiers",
      color: "#EF1A1A",
      bgColor: "#FEFAE766"
    },
    {
      icon: HandCoins,
      name: "Mes actions",
      description: "Consultez vos actions passées",
      color: "#355F9E",
      bgColor: "#E9F1FD66"
    }
  ];
  
  // Filtres dynamiques selon l'onglet
  type Payslip = {
    id: string | number;
    period?: {
      label?: string;
      month?: string | number;
      year?: string | number;
    };
    amounts?: {
      net?: string | number;
    };
    issued_at?: string;
    // Add other fields as needed
  };
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loadingPayslips, setLoadingPayslips] = useState(false);
  const [errorPayslips, setErrorPayslips] = useState("");

  useEffect(() => {
    if (activeTab !== 0) return;
    const fetchPayslips = async () => {
      setLoadingPayslips(true);
      setErrorPayslips("");
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) throw new Error("Token manquant");
        const res = await fetch("https://esolde.sesur.bj/api/me/payslips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des bulletins");
        const data = await res.json();
        setPayslips(data.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorPayslips(err.message);
        } else {
          setErrorPayslips("Erreur inconnue");
        }
      } finally {
        setLoadingPayslips(false);
      }
    };
    fetchPayslips();
  }, [activeTab]);
  let filteredActions: { title: string; date: string; id: string }[] = [];
  let filteredDemarches: { title: string; id: string }[] = [];

  let filteredBulletins: { title: string; id: string; period?: string; net?: string; issued_at?: string }[] = [];
  if (activeTab === 0) {
    filteredBulletins = payslips
      .filter(p => {
        const label = p.period?.label?.toLowerCase() || "";
        return label.includes(search.toLowerCase()) && (filter === "" || label.includes(filter));
      })
      .map(p => ({
        title: p.period?.label || "Bulletin de solde",
        id: String(p.id),
        period: `${p.period?.month}/${p.period?.year}`,
        net: p.amounts?.net !== undefined && p.amounts?.net !== null ? String(p.amounts.net) : undefined,
        issued_at: p.issued_at,
      }));
  }
  if (activeTab === 3) {
    // Filtrage actions
    const allActions = [
      { title: "Bulletin de solde du mois de juin 2025", date: "12/12/2025", id: "action1" },
      { title: "Dépôts de dossier", date: "13/12/2025", id: "action2" },
      { title: "Bulletin de solde du mois d'octobre 2025", date: "09/12/2025", id: "action3" }
    ];
    filteredActions = allActions.filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || a.title.toLowerCase().includes(filter))
    );
  }
  if (activeTab === 1) {
    // Filtrage démarches
    const allDemarches = [
      { title: "Allocations familiales", id: "alloc" },
      { title: "Rappels", id: "rappels" },
      { title: "Situations matrimoniales", id: "matrimonial" }
    ];
    // Sous-items pour la recherche
    const rappels = [
      "Rappels d’activités",
      "Rappels d’allocations Familiales",
      "Rappel de promotion",
      "Rappel d’avancement",
      "Rappel de promotion sur liste d’aptitude",
      "Rappel de reclassement (Rappel de reconstitution de carrière)",
      "Rappel de révision de situation administrative",
      "Rappel de titularisation",
      "Rappel de reversement",
      "Rappel de remboursement",
      "Rappel de remboursement IRPP.",
      "Rappel de réalignement ou suspension",
      "Rappel Radiation",
      "Rappel de levée de mesure",
      "Rappel agent code 90 réhabilité",
      "Rappel disponibilité",
      "Rappel retraite (Indemnité de Fin de Carrière)",
      "Rappel retraite (Congé payé)",
      "Rappel décès (Capital décès)",
      "Rappel décès (Congé payé).",
      "Rappel de nomination",
      "Rappel de congé diplomatique",
      "Rappel de mise équipement",
      "Rappel de congé de rapatriement",
      "Rappel indemnité de représentation.",
      "Rappel indemnités et primes",
      "Rappel de mise équipement",
      "Rappel d’affectation (civils)",
      "Rappel d’indemnité de logement"
    ];
    const allocations = ["Demande d'allocations familiales"];
    const matrimoniales = ["Déclaration de situation matrimoniale"];
    filteredDemarches = allDemarches.filter(d => {
      if (d.title.toLowerCase().includes(search.toLowerCase()) && (filter === "" || d.title.toLowerCase().includes(filter))) {
        return true;
      }
      if (d.title === "Rappels") {
        return rappels.some(sous => sous.toLowerCase().includes(search.toLowerCase()));
      }
      if (d.title === "Allocations familiales") {
        return allocations.some(sous => sous.toLowerCase().includes(search.toLowerCase()));
      }
      if (d.title === "Situations matrimoniales") {
        return matrimoniales.some(sous => sous.toLowerCase().includes(search.toLowerCase()));
      }
      return false;
    });
  }

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
          <SearchBar value={search} onChange={setSearch} filter={filter} onFilterChange={setFilter} />
        )}

        {/* Contenu de l'onglet actif */}
        <div className="p-4 sm:p-6 md:p-8">
          {activeTab === 0 && (
            <>
              {loadingPayslips && <div className="text-center text-gray-500 font-montserrat mb-4">Chargement des bulletins...</div>}
              {errorPayslips && <div className="text-center text-red-500 font-montserrat mb-4">{errorPayslips}</div>}
              <BulletinsTab
                handleApercu={handleApercu}
                handleTelecharger={handleTelecharger}
                bulletins={filteredBulletins}
              />
            </>
          )}

          {activeTab === 1 && (
            <DemarchesTab handleTelecharger={handleTelecharger} demarches={filteredDemarches} search={search} />
          )}

          {activeTab === 3 && (
            <MesActionsTab handleTelecharger={handleTelecharger} actions={filteredActions} />
          )}

          {activeTab === 2 && (
            <DepotDossierTab />
          )}
        </div>
      </main>
    </div>
  );
}