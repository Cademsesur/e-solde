"use client";

import { useState } from "react";
import { Stepper } from "@/app/components/ui/Stepper";
import { FormInput } from "@/app/components/ui/FormInput";
import { FormTitle } from "@/app/components/ui/FormTitle";
import { FormSectionTitle } from "@/app/components/ui/FormSectionTitle";
import { ErrorMessage } from "@/app/components/ui/ErrorMessage";
import { ChevronLeft } from "lucide-react";

interface RegisterMatriculeInfoStepProps {
  matricule: string;
  onSuccess: (data: ManualRegistrationData) => void;
  onBack: () => void;
}

export interface ManualRegistrationData {
  matricule: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  place_of_birth: string;
}

export default function RegisterMatriculeInfoStep({ 
  matricule, 
  onSuccess, 
  onBack 
}: RegisterMatriculeInfoStepProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    date_of_birth: "",
    place_of_birth: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation basique
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      setError("Le nom et le prénom sont obligatoires");
      return;
    }

    if (!formData.email.trim() || !formData.phone.trim()) {
      setError("L'email et le téléphone sont obligatoires");
      return;
    }

    if (!formData.date_of_birth) {
      setError("La date de naissance est obligatoire");
      return;
    }

    if (!formData.place_of_birth.trim()) {
      setError("Le lieu de naissance est obligatoire");
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format d'email invalide");
      return;
    }

    onSuccess({
      matricule,
      ...formData,
    });
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
        <div>
          <FormInput
            label="Matricule"
            type="text"
            value={matricule}
            disabled
            className="bg-gray-50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormInput
            label="Nom"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
          <FormInput
            label="Prénom"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Votre prénom"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormInput
            label="Numéro de téléphone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+242 06 000 00 00"
            required
          />
          <FormInput
            label="Adresse email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@email.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormInput
            label="Date de naissance"
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Lieu de naissance"
            type="text"
            name="place_of_birth"
            value={formData.place_of_birth}
            onChange={handleChange}
            placeholder="Ville de naissance"
            required
          />
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
          
          <button
            type="submit"
            className="px-7 h-[42px] bg-[#047236] text-white rounded-lg font-montserrat font-semibold text-sm hover:bg-[#047236]/90 transition-colors cursor-pointer"
          >
            Continuer
          </button>
        </div>
      </form>
    </>
  );
}
