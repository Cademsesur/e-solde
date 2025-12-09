"use client";

import { useState, useEffect } from "react";
import { X, Upload, Trash2, CheckCircle } from "lucide-react";
import { useRequests } from "@/app/lib/hooks";
import type { Service, RequiredDocument } from "@/app/types";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

interface UploadedFile {
  requiredDocId: number;
  file: File;
}

export default function DocumentUploadModal({ isOpen, onClose, service }: DocumentUploadModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { submitRequest } = useRequests();

  // Reset modal state when opening/closing
  useEffect(() => {
    if (isOpen) {
      setUploadedFiles([]);
      setSubmitSuccess(false);
      setError(null);
    }
  }, [isOpen]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, requiredDoc: RequiredDocument) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileAdd(requiredDoc, files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, requiredDoc: RequiredDocument) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileAdd(requiredDoc, files[0]);
    }
  };

  const handleFileAdd = (requiredDoc: RequiredDocument, file: File) => {
    // Remove existing file for this document if any
    const filtered = uploadedFiles.filter(f => f.requiredDocId !== requiredDoc.id);
    setUploadedFiles([...filtered, { requiredDocId: requiredDoc.id, file }]);
  };

  const handleFileRemove = (requiredDocId: number) => {
    setUploadedFiles(uploadedFiles.filter(f => f.requiredDocId !== requiredDocId));
  };

  const getFileForDocument = (docId: number): File | null => {
    const found = uploadedFiles.find(f => f.requiredDocId === docId);
    return found ? found.file : null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " Ko";
    return (bytes / (1024 * 1024)).toFixed(2) + " Mo";
  };

  const canSubmit = (): boolean => {
    if (!service) return false;
    // Check if all required documents have been uploaded
    const requiredDocs = service.required_documents.filter(doc => doc.is_required);
    return requiredDocs.every(doc => 
      uploadedFiles.some(f => f.requiredDocId === doc.id)
    );
  };

  const handleSubmit = async () => {
    if (!service || !canSubmit()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      // Create FormData with all uploaded files
      const formData = new FormData();
      uploadedFiles.forEach((uploadedFile) => {
        // The API expects files with keys like "documents[0]", "documents[1]", etc.
        // or potentially "document_{required_doc_id}"
        // Adjust this based on your actual API requirements
        formData.append(`documents[${uploadedFile.requiredDocId}]`, uploadedFile.file);
      });

      const result = await submitRequest(service.id, formData, token);
      
      if (result) {
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError('Erreur lors de la soumission du dossier');
      }
    } catch (err) {
      console.error('Erreur soumission:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la soumission');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#DCDCDC] sticky top-0 bg-white z-10">
          <h2 className="text-xl sm:text-2xl font-bold font-montserrat text-[#047236]">
            {service.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Dossier soumis avec succès!</p>
              <p className="text-sm text-green-700">Votre demande est en cours de traitement.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Service Description */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-[#1E1E1E] mb-2">Description</h3>
            <p className="text-sm text-gray-700">{service.description}</p>
            {service.procedure && (
              <>
                <h4 className="font-semibold text-[#1E1E1E] mt-3 mb-2">Procédure</h4>
                <p className="text-sm text-gray-700">{service.procedure}</p>
              </>
            )}
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-lg font-semibold font-montserrat text-[#1E1E1E] mb-4">
              Documents requis
            </h3>
            <div className="space-y-4">
              {service.required_documents.map((requiredDoc) => {
                const uploadedFile = getFileForDocument(requiredDoc.id);
                
                return (
                  <div key={requiredDoc.id} className="border border-[#DCDCDC] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#1E1E1E]">
                          {requiredDoc.label}
                        </h4>
                        {requiredDoc.is_required && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            Obligatoire
                          </span>
                        )}
                      </div>
                    </div>

                    {uploadedFile ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1E1E1E]">{uploadedFile.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                        </div>
                        <button
                          onClick={() => handleFileRemove(requiredDoc.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          disabled={isSubmitting}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, requiredDoc)}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          isDragging
                            ? "border-[#047236] bg-[#047236]/5"
                            : "border-[#DCDCDC] bg-gray-50"
                        }`}
                      >
                        <Upload className="w-6 h-6 mx-auto text-[#047236] mb-2" />
                        <p className="text-sm font-montserrat text-[#1E1E1E] mb-1">
                          Déposer le fichier ici
                        </p>
                        <p className="text-xs text-gray-500 mb-3">ou</p>
                        <label>
                          <input
                            type="file"
                            accept={requiredDoc.type || "*/*"}
                            onChange={(e) => handleFileSelect(e, requiredDoc)}
                            className="hidden"
                            disabled={isSubmitting}
                          />
                          <span className="text-sm font-semibold font-montserrat text-[#047236] hover:underline cursor-pointer">
                            Sélectionner un fichier
                          </span>
                        </label>
                        {requiredDoc.type && (
                          <p className="text-xs text-gray-500 mt-2">
                            Type accepté: {requiredDoc.type}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#DCDCDC] sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 font-montserrat font-semibold text-sm rounded-lg border border-[#DCDCDC] text-[#1E1E1E] hover:bg-gray-50 transition"
            disabled={isSubmitting}
          >
            Fermer
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit() || isSubmitting || submitSuccess}
            className="px-6 py-2 font-montserrat font-semibold text-sm rounded-lg bg-[#047236] text-white hover:bg-[#036629] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Soumission...' : 'Soumettre le dossier'}
          </button>
        </div>
      </div>
    </div>
  );
}
