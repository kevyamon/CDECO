/**
 * =============================================================================
 * MISSIONS-CDECO.TSX - Missions et Activités de la CDECO
 * =============================================================================
 * 
 * Cette page détaille les 6 axes prioritaires et les projets phares de la CDECO
 * pour promouvoir la diplomatie économique du Congo.
 * 
 * ROUTE : /cdeco/missions
 */

import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/ui/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Globe, GraduationCap, Handshake, Building2, Users, Briefcase, Rocket, Network, BarChart3, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Configuration des 6 axes prioritaires de la CDECO
 * Chaque axe contient un titre, une description et une liste d'activités détaillées
 */
const axes = [
  {
    id: "forums",
    icon: Globe,
    title: "Forums Économiques Internationaux",
    description: "Organisation et participation aux forums économiques majeurs pour positionner le Congo sur la scène internationale.",
    details: [
      "Organisation de forums thématiques sectoriels (hydrocarbures, mines, agriculture)",
      "Participation aux grandes conférences économiques africaines et mondiales",
      "Facilitation de rencontres B2B entre investisseurs et entrepreneurs congolais",
      "Promotion des opportunités d'investissement au Congo",
      "Création de plateformes d'échange entre acteurs économiques"
    ]
  },
  {
    id: "capacites",
    icon: GraduationCap,
    title: "Renforcement des Capacités",
    description: "Programmes de formation et d'accompagnement pour développer les compétences des acteurs économiques.",
    details: [
      "Formations en leadership et management pour dirigeants",
      "Ateliers sur les normes internationales et certifications",
      "Programmes de mentorat pour jeunes entrepreneurs",
      "Séminaires sur l'accès aux financements internationaux",
      "Formations en négociation commerciale internationale"
    ]
  },
  {
    id: "dialogue",
    icon: Handshake,
    title: "Dialogue Public-Privé",
    description: "Facilitation du dialogue entre le secteur public et privé pour un environnement des affaires favorable.",
    details: [
      "Organisation de tables rondes entre gouvernement et secteur privé",
      "Plaidoyer pour l'amélioration du climat des affaires",
      "Contribution à l'élaboration de politiques économiques",
      "Médiation dans les relations entreprises-administration",
      "Suivi des réformes du cadre réglementaire"
    ]
  },
  {
    id: "promotion",
    icon: Building2,
    title: "Promotion Sectorielle",
    description: "Valorisation des secteurs économiques clés du Congo auprès des investisseurs nationaux et internationaux.",
    details: [
      "Études sectorielles et analyses de marché",
      "Organisation de missions économiques à l'étranger",
      "Accueil de délégations d'investisseurs au Congo",
      "Production de supports promotionnels sectoriels",
      "Participation aux salons et foires internationaux"
    ]
  },
  {
    id: "partenariats",
    icon: Users,
    title: "Partenariats Stratégiques",
    description: "Développement de partenariats avec les organisations économiques régionales et internationales.",
    details: [
      "Accords de coopération avec les chambres de commerce africaines",
      "Partenariats avec les organisations économiques internationales",
      "Collaborations avec les ambassades et consulats",
      "Relations avec les institutions financières internationales",
      "Réseautage avec les diasporas économiques"
    ]
  },
  {
    id: "academique",
    icon: Briefcase,
    title: "Accompagnement Académique",
    description: "Passerelles entre le monde académique et le tissu économique pour une meilleure insertion professionnelle.",
    details: [
      "Partenariats avec les universités et grandes écoles",
      "Programmes de stages en entreprise",
      "Bourses d'excellence pour étudiants méritants",
      "Conférences et interventions dans les établissements",
      "Accompagnement à l'entrepreneuriat étudiant"
    ]
  }
];

/**
 * Configuration des projets phares de la CDECO
 * Programmes innovants pour transformer l'écosystème économique congolais
 */
