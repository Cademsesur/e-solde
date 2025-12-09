"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/app/components/ui/Header";
import LoginForm from "./auth/LoginForm";
import RegisterNIUStep from "./auth/RegisterNIUStep";
import RegisterInfoStep from "./auth/RegisterInfoStep";
import RegisterOTPStep from "./auth/RegisterOTPStep";
import RegisterPasswordStep from "./auth/RegisterPasswordStep";
import type { EmployeeData } from "@/app/types";

export default function Hero() {
  const [showInscription, setShowInscription] = useState(false);
  const [inscriptionStep, setInscriptionStep] = useState(1);
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [registerToken, setRegisterToken] = useState<string | null>(null);

  const resetInscription = () => {
    setShowInscription(false);
    setInscriptionStep(1);
    setEmployee(null);
    setRegisterToken(null);
  };

  const handleEmployeeFound = (employeeData: EmployeeData) => {
    setEmployee(employeeData);
    setInscriptionStep(2);
  };

  const handleRegistrationSuccess = (token: string) => {
    setRegisterToken(token);
    setInscriptionStep(3);
  };

  const handleOTPSuccess = () => {
    setInscriptionStep(4);
  };

  const handlePasswordSuccess = () => {
    resetInscription();
  };

  return (
    <>
      <Header />
      <section className="relative flex flex-col">
        {/* Image de fond */}
        <div className="relative w-full">
          <Image
            src="/assets/hero-sold.png"
            alt="Hero background"
            width={1920} // Remplace par la largeur réelle de l'image
            height={600} // Remplace par la hauteur réelle de l'image
            className="w-auto h-auto"
            priority
            style={{ objectPosition: 'center top' }}
          />
        </div>

        {/* Zone blanche en bas */}
        <div className="flex-1 bg-white" style={{ minHeight: '200px' }}></div>

        {/* Formulaire centré et superposé */}
        <div className="absolute inset-0 flex items-center justify-center pb-8">
          <div
            className="w-full max-w-[860px] mx-auto px-4"
            style={{ position: 'relative', zIndex: 2, marginTop: 'clamp(100px, 18vw, 220px)' }}
          >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden min-h-[540px] flex flex-col justify-between" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
              {/* Barre tricolore */}
              <div className="flex h-2.5">
                <div className="flex-1 bg-[#009543]"></div>
                <div className="flex-1 bg-[#FFD600]"></div>
                <div className="flex-1 bg-[#EF1A1A]"></div>
              </div>
              <div className="p-8 sm:p-12 lg:p-16">
                {!showInscription ? (
                  <LoginForm onSwitchToRegister={() => setShowInscription(true)} />
                ) : inscriptionStep === 1 ? (
                  <RegisterNIUStep 
                    onSuccess={handleEmployeeFound}
                    onBack={resetInscription}
                  />
                ) : inscriptionStep === 2 && employee ? (
                  <RegisterInfoStep
                    employee={employee}
                    onSuccess={handleRegistrationSuccess}
                    onBack={() => setInscriptionStep(1)}
                  />
                ) : inscriptionStep === 3 && registerToken ? (
                  <RegisterOTPStep
                    registerToken={registerToken}
                    onSuccess={handleOTPSuccess}
                    onBack={() => setInscriptionStep(2)}
                  />
                ) : inscriptionStep === 4 && registerToken ? (
                  <RegisterPasswordStep
                    registerToken={registerToken}
                    onSuccess={handlePasswordSuccess}
                    onBack={() => setInscriptionStep(3)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
