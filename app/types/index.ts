/**
 * Types et interfaces centralisés pour l'application e-solde
 */

// ====== Types Utilisateur ======
export interface EmployeeData {
  id: number;
  niu: string;
  matricule?: string;
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
  matricule: string;
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

// ====== Types Guide/Service ======
export interface RequiredDocument {
  id: number;
  label: string;
  type: string;
  is_required: boolean;
}

export interface Guide {
  id: number;
  name: string;
  description: string;
  procedure: string;
  procedure_file_path: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  required_documents: RequiredDocument[];
}

export interface GuidesResponse {
  data: Guide[];
}

// ====== Types Dépôt de Dossier ======
export interface ServiceRequest {
  id: number;
  status: 'submitted' | 'processing' | 'completed' | 'rejected';
  submitted_at: string;
  processed_at: string | null;
  rejection_comment: string | null;
  service: {
    id: number;
    name: string;
    description: string;
    procedure: string;
    procedure_file_path: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  documents: UploadedDocument[];
}

export interface UploadedDocument {
  id: number;
  required_document_id: number;
  file_path: string;
  file_original_name: string;
  mime_type: string;
  uploaded_at: string;
}

export interface SubmitRequestResponse {
  data: ServiceRequest;
  message: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  procedure: string;
  procedure_file_path: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  required_documents: RequiredDocument[];
}

export interface ServicesResponse {
  data: Service[];
}

// ====== Types Erreur ======
export interface ApiError {
  message: string;
  detail?: string;
  errors?: Record<string, string[]>;
}
