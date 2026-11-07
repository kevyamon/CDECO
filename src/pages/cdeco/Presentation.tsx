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
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <Layout>
      <SEOHead
        title={isEn ? "About CDECO | Corporate Presentation" : "Présentation | CDECO"}
        description={
          isEn
            ? "Discover the Chamber of Economic Diplomacy of Congo, its vision, history, and strategic initiatives under the leadership of Mr. Arnold Wesley AKINA."
            : "Découvrez la Chambre de Diplomatie Économique du Congo, son histoire, sa vision et ses objectifs pour le développement économique du Congo."
        }
        keywords="CDECO, présentation, diplomatie économique, Congo, Arnold Wesley AKINA"
        canonicalUrl="/cdeco/presentation"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" aria-hidden="true" />
        <div className="container-cdeco relative z-10 text-center">
          <FadeInDown delay={0}>
            <SectionHeader label={isEn ? "Our History" : "Notre Histoire"} variant="light" />
          </FadeInDown>
          <FadeInDown delay={0.1}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {isEn ? "Presentation of CDECO" : "Présentation de la CDECO"}
            </h1>
          </FadeInDown>
          <FadeInUp delay={0.2}>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {isEn
                ? "A premier strategic institution devoted to Congo's economic diplomacy and international partnerships."
                : "Une institution stratégique au service du développement économique du Congo"}
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-cdeco">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <StaggerContainer staggerDelay={0.15} className="prose prose-lg max-w-none text-muted-foreground mb-12">
              <StaggerItem>
                <p className="text-lg leading-relaxed">
                  {isEn ? (
                    <>
                      Under the transformational leadership of <strong className="text-foreground">Mr. Arnold Wesley AKINA</strong>, the Chamber of Economic Diplomacy of Congo (CDECO) has officially established its national headquarters in the Republic of Congo. This foundational milestone embodies an enlightened vision: building enduring bridges for a connected, economically influential, and globally active Africa.
                    </>
                  ) : (
                    <>
                      Sous l'impulsion du leadership transformationnel et stratégique de <strong className="text-foreground">M. Arnold Wesley AKINA</strong>, la Chambre de Diplomatie Économique du Congo (CDECO) s'installe officiellement en République du Congo. Cette étape fondatrice incarne une vision éclairée : bâtir des ponts durables en faveur d'une Afrique connectée, économiquement influente et commercialement active sur la scène internationale.
                    </>
                  )}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="leading-relaxed">
                  {isEn
                    ? "Championing an ambitious roadmap for sustainable economic expansion and an inclusive entrepreneurial ecosystem, Mr. AKINA positions CDECO as a high-level catalyst for intelligent cooperation, cross-border innovation, and proactive diplomacy, interfacing dynamically with sovereign states, foreign investors, and economic changemakers."
                    : "Porteur d'une vision ambitieuse pour un développement économique plus dynamique et un écosystème entrepreneurial inclusif, M. AKINA positionne la CDECO comme un catalyseur stratégique de coopération intelligente, d'innovation économique et de diplomatie proactive. L'institution est la réponse qui converge de façon diplomatique et économique avec les États, les investisseurs internationaux, les communautés économiques et les acteurs du changement."}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="leading-relaxed">
                  {isEn
                    ? "Through this mission, CDECO asserts its commitment to advancing a robust, inclusive economic diplomacy rooted in contemporary African realities."
                    : "À travers cette mission, la CDECO affirme sa volonté de faire émerger une diplomatie économique solide, inclusive et ancrée dans les réalités africaines contemporaines."}
                </p>
              </StaggerItem>
            </StaggerContainer>

            {/* National & International Scope */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <FadeInLeft delay={0.1}>
                <HoverCard className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-colors h-full">
                  <PulseIcon className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground mb-6">
                    <Building2 className="w-7 h-7" />
                  </PulseIcon>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {isEn ? "On the National Level" : "Sur le plan national"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn
                      ? "Committed to expanding commercial ties within the Republic of Congo, highlighting national resources, supporting entrepreneurial talent, and rallying key actors around job creation and diversification."
                      : "S'engage à promouvoir les relations économiques et commerciales de la République du Congo, à valoriser ses ressources, à soutenir son potentiel entrepreneurial, et à mobiliser les forces vives."}
                  </p>
                </HoverCard>
              </FadeInLeft>

              <FadeInRight delay={0.2}>
                <HoverCard className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-colors h-full">
                  <PulseIcon className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-accent-foreground mb-6">
                    <Globe className="w-7 h-7" />
                  </PulseIcon>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {isEn ? "On the International Stage" : "Sur le plan international"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn
                      ? "CDECO aims to serve as a top-tier strategic interface, facilitating foreign direct investment flows between Congo, fellow African states, and worldwide commercial partners."
                      : "La CDECO ambitionne de devenir une interface stratégique de haut niveau, facilitant les échanges économiques entre le Congo, les États africains et les partenaires mondiaux."}
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
                    {isEn
                      ? "Through this institutional installation, CDECO solemnly invites African governments, business leaders, and regional and international organizations to join forces to promote continuous innovation across economic, diplomatic, and trade landscapes."
                      : "À travers cette installation, la CDECO invite solennellement les gouvernements africains, les acteurs économiques, ainsi que les institutions régionales et internationales à s'unir à ses côtés afin de promouvoir une innovation continue dans les domaines économique, diplomatique et commercial."}
                  </p>
                </div>
              </div>
            </FadeInUp>

            {/* Values */}
            <div className="mb-16">
              <FadeInUp>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  {isEn ? "Our Foundational Values" : "Nos Valeurs Fondamentales"}
                </h2>
              </FadeInUp>
              
              <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-3 gap-6">
                <StaggerItem>
                  <HoverCard className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-accent/50 transition-colors group h-full">
                    <PulseIcon className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Shield className="w-8 h-8 text-accent" />
                    </PulseIcon>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      {isEn ? "Integrity" : "L'intégrité"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {isEn ? "Acting with ethical rigor, accountability, and total transparency" : "En agissant avec éthique, responsabilité et transparence"}
                    </p>
                  </HoverCard>
                </StaggerItem>

                <StaggerItem>
                  <HoverCard className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-accent/50 transition-colors group h-full">
                    <PulseIcon className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Target className="w-8 h-8 text-accent" />
                    </PulseIcon>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      {isEn ? "Leadership" : "Le leadership"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {isEn ? "Anticipating trends and proposing high-impact solutions" : "En anticipant les enjeux et en proposant des solutions intelligentes"}
                    </p>
                  </HoverCard>
                </StaggerItem>

                <StaggerItem>
                  <HoverCard className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-accent/50 transition-colors group h-full">
                    <PulseIcon className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Award className="w-8 h-8 text-accent" />
                    </PulseIcon>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      {isEn ? "Excellence" : "L'excellence"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {isEn ? "In the continuous pursuit of top quality and measurable results" : "Dans la recherche constante de qualité et d'impact"}
                    </p>
                  </HoverCard>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Quote */}
            <FadeInUp delay={0.1}>
              <blockquote className="p-8 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl border border-accent/20">
                <p className="text-xl font-medium text-foreground italic text-center mb-4">
                  {isEn
                    ? '"Together, we have the opportunity to build a more united, influential, and forward-looking Africa."'
                    : '"Ensemble, nous avons l\'opportunité de bâtir une Afrique plus unie, plus influente et tournée vers l\'avenir."'}
                </p>
              </blockquote>
            </FadeInUp>

            {/* About CDECO */}
            <FadeInUp delay={0.15}>
              <div className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  {isEn ? "Who We Are" : "Qui sommes-nous ?"}
                </h2>
                <StaggerContainer staggerDelay={0.12} className="space-y-4 text-muted-foreground leading-relaxed">
                  <StaggerItem>
                    <p>
                      {isEn
                        ? "The Chamber of Economic Diplomacy of Congo (CDECO) is a high-level strategic organization dedicated to promoting the economic, commercial, and diplomatic interests of the Republic of Congo on the global stage. It facilitates foreign direct investment, fosters bilateral trade, supports local businesses, and promotes technical cooperation within regional and global markets."
                        : "La Chambre de Diplomatie Économique du Congo (CDECO) est une association à vocation stratégique, dédiée à la promotion des intérêts économiques et commerciaux de la République du Congo sur la scène internationale. Elle œuvre à travers la facilitation des investissements, le renforcement des échanges commerciaux, l'accompagnement des opérateurs et le développement de la coopération technique dans l'espace économique régional et mondial."}
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
                      {isEn
                        ? "In an era where economic relations are inextricably linked to diplomatic agility, the Republic of Congo asserts its position through proactive, innovative, and inclusive leadership. CDECO acts as a cornerstone bridge connecting public institutions, international private capital, and the vibrant African diaspora."
                        : "Dans un contexte où les relations économiques et commerciales sont étroitement liées aux enjeux diplomatiques, la République du Congo affirme sa place sur l'échiquier international grâce à une diplomatie proactive, innovante et inclusive. La CDECO se positionne comme un levier stratégique majeur pour attirer les investisseurs étrangers, jouer le rôle de pont économique entre les institutions, et surtout, créer une synergie durable entre les secteurs public, privé ainsi que la diaspora africaine."}
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
