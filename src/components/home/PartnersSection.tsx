/**
 * =============================================================================
 * PARTNERS SECTION - Bande défilante des logos partenaires
 * =============================================================================
 * 
 * MISE À JOUR DES LOGOS :
 * 1. Ajouter vos images dans src/assets/partners/
 * 2. Importer l'image : import monLogo from "@/assets/partners/mon-logo.png"
 * 3. Remplacer le placeholder dans le tableau PARTNERS ci-dessous
 * 
 * Exemple :
 * { id: 1, name: "Nom Partenaire", logo: monLogo }
 */

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// =============================================================================
// CONFIGURATION DES PARTENAIRES
// Modifiez ce tableau pour ajouter/modifier les partenaires
// =============================================================================
const PARTNERS = [
  { id: 1, name: "PADEC", logo: null },
  { id: 2, name: "BCI", logo: null },
  { id: 3, name: "ACPCE", logo: null },
  { id: 4, name: "Crédit du Congo", logo: null },
  { id: 5, name: "Ministère de l'Économie", logo: null },
  { id: 6, name: "Banque Mondiale", logo: null },
  { id: 7, name: "BAD", logo: null },
  { id: 8, name: "CEMAC", logo: null },
];

// Composant placeholder pour les logos
const PlaceholderLogo = ({ name }: { name: string }) => {
  // Génère une couleur basée sur le nom
  const getColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 20%, 60%)`;
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center bg-secondary rounded-lg p-4"
      style={{ backgroundColor: getColor(name) + '30' }}
    >
      <span className="text-sm font-medium text-foreground/70 text-center leading-tight">
        {name}
      </span>
    </div>
  );
};

const PartnersSection = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Animation de défilement automatique
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset quand on atteint la moitié (car on a dupliqué les logos)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause au hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Double les partenaires pour un défilement infini
  const displayPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-12 md:py-16 bg-background border-y border-border/50">
      <div className="container mx-auto px-4">
        {/* Titre */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-2">
          {t("partners.sectionTitle", "NOTRE RÉSEAU DE PARTENAIRES")}
        </h2>
        <div className="w-16 h-1 bg-cdeco-orange mx-auto mb-10" />

        {/* Carrousel de logos */}
        <div 
          ref={scrollRef}
          className="flex gap-8 md:gap-12 overflow-x-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {displayPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <PlaceholderLogo name={partner.name} />
              )}
            </div>
          ))}
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center gap-2 mt-8">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <span className="w-2 h-2 rounded-full bg-cdeco-orange" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
