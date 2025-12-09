"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { FormInput } from "@/app/components/ui/FormInput";
import { FormButton } from "@/app/components/ui/FormButton";
import { FormTitle } from "@/app/components/ui/FormTitle";
import { FormSectionTitle } from "@/app/components/ui/FormSectionTitle";
import { ErrorMessage } from "@/app/components/ui/ErrorMessage";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login, isLoading, error } = useAuth();
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (matricule.trim() && password.trim()) {
      await login({ 
        matricule: matricule.trim(), 
        password: password.trim() 
      });
    }
  };

  return (
    <>
      <FormTitle>
        <span className="block">Bureau Virtuel de la Solde</span>
        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
      </FormTitle>

      <FormSectionTitle>Connexion</FormSectionTitle>

      <p className="text-sm sm:text-base font-montserrat text-center mb-6 text-[#343D48]">
        Connectez-vous en entrant vos identifiants pour accéder à la plateforme.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <FormInput
          label="Entrez votre numéro matricule"
          type="text"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
          placeholder="87675645677644554"
          required
        />

        <FormInput
          label="Entrez votre mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />

        <div className="text-center">
          <a 
            href="#" 
            className="text-sm font-montserrat text-[#047236] hover:underline transition-all"
          >
            Mot de passe oublié?
          </a>
        </div>

        <ErrorMessage message={error} />

        <FormButton 
          type="submit" 
          isLoading={isLoading}
          loadingText="Connexion en cours..."
        >
          Connexion
        </FormButton>

        <p className="text-center text-base font-montserrat text-[#343D48] pt-2">
          Vous n&#39;avez pas de compte?{' '}
          <button 
            type="button"
            onClick={onSwitchToRegister}
            className="text-[#047236] font-semibold hover:underline cursor-pointer transition-all"
          >
            Inscrivez-vous
          </button>
        </p>
      </form>
    </>
  );
}
