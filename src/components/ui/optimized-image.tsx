/**
 * =============================================================================
 * OPTIMIZED IMAGE - Composant d'image optimisé pour les performances
 * =============================================================================
 * 
 * Ce composant encapsule les meilleures pratiques pour le chargement d'images :
 * - Lazy loading natif par défaut
 * - Attributs de décodage asynchrone
 * - Placeholder pendant le chargement
 * - Gestion des erreurs de chargement
 * - Support pour les priorités de chargement
 */

import { useState, useCallback, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  /** Image à afficher */
  src: string;
  /** Texte alternatif pour l'accessibilité */
  alt: string;
  /** Si true, charge l'image immédiatement (hero, above the fold) */
  priority?: boolean;
  /** Afficher un placeholder pendant le chargement */
  showPlaceholder?: boolean;
  /** Classes CSS pour le conteneur */
  containerClassName?: string;
  /** Aspect ratio du conteneur (ex: "16/9", "4/3", "1/1") */
  aspectRatio?: string;
}

/**
 * Composant d'image optimisé avec lazy loading et placeholders
 * 
 * @example
 * <OptimizedImage 
 *   src={heroImage} 
 *   alt="Description"
 *   priority // Pour les images above the fold
 * />
 * 
 * @example
 * <OptimizedImage 
 *   src={cardImage} 
 *   alt="Description"
 *   aspectRatio="16/9"
 *   className="rounded-lg"
 * />
 */
const OptimizedImage = ({
  src,
  alt,
  priority = false,
  showPlaceholder = true,
  containerClassName,
  aspectRatio,
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Déterminer les attributs de chargement selon la priorité
  const loadingAttr = priority ? "eager" : "lazy";
  const fetchPriorityAttr = priority ? "high" : "auto";
  const decodingAttr = priority ? "sync" : "async";

  // Si aspect ratio est défini, utiliser un conteneur
  if (aspectRatio) {
    return (
      <div 
        className={cn(
          "relative overflow-hidden",
          containerClassName
        )}
        style={{ aspectRatio }}
      >
        {/* Placeholder de chargement */}
        {showPlaceholder && !isLoaded && (
          <div 
            className="absolute inset-0 bg-muted animate-pulse"
            aria-hidden="true"
          />
        )}
        
        {/* Image principale */}
        {!hasError && (
          <img
            src={src}
            alt={alt}
            loading={loadingAttr}
            {...({ fetchpriority: fetchPriorityAttr } as any)}
            decoding={decodingAttr}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            {...props}
          />
        )}
        
        {/* Fallback en cas d'erreur */}
        {hasError && (
          <div 
            className="absolute inset-0 bg-muted flex items-center justify-center"
            role="img"
            aria-label={alt}
          >
            <span className="text-muted-foreground text-sm">Image non disponible</span>
          </div>
        )}
      </div>
    );
  }

  // Version simple sans conteneur d'aspect ratio
  return (
    <div className={cn("relative inline-block", containerClassName)}>
      {showPlaceholder && !isLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse rounded-inherit"
          aria-hidden="true"
        />
      )}
      
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loadingAttr}
          {...({ fetchpriority: fetchPriorityAttr } as any)}
          decoding={decodingAttr}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          {...props}
        />
      ) : (
        <div 
          className={cn("bg-muted flex items-center justify-center", className)}
          role="img"
          aria-label={alt}
        >
          <span className="text-muted-foreground text-xs">Erreur</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
