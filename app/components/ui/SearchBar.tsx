/**
 * Composant barre de recherche
 */

import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

export function SearchBar({ value, onChange, filter, onFilterChange }: SearchBarProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="max-w-5xl w-full flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
        <div 
          className="sm:flex-2 relative flex items-center"
          style={{
            backgroundColor: '#F2F2F2',
            border: '1px solid #F2F2F2',
            borderRadius: '8px'
          }}
        >
          <Search 
            className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Rechercher"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 bg-transparent text-sm sm:text-base font-montserrat text-[#343D48] placeholder-gray-400 outline-none"
          />
        </div>
        <div 
          className="sm:flex-1 relative flex items-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4"
          style={{
            backgroundColor: '#F2F2F2',
            border: '1px solid #F2F2F2',
            borderRadius: '8px'
          }}
        >
          <Filter 
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#343D48] shrink-0"
            strokeWidth={1.5}
          />
          <select 
            className="flex-1 bg-transparent text-sm sm:text-base font-montserrat text-[#343D48] font-semibold outline-none cursor-pointer"
            value={filter}
            onChange={e => onFilterChange(e.target.value)}
          >
            <option value="">Tous</option>
            <option value="mois">Par mois</option>
            <option value="annee">Par année</option>
          </select>
        </div>
      </div>
    </div>
  );
}
