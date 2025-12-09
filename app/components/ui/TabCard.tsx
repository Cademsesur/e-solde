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
          className="font-montserrat mb-1 sm:mb-2"
          style={{ 
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '120%',
            color: isActive ? '#FFFFFF' : '#1E1E1E'
          }}
        >
          {tab.name}
        </h3>
        <p 
          className="font-montserrat"
          style={{ 
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '120%',
            color: isActive ? '#FFFFFF' : '#1E1E1E'
          }}
        >
          {tab.description}
        </p>
      </div>
    </button>
  );
}
