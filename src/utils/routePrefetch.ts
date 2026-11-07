/**
 * Préchargement échelonné et non-bloquant des modules de routes publiques
 * pendant les périodes d'inactivité pour garantir 100% de la bande passante
 * à la page active lors de son affichage initial.
 */
export const prefetchPublicRoutes = () => {
  if (typeof window === "undefined") return;

  const routes = [
    () => import("@/pages/cdeco/Presentation"),
    () => import("@/pages/LeCongo"),
    () => import("@/pages/cdeco/Bureau"),
    () => import("@/pages/Events"),
    () => import("@/pages/KampusCdeco"),
    () => import("@/pages/cdeco/MessagePresident"),
    () => import("@/pages/cdeco/MissionsCdeco"),
    () => import("@/pages/Contact"),
    () => import("@/pages/Adhesion"),
    () => import("@/pages/Resources"),
  ];

  let currentIdx = 0;
  const loadNextStaggered = () => {
    if (currentIdx >= routes.length) return;
    try {
      routes[currentIdx]();
    } catch {}
    currentIdx++;
    if (currentIdx < routes.length) {
      setTimeout(loadNextStaggered, 2500);
    }
  };

  // Démarre 4 secondes après le chargement pour prioriser l'affichage de la page active
  setTimeout(loadNextStaggered, 4000);
};
