/**
 * Service de gestion des guides
 */

import { API_ENDPOINTS } from '@/app/constants/api';
import type { Guide, GuidesResponse } from '@/app/types';

class GuideService {
  /**
   * Récupère la liste des guides
   */
  async getGuides(token: string): Promise<Guide[]> {
    try {
      const response = await fetch(API_ENDPOINTS.SERVICES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API guides:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Erreur lors de la récupération des guides (${response.status}): ${response.statusText}`);
      }

      const data: GuidesResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Erreur complète:', error);
      throw error;
    }
  }

  /**
   * Récupère un guide par son ID
   */
  async getGuideById(id: number, token: string): Promise<Guide | null> {
    const guides = await this.getGuides(token);
    return guides.find(guide => guide.id === id) || null;
  }
}

// Export singleton
export const guideService = new GuideService();
