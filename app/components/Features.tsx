import { LayoutDashboard, HandCoins, FileText, FolderOpen } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Informations générales",
      description: "Affichages, téléchargements et impressions des documents (extraits de bulletin, bulletins historiques, rappels sur salaires...)",
      color: "#009543",
      bgColor: "#E6F5ED66"
    },
     {
      icon: FileText,
      title: "Bulletins de soldes",
      description: "Affichages, téléchargements et impressions des documents( extraits de bulletin, bulletins historiques, rappels sur salaires...)",
      color: "#EF1A1A",
      bgColor: "#FDEBE966"
    },
    {
      icon: HandCoins,
      title: "Démarches administratives",
      description: "Affichages, téléchargements et impressions des documents( extraits de bulletin, bulletins historiques, rappels sur salaires...)",
      color: "#FFD600",
      bgColor: "#FEFAE766"
    },
    {
      icon: FolderOpen,
      title: "Dépots de dossiers",
      description: "Affichages, téléchargements et impressions des documents( extraits de bulletin, bulletins historiques, rappels sur salaires...)",
      color: "#355F9E",
      bgColor: "#E9F1FD66"
    }
  ];

  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 bg-white relative overflow-hidden">
      {/* Grille de points décoratifs en haut à gauche */}
      <div className="absolute top-0 left-0 hidden xl:grid grid-cols-[repeat(15,6px)] grid-rows-[repeat(15,6px)] gap-2" aria-hidden="true">
        {Array.from({ length: 225 }).map((_, i) => (
          <div 
            key={i}
            className="w-1 h-1 bg-gray-300 rounded-full"
          />
        ))}
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Grille des fonctionnalités */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-x-20 lg:gap-y-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 transition-shadow duration-300 group"
                style={{
                  borderRadius: '10px',
                  boxShadow: '0px 4px 80px 0px #0000001A'
                }}
              >
                {/* Responsive flex: col on mobile, row on sm+ */}
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-4 sm:gap-5 md:gap-7">
                  {/* Icône */}
                  <div
                    className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mb-3 sm:mb-0"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <Icon className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10" style={{ color: feature.color }} />
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    {/* Titre */}
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-semibold text-primary mb-2 sm:mb-3 lg:mb-4 font-montserrat leading-[1.2]">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-lg font-montserrat leading-[1.6] lg:leading-[1.7] text-[#343D48]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}