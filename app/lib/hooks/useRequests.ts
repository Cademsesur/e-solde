/**
 * Hook personnalisé pour gérer les services et les demandes de dépôt de dossier
 */

import { useState, useCallback } from 'react';
import { requestService } from '../services';
import type { Service, ServiceRequest } from '@/app/types';

export function useRequests() {
  const [services, setServices] = useState<Service[]>([]);
  const [myRequests, setMyRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Récupère la liste des services disponibles
   */
  const fetchServices = useCallback(async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await requestService.getServices(token);
      setServices(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des services';
      setError(errorMessage);
      console.error('Erreur fetchServices:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Récupère l'historique des demandes
   * @param token - Token d'authentification
   */
  const fetchMyRequests = useCallback(async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await requestService.getMyRequests(token);
      setMyRequests(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement de l\'historique';
      console.warn('fetchMyRequests:', errorMessage);
      // Garder un tableau vide au lieu d'afficher une erreur
      setMyRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Soumet une nouvelle demande
   */
  const submitRequest = useCallback(async (
    serviceId: number,
    documents: FormData,
    token: string
  ): Promise<ServiceRequest | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestService.submitRequest(serviceId, documents, token);
      // Rafraîchir la liste des demandes après soumission
      await fetchMyRequests(token);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la soumission';
      setError(errorMessage);
      console.error('Erreur submitRequest:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchMyRequests]);

  return {
    services,
    myRequests,
    isLoading,
    error,
    fetchServices,
    fetchMyRequests,
    submitRequest,
  };
}
