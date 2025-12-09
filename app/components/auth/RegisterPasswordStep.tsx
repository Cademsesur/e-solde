"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { Stepper } from "@/app/components/ui/Stepper";
import { FormInput } from "@/app/components/ui/FormInput";
import { FormButton } from "@/app/components/ui/FormButton";
import { FormTitle } from "@/app/components/ui/FormTitle";
import { FormSectionTitle } from "@/app/components/ui/FormSectionTitle";
import { ErrorMessage } from "@/app/components/ui/ErrorMessage";
import { ChevronLeft } from "lucide-react";

interface RegisterPasswordStepProps {
  registerToken: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function RegisterPasswordStep({ registerToken, onSuccess, onBack }: RegisterPasswordStepProps) {
  const { setPassword, isLoading, error } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (newPassword !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas !");
      return;
    }

    const success = await setPassword(
      {
        password: newPassword,
        password_confirmation: confirmPassword,
      },
      registerToken
    );

    if (success) {
      alert(`Inscription complétée avec succès !\n\nVotre compte a été créé.`);
      onSuccess();
    }
  };

  return (
    <>
   <FormTitle>
        <span className="block">Bureau Virtuel de la Solde</span>
        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
      </FormTitle>
      <FormSectionTitle>Inscription</FormSectionTitle>

       <p className="text-sm sm:text-base font-montserrat text-center mb-6 text-[#343D48]">
        E-sold
      </p>

      <Stepper currentStep={4} />

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <FormInput
          label="Mot de passe"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          className="h-[46px] px-3.5 text-sm"
        />

        <FormInput
          label="Confirmez le mot de passe"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          className="h-[46px] px-3.5 text-sm"
        />

        <ErrorMessage message={localError || error} />

        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-md bg-[#0F21370D] text-[#0F2137] hover:bg-[#0F213715] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          
          <FormButton 
            type="submit" 
            isLoading={isLoading}
            loadingText="Création..."
            className="px-7 h-[42px] bg-[#0F2137] text-white rounded-lg font-montserrat font-semibold text-sm hover:bg-[#0F2137]/90 transition-colors cursor-pointer"
          >
            Valider
          </FormButton>
        </div>
      </form>
    </>
  );
}
