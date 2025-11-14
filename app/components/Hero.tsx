"use client";

import { useState } from "react";
// Type pour les données employé
interface EmployeeData {
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

const API_URL = "https://payroll-management.sesur.bj/api/partners/employees/";
const API_TOKEN = "3|7K11AawrrXNM9N528K3u6dnFUwHDtz5MKWf8bMH93f19f9dd"; // À sécuriser côté backend en prod
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import Image from "next/image";

// Header Component
function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-30 bg-transparent">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between py-2 sm:py-3">
          <div className="cursor-pointer">
            <Image 
              src="/assets/logo.png" 
              alt="Logo e-solde" 
              height={70} 
              width={210} 
              className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto drop-shadow-lg filter invert brightness-0" 
              priority 
            />
          </div>
          <Image 
            src="/assets/portail.png" 
            alt="Portail" 
            height={56} 
            width={175} 
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto drop-shadow-lg filter invert brightness-0 contrast-200" 
          />
        </div>
      </div>
    </header>
  );
}

// Improved Stepper Component

const steps = [
  { label: "NIU" },
  { label: "Mes informations" },
  { label: "Code OTP" },
  { label: "Mot de passe" },
];

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div
      className="flex flex-row items-center mb-6 w-full bg-white rounded-lg px-2 sm:px-4 py-3"
      style={{ border: '1px solid #F2F2F2' }}
    >
      {steps.map((step, idx) => {
        const isActive = currentStep === idx + 1;
        const isCompleted = currentStep > idx + 1;
        return (
          <div key={idx} className="flex items-center flex-1 min-w-0">
            <div className="flex items-center gap-2 w-full">
              <div
                className={`w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center rounded-full border-2 shrink-0 ${isActive ? 'border-[#355F9E] bg-[#355F9E] text-white' : isCompleted ? 'border-[#355F9E] bg-[#355F9E] text-white' : 'border-[#808080] bg-white text-[#808080]'}`}
              >
                {(isCompleted || isActive) ? (
                  <Check className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white" />
                ) : (
                  <span className="font-bold text-xs sm:text-xs">{(idx + 1).toString().padStart(2, '0')}</span>
                )}
              </div>
              <span
                className={`hidden sm:inline text-xs sm:text-sm font-montserrat truncate ${isActive ? 'text-[#355F9E] font-semibold' : 'text-[#808080]'}`}
                style={{ width: '100%' }}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <svg
                className="mx-2 shrink-0 self-stretch my-1"
                width="8"
                viewBox="0 0 8 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 0L6 20L1 40"
                  stroke={isCompleted ? '#355F9E' : '#808080'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Hero Section Component
export default function Hero() {
  const router = useRouter();
  // Token pour la vérification OTP
  const [registerToken, setRegisterToken] = useState<string | null>(null);
  const [showInscription, setShowInscription] = useState(false);
  const [inscriptionStep, setInscriptionStep] = useState(1);
  const [niu, setNiu] = useState("");
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  // Suppression de l'étape matricule
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [loadingNiu, setLoadingNiu] = useState(false);
  const [errorNiu, setErrorNiu] = useState("");

  const handleInscriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niu.trim()) return;
    setLoadingNiu(true);
    setErrorNiu("");
    try {
      const res = await fetch(`${API_URL}${niu}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error("NIU introuvable ou erreur serveur");
      const data = await res.json();
      setEmployee(data.data);
      setInscriptionStep(2);
    } catch (err) {
      setErrorNiu((err as Error).message || "Erreur inconnue");
    } finally {
      setLoadingNiu(false);
    }
  };
  
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const handleInscriptionFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError("");
    if (!employee) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          niu: employee.niu,
          date_of_birth: employee.date_of_birth,
          email: employee.email,
          phone: employee.phone,
          first_name: employee.first_name,
          last_name: employee.last_name,
        }),
      });
      let responseData = null;
      try {
        responseData = await res.clone().json();
      } catch {}
      if (!res.ok) {
        let apiError = "Erreur lors de la création du compte utilisateur";
        if (responseData && responseData.message) {
          apiError = responseData.message;
        } else if (responseData && responseData.detail) {
          apiError = responseData.detail;
        }
        throw new Error(apiError);
      }
      if (responseData && responseData.token) {
        setRegisterToken(responseData.token);
      }
      setInscriptionStep(3);
    } catch (err) {
      setRegisterError((err as Error).message || "Erreur inconnue");
    } finally {
      setRegisterLoading(false);
    }
  };

  // Suppression de la fonction handleMatriculeSubmit

  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    if (!otpCode.trim()) return;
    setOtpLoading(true);
    try {
      const res = await fetch("https://esolde.sesur.bj/api/auth/verify-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(registerToken ? { Authorization: `Bearer ${registerToken}` } : {}),
        },
        body: JSON.stringify({ code: otpCode.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Code OTP invalide");
      }
  setInscriptionStep(5);
    } catch (err) {
      setOtpError((err as Error).message || "Erreur OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword.trim() && confirmPassword.trim()) {
      if (newPassword !== confirmPassword) {
        setPasswordError("Les mots de passe ne correspondent pas !");
        return;
      }
      setPasswordLoading(true);
      try {
        const res = await fetch("https://esolde.sesur.bj/api/user/set-first-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(registerToken ? { Authorization: `Bearer ${registerToken}` } : {}),
          },
          body: JSON.stringify({
            password: newPassword,
            password_confirmation: confirmPassword,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Erreur lors de la création du mot de passe");
        }
  alert(`Inscription complétée avec succès !\n\nVotre compte a été créé.`);
  setNiu("");
  setOtpCode("");
  setNewPassword("");
  setConfirmPassword("");
  setInscriptionStep(1);
  setShowInscription(false);
      } catch (err) {
        setPasswordError((err as Error).message || "Erreur inconnue");
      } finally {
        setPasswordLoading(false);
      }
    }
  };

  const handleResendOtp = () => {
    alert("Un nouveau code OTP a été envoyé !");
  };

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const handleConnexionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (matricule.trim() && password.trim()) {
      setLoginLoading(true);
      try {
        const res = await fetch("https://esolde.sesur.bj/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            niu: matricule.trim(),
            password: password.trim(),
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Identifiants invalides");
        }
        if (typeof window !== "undefined" && data.token) {
          localStorage.setItem('token', data.token);
        }
        router.push('/dashboard');
      } catch (err) {
        setLoginError((err as Error).message || "Erreur de connexion");
      } finally {
        setLoginLoading(false);
      }
    }
  };

  const resetInscription = () => {
    setShowInscription(false);
    setInscriptionStep(1);
    setNiu("");
  // Suppression de la remise à zéro du matriculeInscription
    setOtpCode("");
    setNewPassword("");
    setConfirmPassword("");
    setEmployee(null);
    setErrorNiu("");
    setLoadingNiu(false);
  };

  return (
    <>
      <Header />
      
      <section className="relative flex flex-col" style={{ minHeight: '85vh' }}>
        {/* Image de fond */}
        <div className="relative w-full" style={{ height: '55vh', minHeight: '380px' }}>
          <Image
            src="/assets/hero.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Zone blanche en bas */}
        <div className="flex-1 bg-white" style={{ minHeight: '200px' }}></div>

        {/* Formulaire centré et superposé */}
  <div className="absolute inset-0 flex items-end justify-center pb-8">
          <div className="w-full max-w-[860px] mx-auto px-4" style={{ position: 'relative', zIndex: 2, marginTop: '-120px' }}>
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden min-h-[540px] flex flex-col justify-between" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
              {/* Barre tricolore */}
              <div className="flex h-2.5">
                <div className="flex-1 bg-[#009543]"></div>
                <div className="flex-1 bg-[#FFD600]"></div>
                <div className="flex-1 bg-[#EF1A1A]"></div>
              </div>
              <div className="p-8 sm:p-12 lg:p-16">
                {!showInscription ? (
                  // Formulaire de connexion
                  <>
                    <div className="mb-7 text-center">
                      <h1
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-montserrat text-[#0F2137] drop-shadow-md leading-snug sm:leading-tight mb-2 sm:mb-4"
                      >
                        <span className="block">Bureau Virtuel de la Solde</span>
                        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
                      </h1>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-[#000000] mb-3 drop-shadow-sm tracking-wide text-center">
                      Connexion
                    </h2>
                    <p className="text-base sm:text-lg font-open-sans text-center mb-7 text-[#333333]">
                      Connectez-vous pour accéder à la plateforme
                    </p>

                    <form onSubmit={handleConnexionSubmit} className="space-y-3.5">
                      <div>
                        <label htmlFor="matricule" className="block font-open-sans font-semibold text-lg mb-2 text-[#1E1E1E]">
                          NIU
                        </label>
                        <input
                          type="text"
                          id="matricule"
                          value={matricule}
                          onChange={(e) => setMatricule(e.target.value)}
                          placeholder="CG-NIU-1982-0015"
                          className="w-full h-[52px] px-4 bg-white border border-[#DCDCDC] rounded-md text-base placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#0F2137] focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="block font-open-sans font-semibold text-lg mb-2 text-[#1E1E1E]">
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Mot de passe"
                          className="w-full h-[52px] px-4 bg-white border border-[#DCDCDC] rounded-md text-base placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#0F2137] focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      <div className="text-center pt-0.5">
                        <a href="#" className="text-sm font-open-sans text-[#0F2137] hover:underline">
                          Mot de passe oublié?
                        </a>
                      </div>

                      {loginError && <div className="text-red-500 text-sm font-montserrat">{loginError}</div>}
                      <button
                        type="submit"
                        className="w-full h-[52px] bg-[#0F2137] text-white rounded-lg font-open-sans font-semibold text-lg hover:bg-[#0F2137]/90 transition-colors mt-4 cursor-pointer"
                        disabled={loginLoading}
                      >
                        {loginLoading ? "Connexion..." : "Connectez-vous"}
                      </button>

                      <p className="text-center text-base font-sans pt-2">
                        Vous n&#39;avez pas de compte?{' '}
                        <button 
                          type="button"
                          onClick={() => setShowInscription(true)}
                          className="text-[#0F2137] font-semibold hover:underline cursor-pointer"
                        >
                          Inscrivez-vous
                        </button>
                      </p>
                    </form>
                  </>
                ) : inscriptionStep === 1 ? (
                  // Étape 1 : NIU
                  <>
                    <div className="mb-6 text-center">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-montserrat text-[#0F2137] drop-shadow-md leading-snug sm:leading-tight mb-2 sm:mb-4">
                        <span className="block">Bureau Virtuel de la Solde</span>
                        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
                      </h1>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-[#000000] mb-6 drop-shadow-sm tracking-wide text-center">
                      Inscription
                    </h2>
                    <p className="text-sm sm:text-base font-montserrat text-center mb-8 text-[#343D48]">
                      Entrez vos identifiants pour accéder à la plateforme
                    </p>
                    <div className="mb-8">
                      <Stepper currentStep={1} />
                    </div>
                    <form onSubmit={handleInscriptionSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="niu" className="block font-montserrat font-semibold text-sm mb-1.5 text-[#343D48]">
                          Numéro d&#39;Identification Unique
                        </label>
                        <input
                          type="text"
                          id="niu"
                          value={niu}
                          onChange={(e) => setNiu(e.target.value)}
                          placeholder="87675645677644554"
                          className="w-full h-[46px] px-3.5 bg-white border border-[#DCDCDC] rounded-md text-sm placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#0F2137] focus:border-transparent transition-all"
                          required
                          disabled={loadingNiu}
                        />
                      </div>
                      {errorNiu && <div className="text-red-500 text-sm font-montserrat">{errorNiu}</div>}
                      <button
                        type="submit"
                        className="w-full h-[46px] bg-[#0F2137] text-white rounded-lg font-montserrat font-semibold text-sm hover:bg-[#0F2137]/90 transition-colors mt-3 cursor-pointer"
                        disabled={loadingNiu}
                      >
                        {loadingNiu ? "Recherche..." : "Continuer"}
                      </button>

                      <p className="text-center text-sm font-montserrat pt-1">
                        Vous avez déjà un compte?{' '}
                        <button 
                          type="button"
                          onClick={resetInscription}
                          className="text-[#0F2137] font-semibold hover:underline cursor-pointer"
                        >
                          Connexion
                        </button>
                      </p>
                    </form>
                  </>
                ) : inscriptionStep === 2 ? (
                  // Étape 2 : Informations dynamiques
                  employee && (
                    <>
                    <div className="mb-6 text-center">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-montserrat text-[#0F2137] drop-shadow-md leading-snug sm:leading-tight mb-2 sm:mb-4">
                        <span className="block">Bureau Virtuel de la Solde</span>
                        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
                      </h1>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-[#000000] mb-6 drop-shadow-sm tracking-wide text-center">
                      Inscription
                    </h2>
                      <p className="text-sm sm:text-base font-montserrat text-center mb-5 text-[#343D48] font-semibold">
                        Vos informations
                      </p>
                      <Stepper currentStep={2} />

                      <form onSubmit={handleInscriptionFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-montserrat font-semibold text-xs mb-1.5 text-[#343D48]">
                              Nom
                            </label>
                            <p className="font-montserrat text-sm text-[#343D48]">{employee.last_name}</p>
                          </div>
                          <div>
                            <label className="block font-montserrat font-semibold text-xs mb-1.5 text-[#343D48]">
                              Prénom
                            </label>
                            <p className="font-montserrat text-sm text-[#343D48]">{employee.first_name}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-montserrat font-semibold text-xs mb-1.5 text-[#343D48]">
                              Email
                            </label>
                            <p className="font-montserrat text-sm text-[#343D48] truncate">{employee.email}</p>
                          </div>
                          <div>
                            <label className="block font-montserrat font-semibold text-xs mb-1.5 text-[#343D48]">
                              Téléphone
                            </label>
                            <p className="font-montserrat text-sm text-[#343D48]">{employee.phone}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-montserrat font-semibold text-xs mb-1.5 text-[#343D48]">
                              Date de naissance
                            </label>
                            <p className="font-montserrat text-sm text-[#343D48]">{employee.date_of_birth}</p>
                          </div>
                          <div>
                            <label className="block font-montserrat font-semibold text-xs mb-1.5 text-[#343D48]">
                              Sexe
                            </label>
                            <p className="font-montserrat text-sm text-[#343D48]">{employee.sex === 'M' ? 'Masculin' : employee.sex === 'F' ? 'Féminin' : employee.sex}</p>
                          </div>
                        </div>

                        <div>
                          <label className="block font-montserrat font-semibold text-xs mb-1.5 text-[#343D48]">
                            Lieu de naissance
                          </label>
                          <p className="font-montserrat text-sm text-[#343D48]">{employee.place_of_birth}</p>
                        </div>
                        <div>
                          <label className="block font-montserrat font-semibold text-xs mb-1.5 text-[#343D48]">
                            Organisation
                          </label>
                          <p className="font-montserrat text-sm text-[#343D48]">{employee.org?.name}</p>
                        </div>

                        {registerError && <div className="text-red-500 text-sm font-montserrat">{registerError}</div>}
                        <div className="flex items-center justify-between pt-3">
                          <button
                            type="button"
                            onClick={() => setInscriptionStep(1)}
                            className="flex items-center justify-center w-10 h-10 rounded-md bg-[#0F21370D] text-[#0F2137] hover:bg-[#0F213715] transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                          </button>
                          
                          <button
                            type="submit"
                            className="px-7 h-[42px] bg-[#0F2137] text-white rounded-lg font-montserrat font-semibold text-sm hover:bg-[#0F2137]/90 transition-colors cursor-pointer"
                            disabled={registerLoading}
                          >
                            {registerLoading ? "Création..." : "Valider"}
                          </button>
                        </div>
                      </form>
                    </>
                  )
                ) : inscriptionStep === 3 ? (
                  // Étape 3 : Matricule
                  <>
                    <div className="mb-6 text-center">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-montserrat text-[#0F2137] drop-shadow-md leading-snug sm:leading-tight mb-2 sm:mb-4">
                        <span className="block">Bureau Virtuel de la Solde</span>
                        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
                      </h1>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-[#000000] mb-6 drop-shadow-sm tracking-wide text-center">
                      Inscription
                    </h2>
                    <p className="text-sm sm:text-base font-montserrat text-center mb-5 text-[#343D48]">
                      Entrez vos identifiants pour accéder à la plateforme
                    </p>
                    <Stepper currentStep={3} />

                      <form onSubmit={handleOtpSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="otpCode" className="block font-montserrat font-semibold text-sm mb-1.5 text-[#343D48]">
                          Code OTP
                        </label>
                        <input
                          type="text"
                          id="otpCode"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="Code OTP"
                          className="w-full h-[46px] px-3.5 bg-white border border-[#DCDCDC] rounded-md text-sm placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#0F2137] focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      <div className="text-center space-y-1">
                        <p className="text-xs font-montserrat text-[#343D48]">
                          Pas reçu le code?{' '}
                          <button 
                            type="button"
                            onClick={handleResendOtp}
                            className="text-[#0F2137] font-semibold hover:underline"
                          >
                            Renvoyer
                          </button>
                        </p>
                        <p className="text-[11px] font-montserrat text-[#888] italic">
                          Expire après 3 minutes
                        </p>
                      </div>

                      {otpError && <div className="text-red-500 text-sm font-montserrat">{otpError}</div>}
                      <div className="flex items-center justify-between pt-3">
                        <button
                          type="button"
                          onClick={() => setInscriptionStep(3)}
                            className="flex items-center justify-center w-10 h-10 rounded-md bg-[#0F21370D] text-[#0F2137] hover:bg-[#0F213715] transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                        </button>
                        
                        <button
                          type="submit"
                          className="px-7 h-[42px] bg-[#0F2137] text-white rounded-lg font-montserrat font-semibold text-sm hover:bg-[#0F2137]/90 transition-colors cursor-pointer"
                          disabled={otpLoading}
                        >
                          {otpLoading ? "Vérification..." : "Valider"}
                        </button>
                      </div>
                    </form>
                  </>
                ) : inscriptionStep === 5 ? (
                  // Étape 5 : Mot de passe
                  <>
                    <div className="mb-6 text-center">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-montserrat text-[#0F2137] drop-shadow-md leading-snug sm:leading-tight mb-2 sm:mb-4">
                        <span className="block">Bureau Virtuel de la Solde</span>
                        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
                      </h1>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-[#000000] mb-6 drop-shadow-sm tracking-wide text-center">
                      Inscription
                    </h2>
                    <p className="text-sm sm:text-base font-montserrat text-center mb-5 text-[#343D48]">
                      Créez votre mot de passe
                    </p>
                    <Stepper currentStep={4} />

                    <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                      <div>
                        <label htmlFor="newPassword" className="block font-montserrat font-semibold text-sm mb-1.5 text-[#343D48]">
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Mot de passe"
                          className="w-full h-[46px] px-3.5 bg-white border border-[#DCDCDC] rounded-md text-sm placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#0F2137] focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block font-montserrat font-semibold text-sm mb-1.5 text-[#343D48]">
                          Confirmez le mot de passe
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Mot de passe"
                          className="w-full h-[46px] px-3.5 bg-white border border-[#DCDCDC] rounded-md text-sm placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#0F2137] focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      {passwordError && <div className="text-red-500 text-sm font-montserrat">{passwordError}</div>}
                      <div className="flex items-center justify-between pt-3">
                        <button
                          type="button"
                          onClick={() => setInscriptionStep(4)}
                            className="flex items-center justify-center w-10 h-10 rounded-md bg-[#0F21370D] text-[#0F2137] hover:bg-[#0F213715] transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                        </button>
                        
                        <button
                          type="submit"
                          className="px-7 h-[42px] bg-[#0F2137] text-white rounded-lg font-montserrat font-semibold text-sm hover:bg-[#0F2137]/90 transition-colors cursor-pointer"
                          disabled={passwordLoading}
                        >
                          {passwordLoading ? "Création..." : "Valider"}
                        </button>
                      </div>
                    </form>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}