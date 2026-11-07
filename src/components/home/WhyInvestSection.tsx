/**
 * =============================================================================
 * WHY INVEST SECTION - Raisons d'investir au Congo
 * =============================================================================
 * 
 * Section présentant les avantages d'investir au Congo.
 * Utilise Framer Motion pour des animations d'entrée fluides.
 */

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/section-header";
import { Globe, Briefcase, CheckCircle, ArrowRight, BarChart3, Users, Factory, Lightbulb, LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem, scaleIn, fadeInLeft, fadeInRight } from "@/animations/variants";
import { useTranslation } from "react-i18next";

interface ReasonItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const WhyInvestSection = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const investmentReasons: ReasonItem[] = [
    {
      icon: BarChart3,
      title: t("whyInvest.r1Title", "Stabilité Macroéconomique"),
      description: t("whyInvest.r1Desc", "Un cadre économique en amélioration continue avec des réformes structurelles pour l'attractivité des IDE.")
    },
    {
      icon: Globe,
      title: t("whyInvest.r2Title", "Position Géostratégique"),
      description: t("whyInvest.r2Desc", "Au cœur de l'Afrique centrale, accès privilégié au bassin du Congo et aux marchés régionaux de la CEMAC.")
    },
    {
      icon: Factory,
      title: t("whyInvest.r3Title", "Ressources Naturelles"),
      description: t("whyInvest.r3Desc", "Potentiel immense : hydrocarbures, mines, forêts couvrant 70% du territoire, et terres agricoles fertiles.")
    },
    {
      icon: Lightbulb,
      title: t("whyInvest.r4Title", "Diversification en Cours"),
      description: t("whyInvest.r4Desc", "Transition vers l'agriculture, le numérique, l'énergie verte et les industries de transformation.")
    },
    {
      icon: Users,
      title: t("whyInvest.r5Title", "Capital Humain"),
      description: t("whyInvest.r5Desc", "Une jeunesse dynamique et une diaspora qualifiée, prête à contribuer au développement national.")
    },
    {
      icon: Briefcase,
      title: t("whyInvest.r6Title", "Accompagnement CDECO"),
      description: t("whyInvest.r6Desc", "Un réseau d'excellence pour faciliter vos investissements et vos partenariats stratégiques.")
    }
  ];

  const keyStats = [
    {
      label: t("whyInvest.statGdp", "du PIB"),
      value: "42%",
      detail: t("whyInvest.statHydroLabel", "Hydrocarbures")
    },
    {
      label: t("whyInvest.statGdp", "du PIB"),
      value: "33%",
      detail: t("whyInvest.statServicesLabel", "Services")
    },
    {
      label: t("whyInvest.statTerritory", "du territoire"),
      value: "70%",
      detail: t("whyInvest.statForestLabel", "Forêts")
    },
    {
      label: t("whyInvest.statGdp", "exportations"),
      value: "80%",
      detail: t("whyInvest.statHydroLabel", "Pétrole")
    }
  ];

  // Simple wrapper for reduced motion
  const MotionDiv = shouldReduceMotion ? 'div' : motion.div;
  return <section className="py-16 md:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 hidden md:block">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-40 w-48 h-48 bg-destructive rounded-full blur-3xl" />
      </div>

      <div className="container-cdeco relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div className="text-center max-w-4xl mx-auto mb-12 md:mb-16" variants={fadeInUp} initial={shouldReduceMotion ? undefined : "hidden"} whileInView={shouldReduceMotion ? undefined : "visible"} viewport={{
        once: true,
        margin: "-50px"
      }}>
          <SectionHeader label={t("whyInvest.badge", "Investir au Congo")} />
          
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
            {t("whyInvest.title", "Pourquoi Investir au Congo")}
          </h2>
          
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            {t("whyInvest.description", "Véritable moteur d'une croissance inclusive, durable et créatrice d'emplois, le Congo offre un potentiel considérable pour les investisseurs dans des secteurs stratégiques.")}
          </p>
        </motion.div>

        {/* Key Stats */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16" variants={staggerContainer} initial={shouldReduceMotion ? undefined : "hidden"} whileInView={shouldReduceMotion ? undefined : "visible"} viewport={{
        once: true,
        margin: "-50px"
      }}>
          {keyStats.map((stat, index) => <motion.div key={index} className="bg-card border border-border rounded-xl p-4 md:p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" variants={staggerItem} whileHover={shouldReduceMotion ? undefined : {
          scale: 1.02
        }}>
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-sm font-medium text-foreground mt-1">{stat.detail}</div>
            </motion.div>)}
        </motion.div>

        {/* Investment Reasons - Clean Paragraphs */}
        <motion.div className="max-w-4xl mx-auto mb-12 md:mb-16 space-y-6 md:space-y-8" variants={staggerContainer} initial={shouldReduceMotion ? undefined : "hidden"} whileInView={shouldReduceMotion ? undefined : "visible"} viewport={{
        once: true,
        margin: "-50px"
      }}>
          {investmentReasons.map((reason, index) => <motion.div key={index} className="flex items-start gap-4 md:gap-6 group" variants={staggerItem}>
              <motion.div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 transition-colors duration-300 group-hover:bg-primary/20" whileHover={shouldReduceMotion ? undefined : {
            scale: 1.1,
            rotate: 5
          }} transition={{
            duration: 0.2
          }}>
                <reason.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-heading text-base md:text-lg font-semibold text-foreground mb-1">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>)}
        </motion.div>

        {/* Bottom Info Block */}
        <motion.div className="bg-primary rounded-2xl p-6 md:p-10 text-primary-foreground" variants={scaleIn} initial={shouldReduceMotion ? undefined : "hidden"} whileInView={shouldReduceMotion ? undefined : "visible"} viewport={{
        once: true,
        margin: "-50px"
      }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeInLeft} initial={shouldReduceMotion ? undefined : "hidden"} whileInView={shouldReduceMotion ? undefined : "visible"} viewport={{
            once: true
          }}>
              <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">
                {t("whyInvest.partnerCardTitle", "La CDECO, votre partenaire stratégique")}
              </h3>
              <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed mb-6">
                {t("whyInvest.partnerCardDesc", "Nous œuvrons à attirer et sécuriser les investissements directs étrangers pour un développement durable et partagé. À travers des ressources ciblées, des programmes d'accompagnement adaptés et un réseau dynamique, nous garantissons aux PME, PMI et Start-ups leur développement et intégration aux marchés locaux et régionaux.")}
              </p>
              
            </motion.div>
            <motion.div className="space-y-3" variants={staggerContainer} initial={shouldReduceMotion ? undefined : "hidden"} whileInView={shouldReduceMotion ? undefined : "visible"} viewport={{
            once: true
          }}>
              {[
                t("whyInvest.partnerPoint1", "Facilitation des échanges économiques et commerciaux"),
                t("whyInvest.partnerPoint2", "Soutien aux PME/PMI pour leur croissance durable"),
                t("whyInvest.partnerPoint3", "Amélioration du climat des affaires"),
                t("whyInvest.partnerPoint4", "Organisation d'événements économiques B2B/B2C/B2G")
              ].map((item, i) => <motion.div key={i} className="flex items-start gap-3" variants={staggerItem}>
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-primary-foreground/90">{item}</span>
                </motion.div>)}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default WhyInvestSection;