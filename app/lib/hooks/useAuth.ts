/**
 * Hook personnalisé pour l'authentification
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';
import type { LoginCredentials, RegisterData, OTPVerification, PasswordSetup, EmployeeData } from '@/app/types';
import { ROUTES } from '@/app/constants/routes';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  /**
   * Connexion
   */
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await authService.login(credentials);
      if (response.token) {
        authService.storeToken(response.token);
        router.push(ROUTES.DASHBOARD);
      }
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Déconnexion
   */
  const logout = () => {
    authService.clearToken();
    router.push(ROUTES.HOME);
  };

  /**
   * Récupération d'un employé par NIU
   */
  const getEmployeeByNIU = async (niu: string): Promise<EmployeeData> => {
    setIsLoading(true);
    setError("");
    
    try {
      const employee = await authService.getEmployeeByNIU(niu);
      return employee;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Inscription
   */
  const register = async (registerData: RegisterData): Promise<string | undefined> => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await authService.register(registerData);
      return response.token;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Vérification OTP
   */
  const verifyOTP = async (otpData: OTPVerification, token?: string): Promise<boolean> => {
    setIsLoading(true);
    setError("");
    
    try {
      await authService.verifyOTP(otpData, token);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Définition du mot de passe
   */
  const setPassword = async (passwordData: PasswordSetup, token?: string): Promise<boolean> => {
    setIsLoading(true);
    setError("");
    
    try {
      await authService.setPassword(passwordData, token);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    logout,
    register,
    getEmployeeByNIU,
    verifyOTP,
    setPassword,
    isLoading,
    error,
    setError,
  };
}
