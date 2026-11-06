import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fuel, Building2, Leaf, Factory, Truck, Cpu, GraduationCap } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

gsap.registerPlugin(ScrollTrigger);

const economicSectors = [
  {
    name: "Hydrocarbures",
    percentage: 42,
    icon: Fuel,
    colorClass: "text-primary",
    bgGradient: "from-white to-primary/5",
    borderColor: "border-primary/20",
    iconBg: "bg-primary",
    barGradient: "from-primary to-primary/70",
  },
  {
    name: "Services",
    percentage: 33,
    icon: Building2,
    colorClass: "text-destructive",
    bgGradient: "from-white to-destructive/5",
    borderColor: "border-destructive/20",
    iconBg: "bg-destructive",
    barGradient: "from-destructive to-destructive/70",
  },
  {
    name: "Agriculture",
    percentage: 10,
    icon: Leaf,
    colorClass: "text-cdeco-green",
    bgGradient: "from-white to-cdeco-green/5",
    borderColor: "border-cdeco-green/20",
    iconBg: "bg-cdeco-green",
    barGradient: "from-cdeco-green to-cdeco-green/70",
  },
  {
    name: "Industries",
    percentage: 8,
    icon: Factory,
    colorClass: "text-accent",
    bgGradient: "from-white to-accent/5",
    borderColor: "border-accent/20",
    iconBg: "bg-accent",
    barGradient: "from-accent to-accent/70",
  },
  {
    name: "Transport",
    percentage: 4,
    icon: Truck,
    colorClass: "text-primary",
    bgGradient: "from-white to-primary/5",
    borderColor: "border-primary/20",
    iconBg: "bg-primary",
    barGradient: "from-primary to-primary/70",
  },
  {
    name: "Technologies",
    percentage: 3,
    icon: Cpu,
    colorClass: "text-destructive",
    bgGradient: "from-white to-destructive/5",
    borderColor: "border-destructive/20",
    iconBg: "bg-destructive",
    barGradient: "from-destructive to-destructive/70",
  },
];

const EconomicSectorsGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

    // Animate header
    gsap.fromTo(
      header.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate cards with stagger
    const cardElements = cards.querySelectorAll(".sector-card");
    gsap.fromTo(
      cardElements,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cards,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate progress bars
    cardElements.forEach((card) => {
      const bar = card.querySelector(".progress-fill");
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container-cdeco px-4 sm:px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-14">
          <SectionHeader label="Économie Congolaise" />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Répartition des secteurs économiques{" "}
            <span className="text-primary">au Congo</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Opportunités d'investissement et moteur du développement
          </p>
        </div>

        {/* Sectors Grid - Mobile first: 1 col, sm: 2 cols, lg: 3 cols */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 md:mb-14"
        >
          {economicSectors.map((sector, index) => (
            <div
              key={index}
              className={`sector-card group relative p-5 sm:p-6 rounded-[18px] bg-gradient-to-br ${sector.bgGradient} border ${sector.borderColor} shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-default overflow-hidden`}
            >
              {/* Card content */}
              <div className="flex flex-col items-center text-center">
                {/* Icon - Large and prominent */}
                <div
                  className={`w-16 h-16 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 rounded-2xl ${sector.iconBg} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <sector.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary-foreground" />
                </div>

                {/* Title - responsive, no overflow */}
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 break-words hyphens-auto leading-tight">
                  {sector.name}
                </h3>

                {/* Percentage - Big & Bold */}
                <span
                  className={`font-heading text-4xl sm:text-[2.75rem] md:text-5xl font-bold ${sector.colorClass} mb-4`}
                >
                  {sector.percentage}%
                </span>

                {/* Progress bar - thin & gradient */}
                <div className="w-full h-1.5 sm:h-2 bg-secondary/60 rounded-full overflow-hidden">
                  <div
                    className={`progress-fill h-full bg-gradient-to-r ${sector.barGradient} rounded-full origin-left`}
                    style={{ width: `${sector.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-start gap-4 md:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2">
              Opportunités de Diversification
            </h4>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Le Congo dispose d'un potentiel économique considérable au-delà des
              hydrocarbures. La CDECO accompagne les initiatives de diversification
              économique en promouvant l'agriculture, les technologies numériques, le
              tourisme et les industries de transformation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomicSectorsGrid;
