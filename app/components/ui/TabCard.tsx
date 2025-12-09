/**
 * Composant carte d'onglet pour le dashboard
 */

import type { TabCardProps } from '@/app/types';

export function TabCard({ tab, isActive, onClick }: TabCardProps) {
  const Icon = tab.icon;
  
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 transition-all duration-300 hover:scale-105 cursor-pointer text-left w-full"
      style={{
        backgroundColor: isActive ? '#047236' : '#FFFFFF',
        borderRadius: '10px'
      }}
    >
      <div 
        className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{ 
          backgroundColor: isActive ? '#FFFFFF' : '#F5F5F5'
        }}
      >
        <Icon 
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" 
          strokeWidth={1.5}
          style={{ color: '#047236' }} 
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 
          className="text-sm sm:text-base md:text-lg font-bold font-montserrat mb-1 sm:mb-2"
          style={{ color: isActive ? '#FFFFFF' : '#000000' }}
        >
          {tab.name}
        </h3>
        <p 
          className="text-xs sm:text-sm font-montserrat leading-relaxed"
          style={{ color: isActive ? '#FFFFFF' : '#000000' }}
        >
          {tab.description}
        </p>
      </div>
    </button>
  );
}
