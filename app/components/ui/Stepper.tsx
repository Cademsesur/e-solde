
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { label: "NIU" },
  { label: "Matricule" },
  { label: "Code OTP" },
  { label: "Mot de passe" },
];

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div
      className="flex flex-row items-center justify-between w-full"
      style={{
        border: '1px solid #F2F2F2',
        borderRadius: '37px',
        height: '58px',
        padding: '0 16px',
        maxWidth: '779px',
      }}
    >
      {steps.map((step, idx) => {
        const isActive = currentStep === idx + 1;
        const isCompleted = currentStep > idx + 1;
        
        return (
          <div key={idx} className="flex items-center h-full flex-1 justify-center">
            {/* Contenu du step */}
            <div className="flex items-center justify-center gap-2 flex-col sm:flex-row h-full">
              {/* Cercle du step */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 shrink-0 font-montserrat font-bold text-xs ${
                  isActive 
                    ? 'border-[#047236] bg-[#047236] text-white' 
                    : isCompleted 
                    ? 'border-[#047236] bg-[#047236] text-white' 
                    : 'border-[#DCDCDC] bg-white text-[#999999]'
                }`}
              >
                {isCompleted || isActive ? (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Label du step */}
              <span
                className={`text-xs font-montserrat truncate hidden sm:inline max-w-20 ${
                  isActive 
                    ? 'text-[#047236] font-semibold' 
                    : isCompleted
                    ? 'text-[#047236] font-semibold'
                    : 'text-[#999999]'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Séparateur chevron pointant à droite */}
            {idx < steps.length - 1 && (
              <svg
                width="20"
                height="58"
                viewBox="0 0 20 58"
                className="shrink-0"
                style={{
                  overflow: 'visible',
                  margin: '0 auto',
                }}
              >
                {/* Ligne diagonale du haut vers le centre */}
                <line
                  x1="2"
                  y1="0"
                  x2="15"
                  y2="29"
                  stroke="#047236"
                  strokeWidth="0.73"
                  opacity="0.4"
                />
                {/* Ligne diagonale du centre vers le bas */}
                <line
                  x1="15"
                  y1="29"
                  x2="2"
                  y2="58"
                  stroke="#047236"
                  strokeWidth="0.73"
                  opacity="0.4"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
