/**
 * Service de gestion du profil utilisateur
 */

import { API_ENDPOINTS } from '@/app/constants/api';
import type { UserProfile } from '@/app/types';

class ProfileService {
  /**
   * Récupère le profil de l'utilisateur connecté
   */
  async getProfile(token: string): Promise<UserProfile> {
    console.log("📤 Récupération du profil avec le token:", token.substring(0, 20) + "...");
    
    const response = await fetch(API_ENDPOINTS.PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("📥 Réponse du profil API:", data);

    if (!response.ok) {
      console.error("❌ Erreur API:", data);
      throw new Error(data.message || "Erreur lors de la récupération du profil");
    }

    // Gérer les différentes structures de réponse possibles
    let profile: UserProfile;
    
    if (data.user) {
      // Si c'est { user: {...} }, extraire le contenu
      profile = typeof data.user === 'object' ? data.user : data;
    } else if (data.data) {
      profile = data.data;
    } else {
      profile = data;
    }
    
    console.log("✅ Profil extrait:", profile);
    console.log("👤 Détails du profil - Name:", profile.name, "Email:", profile.email, "Avatar:", profile.avatar);
    
    return profile;
  }
}

// Export singleton
export const profileService = new ProfileService();
