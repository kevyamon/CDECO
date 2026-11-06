import { useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, suffix: "+", label: "Partenaires" },
  { value: 6, suffix: "", label: "Secteurs Clés" },
  { value: 500, suffix: "+", label: "Membres" },
  { value: 50, suffix: "+", label: "Événements/an" },
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

const AnimatedCounter = ({ value, suffix, duration = 2 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            setCount(Math.floor(obj.val));
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, duration]);

  return (
    <div ref={counterRef}>
      {count}{suffix}
    </div>
  );
};

const StatsSection = () => {
  const statsRef = useStaggerAnimation<HTMLDivElement>({ staggerAmount: 0.1 });

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-cdeco px-4 sm:px-6">
        <div ref={statsRef} className="bg-card rounded-2xl border-2 border-border shadow-lg overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 md:p-8 hover:bg-secondary/30 transition-all duration-300 group"
              >
                <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
