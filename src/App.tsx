/**
 * =============================================================================
 * APP.TSX - Point d'entrée principal de l'application CDECO
 * =============================================================================
 *
 * Ce fichier configure l'application React avec :
 * - Le système de routing (navigation entre les pages)
 * - Les providers globaux (React Query, Toasts, Tooltips, SEO)
 * - Le composant ScrollToTop pour remonter en haut à chaque changement de page
 * - Lazy loading des routes pour optimiser le temps de chargement initial
 *
 * ARCHITECTURE DES ROUTES :
 * - "/" : Page d'accueil
 * - "/cdeco/presentation" : Présentation de la CDECO
 * - "/cdeco/message-president" : Message du Président Fondateur
 * - "/cdeco/missions" : Missions et activités
 * - "/evenements" : Calendrier des événements
 * - "/contact" : Formulaire de contact
 * - "/adhesion" : Formulaire d'adhésion (multi-étapes)
 * - "/auth" : Authentification administrateur
 * - "/auth-membre" : Authentification membres
 * - "/admin" : Dashboard administrateur (protégé)
 * - "/espace-membre" : Espace membre (protégé)
 * - "/ressources" : Documents et ressources
 * - "/kampus-cdeco" : Programme de formation KAMPUS
 * - "*" : Page 404 (route non trouvée)
 */

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";

// Page d'accueil chargée immédiatement (above the fold)
import Index from "./pages/Index";

// Lazy loading des autres pages pour réduire le bundle initial
const Events = lazy(() => import("./pages/Events"));
const Contact = lazy(() => import("./pages/Contact"));
const Adhesion = lazy(() => import("./pages/Adhesion"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const MemberSpace = lazy(() => import("./pages/MemberSpace"));
const MemberAuth = lazy(() => import("./pages/MemberAuth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Resources = lazy(() => import("./pages/Resources"));
const KampusCdeco = lazy(() => import("./pages/KampusCdeco"));
const LeCongo = lazy(() => import("./pages/LeCongo"));

// Pages CDECO lazy loaded
const Presentation = lazy(() => import("./pages/cdeco/Presentation"));
const MessagePresident = lazy(() => import("./pages/cdeco/MessagePresident"));
const MissionsCdeco = lazy(() => import("./pages/cdeco/MissionsCdeco"));
const Bureau = lazy(() => import("./pages/cdeco/Bureau"));

/**
 * Client React Query pour la gestion du cache des requêtes API
 */
const queryClient = new QueryClient();

/**
 * Fallback invisible pour le lazy loading - transition instantanée
 */
const PageLoader = () => null;

/**
 * Composant principal de l'application
 */
const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Page d'accueil */}
              <Route path="/" element={<Index />} />
              
              {/* Pages CDECO (sous-menu) */}
              <Route path="/cdeco/presentation" element={<Presentation />} />
              <Route path="/cdeco/message-president" element={<MessagePresident />} />
              <Route path="/cdeco/missions" element={<MissionsCdeco />} />
              <Route path="/cdeco/bureau" element={<Bureau />} />
              
              {/* Pages publiques */}
              <Route path="/evenements" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/adhesion" element={<Adhesion />} />
              
              {/* Pages d'authentification */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth-membre" element={<MemberAuth />} />
              
              {/* Pages protégées */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/espace-membre" element={<MemberSpace />} />
              
              {/* Pages de contenu */}
              <Route path="/ressources" element={<Resources />} />
              <Route path="/kampus-cdeco" element={<KampusCdeco />} />
              <Route path="/le-congo" element={<LeCongo />} />
              
              {/* Page 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
