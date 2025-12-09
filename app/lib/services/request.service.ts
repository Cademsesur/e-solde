/**
 * Service de gestion des dépôts de dossiers (requests)
 */

import { API_ENDPOINTS } from '@/app/constants/api';
import type { Service, ServicesResponse, ServiceRequest, SubmitRequestResponse } from '@/app/types';

class RequestService {
  /**
   * Récupère la liste des services disponibles pour dépôt
   */
  async getServices(token: string): Promise<Service[]> {
    try {
      const response = await fetch(API_ENDPOINTS.SERVICES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API services:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Erreur lors de la récupération des services (${response.status}): ${response.statusText}`);
      }

      const data: ServicesResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Erreur complète:', error);
      throw error;
    }
  }

  /**
   * Soumet une demande pour un service spécifique
   * @param serviceId - ID du service
   * @param documents - Fichiers à uploader (FormData avec les documents requis)
   * @param token - Token d'authentification
   */
  async submitRequest(
    serviceId: number,
    documents: FormData,
    token: string
  ): Promise<ServiceRequest> {
    try {
      const endpoint = `${API_ENDPOINTS.SERVICES}/${serviceId}/requests`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Ne pas définir Content-Type, le navigateur le fera automatiquement avec boundary pour multipart/form-data
        },
        body: documents,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API soumission:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Erreur lors de la soumission (${response.status}): ${response.statusText}`);
      }

      const result: SubmitRequestResponse = await response.json();
      return result.data;
    } catch (error) {
      console.error('Erreur complète:', error);
      throw error;
    }
  }

  /**
   * Récupère l'historique des demandes de l'utilisateur pour tous les services
   * @param services - Liste des services disponibles
   * @param token - Token d'authentification
   */
  async getMyRequests(services: Service[], token: string): Promise<ServiceRequest[]> {
    try {
      // Récupérer les demandes pour chaque service en parallèle
      const requestsPromises = services.map(async (service) => {
        try {
          const response = await fetch(`${API_ENDPOINTS.SERVICES}/${service.id}/requests`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            // Si le service n'a pas de demandes, retourner un tableau vide
            if (response.status === 404) {
              return [];
            }
            console.warn(`Erreur pour le service ${service.id}:`, response.status);
            return [];
          }

          const data = await response.json();
          // L'API peut retourner soit un objet data avec un tableau, soit directement un tableau
          return Array.isArray(data) ? data : (data.data || []);
        } catch (error) {
          console.warn(`Erreur lors de la récupération des demandes pour le service ${service.id}:`, error);
          return [];
        }
      });

      const allRequests = await Promise.all(requestsPromises);
      // Fusionner tous les tableaux et filtrer les résultats
      return allRequests.flat().filter(Boolean);
    } catch (error) {
      console.error('Erreur complète getMyRequests:', error);
      return [];
    }
  }

  /**
   * Récupère les demandes pour un service spécifique
   */
  async getRequestsByService(serviceId: number, token: string): Promise<ServiceRequest[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.SERVICES}/${serviceId}/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        const errorText = await response.text();
        console.error('Erreur API demandes par service:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Erreur lors de la récupération des demandes (${response.status}): ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
      console.error('Erreur complète:', error);
      if (error instanceof TypeError) {
        return [];
      }
      throw error;
    }
  }

  /**
   * Récupère les détails d'une demande spécifique
   */
  async getRequestById(requestId: number, token: string): Promise<ServiceRequest | null> {
    try {
      const response = await fetch(`${API_ENDPOINTS.SERVICES}/requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const errorText = await response.text();
        console.error('Erreur API détail demande:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Erreur lors de la récupération de la demande (${response.status}): ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Erreur complète:', error);
      throw error;
    }
  }
}

// Export singleton
export const requestService = new RequestService();
