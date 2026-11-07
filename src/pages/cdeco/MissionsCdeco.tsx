import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/ui/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getMissionsAxes, getMissionsProjets } from "@/data/missionsData";

const MissionsCdeco = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const axes = getMissionsAxes(isEn);
  const projets = getMissionsProjets(isEn);

  return (
    <Layout>
      <SEOHead
        title={isEn ? "Missions & Strategic Activities | CDECO" : "Missions & Activités | CDECO"}
        description={
          isEn
            ? "Explore CDECO's 6 strategic priorities: international economic forums, capacity building, diplomatic partnerships, and flagship programs."
            : "Découvrez les 6 axes prioritaires de la CDECO : forums économiques, renforcement des capacités, partenariats diplomatiques et plus encore."
        }
        keywords="missions CDECO, activités, forums économiques, partenariats, Congo"
        canonicalUrl="/cdeco/missions"
      />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container-cdeco text-center relative z-10 px-4 sm:px-6">
          <SectionHeader label={isEn ? "Our Commitments" : "Nos engagements"} variant="light" />
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEn ? "Missions & Activities" : "Missions & Activités"}
          </h1>
          <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? "Six priority pillars to elevate economic diplomacy and position Congo prominently on the global stage."
              : "Six axes prioritaires pour promouvoir la diplomatie économique et renforcer le positionnement du Congo sur la scène internationale."}
          </p>
        </div>
      </section>

      {/* Axes Prioritaires */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <SectionHeader label={isEn ? "Strategy" : "Stratégie"} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isEn ? "Our 6 Strategic Pillars" : "Nos 6 Axes Prioritaires"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {isEn
                ? "Targeted areas of intervention for measurable, lasting economic impact."
                : "Des domaines d'intervention stratégiques pour un impact économique durable."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {axes.map((axe) => {
              const Icon = axe.icon;
              return (
                <div key={axe.id} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                        {axe.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {axe.description}
                      </p>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={axe.id} className="border-none">
                      <AccordionTrigger className="text-xs font-semibold text-primary hover:no-underline py-2">
                        {isEn ? "View key initiatives" : "Voir les actions clés"}
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-0">
                        <ul className="space-y-2 text-xs text-muted-foreground pl-2 border-l-2 border-accent/30">
                          {axe.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projets Phares */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <SectionHeader label={isEn ? "Flagship Initiatives" : "Initiatives Structurantes"} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isEn ? "Flagship Programs" : "Nos Projets Phares"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {isEn
                ? "Transformative programs engineered to empower the Congolese entrepreneurial ecosystem."
                : "Des programmes novateurs pour transformer l'écosystème entrepreneurial congolais."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projets.map((projet) => {
              const Icon = projet.icon;
              return (
                <div key={projet.id} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white ${projet.statusColor}`}>
                        {projet.status}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                      {projet.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {projet.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <p className="text-xs font-semibold text-foreground">
                        {isEn ? "Key Objectives:" : "Objectifs :"}
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {projet.objectifs.map((obj, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-accent font-bold">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t bg-accent/5 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <p className="text-[11px] font-semibold text-foreground mb-0.5">
                      {isEn ? "Expected Impact:" : "Impact attendu :"}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {projet.impact}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MissionsCdeco;
