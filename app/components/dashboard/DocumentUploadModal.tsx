"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function DocumentUploadModal({ isOpen, onClose, title }: DocumentUploadModalProps) {
  const [documents, setDocuments] = useState<Array<{ name: string; size: string }>>([
    { name: "Extrait acte de naissance jules.pdf", size: "770.20 Ko" }
  ]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newDocuments = Array.from(files).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " Ko"
    }));
    setDocuments([...documents, ...newDocuments]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#DCDCDC]">
          <h2 className="text-xl sm:text-2xl font-bold font-montserrat text-[#047236]">
            Ajouter un document
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Document Type */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold font-montserrat text-[#1E1E1E] mb-3">
              {title}
            </h3>
          </div>

          {/* Documents List */}
          {documents.length > 0 && (
            <div className="space-y-2">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-montserrat text-[#1E1E1E]">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Zone */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-[#047236] bg-[#047236]/5"
                : "border-[#DCDCDC] bg-gray-50"
            }`}
          >
            <Upload className="w-8 h-8 mx-auto text-[#047236] mb-3" />
            <p className="text-sm sm:text-base font-montserrat text-[#1E1E1E] mb-2">
              Déposer ici les fichiers
            </p>
            <p className="text-xs text-gray-500 mb-4">ou</p>
            <label>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="text-sm font-semibold font-montserrat text-[#047236] hover:underline cursor-pointer">
                Sélectionner un fichier
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#DCDCDC]">
          <button
            onClick={onClose}
            className="px-6 py-2 font-montserrat font-semibold text-sm rounded-lg border border-[#DCDCDC] text-[#1E1E1E] hover:bg-gray-50 transition"
          >
            Fermer
          </button>
          <button
            onClick={() => {
              alert(`Documents soumis: ${documents.map(d => d.name).join(", ")}`);
              onClose();
            }}
            className="px-6 py-2 font-montserrat font-semibold text-sm rounded-lg bg-[#047236] text-white hover:bg-[#036629] transition"
          >
            Soumettre
          </button>
        </div>
      </div>
    </div>
  );
}
