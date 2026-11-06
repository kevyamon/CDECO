import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

// Gallery images for carousel
import event1 from "@/assets/gallery/event-1.jpg";
import event2 from "@/assets/gallery/event-2.jpg";
import event3 from "@/assets/gallery/event-3.jpg";
import event4 from "@/assets/gallery/event-4.jpg";
import event5 from "@/assets/gallery/event-5.jpg";
import team1 from "@/assets/gallery/team-1.jpg";
gsap.registerPlugin(ScrollTrigger);
const carouselImages = [event1, event2, event3, event4, event5, team1];
const HeroSection = () => {
  const {
    t
  } = useTranslation();
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play carousel with CSS transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Defer GSAP animations to avoid forced reflows during initial render
    const timeoutId = setTimeout(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      });
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }).to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7
      }, "-=0.3").to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, "-=0.4").to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, "-=0.3");
    }, 100);
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  const scrollToContent = () => {
    const element = document.getElementById("mission-section");
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden contain-paint">
      {/* Background Image Carousel with CSS transitions - optimisé */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`CDECO Event ${index + 1}`} 
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
            <div ref={badgeRef} className="opacity-0 translate-y-8">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 sm:w-12 bg-white/40" />
                <span className="flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-white/90">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  République du Congo • {t("hero.badge")}
                </span>
                <div className="h-px w-8 sm:w-12 bg-white/40" />
              </div>
            </div>

            {/* Title */}
            <h1 ref={titleRef} className="opacity-0 translate-y-10 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-foreground leading-tight">
              {t("hero.title")}<br />
              <span className="relative inline-block">
                <span className="text-accent">{t("hero.titleHighlight")}</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full" />
              </span>
            </h1>

            {/* Description */}
            <p ref={descRef} className="opacity-0 translate-y-8 text-lg sm:text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto">
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