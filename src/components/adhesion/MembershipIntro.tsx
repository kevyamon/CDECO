import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MembershipIntro = () => {
  const sectionRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp" });

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-background">
      <div className="container-cdeco px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Short intro */}
        <p className="text-center text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
          Fondée le 27 Août 2025 à Brazzaville, République du Congo sous l'impulsion et le leadership opérationnel de son Président-Fondateur 
          <span className="font-semibold text-foreground"> Monsieur Arnold Wesley AKINA</span>.
        </p>

        {/* Accordion for full text */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="vision" className="border-none">
            <AccordionTrigger className="justify-center gap-2 text-accent hover:text-accent/80 hover:no-underline text-sm font-medium py-2">
              En savoir plus sur notre vision
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed text-center px-4 pt-4">
              <p className="mb-4">
                La CDECO œuvre pour créer un pont entre les acteurs économiques locaux et les marchés internationaux. 
                Notre mission est de faciliter les échanges commerciaux, d'accompagner les PME/PMI dans leur développement 
                et de promouvoir l'excellence économique congolaise à travers une diplomatie commerciale active.
              </p>
              <p>
                Nous croyons fermement que le Congo dispose d'un potentiel économique immense qui mérite d'être 
                valorisé sur la scène mondiale. À travers nos programmes de formation, nos missions commerciales 
                et notre réseau de partenaires internationaux, nous accompagnons nos membres vers le succès.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default MembershipIntro;
