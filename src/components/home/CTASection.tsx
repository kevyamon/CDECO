import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/section-header";
import { ArrowRight, Building, GraduationCap, Globe, Users, Briefcase, BookOpen, CheckCircle } from "lucide-react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const memberTypes = [
  { icon: Building, label: "Sociétés PME/PMI" },
  { icon: Globe, label: "Institutions Publiques" },
  { icon: Users, label: "Corps Diplomatiques" },
  { icon: Briefcase, label: "Organisations Économiques" },
  { icon: GraduationCap, label: "Écoles & Universités" },
  { icon: BookOpen, label: "Professionnels & Étudiants" },
];

const benefits = [
  "Accès aux événements exclusifs B2B/B2C/B2G",
  "Réseau de partenaires internationaux",
  "Formations et renforcement des capacités",
  "Accompagnement personnalisé",
];

const CTASection = () => {
  const cardRef = useScrollAnimation<HTMLDivElement>({ type: "scaleIn" });
  const memberTypesRef = useStaggerAnimation<HTMLDivElement>({ staggerAmount: 0.08 });

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 hidden md:block">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-40 w-48 h-48 bg-destructive rounded-full blur-3xl" />
      </div>

      <div className="container-cdeco relative z-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA Card */}
          <div ref={cardRef} className="bg-card rounded-3xl border-2 border-border shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Content */}
              <div className="p-6 sm:p-8 lg:p-12">
                <SectionHeader label="Rejoignez-nous" className="justify-start" />
                
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                  Devenez Membre de la{" "}
                  <span className="text-primary">CDECO</span>
                </h2>
                
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed mb-6 md:mb-8">
                  Intégrez un réseau d'excellence et bénéficiez d'opportunités uniques pour développer vos activités au Congo et à l'international.
                </p>

                {/* Benefits list */}
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground text-sm sm:text-base">
                      <CheckCircle className="w-5 h-5 text-cdeco-green shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link to="/adhesion" className="block sm:inline-block">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-8 py-6 text-base sm:text-lg font-semibold group"
                  >
                    Adhérer maintenant
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Right - Member Types */}
              <div className="bg-primary p-6 sm:p-8 lg:p-12 text-primary-foreground">
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-6 md:mb-8">
                  Types de Membres
                </h3>
                
                <div ref={memberTypesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {memberTypes.map((type, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <type.icon className="h-5 w-5 text-accent" />
                      </div>
                      <span className="text-sm md:text-base font-medium">{type.label}</span>
                    </div>
                  ))}
                </div>

                {/* Process Steps */}
                <div className="mt-8 pt-8 border-t border-primary-foreground/10">
                  <p className="text-primary-foreground/70 text-sm mb-4">
                    Processus d'adhésion simple et rapide
                  </p>
                  <div className="flex items-center justify-between md:justify-start md:gap-6">
                    {[
                      { step: 1, label: "Demande" },
                      { step: 2, label: "Validation" },
                      { step: 3, label: "Adhésion" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm md:text-base font-bold">
                          {item.step}
                        </div>
                        <span className="text-xs md:text-sm">{item.label}</span>
                        {index < 2 && (
                          <div className="w-6 md:w-8 h-px bg-primary-foreground/30 hidden sm:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
