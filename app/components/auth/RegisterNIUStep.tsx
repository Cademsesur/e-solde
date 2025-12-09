"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { Stepper } from "@/app/components/ui/Stepper";
import { FormInput } from "@/app/components/ui/FormInput";
import { FormButton } from "@/app/components/ui/FormButton";
import { FormTitle } from "@/app/components/ui/FormTitle";
import { FormSectionTitle } from "@/app/components/ui/FormSectionTitle";
import { ErrorMessage } from "@/app/components/ui/ErrorMessage";
import type { EmployeeData } from "@/app/types";

interface RegisterNIUStepProps {
  onSuccess: (employeeData: EmployeeData) => void;
  onMatriculeSuccess: (matricule: string) => void;
  onBack: () => void;
}

export default function RegisterNIUStep({ onSuccess, onMatriculeSuccess, onBack }: RegisterNIUStepProps) {
  const { getEmployeeByNIU, isLoading, error } = useAuth();
  const [niu, setNiu] = useState("");
  const [matricule, setMatricule] = useState("");
  const [isNIUMode, setIsNIUMode] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isNIUMode) {
      if (!niu.trim()) return;
      const employeeData = await getEmployeeByNIU(niu.trim());
      if (employeeData) {
        onSuccess(employeeData);
      }
    } else {
      if (!matricule.trim()) return;
      // Passer au formulaire manuel pour le matricule
      onMatriculeSuccess(matricule.trim());
    }
  };

  return (
    <>
      <FormTitle>
        <span className="block">Bureau Virtuel de la Solde</span>
        <span className="block mt-1 sm:mt-2">des agents de l&#39;Etat</span>
      </FormTitle>
      <FormSectionTitle>Inscription</FormSectionTitle>

      {/* <p className="text-sm sm:text-base font-montserrat text-center mb-6 text-[#343D48]">
        E-sold
      </p> */}

      <div className="mb-8">
        <Stepper currentStep={1} />
      </div>

      {/* Switch between NIU and Matricule */}
      <div
        className="relative flex items-center mb-6 sm:mb-8 mx-auto"
        style={{
          maxWidth: '779px',
          width: '100%',
          height: '52px',
          borderRadius: '67px',
          backgroundColor: '#F9F9FB',
          padding: '4px',
        }}
      >
        {/* Active button background */}
        <div
          className={`absolute transition-all duration-300 ease-in-out rounded-3xl`}
          style={{
            width: 'calc(50% - 4px)',
            height: '44px',
            borderRadius: '30px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 4px 120px 0px #0000001A',
            left: isNIUMode ? '4px' : 'calc(50% + 4px)',
          }}
        />

        {/* Button 1: NIU */}
        <button
          type="button"
          onClick={() => setIsNIUMode(true)}
          className={`relative z-10 flex-1 font-montserrat font-semibold text-xs sm:text-sm transition-all px-3 sm:px-6 py-3 sm:py-4 rounded-3xl cursor-pointer`}
          style={{
            color: isNIUMode ? '#047236' : '#343D48',
          }}
        >
          <span className="hidden sm:inline">M&#39;inscrire avec mon NIU</span>
          <span className="sm:hidden">NIU</span>
        </button>

        {/* Button 2: Matricule */}
        <button
          type="button"
          onClick={() => setIsNIUMode(false)}
          className={`relative z-10 flex-1 font-montserrat font-semibold text-xs sm:text-sm transition-all px-3 sm:px-6 py-3 sm:py-4 rounded-3xl cursor-pointer`}
          style={{
            color: !isNIUMode ? '#047236' : '#343D48',
          }}
        >
          <span className="hidden sm:inline">M&#39;inscrire avec mon Matricule</span>
          <span className="sm:hidden">Matricule</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {isNIUMode ? (
          <FormInput
            label="Entrez votre Numéro d'Identification Unique"
            type="text"
            value={niu}
            onChange={(e) => setNiu(e.target.value)}
            placeholder="87675645677644554"
            required
            disabled={isLoading}
          />
        ) : (
          <FormInput
            label="Entrez votre Matricule"
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            placeholder="123456789"
            required
            disabled={isLoading}
          />
        )}

        <ErrorMessage message={error} />

        <FormButton 
          type="submit" 
          isLoading={isLoading}
          loadingText="Recherche..."
        >
          Continuer
        </FormButton>

        <p className="text-center text-xs sm:text-sm md:text-base font-montserrat text-[#343D48] pt-1 sm:pt-2">
          Vous avez déjà un compte?{' '}
          <button 
            type="button"
            onClick={onBack}
            className="text-[#047236] font-semibold hover:underline cursor-pointer transition-all"
          >
            Connectez-vous
          </button>
        </p>
      </form>
    </>
  );
}
