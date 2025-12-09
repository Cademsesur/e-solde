/**
 * Hook personnalisé pour le profil utilisateur
 */

import { useState, useEffect } from 'react';
import { profileService } from '../services/profile.service';
import { authService } from '../services/auth.service';
import type { UserProfile } from '@/app/types';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  /**
   * Charge le profil utilisateur
   */
  const loadProfile = async () => {
    const token = authService.getToken();
    if (!token) {
      console.warn("⚠️ Pas de token trouvé");
      setError("Non authentifié");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("🔄 Chargement du profil...");
      const profileData = await profileService.getProfile(token);
      console.log("✅ Profil chargé avec succès:", profileData);
      setProfile(profileData);
    } catch (err) {
      const errorMsg = (err as Error).message;
      console.error("❌ Erreur lors du chargement du profil:", errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Charge automatiquement le profil au montage
   */
  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    refreshProfile: loadProfile,
  };
}
