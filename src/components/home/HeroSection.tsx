import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useSiteMedia } from "@/hooks/useSiteMedia";

// Gallery images for carousel
import event1 from "@/assets/gallery/event-1.webp";
import event2 from "@/assets/gallery/event-2.webp";
import event3 from "@/assets/gallery/event-3.webp";
import event4 from "@/assets/gallery/event-4.webp";
import event5 from "@/assets/gallery/event-5.webp";
import team1 from "@/assets/gallery/team-1.webp";
gsap.registerPlugin(ScrollTrigger);
const defaultCarouselImages = [event1, event2, event3, event4, event5, team1];
const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { getMedia } = useSiteMedia();
  const customHero = getMedia("hero_banner", "");
  const carouselImages = useMemo(() => {
    return customHero ? [customHero, ...defaultCarouselImages] : defaultCarouselImages;
  }, [customHero]);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play carousel with CSS transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    if (!badgeRef.current || !titleRef.current || !descRef.current) return;
    const elements = [badgeRef.current, titleRef.current, descRef.current];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0.3, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);
  const scrollToContent = () => {
    const element = document.getElementById("mission-section");
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden contain-paint bg-[#0c1f36]">
      {/* Background Image Carousel with CSS transitions - optimisé */}
      <div className="absolute inset-0 bg-[#0c1f36]">
        {carouselImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt="" 
            aria-hidden="true"
            loading={index === 0 ? "eager" : "lazy"} 
            {...({ fetchpriority: index === 0 ? "high" : "low" } as any)}
            decoding={index === 0 ? "sync" : "async"} 
            className={`absolute inset-0 w-full h-full object-cover will-change-opacity transition-opacity duration-1000 ${currentIndex === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      
      {/* Reduced Overlay for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/50" />

      {/* Main Content - Centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-20 pb-32 md:pt-24 md:pb-40">
        <div className="container-cdeco">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            {/* Location Badge */}
            <div ref={badgeRef} className="transition-all duration-500">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 sm:w-12 bg-white/40" />
                <span className="flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-white/90">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {isEn ? "Republic of Congo" : "République du Congo"} • {t("hero.badge")}
                </span>
                <div className="h-px w-8 sm:w-12 bg-white/40" />
              </div>
            </div>

            {/* Title */}
            <h1 ref={titleRef} className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-tight">
              {t("hero.title")}<br />
              <span className="relative inline-block">
                <span className="text-accent">{t("hero.titleHighlight")}</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full" />
              </span>
            </h1>

            {/* Description */}
            <p ref={descRef} className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>

            {/* CTA Button */}
            

            {/* Carousel Indicators - WCAG compliant touch targets (min 24px) */}
            <div className="flex justify-center gap-1 pt-4">
              {carouselImages.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentIndex(index)} 
                  className="p-2 group"
                  aria-label={`Aller à l'image ${index + 1}`}
                >
                  <span 
                    className={`block rounded-full transition-all duration-300 ${
                      currentIndex === index 
                        ? "bg-accent w-6 h-2" 
                        : "bg-primary-foreground/40 w-2 h-2 group-hover:bg-primary-foreground/60"
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button onClick={scrollToContent} className="hidden md:flex absolute bottom-16 left-1/2 -translate-x-1/2 z-20 animate-bounce text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Défiler vers le bas">
        
      </button>
    </section>;
};
export default HeroSection;