/**
 * Service d'authentification
 * Gère toutes les opérations liées à l'authentification
 */

import { API_ENDPOINTS, API_TOKENS } from '@/app/constants/api';
import type { 
  LoginCredentials, 
  RegisterData, 
  OTPVerification, 
  PasswordSetup, 
  AuthResponse,
  EmployeeData 
} from '@/app/types';

class AuthService {
  /**
   * Récupère les données d'un employé par NIU
   */
  async getEmployeeByNIU(niu: string): Promise<EmployeeData> {
    const response = await fetch(`${API_ENDPOINTS.EMPLOYEE}${niu}`, {
      headers: {
        Authorization: `Bearer ${API_TOKENS.EMPLOYEE}`,
      },
    });

    if (!response.ok) {
      throw new Error("NIU introuvable ou erreur serveur");
    }

    const data = await response.json();
    return data.data;
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(registerData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || data.detail || "Erreur lors de la création du compte";
      throw new Error(errorMessage);
    }

    return data;
  }

  /**
   * Vérification du code OTP
   */
  async verifyOTP(otpData: OTPVerification, token?: string): Promise<void> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(API_ENDPOINTS.VERIFY_2FA, {
      method: "POST",
      headers,
      body: JSON.stringify(otpData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Code OTP invalide");
    }
  }

  /**
   * Définition du mot de passe
   */
  async setPassword(passwordData: PasswordSetup, token?: string): Promise<void> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(API_ENDPOINTS.SET_PASSWORD, {
      method: "POST",
      headers,
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la création du mot de passe");
    }
  }

  /**
   * Connexion d'un utilisateur
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Construire le body en fonction de ce qui est fourni
    // L'API s'attend probablement à 'matricule' ou 'username'
    const body = {
      matricule: credentials.matricule || credentials.niu || credentials.username,
      password: credentials.password,
    };
    
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
   

    if (!response.ok) {
      const errorMessage = data.errors 
        ? Object.entries(data.errors)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")
        : data.message || "Identifiants invalides";
      throw new Error(errorMessage);
    }

    return data;
  }

  /**
   * Stocke le token d'authentification
   */
  storeToken(token: string): void {
    if (typeof window !== "undefined") {
      // LocalStorage
      localStorage.setItem('token', token);
      
      // Cookie pour le middleware Next.js
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
    }
  }

  /**
   * Récupère le token d'authentification
   */
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Supprime le token d'authentification (logout)
   */
  clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem('token');
      document.cookie = 'token=; path=/; max-age=0';
    }
  }
}

// Export singleton
export const authService = new AuthService();
