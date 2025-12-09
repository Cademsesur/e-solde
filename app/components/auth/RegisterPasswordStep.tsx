"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { Stepper } from "@/app/components/ui/Stepper";
import { FormInput } from "@/app/components/ui/FormInput";
import { FormButton } from "@/app/components/ui/FormButton";
import { FormTitle } from "@/app/components/ui/FormTitle";
import { FormSectionTitle } from "@/app/components/ui/FormSectionTitle";
import { ErrorMessage } from "@/app/components/ui/ErrorMessage";
import SuccessModal from "./SuccessModal";

interface RegisterPasswordStepProps {
  registerToken: string;
  onSuccess: () => void;
}

export default function RegisterPasswordStep({ registerToken, onSuccess }: RegisterPasswordStepProps) {
  const { setPassword, isLoading, error } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    onSuccess();
  };

  return (
    <>
   <FormTitle>
        <span className="block">Bureau Virtuel de la Solde</span>
        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
      </FormTitle>
      <FormSectionTitle>Inscription</FormSectionTitle>

      <div className="mb-6">
        <Stepper currentStep={4} />
      </div>

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

        <div className="flex items-center justify-end pt-3">
          <FormButton 
            type="submit" 
            isLoading={isLoading}
            loadingText="Création..."
            className="px-7 h-[42px] bg-[#047236] text-white rounded-lg font-montserrat font-semibold text-sm hover:bg-[#047236]/90 transition-colors cursor-pointer"
          >
            Valider
          </FormButton>
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="Compte créé avec succès !"
        message="Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter avec vos identifiants."
      />
    </>
  );
}
