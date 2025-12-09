"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/app/constants";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    // Routes publiques (accessibles sans authentification)
    const publicRoutes = [ROUTES.HOME];
    const isPublicRoute = publicRoutes.includes(pathname as typeof ROUTES.HOME);

    // Routes protégées (nécessitent une authentification)
    const protectedRoutes = [ROUTES.DASHBOARD, ROUTES.SETTINGS];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Si l'utilisateur est connecté et essaie d'accéder à la page d'accueil
    if (isAuthenticated && isPublicRoute) {
      router.replace(ROUTES.DASHBOARD);
      return;
    }

    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
    if (!isAuthenticated && isProtectedRoute) {
      router.replace(ROUTES.HOME);
      return;
    }
  }, [pathname, router]);

  return <>{children}</>;
}
