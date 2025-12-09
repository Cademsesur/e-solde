/**
 * Hook pour gérer les guides
 */

import { useState, useEffect } from 'react';
import { guideService } from '@/app/lib/services';
import type { Guide } from '@/app/types';

export function useGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Non authentifié");
        }

        const data = await guideService.getGuides(token);
        setGuides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des guides");
        console.error("Erreur lors de la récupération des guides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Non authentifié");
      }

      const data = await guideService.getGuides(token);
      setGuides(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des guides");
      console.error("Erreur lors de la récupération des guides:", err);
    } finally {
      setLoading(false);
    }
  };

  return { guides, loading, error, refetch };
}
