"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { Stepper } from "@/app/components/ui/Stepper";
import { FormTitle } from "@/app/components/ui/FormTitle";
import { FormSectionTitle } from "@/app/components/ui/FormSectionTitle";
import { ErrorMessage } from "@/app/components/ui/ErrorMessage";
import { ChevronLeft } from "lucide-react";

interface RegisterOTPStepProps {
  registerToken: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function RegisterOTPStep({ registerToken, onSuccess, onBack }: RegisterOTPStepProps) {
  const { verifyOTP, isLoading, error } = useAuth();
  const [otpCode, setOtpCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) return;

    const success = await verifyOTP({ code: otpCode.trim() }, registerToken);
    if (success) {
      onSuccess();
    }
  };

  const handleResendOtp = () => {
    alert("Un nouveau code OTP a été envoyé !");
  };

  return (
    <>
     <FormTitle>
        <span className="block">Bureau Virtuel de la Solde</span>
        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
      </FormTitle>
      <FormSectionTitle>Inscription</FormSectionTitle>

      <div className="mb-6">
        <Stepper currentStep={3} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="otpCode" className="block font-montserrat font-semibold text-sm mb-1.5 text-[#343D48]">
             Veuillez renseigner le code OTP envoyé sur le numéro de téléphone que vous avez saisi
          </label>
          <input
            type="text"
            id="otpCode"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="Code OTP"
            className="w-full h-[46px] px-3.5 bg-white border border-[#DCDCDC] rounded-md placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#0F2137] focus:border-transparent transition-all text-center tracking-widest text-xl"
            required
          />
        </div>

        <div className="text-center space-y-1">
          <p className="text-xs font-montserrat text-[#343D48]">
            Vous n&apos;avez pas reçu le code OTP ? {' '}
            <button 
              type="button"
              onClick={handleResendOtp}
              className="text-[#0F2137] font-semibold hover:underline"
            >
              Renvoyer
            </button>
          </p>
          <p className="text-[11px] font-montserrat text-[#888] italic">
            Le code envoyé par SMS expire après 3 minutes
          </p>
        </div>

        {error && <ErrorMessage message={error} />}
        
        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-md bg-[#0F21370D] text-[#0F2137] hover:bg-[#0F213715] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          
          <button
            type="submit"
            className="px-7 h-[42px] bg-[#047236] text-white rounded-lg font-montserrat font-semibold text-sm hover:bg-[#047236]/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Vérification..." : "Valider"}
          </button>
        </div>
      </form>
    </>
  );
}
