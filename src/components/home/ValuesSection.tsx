import { Scale, Award, Handshake, Target, Leaf, LucideIcon, Pause, Play } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "react-i18next";

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValueCard = ({
  value
}: {
  value: ValueItem;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseEnter = () => {
      card.style.transform = "scale(1.03) translateY(-4px)";
      card.style.boxShadow = "0 20px 40px -15px rgba(0, 0, 0, 0.3)";
    };
    const handleMouseLeave = () => {
      card.style.transform = "scale(1) translateY(0)";
      card.style.boxShadow = "0 10px 25px -10px rgba(0, 0, 0, 0.2)";
    };
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  return <div ref={cardRef} className="relative bg-[#172554] rounded-2xl p-8 md:p-10 text-center shadow-lg h-full flex flex-col items-center" style={{
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 10px 25px -10px rgba(0, 0, 0, 0.2)"
  }}>
      {/* Icon with gold ring */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-accent flex items-center justify-center mb-6">
        <value.icon className="h-7 w-7 md:h-9 md:w-9 text-accent" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-4">
        {value.title}
      </h3>
      
      {/* Description */}
      <p className="text-white/70 text-sm md:text-base leading-relaxed flex-grow">
        {value.description}
      </p>
    </div>;
};
const ValuesSection = () => {
  const { t } = useTranslation();
  const headerRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeUp"
  });
  const gridRef = useStaggerAnimation<HTMLDivElement>({
    staggerAmount: 0.1
  });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const values: ValueItem[] = [
    {
      icon: Scale,
      title: t("values.v1Title", "Neutralité institutionnelle"),
      description: t("values.v1Desc", "La CDECO agit en toute indépendance politique, religieuse et idéologique pour garantir l'objectivité et l'impartialité de ses actions.")
    },
    {
      icon: Award,
      title: t("values.v2Title", "Exemplarité & Éthique"),
      description: t("values.v2Desc", "L'intégrité, la transparence, et la responsabilité guident l'ensemble des décisions et engagements de ses membres.")
    },
    {
      icon: Handshake,
      title: t("values.v3Title", "Coopération gagnant-gagnant"),
      description: t("values.v3Desc", "La CDECO favorise des partenariats équilibrés, fondés sur la réciprocité, la confiance mutuelle et le respect des intérêts partagés.")
    },
    {
      icon: Target,
      title: t("values.v4Title", "Excellence dans l'exécution"),
      description: t("values.v4Desc", "Une culture de la rigueur, de l'efficacité et de la qualité structure chaque mission pour répondre aux plus hauts standards.")
    },
    {
      icon: Leaf,
      title: t("values.v5Title", "Engagement durable"),
      description: t("values.v5Desc", "La CDECO soutient un développement inclusif, responsable et résilient, au service de l'intérêt général et des générations futures.")
    }
  ];

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay sur mobile avec intervalle fluide
  useEffect(() => {
    if (!api || !isAutoplay) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [api, isAutoplay]);

  return <section className="py-16 md:py-20 lg:py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      </div>

      <div className="container-cdeco relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 md:mb-14 lg:mb-16">
          <SectionHeader label={t("values.badge", "Nos Valeurs")} variant="light" />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6">
            {t("values.title", "Les Principes Fondateurs de la CDECO")}
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("values.description", "Les valeurs qui guident chacune de nos actions et fondent la confiance avec nos partenaires.")}
          </p>
        </div>

        {/* Mobile Carousel (<768px) */}
        <div className="md:hidden">
          <Carousel setApi={setApi} opts={{
          align: "center",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-3">
              {values.map((value, index) => <CarouselItem key={index} className="pl-3 basis-[85%]">
                  <ValueCard value={value} />
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel Dots & Play/Pause Button */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsAutoplay((prev) => !prev)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-accent flex items-center justify-center transition-colors"
              aria-label={isAutoplay ? "Arrêter le défilement automatique" : "Reprendre le défilement automatique"}
              title={isAutoplay ? "Pause" : "Play"}
            >
              {isAutoplay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
            </button>
            <div className="flex gap-2">
              {values.map((_, index) => <button key={index} type="button" onClick={() => api?.scrollTo(index)} className={`h-2.5 rounded-full transition-all duration-300 ${current === index ? "bg-accent w-7" : "bg-white/30 w-2.5 hover:bg-white/50"}`} aria-label={`Go to slide ${index + 1}`} />)}
            </div>
          </div>
        </div>

        {/* Tablet Grid (768px-1024px): 2 columns */}
        <div ref={gridRef} className="hidden md:grid lg:hidden grid-cols-2 gap-6 max-w-3xl mx-auto">
          {values.map((value, index) => <ValueCard key={index} value={value} />)}
        </div>

        {/* Desktop Grid (≥1024px): 5 columns */}
        <div ref={gridRef} className="hidden lg:grid grid-cols-5 gap-5 xl:gap-6">
          {values.map((value, index) => <ValueCard key={index} value={value} />)}
        </div>
      </div>
    </section>;
};
export default ValuesSection;