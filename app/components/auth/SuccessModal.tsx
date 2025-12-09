"use client";

import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Compte créé avec succès !",
  message = "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter."
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
        {/* Icon de succès */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-green-100 rounded-full p-3">
              <CheckCircle className="w-16 h-16 text-[#047236]" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-montserrat font-bold text-center text-[#1E1E1E] mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-center font-open-sans text-[#343D48] mb-8 leading-relaxed">
          {message}
        </p>

        {/* Bouton */}
        <button
          onClick={onClose}
          className="w-full h-12 bg-[#047236] text-white rounded-lg font-montserrat font-semibold text-base hover:bg-[#047236]/90 transition-colors shadow-lg hover:shadow-xl"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}