const projets = [
  {
    id: "kampus",
    icon: Rocket,
    title: "KAMPUS-CDECO",
    status: "En cours",
    statusColor: "bg-cdeco-green",
    description: "Programme phare de formation et d'incubation pour les jeunes entrepreneurs congolais.",
    objectifs: [
      "Former 500 jeunes entrepreneurs par an",
      "Incuber 50 startups prometteuses",
      "Créer un réseau d'alumni entrepreneurs",
      "Accompagner jusqu'à la levée de fonds"
    ],
    impact: "Création d'emplois et dynamisation de l'écosystème entrepreneurial congolais."
  },
  {
    id: "diaspora",
    icon: Network,
    title: "Diaspora Connect",
    status: "Lancement 2025",
    statusColor: "bg-primary",
    description: "Plateforme de connexion entre la diaspora congolaise et les opportunités économiques nationales.",
    objectifs: [
      "Mobiliser les compétences de la diaspora",
      "Faciliter les investissements diasporiques",
      "Créer un annuaire des talents congolais à l'étranger",
      "Organiser des forums diaspora-Congo"
    ],
    impact: "Transfert de compétences et augmentation des investissements diasporiques."
  },
  {
    id: "observatoire",
    icon: BarChart3,
    title: "Observatoire du Climat des Affaires",
    status: "En développement",
    statusColor: "bg-accent",
    description: "Outil de suivi et d'analyse du climat des affaires au Congo pour orienter les décisions.",
    objectifs: [
      "Produire des rapports trimestriels",
      "Créer des indicateurs de suivi",
      "Formuler des recommandations aux décideurs",
      "Benchmarker avec les pays de la sous-région"
    ],
    impact: "Amélioration continue de l'environnement des affaires basée sur des données fiables."
  }
];

const MissionsCdeco = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEOHead
        title="Missions & Activités | CDECO"
        description="Découvrez les 6 axes prioritaires de la CDECO : forums économiques, renforcement des capacités, partenariats diplomatiques et plus encore."
        keywords="missions CDECO, activités, forums économiques, partenariats, Congo"
        canonicalUrl="/cdeco/missions"
      />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container-cdeco text-center relative z-10 px-4 sm:px-6">
          <SectionHeader label={t("missions.badge", "Nos engagements")} variant="light" />
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t("missions.title", "Missions & Activités")}
          </h1>
          <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t("missions.description", "Six axes prioritaires pour promouvoir la diplomatie économique et renforcer le positionnement du Congo sur la scène internationale.")}
          </p>
        </div>
      </section>

      {/* Axes Prioritaires */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <SectionHeader label={t("missions.axesBadge", "Stratégie")} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("missions.axesTitle", "Nos 6 Axes Prioritaires")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {t("missions.axesDescription", "Des domaines d'intervention stratégiques pour un impact économique durable.")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {axes.map((axe, index) => (
              <div 
                key={axe.id} 
                className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value={axe.id} className="border-0">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <axe.icon className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-destructive mb-1 block uppercase tracking-wide">
                            Axe {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-heading text-base sm:text-lg font-bold text-foreground">
                            {axe.title}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-2 pl-0 md:pl-[4.5rem]">
                        <p className="text-muted-foreground mb-4">{axe.description}</p>
                        <ul className="space-y-3">
                          {axe.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3 text-foreground text-sm sm:text-base">
                              <CheckCircle className="w-5 h-5 text-cdeco-green shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projets Phares */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <SectionHeader label="Initiatives structurantes" />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Projets <span className="text-primary">Phares</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Des programmes innovants pour transformer l'écosystème économique congolais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projets.map((projet) => (
              <div 
                key={projet.id} 
                className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <projet.icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                    {projet.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base mb-6">
                    {projet.description}
                  </p>

                  {/* Objectifs */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3 text-sm">{t("missions.objectives", "Objectifs :")}</h4>
                    <ul className="space-y-2">
                      {projet.objectifs.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-destructive">{i + 1}</span>
                          </div>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                    <h4 className="font-semibold text-foreground mb-1 text-sm">{t("missions.expectedImpact", "Impact attendu")}</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">{projet.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-destructive rounded-full blur-3xl" />
        </div>

        <div className="container-cdeco relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Notre Vision Stratégique
            </h2>
            <p className="text-primary-foreground/90 text-base sm:text-lg leading-relaxed mb-8">
              Positionner la République du Congo comme un <strong className="text-accent">Hub stratégique d'attractivité économique</strong> en Afrique 
              et à l'international. Nous aspirons à bâtir un écosystème diplomatique et inclusif, en favorisant l'intégration 
              des acteurs congolais dans les grandes chaînes de valeur régionales et mondiales.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-heading font-bold text-lg mb-2 text-accent">Attirer</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Sécuriser les investissements directs étrangers pour un développement durable et partagé.
                </p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-heading font-bold text-lg mb-2 text-accent">Connecter</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Créer des synergies économiques durables entre entreprises locales, diaspora et partenaires internationaux.
                </p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-heading font-bold text-lg mb-2 text-accent">Renforcer</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Bâtir un avenir économique africain solidaire et prospère à travers les liens francophones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MissionsCdeco;
