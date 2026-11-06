import { Scale, Award, Handshake, Target, Leaf } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import SectionHeader from "@/components/ui/section-header";
const values = [{
  icon: Scale,
  title: "Neutralité institutionnelle",
  description: "La CDECO agit en toute indépendance politique, religieuse et idéologique pour garantir l'objectivité et l'impartialité de ses actions."
}, {
  icon: Award,
  title: "Exemplarité & Éthique",
  description: "L'intégrité, la transparence, et la responsabilité guident l'ensemble des décisions et engagements de ses membres."
}, {
  icon: Handshake,
  title: "Coopération gagnant-gagnant",
  description: "La CDECO favorise des partenariats équilibrés, fondés sur la réciprocité, la confiance mutuelle et le respect des intérêts partagés."
}, {
  icon: Target,
  title: "Excellence dans l'exécution",
  description: "Une culture de la rigueur, de l'efficacité et de la qualité structure chaque mission pour répondre aux plus hauts standards."
}, {
  icon: Leaf,
  title: "Engagement pour le développement durable",
  description: "La CDECO soutient un développement inclusif, responsable et résilient, au service de l'intérêt général et des générations futures."
}];
const ValueCard = ({
  value
}: {
  value: typeof values[0];
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
  const headerRef = useScrollAnimation<HTMLDivElement>({
    type: "fadeUp"
  });
  const gridRef = useStaggerAnimation<HTMLDivElement>({
    staggerAmount: 0.1
  });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
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
          <SectionHeader label="Nos Valeurs" variant="light" />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6">
            Les Piliers de Notre Action
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">La CDECO s’appuie sur un socle de valeurs fondamentales qui orientent ses actions, ses partenariats et son engagement auprès des institutions, et des acteurs publics-privés. Ces valeurs incarnent notre vision et traduisent notre responsabilité dans la construction d’un écosystème économique crédible, éthique et durable.  </p>
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
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {values.map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={`h-2.5 rounded-full transition-all duration-300 ${current === index ? "bg-accent w-7" : "bg-white/30 w-2.5 hover:bg-white/50"}`} aria-label={`Go to slide ${index + 1}`} />)}
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