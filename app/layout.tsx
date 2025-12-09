import type { Metadata } from "next";
import { Montserrat, Open_Sans } from 'next/font/google';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: "e-Solde - Portail de Gestion des Soldes et Documents Administratifs",
  description: "Plateforme numérique pour consulter vos bulletins de paie, gérer vos documents administratifs, effectuer vos démarches et suivre vos dossiers en ligne.",
  keywords: ["e-solde", "bulletin de paie", "solde", "administration", "fonctionnaire", "démarches administratives", "documents", "Congo"],
  authors: [{ name: "e-Solde" }],
  openGraph: {
    title: "e-Solde - Portail de Gestion des Soldes",
    description: "Consultez vos bulletins de paie et gérez vos documents administratifs en ligne",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${montserrat.variable} font-open-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
