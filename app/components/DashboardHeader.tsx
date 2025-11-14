
import Image from "next/image";
import { useEffect, useState } from "react";

type UserProfile = {
  id: number;
  reference: string;
  name: string;
  email: string;
  phone: string;
  employee_niu?: string;
  employee_matricule?: string;
  poste?: string;
  avatar?: string;
};

export default function DashboardHeader() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        console.log('[DashboardHeader] Token:', token);
        if (!token) return;
        const res = await fetch("https://esolde.sesur.bj/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('[DashboardHeader] Response status:', res.status);
        const text = await res.text();
        console.log('[DashboardHeader] Response text:', text);
        if (!res.ok) return;
        const data = JSON.parse(text);
        setUser({
          ...data.user,
          poste: data.user.poste || "Agent de l'Etat",
          avatar: "/assets/profile.png",
        });
      } catch (err) {
        console.error('[DashboardHeader] Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <header style={{ backgroundColor: '#0F213708' }}>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo à gauche */}
          <div className="cursor-default select-none">
            <Image 
              src="/assets/logo.png" 
              alt="Logo e-solde" 
              height={70} 
              width={210} 
              className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto" 
              priority 
            />
          </div>
          {/* Informations utilisateur et avatar à droite */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Nom, prénom et poste */}
            <div className="text-right">
              <div className="font-semibold text-primary text-sm sm:text-base font-montserrat">
                {loading ? "..." : user ? user.name : "-"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-montserrat">
                {loading ? "..." : user ? user.poste : "-"}
              </div>
            </div>
            {/* Avatar */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <Image 
                src={user?.avatar || "/assets/profile.png"} 
                alt={user?.name || "avatar"}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              /> 
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
