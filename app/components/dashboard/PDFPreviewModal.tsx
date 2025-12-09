"use client";

interface PDFPreviewModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
}

export default function PDFPreviewModal({ show, title, onClose }: PDFPreviewModalProps) {
  if (!show) return null;

  // Logique du chemin PDF (même que handleTelecharger)
  let pdfPath = '/assets/billet.pdf';
  if (title.toLowerCase().includes('famille')) {
    pdfPath = '/assets/famille.pdf';
  }
  if (title.toLowerCase().includes('rappel')) {
    pdfPath = '/assets/procedure.pdf';
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-montserrat font-bold text-[#047236]">
            Aperçu : {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfPath}
            className="w-full h-full"
            title={`Aperçu de ${title}`}
          />
        </div>
      </div>
    </div>
  );
}
