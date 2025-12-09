import { Eye, Download } from 'lucide-react';
import type { DocumentCardProps } from '@/app/types';

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
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#343D48] font-montserrat flex-1">
        {title}
      </h3>
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
        {date && (
          <p className="text-xs sm:text-sm text-gray-500 font-montserrat whitespace-nowrap">
            {date}
          </p>
        )}
        {showPreview && onPreview && (
          <button 
            onClick={onPreview}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap" 
            style={{ color: '#0C5CB4' }}
          >
            Aperçu
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
          </button>
        )}
        <button 
          onClick={onDownload}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-montserrat font-semibold hover:opacity-80 cursor-pointer whitespace-nowrap" 
          style={{ color: '#079748' }}
        >
          Télécharger
          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
