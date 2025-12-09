/**
 * Service de gestion des bulletins de solde
 */

import { API_ENDPOINTS } from '@/app/constants/api';
import type { Payslip } from '@/app/types';

class PayslipService {
  /**
   * Récupère la liste des bulletins de solde
   */
  async getPayslips(token: string): Promise<Payslip[]> {
    const response = await fetch(API_ENDPOINTS.PAYSLIPS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des bulletins");
    }

    const data = await response.json();
    return data.data || [];
  }

  /**
   * Télécharge un bulletin de solde
   */
  async downloadPayslip(id: number, token: string): Promise<Blob> {
    const response = await fetch(`${API_ENDPOINTS.PAYSLIPS}/${id}/download`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement du bulletin");
    }

    return await response.blob();
  }
}

// Export singleton
export const payslipService = new PayslipService();
