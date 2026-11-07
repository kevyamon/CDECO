import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

// Import styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import sector images
import hydrocarburesImg from "@/assets/sectors/hydrocarbures.jpg";
import tourismeImg from "@/assets/sectors/tourisme.jpg";
import agricultureImg from "@/assets/sectors/agriculture.jpg";
import minesImg from "@/assets/sectors/mines.jpg";
import foretsImg from "@/assets/sectors/forets.jpg";
import autresImg from "@/assets/sectors/autres.jpg";
import infrastructureImg from "@/assets/sectors/infrastructure.jpg";
import educationImg from "@/assets/sectors/education.jpg";
import numeriqueImg from "@/assets/sectors/numerique.jpg";
import energieImg from "@/assets/sectors/energie.jpg";

const SectorsShowcase = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperType | null>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const slidesData = [
    {
      id: 1,
      image: hydrocarburesImg,
      title: t("sectors.hydrocarbures", "Hydrocarbures"),
      subtitle: t("sectors.hydrocarburesSub", "Pilier Central de l'Économie"),
      description: t("sectors.hydrocarburesDesc", "Le secteur pétrolier Amont constitue le pilier central de l'économie congolaise, représentant plus de 80% des recettes d'exportation.")
    },
    {
      id: 2,
      image: tourismeImg,
      title: t("sectors.tourisme", "Tourisme"),
      subtitle: t("sectors.tourismeSub", "Ambitions Stratégiques et Projets Clés"),
      description: t("sectors.tourismeDesc", "Le gouvernement congolais s'est engagé à transformer le pays en une destination d'écotourisme de premier plan.")
    },
    {
      id: 3,
      image: agricultureImg,
      title: t("sectors.agriculture", "Agriculture"),
      subtitle: t("sectors.agricultureSub", "Potentiel Inexploité"),
      description: t("sectors.agricultureDesc", "Avec plus de 10 millions d'hectares de terres arables fertiles et un climat favorable, le Congo offre un potentiel agro-industriel exceptionnel.")
    },
    {
      id: 4,
      image: minesImg,
      title: t("sectors.mines", "Mines"),
      subtitle: t("sectors.minesSub", "Richesses du Sous-Sol"),
      description: t("sectors.minesDesc", "Le sous-sol congolais regorge de ressources minières diversifiées : fer, potasse, phosphate, or, diamants et métaux rares.")
    },
    {
      id: 5,
      image: foretsImg,
      title: t("sectors.forets", "Forêts"),
      subtitle: t("sectors.foretsSub", "Patrimoine Durable"),
      description: t("sectors.foretsDesc", "Deuxième massif forestier tropical au monde après l'Amazonie, le bassin du Congo constitue un pilier de la biodiversité mondiale.")
    },
    {
      id: 6,
      image: infrastructureImg,
      title: t("sectors.infrastructure", "Infrastructures"),
      subtitle: t("sectors.infrastructureSub", "Bâtir l'Avenir du Congo"),
      description: t("sectors.infrastructureDesc", "Modernisation des corridors routiers et renforcement du Port Autonome de Pointe-Noire en eau profonde.")
    },
    {
      id: 7,
      image: educationImg,
      title: t("sectors.education", "Éducation"),
      subtitle: t("sectors.educationSub", "Réformes Stratégiques"),
      description: t("sectors.educationDesc", "La formation professionnelle et l'excellence académique préparent la jeunesse congolaise aux métiers de la mondialisation.")
    },
    {
      id: 8,
      image: numeriqueImg,
      title: t("sectors.numerique", "Numérique"),
      subtitle: t("sectors.numeriqueSub", "Transformation Digitale"),
      description: t("sectors.numeriqueDesc", "Hub numérique régional en pleine émergence grâce au déploiement de la fibre optique et aux startups innovantes.")
    },
    {
      id: 9,
      image: energieImg,
      title: t("sectors.energie", "Énergie"),
      subtitle: t("sectors.energieSub", "Mix Énergétique Diversifié"),
      description: t("sectors.energieDesc", "Le potentiel hydroélectrique et solaire offre de vastes opportunités pour l'électrification propre et l'industrialisation durable.")
    }
  ];

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Text animation on slide change - optimized to avoid forced reflows
  const animateText = useCallback(() => {
    if (!textContainerRef.current) return;
    
    // Use requestAnimationFrame to batch DOM reads/writes
    requestAnimationFrame(() => {
      const elements = textContainerRef.current?.querySelectorAll(".animate-item");
      if (!elements) return;
      
      gsap.fromTo(elements, {
        opacity: 0,
        y: 60,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        force3D: true, // Use GPU acceleration
      });
    });
  }, []);
  useEffect(() => {
    if (isVisible) {
      animateText();
    }
  }, [isVisible, activeIndex, animateText]);
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };
  const toggleAutoplay = () => {
    if (!swiperRef.current) return;
    if (isAutoplayPaused) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.stop();
    }
    setIsAutoplayPaused(!isAutoplayPaused);
  };
  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };
  const currentSlide = slidesData[activeIndex];
  return <section ref={sectionRef} className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-primary">
      {/* Top Branding Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 via-black/50 to-transparent pt-4 pb-16 md:pb-20">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="flex flex-col items-center text-center space-y-2">
            {/* Header with lines */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px w-12 md:w-16 bg-accent/60" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {t("sectors.badge", "Secteurs Clés")}
              </span>
              <div className="h-px w-12 md:w-16 bg-accent/60" />
            </div>
            
            {/* Title */}
            <h1 className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide text-center leading-tight drop-shadow-lg">
              {t("sectors.title", "Secteurs Stratégiques d'Investissement")}
            </h1>
            
            {/* Description */}
            <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed drop-shadow-md">
              {t("sectors.subtitle", "La CDECO accompagne les investisseurs dans tous les secteurs stratégiques et encourage la diversification.")}
            </p>
          </div>
        </div>
      </div>

      {/* Swiper Carousel - optimized for performance */}
      <Swiper 
        modules={[EffectFade, Autoplay, Navigation, Pagination]} 
        effect="fade" 
        fadeEffect={{
          crossFade: true
        }} 
        speed={1200} 
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }} 
        loop={true} 
        watchSlidesProgress={false}
        observer={false}
        observeParents={false}
        resizeObserver={false}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }} 
        onSlideChange={handleSlideChange} 
        className="w-full h-full"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image with CSS-only transform for better performance */}
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out ${
                  activeIndex === index ? 'scale-105' : 'scale-100'
                }`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  willChange: activeIndex === index ? 'transform' : 'auto',
                }} 
              />
              
              {/* Gradient Overlays - Enhanced for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Text Content Overlay */}
      <div ref={textContainerRef} className="absolute bottom-0 left-0 right-0 z-20 pb-28 sm:pb-32 md:pb-36 pt-6 px-4 sm:px-6 lg:px-8">
        <div className="container-cdeco max-w-4xl mx-auto">
          {/* Sector Label */}
          <div className="animate-item">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="h-px w-8 bg-accent/60" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {currentSlide.subtitle}
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="animate-item font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {currentSlide.title}
          </h2>

          {/* Description */}
          <p className="animate-item text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 z-30 px-4 sm:px-6">
        <div className="container-cdeco flex items-center justify-between gap-2">
          {/* Left: Arrow Controls */}
          <div className="flex items-center gap-3">
            <button onClick={() => swiperRef.current?.slidePrev()} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-accent bg-primary/50 backdrop-blur-sm flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300" aria-label="Slide précédente">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={() => swiperRef.current?.slideNext()} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-accent bg-primary/50 backdrop-blur-sm flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300" aria-label="Slide suivante">
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* Autoplay Toggle */}
            <button onClick={toggleAutoplay} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 bg-primary/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:border-accent hover:text-accent transition-all duration-300" aria-label={isAutoplayPaused ? "Reprendre" : "Pause"}>
              {isAutoplayPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

          {/* Center: Pagination Dots - WCAG compliant touch targets (min 24px) */}
          <div className="flex items-center gap-1">
            {slidesData.map((_, index) => (
              <button 
                key={index} 
                onClick={() => goToSlide(index)} 
                className="p-2 group"
                aria-label={`Aller au slide ${index + 1}`}
              >
                <span 
                  className={`block rounded-full transition-all duration-500 ${
                    activeIndex === index 
                      ? "w-6 h-2 bg-accent" 
                      : "w-2 h-2 bg-white/40 group-hover:bg-white/60"
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* Right: CTA Button - white text on accent for WCAG compliance */}
          <Link to="/adhesion" className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Investir au Congo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile CTA - Floating */}
      

      {/* Slide Counter */}
      <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-1 text-white/60">
        <span className="text-2xl font-bold text-accent">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="w-px h-8 bg-white/30" />
        <span className="text-sm">{String(slidesData.length).padStart(2, '0')}</span>
      </div>
    </section>;
};
export default SectorsShowcase;