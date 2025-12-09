"use client";

import { useAuth } from "@/app/lib/hooks/useAuth";
import { Stepper } from "@/app/components/ui/Stepper";
import { FormButton } from "@/app/components/ui/FormButton";
import { FormTitle } from "@/app/components/ui/FormTitle";
import { FormSectionTitle } from "@/app/components/ui/FormSectionTitle";
import { ErrorMessage } from "@/app/components/ui/ErrorMessage";
import type { EmployeeData } from "@/app/types";

interface RegisterInfoStepProps {
  employee: EmployeeData;
  onSuccess: (token: string) => void;
}

export default function RegisterInfoStep({ employee, onSuccess }: RegisterInfoStepProps) {
  const { register, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const registerPayload = {
      // Utiliser le NIU s'il existe, sinon utiliser le matricule
      niu: employee.niu || employee.matricule || '',
      matricule: employee.matricule || '',
      date_of_birth: employee.date_of_birth,
      email: employee.email,
      phone: employee.phone,
      first_name: employee.first_name,
      last_name: employee.last_name,
    };
    
    console.log('Register payload:', registerPayload);
    
    const token = await register(registerPayload);

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

      <div className="mb-6">
        <Stepper currentStep={2} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Afficher NIU et Matricule seulement si NIU existe (inscription par NIU) */}
        {employee.niu && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
                NIU
              </label>
              <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.niu}</p>
            </div>
            <div>
              <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
                Matricule
              </label>
              <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.matricule || 'N/A'}</p>
            </div>
          </div>
        )}

        {/* Afficher seulement Matricule si pas de NIU (inscription par matricule) */}
        {!employee.niu && employee.matricule && (
          <div>
            <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
              Matricule
            </label>
            <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.matricule}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
              Nom
            </label>
            <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.last_name}</p>
          </div>
          <div>
            <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
              Prénom
            </label>
            <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.first_name}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
              Email
            </label>
            <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E] truncate">{employee.email}</p>
          </div>
          <div>
            <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
              Téléphone
            </label>
            <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
              Date de naissance
            </label>
            <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.date_of_birth}</p>
          </div>
          {/* Afficher Sexe seulement si NIU existe (inscription par NIU) */}
          {employee.niu && employee.sex && (
            <div>
              <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
                Sexe
              </label>
              <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">
                {employee.sex === 'M' ? 'Masculin' : employee.sex === 'F' ? 'Féminin' : employee.sex}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
            Lieu de naissance
          </label>
          <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.place_of_birth}</p>
        </div>
        
        {/* Afficher Organisation seulement si NIU existe (inscription par NIU) */}
        {employee.niu && employee.org?.name && (
          <div>
            <label className="block font-open-sans font-normal text-xs leading-tight mb-1 text-[#1E1E1E]">
              Organisation
            </label>
            <p className="font-open-sans font-normal text-sm leading-tight text-[#1E1E1E]">{employee.org.name}</p>
          </div>
        )}

        <ErrorMessage message={error} />

        <div className="flex items-center justify-end pt-3">
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
