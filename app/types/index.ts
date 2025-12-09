/**
 * Types et interfaces centralisés pour l'application e-solde
 */

// ====== Types Utilisateur ======
export interface EmployeeData {
  id: number;
  niu: string;
  first_name: string;
  last_name: string;
  sex: string;
  date_of_birth: string;
  place_of_birth: string;
  email: string;
  phone: string;
  status: string;
  org: {
    code: string;
    name: string;
  };
}

export interface UserProfile {
  id: number;
  reference: string;
  name: string;
  email: string;
  phone: string;
  employee_niu?: string;
  employee_matricule?: string;
  poste?: string;
  avatar?: string;
}

// ====== Types Documents ======
export interface Payslip {
  id: number;
  period: {
    year: number;
    month: number;
    label: string;
  };
  currency: string;
  issued_at: string;
  amounts: {
    gross: string;
    earnings_total: string;
    deductions: string;
    net: string;
  };
}

export interface BulletinData {
  title: string;
  id: string;
  period?: string;
  net?: string;
  issued_at?: string;
  currency?: string;
}

// ====== Types Authentification ======
export interface LoginCredentials {
  matricule?: string;
  username?: string;
  niu?: string;
  password: string;
}

export interface RegisterData {
  niu: string;
  date_of_birth: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
}

export interface OTPVerification {
  code: string;
}

export interface PasswordSetup {
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  message?: string;
}

// ====== Types UI ======
export interface Tab {
  icon: React.ElementType;
  name: string;
  description: string;
  color?: string;
  bgColor?: string;
}

export interface TabCardProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}

export interface DocumentCardProps {
  title: string;
  onPreview?: () => void;
  onDownload: () => void;
  date?: string;
  showPreview?: boolean;
}

export interface ActionItem {
  title: string;
  date: string;
  id: string;
}

export interface DemarcheItem {
  title: string;
  id: string;
}

// ====== Types Erreur ======
export interface ApiError {
  message: string;
  detail?: string;
  errors?: Record<string, string[]>;
}
