import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Building2, Globe, Users, BarChart3, GraduationCap, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MemberTypeItem {
  icon: LucideIcon;
  titleFr: string;
  titleEn: string;
}

const memberTypes: MemberTypeItem[] = [
  { icon: Building2, titleFr: "Sociétés PME/PMI", titleEn: "SMEs & Corporate Leaders" },
  { icon: Globe, titleFr: "Institutions Publiques", titleEn: "Public Institutions" },
  { icon: Users, titleFr: "Corps Diplomatiques", titleEn: "Diplomatic Corps" },
  { icon: BarChart3, titleFr: "Organisations Économiques", titleEn: "Economic Organizations" },
  { icon: GraduationCap, titleFr: "Écoles & Universités", titleEn: "Universities & Academia" },
  { icon: Briefcase, titleFr: "Professionnels & Étudiants", titleEn: "Professionals & Scholars" },
];

const MemberCard = ({ type, isEn }: { type: MemberTypeItem; isEn: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = type.icon;

  return (
    <div
      className="flex items-center gap-4 bg-[#1E3A8A] rounded-xl p-4 md:p-5 border-2 shadow-md h-full transition-all duration-300"
      style={{ 
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        borderColor: isHovered ? "hsl(var(--accent))" : "transparent"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
        <IconComponent className="h-6 w-6 text-accent" strokeWidth={1.5} />
      </div>
      <span className="font-semibold text-white text-sm md:text-base">
        {isEn ? type.titleEn : type.titleFr}
      </span>
    </div>
  );
};

const MembershipTypes = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const headerRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp" });
  const gridRef = useStaggerAnimation<HTMLDivElement>({ staggerAmount: 0.08 });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container-cdeco px-4 sm:px-6">
        <div ref={headerRef} className="mb-8 md:mb-10 text-center sm:text-left">
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            {isEn ? "Membership Categories" : "Types de Membres"}
          </h2>
        </div>

        {/* Mobile Carousel (<768px) */}
        <div className="md:hidden">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {memberTypes.map((type, index) => (
                <CarouselItem key={index} className="pl-3 basis-[85%]">
                  <MemberCard type={type} isEn={isEn} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          <div className="flex justify-center gap-1.5 mt-5">
            {memberTypes.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index 
                    ? "bg-accent w-5" 
                    : "bg-primary/30 w-2 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Tablet Grid (768px-1024px): 2 columns */}
        <div ref={gridRef} className="hidden md:grid lg:hidden grid-cols-2 gap-4">
          {memberTypes.map((type, index) => (
            <div key={index}>
              <MemberCard type={type} isEn={isEn} />
            </div>
          ))}
        </div>

        {/* Desktop Grid (≥1024px): 3 columns */}
        <div ref={gridRef} className="hidden lg:grid grid-cols-3 gap-5">
          {memberTypes.map((type, index) => (
            <div key={index}>
              <MemberCard type={type} isEn={isEn} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipTypes;
