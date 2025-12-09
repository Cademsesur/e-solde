"use client";

import { useAuth } from "@/app/lib/hooks/useAuth";
import { Stepper } from "@/app/components/ui/Stepper";
import { FormButton } from "@/app/components/ui/FormButton";
import { FormTitle } from "@/app/components/ui/FormTitle";
import { FormSectionTitle } from "@/app/components/ui/FormSectionTitle";
import { ErrorMessage } from "@/app/components/ui/ErrorMessage";
import { ChevronLeft } from "lucide-react";
import type { EmployeeData } from "@/app/types";

interface RegisterInfoStepProps {
  employee: EmployeeData;
  onSuccess: (token: string) => void;
  onBack: () => void;
}

export default function RegisterInfoStep({ employee, onSuccess, onBack }: RegisterInfoStepProps) {
  const { register, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = await register({
      niu: employee.niu,
      date_of_birth: employee.date_of_birth,
      email: employee.email,
      phone: employee.phone,
      first_name: employee.first_name,
      last_name: employee.last_name,
    });

    if (token) {
      onSuccess(token);
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

      <Stepper currentStep={2} />

      <form onSubmit={handleSubmit} className="space-y-4">
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
            <p className="font-montserrat text-sm text-[#343D48]">
              {employee.sex === 'M' ? 'Masculin' : employee.sex === 'F' ? 'Féminin' : employee.sex}
            </p>
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

        <ErrorMessage message={error} />

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
