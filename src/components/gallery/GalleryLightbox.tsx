import { FC } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GalleryImage } from "../EventGallery";

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export const GalleryLightbox: FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  onSelectIndex,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors z-10 border border-primary-foreground/20"
        aria-label="Fermer"
      >
        <X className="w-6 h-6 text-primary-foreground" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors z-10 border border-primary-foreground/20"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6 text-primary-foreground" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors z-10 border border-primary-foreground/20"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6 text-primary-foreground" />
      </button>

      <div className="max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />

        <div className="text-center mt-6">
          {images[currentIndex].category && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide mb-3">
              {images[currentIndex].category}
            </span>
          )}
          {images[currentIndex].title && (
            <h3 className="font-heading font-bold text-primary-foreground text-xl md:text-2xl mb-2">
              {images[currentIndex].title}
            </h3>
          )}
          <p className="text-primary-foreground/60 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onSelectIndex(index);
            }}
            className={cn(
              "w-14 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0",
              currentIndex === index
                ? "border-accent scale-110"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryLightbox;

