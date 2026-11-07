/**
 * =============================================================================
 * PRESENTATION.TSX - Page de présentation de la CDECO
 * =============================================================================
 * 
 * Cette page présente l'histoire, la vision et les objectifs de la CDECO.
 * Elle décrit l'installation officielle de l'organisation en République du Congo
 * sous le leadership de M. Arnold Wesley AKINA.
 * 
 * ROUTE : /cdeco/presentation
 */

import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/ui/section-header";
import { Shield, Target, Award, Globe, Building2, Handshake } from "lucide-react";
import { useTranslation } from "react-i18next";
import { 
  FadeInUp, 
  FadeInDown, 
  FadeInLeft, 
  FadeInRight, 
  StaggerContainer, 
  StaggerItem,
  HoverCard,
  PulseIcon 
} from "@/components/animations/MotionWrapper";

const Presentation = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEOHead
        title="Présentation | CDECO"
        description="Découvrez la Chambre de Diplomatie Économique du Congo, son histoire, sa vision et ses objectifs pour le développement économique du Congo."
        keywords="CDECO, présentation, diplomatie économique, Congo, Arnold Wesley AKINA"
        canonicalUrl="/cdeco/presentation"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" aria-hidden="true" />
        <div className="container-cdeco relative z-10 text-center">
          <FadeInDown delay={0}>
            <SectionHeader label={t("about.historyBadge", "Notre Histoire")} variant="light" />
          </FadeInDown>
          <FadeInDown delay={0.1}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("nav.presentation", "Présentation de la CDECO")}
            </h1>
          </FadeInDown>
          <FadeInUp delay={0.2}>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {t("about.description", "Une institution stratégique au service du développement économique du Congo")}
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-cdeco">
          <div className="max-w-4xl mx-auto">
            {/* Introduction - Staggered paragraphs */}
            <StaggerContainer staggerDelay={0.15} className="prose prose-lg max-w-none text-muted-foreground mb-12">
              <StaggerItem>
                <p className="text-lg leading-relaxed">
                  Sous l'impulsion du leadership transformationnel et stratégique de <strong className="text-foreground">M. Arnold Wesley AKINA</strong>, 
                  la Chambre de Diplomatie Économique du Congo (CDECO) s'installe officiellement en République du Congo. 
                  Cette étape fondatrice incarne une vision éclairée : bâtir des ponts durables en faveur d'une Afrique 
                  connectée, économiquement influente et commercialement active sur la scène internationale.
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="leading-relaxed">
                  Porteur d'une vision ambitieuse pour un développement économique plus dynamique et un écosystème 
                  entrepreneurial inclusif, M. AKINA positionne la CDECO comme un catalyseur stratégique de coopération 
                  intelligente, d'innovation économique et de diplomatie proactive. L'institution est la réponse qui 
                  converge de façon diplomatique et économique avec les États, les investisseurs internationaux, 
                  les communautés économiques et les acteurs du changement.
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="leading-relaxed">
                  À travers cette mission, la CDECO affirme sa volonté de faire émerger une diplomatie économique solide, 
                  inclusive et ancrée dans les réalités africaines contemporaines.
                </p>
              </StaggerItem>
            </StaggerContainer>

            {/* National & International Scope - Fade in from sides */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <FadeInLeft delay={0.1}>
                <HoverCard className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-colors h-full">
                  <PulseIcon className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground mb-6">
                    <Building2 className="w-7 h-7" />
                  </PulseIcon>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {t("president.nationalTitle", "Sur le plan national")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("president.nationalText", "S'engage à promouvoir les relations économiques et commerciales de la République du Congo, à valoriser ses ressources, à soutenir son potentiel entrepreneurial, et à mobiliser les forces vives.")}
                  </p>
                </HoverCard>
              </FadeInLeft>

              <FadeInRight delay={0.2}>
                <HoverCard className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-colors h-full">
                  <PulseIcon className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-accent-foreground mb-6">
                    <Globe className="w-7 h-7" />
                  </PulseIcon>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {t("president.intlTitle", "Sur le plan international")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("president.intlText", "La CDECO ambitionne de devenir une interface stratégique de haut niveau, facilitant les échanges économiques entre le Congo, les États africains et les partenaires mondiaux.")}
                  </p>
                </HoverCard>
              </FadeInRight>
            </div>

            {/* Call to Action */}
            <FadeInUp delay={0.1}>
              <div className="bg-muted/50 rounded-2xl p-8 mb-16">
                <div className="flex items-start gap-4 mb-6">
                  <PulseIcon className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-6 h-6 text-primary" />
                  </PulseIcon>
                  <p className="text-muted-foreground leading-relaxed">
                    À travers cette installation, la CDECO invite solennellement les gouvernements africains, 
                    les acteurs économiques, ainsi que les institutions régionales et internationales à s'unir 
                    à ses côtés afin de promouvoir une innovation continue dans les domaines économique, 
                    diplomatique et commercial.
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Values */}
            <div className="mb-16">
              <FadeInUp>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  Nos Valeurs Fondamentales
                </h2>
              </FadeInUp>
              
              <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-3 gap-6">
                <StaggerItem>
                  <HoverCard className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-accent/50 transition-colors group h-full">
                    <PulseIcon className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Shield className="w-8 h-8 text-accent" />
                    </PulseIcon>
                    <h3 className="font-heading font-bold text-foreground mb-2">L'intégrité</h3>
                    <p className="text-muted-foreground text-sm">
                      En agissant avec éthique, responsabilité et transparence
                    </p>
                  </HoverCard>
                </StaggerItem>

                <StaggerItem>
                  <HoverCard className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-accent/50 transition-colors group h-full">
                    <PulseIcon className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Target className="w-8 h-8 text-accent" />
                    </PulseIcon>
                    <h3 className="font-heading font-bold text-foreground mb-2">Le leadership</h3>
                    <p className="text-muted-foreground text-sm">
                      En anticipant les enjeux et en proposant des solutions intelligentes
                    </p>
                  </HoverCard>
                </StaggerItem>

                <StaggerItem>
                  <HoverCard className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-accent/50 transition-colors group h-full">
                    <PulseIcon className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Award className="w-8 h-8 text-accent" />
                    </PulseIcon>
                    <h3 className="font-heading font-bold text-foreground mb-2">L'excellence</h3>
                    <p className="text-muted-foreground text-sm">
                      Dans la recherche constante de qualité et d'impact
                    </p>
                  </HoverCard>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Quote */}
            <FadeInUp delay={0.1}>
              <blockquote className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl border border-accent/20">
                <p className="text-xl font-medium text-foreground italic text-center mb-4">
                  "Ensemble, nous avons l'opportunité de bâtir une Afrique plus unie, plus influente et tournée vers l'avenir."
                </p>
              </blockquote>
            </FadeInUp>

            {/* About CDECO */}
            <FadeInUp delay={0.15}>
              <div className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Qui sommes-nous ?
                </h2>
                <StaggerContainer staggerDelay={0.12} className="space-y-4 text-muted-foreground leading-relaxed">
                  <StaggerItem>
                    <p>
                      La Chambre de Diplomatie Économique du Congo (CDECO) est une association à vocation stratégique, 
                      dédiée à la promotion des intérêts économiques et commerciaux de la République du Congo sur la 
                      scène internationale. Elle œuvre à travers la facilitation des investissements, le renforcement 
                      des échanges commerciaux, l'accompagnement des opérateurs et le développement de la coopération 
                      technique dans l'espace économique régional et mondial.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
                      Dans un contexte où les relations économiques et commerciales sont étroitement liées aux enjeux 
                      diplomatiques, la République du Congo affirme sa place sur l'échiquier international grâce à une 
                      diplomatie proactive, innovante et inclusive. La CDECO se positionne comme un levier stratégique 
                      majeur pour attirer les investisseurs étrangers, jouer le rôle de pont économique entre les 
                      institutions, et surtout, créer une synergie durable entre les secteurs public, privé ainsi que 
                      la diaspora africaine.
                    </p>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Presentation;
