import { FC } from "react";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface BrandedSkeletonProps {
  className?: string;
  rounded?: string;
}

/**
 * Skeleton intelligent aux couleurs institutionnelles de la CDECO (Bleu Nuit & Or).
 * Remplace avantageusement les skeletons blancs standards pour préserver l'élégance visuelle.
 */
export const BrandedSkeleton: FC<BrandedSkeletonProps> = ({
  className,
  rounded = "rounded-2xl",
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#002B49]/30 border border-accent/20 backdrop-blur-sm",
        rounded,
        className
      )}
    >
      {/* Vague scintillante dorée */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
      <div className="absolute inset-0 bg-[#002B49]/20 animate-pulse" />
    </div>
  );
};

/**
 * Skeleton intelligent pour la vidéo de présentation (aspect 16:9 avec icône de lecture dorée)
 */
export const VideoSkeleton: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative aspect-video rounded-2xl overflow-hidden bg-[#002B49]/40 border border-accent/25 shadow-2xl flex items-center justify-center",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center animate-pulse shadow-lg z-10">
        <Play className="h-7 w-7 text-accent fill-accent/40 ml-1" />
      </div>
    </div>
  );
};

/**
 * Skeleton intelligent pour les cartes des 3 Piliers d'Intervention
 */
export const PillarCardSkeleton: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden h-[280px] md:h-[320px] bg-[#002B49]/40 border border-accent/20 p-5 md:p-6 flex flex-col justify-end shadow-lg",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
      
      {/* Badge numéro */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/30 border border-accent/40 animate-pulse" />

      {/* Lignes de texte */}
      <div className="space-y-3 z-10">
        <div className="h-6 w-3/4 rounded-lg bg-accent/30 animate-pulse" />
        <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  );
};

export default BrandedSkeleton;

