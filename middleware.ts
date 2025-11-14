import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des routes protégées (ici tout ce qui commence par /dashboard)
const protectedRoutes = ['/dashboard'];

export function middleware(request: NextRequest) {
  // Vérifie si la route est protégée
  const isProtected = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  // Récupère le token depuis les cookies (recommandé côté serveur)
  const token = request.cookies.get('token')?.value;

  // Si pas de token, redirige vers la page de connexion
  if (!token) {
    const loginUrl = new URL('/?unauthorized=1', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si token présent, laisse passer
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
