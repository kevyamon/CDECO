import { FC } from "react";

/**
 * Barre de progression ultra-fine et discrète affichée au sommet de la fenêtre
 * pendant les transitions de pages pour un feedback visuel immédiat.
 */
export const RouteProgressBar: FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-primary/20 overflow-hidden pointer-events-none">
      <div className="h-full bg-gradient-to-r from-accent via-amber-300 to-accent animate-[pulse_1s_ease-in-out_infinite] w-full" />
    </div>
  );
};

export default RouteProgressBar;

