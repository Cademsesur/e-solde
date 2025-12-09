"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import DocumentUploadModal from "./DocumentUploadModal";
import { useRequests } from "@/app/lib/hooks";
import type { Service } from "@/app/types";

export default function DepotDossierTab() {
  const [subTab, setSubTab] = useState<'deposer' | 'mesdossiers'>('deposer');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const { services, myRequests, isLoading, error, fetchServices, fetchMyRequests } = useRequests();

  // Charger les services et les demandes au montage du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchServices(token);
      fetchMyRequests(token);
    }
  }, [fetchServices, fetchMyRequests]);

  // Mapper le statut API vers le statut d'affichage
  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, { label: string; bg: string; color: string }> = {
      'submitted': { label: 'En cours', bg: '#355F9E1A', color: '#355F9E' },
      'processing': { label: 'En cours', bg: '#355F9E1A', color: '#355F9E' },
      'completed': { label: 'Terminé', bg: '#E6F5ED', color: '#079748' },
      'rejected': { label: 'Rejeté', bg: '#EB34261A', color: '#EB3426' },
    };
    return statusMap[status] || { label: status, bg: '#F5F5F5', color: '#1E1E1E' };
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      {/* Sous-onglets */}
      <div className="flex gap-2 mb-6">
        <div
          style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px', lineHeight: '100%', verticalAlign: 'middle' }}
          className={`px-5 py-2 cursor-pointer transition-all relative ${
            subTab === 'deposer' ? 'text-[#1E1E1E]' : 'text-gray-400'
          }`}
          onClick={() => setSubTab('deposer')}
        >
          Déposer un dossier
          {subTab === 'deposer' && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#047236] rounded-t" />
          )}
        </div>
        <div
          style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px', lineHeight: '100%', verticalAlign: 'middle' }}
          className={`px-5 py-2 cursor-pointer transition-all relative ${
            subTab === 'mesdossiers' ? 'text-[#1E1E1E]' : 'text-gray-400'
          }`}
          onClick={() => setSubTab('mesdossiers')}
        >
          Mes dossiers
          {subTab === 'mesdossiers' && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#047236] rounded-t" />
          )}
        </div>
      </div>

      {/* Contenu du sous-onglet */}
      {subTab === 'deposer' && (
        <div className="bg-white rounded-[10px] p-0">
          {isLoading && (
            <div className="px-6 py-8 text-center text-gray-500">
              Chargement des services...
            </div>
          )}
          
          {error && (
            <div className="px-6 py-8 text-center text-red-500">
              {error}
            </div>
          )}
          
          {!isLoading && !error && services.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              Aucun service disponible pour le moment
            </div>
          )}
          
          {!isLoading && !error && services.map((service) => (
            <div 
              key={service.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4"
            >
              <span 
                className="font-montserrat flex-1"
                style={{
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '24px',
                  color: '#1E1E1E'
                }}
              >
                {service.name}
              </span>
              <button
                className="flex items-center gap-1.5 sm:gap-2 font-montserrat hover:opacity-80 cursor-pointer whitespace-nowrap px-5 py-2 rounded-lg"
                onClick={() => {
                  setSelectedService(service);
                  setIsModalOpen(true);
                }}
                style={{ 
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '20px',
                  textAlign: 'center',
                  color: '#079748', 
                  background: 'transparent' 
                }}
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
          {isLoading && (
            <div className="px-6 py-8 text-center text-gray-500">
              Chargement de vos dossiers...
            </div>
          )}
          
          {error && (
            <div className="px-6 py-8 text-center text-red-500">
              {error}
            </div>
          )}
          
          {!isLoading && !error && myRequests.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              Vous n&apos;avez aucun dossier déposé
            </div>
          )}
          
          {!isLoading && !error && myRequests.map((request) => {
            const statusDisplay = getStatusDisplay(request.status);
            
            return (
              <div 
                key={request.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4"
              >
                <div className="flex-1">
                  <span 
                    className="font-montserrat block"
                    style={{
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '24px',
                      color: '#1E1E1E'
                    }}
                  >
                    {request.service.name}
                  </span>
                  <span className="text-sm text-gray-500 mt-1 block">
                    Soumis le {formatDate(request.submitted_at)}
                  </span>
                  {request.rejection_comment && (
                    <span className="text-sm text-red-600 mt-1 block">
                      Motif: {request.rejection_comment}
                    </span>
                  )}
                </div>
                <span
                  className="px-5 py-2 font-montserrat font-semibold text-sm sm:text-base"
                  style={{ 
                    background: statusDisplay.bg, 
                    borderRadius: 40, 
                    color: statusDisplay.color, 
                    minWidth: 100, 
                    textAlign: 'center' 
                  }}
                >
                  {statusDisplay.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de dépôt de document */}
      <DocumentUploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
        service={selectedService}
      />
    </div>
  );
}
