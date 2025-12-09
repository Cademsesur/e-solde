"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/app/components/ui/Header";
import LoginForm from "./auth/LoginForm";
import RegisterNIUStep from "./auth/RegisterNIUStep";
import RegisterInfoStep from "./auth/RegisterInfoStep";
import RegisterMatriculeInfoStep, { type ManualRegistrationData } from "./auth/RegisterMatriculeInfoStep";
import RegisterOTPStep from "./auth/RegisterOTPStep";
import RegisterPasswordStep from "./auth/RegisterPasswordStep";
import type { EmployeeData } from "@/app/types";

export default function Hero() {
  const [showInscription, setShowInscription] = useState(false);
  const [inscriptionStep, setInscriptionStep] = useState(1);
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [matricule, setMatricule] = useState<string | null>(null);
  const [manualData, setManualData] = useState<ManualRegistrationData | null>(null);
  const [registerToken, setRegisterToken] = useState<string | null>(null);
  const [isMatriculeMode, setIsMatriculeMode] = useState(false);

  const resetInscription = () => {
    setShowInscription(false);
    setInscriptionStep(1);
    setEmployee(null);
    setMatricule(null);
    setManualData(null);
    setRegisterToken(null);
    setIsMatriculeMode(false);
  };

  const handleEmployeeFound = (employeeData: EmployeeData) => {
    setEmployee(employeeData);
    setIsMatriculeMode(false);
    setInscriptionStep(2);
  };

  const handleMatriculeEntered = (matriculeValue: string) => {
    setMatricule(matriculeValue);
    setIsMatriculeMode(true);
    setInscriptionStep(2);
  };

  const handleManualDataSubmit = (data: ManualRegistrationData) => {
    setManualData(data);
    setInscriptionStep(3);
  };

  const handleRegistrationSuccess = (token: string) => {
    setRegisterToken(token);
    setInscriptionStep(isMatriculeMode ? 4 : 3);
  };

  const handleOTPSuccess = () => {
    setInscriptionStep(isMatriculeMode ? 5 : 4);
  };

  const handlePasswordSuccess = () => {
    resetInscription();
  };

  return (
    <>
      <Header />
      
      {/* Version Mobile */}
      <section className="sm:hidden relative min-h-screen flex flex-col">
        {/* Image de fond mobile */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/hero-sold.png"
            alt="Hero background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
            style={{ objectPosition: 'center top' }}
          />
        </div>
        
        {/* Overlay semi-transparent pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Formulaire centré */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-[860px] mx-auto">
            <div 
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col" 
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            >
              {/* Barre tricolore */}
              <div className="flex h-2">
                <div className="flex-1 bg-[#009543]"></div>
                <div className="flex-1 bg-[#FFD600]"></div>
                <div className="flex-1 bg-[#EF1A1A]"></div>
              </div>
              <div className="p-6">
                {!showInscription ? (
                  <LoginForm onSwitchToRegister={() => setShowInscription(true)} />
                ) : inscriptionStep === 1 ? (
                  <RegisterNIUStep 
                    onSuccess={handleEmployeeFound}
                    onMatriculeSuccess={handleMatriculeEntered}
                    onBack={resetInscription}
                  />
                ) : inscriptionStep === 2 && !isMatriculeMode && employee ? (
                  <RegisterInfoStep
                    employee={employee}
                    onSuccess={handleRegistrationSuccess}
                  />
                ) : inscriptionStep === 2 && isMatriculeMode && matricule ? (
                  <RegisterMatriculeInfoStep
                    matricule={matricule}
                    onSuccess={handleManualDataSubmit}
                    onBack={() => setInscriptionStep(1)}
                  />
                ) : inscriptionStep === 3 && isMatriculeMode && manualData ? (
                  <RegisterInfoStep
                    employee={{
                      id: 0,
                      niu: '',
                      matricule: manualData.matricule,
                      first_name: manualData.first_name,
                      last_name: manualData.last_name,
                      sex: '',
                      date_of_birth: manualData.date_of_birth,
                      place_of_birth: manualData.place_of_birth,
                      email: manualData.email,
                      phone: manualData.phone,
                      status: '',
                      org: { code: '', name: '' }
                    }}
                    onSuccess={handleRegistrationSuccess}
                  />
                ) : inscriptionStep === 3 && !isMatriculeMode && registerToken ? (
                  <RegisterOTPStep
                    registerToken={registerToken}
                    onSuccess={handleOTPSuccess}
                    onBack={() => setInscriptionStep(2)}
                  />
                ) : inscriptionStep === 4 && isMatriculeMode && registerToken ? (
                  <RegisterOTPStep
                    registerToken={registerToken}
                    onSuccess={handleOTPSuccess}
                    onBack={() => setInscriptionStep(3)}
                  />
                ) : inscriptionStep === 4 && !isMatriculeMode && registerToken ? (
                  <RegisterPasswordStep
                    registerToken={registerToken}
                    onSuccess={handlePasswordSuccess}
                  />
                ) : inscriptionStep === 5 && isMatriculeMode && registerToken ? (
                  <RegisterPasswordStep
                    registerToken={registerToken}
                    onSuccess={handlePasswordSuccess}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Version Desktop */}
      <section className="hidden sm:block relative min-h-[700px] md:min-h-[750px] lg:min-h-[800px]">
        {/* Image de fond */}
        <div className="relative w-full">
          <Image
            src="/assets/hero-sold.png"
            alt="Hero background"
            width={1920}
            height={600}
            className="w-full h-auto object-cover"
            priority
            style={{ objectPosition: 'center top' }}
          />
        </div>

        {/* Zone blanche en bas */}
        <div className="bg-white" style={{ minHeight: '300px' }}></div>

        {/* Formulaire centré et superposé */}
        <div className="absolute top-0 left-0 right-0 flex items-start justify-center px-4 pt-32 md:pt-40 lg:pt-48">
          <div className="w-full max-w-[860px] mx-auto">
            <div 
              className="bg-white rounded-[10px] shadow-2xl overflow-hidden flex flex-col" 
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            >
              {/* Barre tricolore */}
              <div className="flex h-2.5">
                <div className="flex-1 bg-[#009543]"></div>
                <div className="flex-1 bg-[#FFD600]"></div>
                <div className="flex-1 bg-[#EF1A1A]"></div>
              </div>
              <div className="p-8 md:p-12 lg:p-16">
                {!showInscription ? (
                  <LoginForm onSwitchToRegister={() => setShowInscription(true)} />
                ) : inscriptionStep === 1 ? (
                  <RegisterNIUStep 
                    onSuccess={handleEmployeeFound}
                    onMatriculeSuccess={handleMatriculeEntered}
                    onBack={resetInscription}
                  />
                ) : inscriptionStep === 2 && !isMatriculeMode && employee ? (
                  <RegisterInfoStep
                    employee={employee}
                    onSuccess={handleRegistrationSuccess}
                  />
                ) : inscriptionStep === 2 && isMatriculeMode && matricule ? (
                  <RegisterMatriculeInfoStep
                    matricule={matricule}
                    onSuccess={handleManualDataSubmit}
                    onBack={() => setInscriptionStep(1)}
                  />
                ) : inscriptionStep === 3 && isMatriculeMode && manualData ? (
                  <RegisterInfoStep
                    employee={{
                      id: 0,
                      niu: '',
                      matricule: manualData.matricule,
                      first_name: manualData.first_name,
                      last_name: manualData.last_name,
                      sex: '',
                      date_of_birth: manualData.date_of_birth,
                      place_of_birth: manualData.place_of_birth,
                      email: manualData.email,
                      phone: manualData.phone,
                      status: '',
                      org: { code: '', name: '' }
                    }}
                    onSuccess={handleRegistrationSuccess}
                  />
                ) : inscriptionStep === 3 && !isMatriculeMode && registerToken ? (
                  <RegisterOTPStep
                    registerToken={registerToken}
                    onSuccess={handleOTPSuccess}
                    onBack={() => setInscriptionStep(2)}
                  />
                ) : inscriptionStep === 4 && isMatriculeMode && registerToken ? (
                  <RegisterOTPStep
                    registerToken={registerToken}
                    onSuccess={handleOTPSuccess}
                    onBack={() => setInscriptionStep(3)}
                  />
                ) : inscriptionStep === 4 && !isMatriculeMode && registerToken ? (
                  <RegisterPasswordStep
                    registerToken={registerToken}
                    onSuccess={handlePasswordSuccess}
                  />
                ) : inscriptionStep === 5 && isMatriculeMode && registerToken ? (
                  <RegisterPasswordStep
                    registerToken={registerToken}
                    onSuccess={handlePasswordSuccess}
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
