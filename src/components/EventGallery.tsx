import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Camera, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

gsap.registerPlugin(ScrollTrigger);

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

interface EventGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const EventGallery = ({ images, className }: EventGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [autoplayPlugin.current]
  );

  const [selectedDot, setSelectedDot] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedDot(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = autoplayPlugin.current;
    if (!autoplay) return;

    if (isAutoPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsAutoPlaying(!isAutoPlaying);
  }, [isAutoPlaying]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector("img");
    const overlay = card.querySelector(".overlay");

    gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
    if (img) gsap.to(img, { scale: 1.08, duration: 0.4, ease: "power2.out" });
    if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector("img");
    const overlay = card.querySelector(".overlay");

    gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
    if (img) gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
  };

  const GalleryItem = ({ image, index }: { image: GalleryImage; index: number }) => (
    <div
      className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-primary/20 shadow-lg"
      onClick={() => openLightbox(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image.src} alt={image.alt} className="w-full h-full object-cover will-change-transform" loading="lazy" />
      {image.category && (
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide shadow-lg z-10">
          {image.category}
        </div>
      )}
      <div className="overlay absolute inset-0 bg-primary/70 opacity-0 flex items-center justify-center transition-opacity">
        <div className="text-center p-4">
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 border-2 border-accent">
            <ZoomIn className="w-6 h-6 text-primary-foreground" />
          </div>
          {image.title && (
            <h4 className="font-heading font-bold text-primary-foreground text-sm">{image.title}</h4>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={galleryRef} className={cn("w-full", className)}>
      <div className="md:hidden">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                <GalleryItem image={image} index={index} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors border border-primary-foreground/30"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors border border-primary-foreground/30"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          <div className="flex gap-1.5 items-center">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  selectedDot === index ? "bg-accent w-6" : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                )}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={toggleAutoplay}
            className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/30 flex items-center justify-center transition-colors border border-accent/50"
            aria-label={isAutoPlaying ? "Pause" : "Play"}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 text-accent" /> : <Play className="w-4 h-4 text-accent" />}
          </button>
        </div>
      </div>

      <div ref={gridRef} className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        {images.map((image, index) => (
          <GalleryItem key={index} image={image} index={index} />
        ))}
      </div>

      <div ref={gridRef} className="hidden lg:grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "gallery-item",
              index % 5 === 0 && "row-span-2",
              index % 7 === 3 && "row-span-2"
            )}
          >
            <GalleryItem image={image} index={index} />
          </div>
        ))}
      </div>

      <GalleryLightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onSelectIndex={setCurrentIndex}
      />
    </div>
  );
};

export default EventGallery;
