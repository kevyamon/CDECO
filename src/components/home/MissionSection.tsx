import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "react-i18next";

// Mission images
import diplomatieImg from "@/assets/missions/diplomatie.jpg";
import pmeImg from "@/assets/missions/pme.jpg";
import intermediationImg from "@/assets/missions/intermediation.jpg";

interface MissionItem {
  number: string;
  image: string;
  title: string;
  description: string;
}

const MissionCard = ({ mission }: { mission: MissionItem }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseEnter = () => {
      card.style.transform = "scale(1.02)";
    };
    const handleMouseLeave = () => {
      card.style.transform = "scale(1)";
    };
    
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden h-[280px] md:h-[320px] shadow-lg"
      style={{ transition: "transform 0.3s ease" }}
    >
      {/* Background Image */}
      <img
        src={mission.image}
        alt={mission.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/95 via-[#172554]/60 to-[#172554]/30" />
      
      {/* Number Badge */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
        <span className="text-sm font-bold text-primary">{mission.number}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-2">
          {mission.title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
          {mission.description}
        </p>
      </div>
    </div>
  );
};

const MissionSection = () => {
  const { t } = useTranslation();
  const headerRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp" });
  const gridRef = useStaggerAnimation<HTMLDivElement>({ staggerAmount: 0.1 });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const missions: MissionItem[] = [
    {
      number: "01",
      image: diplomatieImg,
      title: t("mission.p1Title", "Diplomatie Commerciale"),
      description: t("mission.p1Desc", "Faciliter les relations commerciales entre le Congo et les partenaires internationaux à travers une diplomatie économique active.")
    },
    {
      number: "02",
      image: pmeImg,
      title: t("mission.p2Title", "Soutien aux PME/PMI"),
      description: t("mission.p2Desc", "Accompagner les petites et moyennes entreprises congolaises dans leur développement et leur internationalisation.")
    },
    {
      number: "03",
      image: intermediationImg,
      title: t("mission.p3Title", "Promotion de l'Excellence"),
      description: t("mission.p3Desc", "Créer des passerelles entre les acteurs économiques locaux et les investisseurs internationaux.")
    }
  ];

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section id="mission-section" className="py-14 md:py-20 lg:py-24 bg-background">
      <div className="container-cdeco px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <SectionHeader label={t("mission.badge", "Notre Action")} />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("mission.title", "Trois Piliers d'Intervention")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t("mission.description", "La CDECO œuvre pour la promotion des échanges économiques et commerciaux du Congo en créant des passerelles entre les acteurs nationaux, régionaux et mondiaux.")}
          </p>
        </div>

        {/* Mobile Carousel (<768px) */}
        <div className="md:hidden">
          <Carousel
            setApi={setApi}
            opts={{ align: "center", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {missions.map((mission, index) => (
                <CarouselItem key={index} className="pl-3 basis-[85%]">
                  <MissionCard mission={mission} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {missions.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-accent w-7"
                    : "bg-primary/30 w-2.5 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Tablet Grid (768px-1024px): 2 columns */}
        <div ref={gridRef} className="hidden md:grid lg:hidden grid-cols-2 gap-6 max-w-3xl mx-auto">
          {missions.map((mission, index) => (
            <div key={index} className={index === 2 ? "col-span-2 max-w-md mx-auto w-full" : ""}>
              <MissionCard mission={mission} />
            </div>
          ))}
        </div>

        {/* Desktop Grid (≥1024px): 3 columns */}
        <div ref={gridRef} className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8">
          {missions.map((mission, index) => (
            <MissionCard key={index} mission={mission} />
          ))}
        </div>

        {/* Notre Vision - Paragraphe épuré */}
        <div className="mt-10 md:mt-14 max-w-3xl mx-auto">
          <div className="border-l-4 border-accent pl-6 py-2">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
              {t("about.visionTitle", "Notre Vision")}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("about.visionText", "Faire du Congo un hub économique incontournable en Afrique centrale, en favorisant les partenariats stratégiques, l'intégration aux chaînes de valeur régionales et l'innovation.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
