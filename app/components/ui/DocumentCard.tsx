import { Eye, Download } from 'lucide-react';
import type { DocumentCardProps } from '@/app/types';

// Fonction pour formater la date au format DD/MM/YYYY
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function DocumentCard({
  title,
  onPreview,
  onDownload,
  date,
  showPreview = true,
}: DocumentCardProps) {
  return (
    <div 
      className="w-full p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
      style={{
        borderRadius: '10px',
        backgroundColor: '#FFFFFF'
      }}
    >
      <h3 
        className="font-montserrat flex-1"
        style={{
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '24px',
          color: '#1E1E1E'
        }}
      >
        {title}
      </h3>
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
        {date && (
          <p 
            className="font-montserrat whitespace-nowrap"
            style={{
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '20px',
              textAlign: 'center',
              color: '#1E1E1E'
            }}
          >
            {formatDate(date)}
          </p>
        )}
        {showPreview && onPreview && (
          <button 
            onClick={onPreview}
            className="flex items-center gap-1.5 sm:gap-2 font-montserrat hover:opacity-80 cursor-pointer whitespace-nowrap" 
            style={{ 
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '20px',
              textAlign: 'center',
              color: '#0F2137'
            }}
          >
            Aperçu
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
          </button>
        )}
        <button 
          onClick={onDownload}
          className="flex items-center gap-1.5 sm:gap-2 font-montserrat hover:opacity-80 cursor-pointer whitespace-nowrap" 
          style={{ 
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '20px',
            textAlign: 'center',
            color: '#079748'
          }}
        >
          Télécharger
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
