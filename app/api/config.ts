// Types UI spécifiques (exposés pour usage global)
export type TabCardProps = {
  tab: {
    icon: React.ElementType;
    name: string;
    description: string;
    color?: string;
    bgColor?: string;
  };
  isActive: boolean;
  onClick: () => void;
};

export type DocumentCardProps = {
  title: string;
  onPreview?: () => void;
  onDownload: () => void;
  date?: string;
  showPreview?: boolean;
};
// Centralisation des types, interfaces et endpoints sensibles pour l'app e-solde

// Types et interfaces
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

// Endpoints API (à utiliser dans les fetch)
export const API_EMPLOYEE_URL = process.env.NEXT_PUBLIC_API_EMPLOYEE_URL!;
export const API_EMPLOYEE_TOKEN = process.env.NEXT_PUBLIC_API_EMPLOYEE_TOKEN!;
export const API_LOGIN_URL = process.env.NEXT_PUBLIC_API_LOGIN_URL!;
export const API_PROFILE_URL = process.env.NEXT_PUBLIC_API_PROFILE_URL!;
export const API_PAYSLIPS_URL = process.env.NEXT_PUBLIC_API_PAYSLIPS_URL!;
export const API_REGISTER_URL = process.env.NEXT_PUBLIC_API_REGISTER_URL!;
export const API_VERIFY_2FA_URL = process.env.NEXT_PUBLIC_API_VERIFY_2FA_URL!;
export const API_SET_PASSWORD_URL = process.env.NEXT_PUBLIC_API_SET_PASSWORD_URL!;

// Ajoute d'autres types ou endpoints ici si besoin
