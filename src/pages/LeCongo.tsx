import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/ui/section-header";
import { MapPin, Users, Globe, Handshake, Landmark } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations/variants";
import CongoMap from "@/components/congo/CongoMap";
import { InfrastructureSection, EconomySection } from "@/components/congo/CongoInfrastructures";
import { InvestorEnvironmentSection, WhyInvestSection } from "@/components/congo/CongoInvestmentReasons";
import congoFlag from "@/assets/congo-flag.webp";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const tween = gsap.to(image, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${congoFlag})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />
      <div className="container-cdeco relative z-10 text-center py-20 px-4">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp}>
            <SectionHeader label={t("congo.badge", "Destination Congo")} variant="light" />
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            {isEn ? "Congo-Brazzaville" : "Le Congo-Brazzaville"}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-accent font-medium mb-4">
            {t("congo.subtitle", "Un carrefour stratégique et une terre d'opportunités au cœur de l'Afrique")}
          </motion.p>
          <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">
            {t("congo.description", "Découvrez un pays en pleine mutation économique, doté d'infrastructures modernes et d'un potentiel humain exceptionnel.")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const StrategicPositionSection = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const stats = [
    { icon: MapPin, label: isEn ? "Central Africa" : "Afrique Centrale", value: isEn ? "Strategic Hub" : "Position stratégique" },
    { icon: Users, label: isEn ? "Demographics" : "Population", value: isEn ? "Young & Dynamic" : "Jeune & dynamique" },
    { icon: Globe, label: isEn ? "Markets" : "Marchés", value: isEn ? "Regional Gateway" : "Accès régional" },
    { icon: Handshake, label: isEn ? "Partnerships" : "Partenariats", value: isEn ? "Global & Bilateral" : "Internationaux" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-cdeco px-4">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <SectionHeader label={isEn ? "Geography" : "Géographie"} />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              {t("congo.geographyTitle", "Une position géographique privilégiée")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t("congo.geographyText", "Située au cœur du bassin du Congo, la République du Congo bénéficie d'un positionnement géographique exceptionnel qui en fait un carrefour naturel pour le commerce en Afrique centrale.")}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
                <Landmark className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">{t("congo.memberCemac", "Membre CEMAC")}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
                <Landmark className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">{t("congo.memberCeeac", "Membre CEEAC")}</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-8 border border-border">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-background rounded-2xl shadow-sm">
                    <item.icon className="h-10 w-10 text-accent mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const PopulationSection = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container-cdeco px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-4xl mx-auto">
          <SectionHeader label={isEn ? "Human Capital" : "Capital Humain"} />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            {isEn ? "A Young Population & Exceptional Human Potential" : "Une population jeune et un potentiel humain exceptionnel"}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {isEn ? (
              <>
                Boasting a vibrant and predominantly young population, Congo possesses a <strong className="text-primary">qualified, energetic workforce</strong>, bolstered by one of Central Africa's highest literacy rates.
              </>
            ) : (
              <>
                Avec une population dynamique et majoritairement jeune, le Congo possède un potentiel de{" "}
                <strong className="text-primary">main-d'œuvre qualifiée et motivée</strong>, soutenu par un taux d'alphabétisation supérieur à la moyenne régionale.
              </>
            )}
          </p>
          <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-2xl p-8 border border-accent/30">
            <Users className="h-12 w-12 text-accent mx-auto mb-4" />
            <p className="text-lg text-foreground font-medium">
              {isEn
                ? "This rising youth demographic powers domestic consumer markets and acts as a dynamic catalyst for tech entrepreneurship and innovation."
                : "Cette jeunesse constitue une force de croissance pour le marché local et les secteurs innovants et entrepreneuriaux."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ConclusionSection = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <section className="py-20 bg-primary">
      <div className="container-cdeco px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
          {isEn ? "In Summary" : "En résumé"}
        </h2>
        <p className="text-xl text-white/90 leading-relaxed">
          {isEn ? (
            <>
              The Republic of Congo is far more than a transit corridor: it is a{" "}
              <strong>dynamic, strategic investment destination</strong>, fully prepared to welcome global investors.
            </>
          ) : (
            <>
              La République du Congo est bien plus qu'un pays de transit : c'est une{" "}
              <strong>destination d'investissement stratégique et dynamique</strong>, prête à accueillir les acteurs économiques mondiaux.
            </>
          )}
        </p>
      </div>
    </section>
  );
};

const LeCongo = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <Layout>
      <SEOHead
        title={isEn ? "Congo-Brazzaville | Invest in the Heart of Africa - CDECO" : "Le Congo-Brazzaville | Investir au Cœur de l'Afrique - CDECO"}
        description={
          isEn
            ? "Discover Congo-Brazzaville: strategic geography, modern ports and infrastructure, and high economic growth potential."
            : "Découvrez le Congo-Brazzaville : position stratégique, infrastructures modernes, économie en transformation. Une destination d'investissement dynamique."
        }
        keywords="Congo-Brazzaville, investissement Afrique, CEMAC, Pointe-Noire, économie Congo, opportunités Afrique centrale"
        canonicalUrl="/le-congo"
      />

      <HeroSection />
      <StrategicPositionSection />
      <CongoMap />
      <PopulationSection />
      <InfrastructureSection />
      <EconomySection />
      <InvestorEnvironmentSection />
      <WhyInvestSection />
      <ConclusionSection />
    </Layout>
  );
};

export default LeCongo;
