import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MembershipProcessProps {
  onStartClick?: () => void;
}

const MembershipProcess = ({ onStartClick }: MembershipProcessProps) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const sectionRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp", delay: 0.1 });

  const steps = [
    { number: 1, label: isEn ? "Application" : "Demande" },
    { number: 2, label: isEn ? "Review & Approval" : "Validation" },
    { number: 3, label: isEn ? "Membership" : "Adhésion" },
  ];

  return (
    <section ref={sectionRef} data-section="membership-process" className="py-10 md:py-14 bg-[#172554]">
      <div className="container-cdeco px-4 sm:px-6">
        <p className="text-center text-white/80 text-sm md:text-base font-medium mb-6">
          {isEn ? "Fast, secure, and streamlined membership process" : "Processus d'adhésion simple et rapide"}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive text-white flex items-center justify-center font-bold text-base shadow-lg flex-shrink-0">
                  {step.number}
                </div>
                <span className="font-semibold text-white text-base whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <MoveRight className="hidden sm:block h-6 w-6 text-accent mx-4 flex-shrink-0" strokeWidth={2.5} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-primary font-bold px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all"
            onClick={onStartClick}
          >
            {isEn ? "Start My Application" : "Démarrer mon adhésion"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MembershipProcess;
