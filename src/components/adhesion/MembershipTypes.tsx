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

const memberTypes: { icon: LucideIcon; title: string }[] = [
  { icon: Building2, title: "Sociétés PME/PMI" },
  { icon: Globe, title: "Institutions Publiques" },
  { icon: Users, title: "Corps Diplomatiques" },
  { icon: BarChart3, title: "Organisations Économiques" },
  { icon: GraduationCap, title: "Écoles & Universités" },
  { icon: Briefcase, title: "Professionnels & Étudiants" },
];

const MemberCard = ({ type }: { type: typeof memberTypes[0] }) => {
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
      <span className="font-semibold text-white text-sm md:text-base">{type.title}</span>
    </div>
  );
};

const MembershipTypes = () => {
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
        {/* Header */}
        <div ref={headerRef} className="mb-8 md:mb-10">
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Types de Membres
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
                  <MemberCard type={type} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Dots */}
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
            <MemberCard key={index} type={type} />
          ))}
        </div>

        {/* Desktop Grid (≥1024px): 3 columns */}
        <div ref={gridRef} className="hidden lg:grid grid-cols-3 gap-4">
          {memberTypes.map((type, index) => (
            <MemberCard key={index} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipTypes;