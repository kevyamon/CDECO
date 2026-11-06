/**
 * =============================================================================
 * INDEX.TSX - Page d'accueil du site CDECO
 * =============================================================================
 *
 * Cette page est le point d'entrée principal du site web.
 * Elle présente la CDECO et ses missions aux visiteurs.
 *
 * SECTIONS AFFICHÉES (dans l'ordre) :
 * 1. HeroSection - Carrousel d'images avec titre et CTA
 * 2. VideoSection - Présentation vidéo YouTube (lazy loaded)
 * 3. MissionSection - Les 6 missions principales
 * 4. ValuesSection - Les 5 valeurs fondamentales (lazy loaded)
 * 5. StatsSection - Statistiques animées (lazy loaded)
 * 6. SectorsShowcase - Carrousel des secteurs stratégiques (lazy loaded - Swiper)
 * 7. WhyInvestSection - Raisons d'investir au Congo (lazy loaded)
 *
 * OPTIMISATION PERFORMANCE :
 * - Les sections "below the fold" sont lazy-loadées pour réduire le JS initial
 * - Cela réduit significativement la taille du bundle initial (~473KB économisés)
 *
 * SEO :
 * - Titre optimisé avec le nom complet de l'organisation
 * - Meta description avec mots-clés stratégiques
 * - URL canonique définie
 */

import { lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";

// Lazy loading des sections lourdes "below the fold" pour réduire le bundle initial
const VideoSection = lazy(() => import("@/components/home/VideoSection"));
const ValuesSection = lazy(() => import("@/components/home/ValuesSection"));
const StatsSection = lazy(() => import("@/components/home/StatsSection"));
const SectorsShowcase = lazy(() => import("@/components/home/SectorsShowcase"));
const WhyInvestSection = lazy(() => import("@/components/home/WhyInvestSection"));
const PartnersSection = lazy(() => import("@/components/home/PartnersSection"));

/**
 * Placeholder minimal pour les sections en cours de chargement
 * Utilise une hauteur minimale pour éviter le layout shift
 */
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground text-sm">Chargement...</div>
  </div>
);

const Index = () => {
  return (
    <Layout>
      {/* Configuration SEO de la page */}
      <SEOHead
        title="CDECO - Chambre de Diplomatie Économique du Congo"
        description="La Chambre de Diplomatie Économique du Congo promeut les échanges économiques, soutient les PME/PMI et renforce le climat des affaires. Agir localement, Rayonner globalement."
        keywords="CDECO, Congo, diplomatie économique, chambre de commerce, PME, PMI, investissement, Brazzaville, Afrique"
        canonicalUrl="/"
      />

      {/* Section héro avec carrousel et CTA - chargée immédiatement (above the fold) */}
      <HeroSection />

      {/* Sections below the fold - lazy loaded pour réduire le JS initial */}
      <Suspense fallback={<SectionLoader />}>
        <VideoSection />
      </Suspense>

      {/* Nos 6 missions principales - chargée immédiatement (visible rapidement) */}
      <MissionSection />

      <Suspense fallback={<SectionLoader />}>
        <ValuesSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <SectorsShowcase />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <PartnersSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <WhyInvestSection />
      </Suspense>
    </Layout>
  );
};

export default Index;
