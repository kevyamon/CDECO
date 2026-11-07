import { FC } from "react";

/**
 * Skeleton Loader aux couleurs institutionnelles de la CDECO (Bleu profond & Doré Accent)
 * Utilisé pour remplacer les simples mentions "Chargement..."
 */
export const AdminFormSkeleton: FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* En-tête de section 1 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-border/40">
          <div className="w-1.5 h-4 bg-accent/60 rounded-full" />
          <div className="h-4 w-48 bg-primary/20 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-3 w-28 bg-primary/15 rounded" />
            <div className="h-10 w-full bg-primary/5 border border-primary/15 rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-32 bg-primary/15 rounded" />
            <div className="h-10 w-full bg-primary/5 border border-primary/15 rounded-xl" />
          </div>
        </div>
      </div>

      {/* En-tête de section 2 */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 pb-1 border-b border-border/40">
          <div className="w-1.5 h-4 bg-accent/60 rounded-full" />
          <div className="h-4 w-56 bg-primary/20 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-3 w-36 bg-primary/15 rounded" />
            <div className="h-10 w-full bg-primary/5 border border-primary/15 rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-40 bg-primary/15 rounded" />
            <div className="h-10 w-full bg-primary/5 border border-primary/15 rounded-xl" />
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-3 w-44 bg-primary/15 rounded" />
          <div className="h-20 w-full bg-primary/5 border border-primary/15 rounded-xl" />
        </div>
      </div>

      {/* Bouton d'action */}
      <div className="flex justify-end pt-2">
        <div className="h-11 w-44 bg-accent/30 rounded-xl" />
      </div>
    </div>
  );
};

/**
 * Skeleton Loader pour les grilles de cartes (Membres, Ressources, Événements)
 */
export const AdminCardGridSkeleton: FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border border-border/60 rounded-2xl p-4 bg-primary/[0.03] flex flex-col justify-between shadow-sm space-y-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/15 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-3/4 bg-primary/25 rounded" />
              <div className="h-3 w-1/2 bg-accent/30 rounded-full" />
            </div>
          </div>
          <div className="space-y-2 py-1">
            <div className="h-3 w-full bg-primary/10 rounded" />
            <div className="h-3 w-4/5 bg-primary/10 rounded" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="h-7 w-20 bg-primary/15 rounded-lg" />
            <div className="h-7 w-20 bg-accent/25 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminFormSkeleton;

