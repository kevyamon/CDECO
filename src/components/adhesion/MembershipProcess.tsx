import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";

const steps = [
  { number: 1, label: "Demande" },
  { number: 2, label: "Validation" },
  { number: 3, label: "Adhésion" },
];

interface MembershipProcessProps {
  onStartClick?: () => void;
}

const MembershipProcess = ({ onStartClick }: MembershipProcessProps) => {
  const sectionRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp", delay: 0.1 });

  return (
    <section ref={sectionRef} data-section="membership-process" className="py-10 md:py-14 bg-[#172554]">
      <div className="container-cdeco px-4 sm:px-6">
        {/* Title */}
        <p className="text-center text-white/80 text-sm md:text-base font-medium mb-6">
          Processus d'adhésion simple et rapide
        </p>

        {/* Steps Timeline - Vertical on mobile, horizontal on tablet+ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Step */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive text-white flex items-center justify-center font-bold text-base shadow-lg flex-shrink-0">
                  {step.number}
                </div>
                <span className="font-semibold text-white text-base whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              
              {/* Arrow connector - Down on mobile, right on tablet+ */}
              {index < steps.length - 1 && (
                <>
                  <MoveRight className="hidden sm:block h-6 w-6 text-accent mx-4 flex-shrink-0" strokeWidth={2.5} />
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-primary font-bold px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all"
            onClick={onStartClick}
          >
            Démarrer mon adhésion
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MembershipProcess;