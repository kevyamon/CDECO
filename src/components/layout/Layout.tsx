/**
 * =============================================================================
 * LAYOUT.TSX - Composant de mise en page principale
 * =============================================================================
 *
 * Ce composant encapsule toutes les pages de l'application avec :
 * - La barre de navigation (Navbar)
 * - Le contenu principal (children)
 * - Le pied de page (Footer)
 *
 * ACCESSIBILITÉ :
 * - Lien "skip to content" pour les lecteurs d'écran
 * - Rôles ARIA appropriés (banner, main, contentinfo)
 * - tabIndex sur le main pour focus programmatique
 *
 * UTILISATION :
 * ```tsx
 * <Layout>
 *   <HeroSection />
 *   <ContentSection />
 * </Layout>
 * ```
 */

import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmartScrollToTop from "./SmartScrollToTop";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter }: LayoutProps) => {
  const location = useLocation();

  // Le footer n'est visible que sur la page d'accueil "/" (sauf surcharge explicite)
  const isHomePage = location.pathname === "/";
  const shouldRenderFooter = showFooter !== undefined ? showFooter : isHomePage;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 
        Lien d'accessibilité "skip to content"
        - Invisible par défaut (sr-only)
        - Visible au focus pour les utilisateurs clavier
        - Permet de sauter directement au contenu principal
      */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground"
      >
        Aller au contenu principal
      </a>

      {/* En-tête avec barre de navigation */}
      <header role="banner">
        <Navbar />
      </header>

      {/* 
        Contenu principal de la page
        - flex-1 pour prendre tout l'espace disponible
        - tabIndex=-1 permet le focus programmatique (accessibilité)
      */}
      <main id="main-content" role="main" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      {/* Pied de page : rendu UNIQUEMENT sur la page d'accueil */}
      {shouldRenderFooter && <Footer />}

      {/* Bouton retour en haut intelligent avec masquage automatique présent sur toutes les pages */}
      <SmartScrollToTop />
    </div>
  );
};

export default Layout;
