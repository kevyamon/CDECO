/**
 * Préchargement en tâche de fond des modules de routes publiques
 * pendant les périodes d'inactivité du navigateur pour éliminer
 * toute latence au clic.
 */
export const prefetchPublicRoutes = () => {
  const routes = [
    () => import("@/pages/cdeco/Presentation"),
    () => import("@/pages/cdeco/MessagePresident"),
    () => import("@/pages/cdeco/MissionsCdeco"),
    () => import("@/pages/cdeco/Bureau"),
    () => import("@/pages/LeCongo"),
    () => import("@/pages/KampusCdeco"),
    () => import("@/pages/Events"),
    () => import("@/pages/Contact"),
    () => import("@/pages/Adhesion"),
    () => import("@/pages/Resources"),
  ];

  const executePrefetch = () => {
    routes.forEach((preload) => {
      try {
        preload();
      } catch {}
    });
  };

  if (typeof window !== "undefined") {
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(executePrefetch, { timeout: 3500 });
    } else {
      setTimeout(executePrefetch, 1200);
    }
  }
};

