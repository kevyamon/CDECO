import { Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "react-i18next";

// Images des membres du Bureau Exécutif
import presidentImg from "@/assets/members/president-new.jpg";
import vicePresidentImg from "@/assets/members/vice-president.jpg";
import vicePresidenteImg from "@/assets/members/vice-presidente.jpg";
import secretaireImg from "@/assets/members/secretaire-new.jpg";
import communicationImg from "@/assets/members/communication.jpg";
import tresoriereImg from "@/assets/members/tresoriere-new.jpg";
import directeurKampusImg from "@/assets/members/directeur-kampus.jpg";

// Images des membres du CCI
import cciNajibImg from "@/assets/members/cci-najib.jpg";
import cciDeveImg from "@/assets/members/cci-deve.jpg";
import cciArseneImg from "@/assets/members/cci-arsene.jpg";
import cciAminaImg from "@/assets/members/cci-amina.jpg";

/**
 * Membres du Bureau Exécutif National
 */
const bureauMembers = [
  {
    name: "Arnold Wesley AKINA",
    role: "Président",
    roleColor: "bg-accent text-white",
    description: "Visionnaire et leader engagé pour le développement économique du Congo.",
    image: presidentImg,
  },
  {
    name: "Igor Theogene NDINGA",
    role: "Vice-Président",
    roleColor: "bg-accent text-white",
    description: "Chargé du développement économique, des partenariats privés et des Investissements.",
    image: vicePresidentImg,
  },
  {
    name: "Rachel NGUILI AKANDA",
    role: "Vice-Présidente",
    roleColor: "bg-accent text-white",
    description: "Chargée de l'agriculture, l'industrie et le développement de partenariats avec les PME.",
    image: vicePresidenteImg,
  },
  {
    name: "Makoumbou Laurensaint",
    role: "Secrétaire Général",
    roleColor: "bg-green-600 text-white",
    description: "Coordination stratégique et gestion des opérations de la CDECO.",
    image: secretaireImg,
  },
  {
    name: "Grace BOUSSIMANITOU BENAZO",
    role: "Chargée de Communication",
    roleColor: "bg-primary/80 text-white",
    description: "Chargée de la communication et des relations avec les Médias.",
    image: communicationImg,
  },
  {
    name: "Dakar Boteba",
    role: "Trésorière",
    roleColor: "bg-primary/80 text-white",
    description: "Gestion financière rigoureuse et transparente de l'organisation.",
    image: tresoriereImg,
  },
  {
    name: "Steve Patrick MBOUKOU",
    role: "Directeur KAMPUS CDECO",
    roleColor: "bg-primary/80 text-white",
    description: "Chargé de l'entrepreneuriat des jeunes et Directeur du Centre KAMPUS CDECO.",
    image: directeurKampusImg,
  },
];

/**
 * Membres du Comité Consultatif International
 */
const cciMembers = [
  {
    name: "NAJIB BREDAA",
    role: "Directeur Relations Diplomatiques",
    roleColor: "bg-primary text-white",
    description: "Directeur des relations diplomatiques et bilatérales.",
    image: cciNajibImg,
  },
  {
    name: "Deve MABOUNGOU",
    role: "Directeur Intelligence Économique",
    roleColor: "bg-primary text-white",
    description: "Directeur de l'Intelligence Économique et des stratégies d'influence à l'international.",
    image: cciDeveImg,
  },
  {
    name: "Dr Arsène TATSAZEU-KENFACK",
    role: "Directeur Affaires Éducatives",
    roleColor: "bg-primary text-white",
    description: "Directeur des Affaires éducatives, scientifiques et Culturelles avec l'Amérique latine.",
    image: cciArseneImg,
  },
  {
    name: "Amina ONDZE",
    role: "Directrice Relations Institutionnelles",
    roleColor: "bg-primary text-white",
    description: "Directrice des relations institutionnelles à l'international.",
    image: cciAminaImg,
  },
];

/**
 * Composant carte membre réutilisable avec animation
 */
interface MemberCardProps {
  name: string;
  role: string;
  roleColor: string;
  description: string;
  image: string;
  variant?: "blue" | "white";
  index?: number;
}

const MemberCard = ({ name, role, roleColor, description, image, variant = "blue", index = 0 }: MemberCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.5, 
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    className={`rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02] ${
      variant === "blue"
        ? "bg-primary/20 border border-white/10"
        : "bg-card border border-border shadow-lg"
    }`}
  >
    <div className="flex justify-center mb-4">
      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-accent/30 shadow-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
    <h3 className={`font-heading font-bold text-lg mb-2 ${variant === "blue" ? "text-white" : "text-foreground"}`}>
      {name}
    </h3>
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${roleColor}`}>
      {role}
    </span>
    <p className={`text-sm leading-relaxed ${variant === "blue" ? "text-white/80" : "text-muted-foreground"}`}>
      {description}
    </p>
  </motion.div>
);

const Bureau = () => {
  const { t } = useTranslation();

  const localizedBureauMembers = [
    {
      ...bureauMembers[0],
      role: t("team.president", "Président Fondateur"),
      description: t("team.presidentDesc", "Visionnaire et leader engagé pour le développement économique du Congo."),
    },
    {
      ...bureauMembers[1],
      role: t("team.vicePresident", "Vice-Président"),
      description: t("team.vicePresidentDesc", "Chargé du développement économique, des partenariats privés et des Investissements."),
    },
    {
      ...bureauMembers[2],
      role: t("team.vicePresidente", "Vice-Présidente"),
      description: t("team.vicePresidenteDesc", "Chargée de l'agriculture, l'industrie et le développement de partenariats avec les PME."),
    },
    {
      ...bureauMembers[3],
      role: t("team.secretary", "Secrétaire Général"),
      description: t("team.secretaryDesc", "Coordination stratégique et gestion des opérations de la CDECO."),
    },
    {
      ...bureauMembers[4],
      role: t("team.communication", "Directrice de la Communication"),
      description: t("team.communicationDesc", "Relations médias, visibilité institutionnelle et rayonnement international."),
    },
    {
      ...bureauMembers[5],
      role: t("team.treasurer", "Trésorière"),
      description: t("team.treasurerDesc", "Gestion financière rigoureuse et transparente de l'organisation."),
    },
    {
      ...bureauMembers[6],
      role: t("team.directeurKampus", "Directeur KAMPUS CDECO"),
      description: t("team.directeurKampusDesc", "Orientation des jeunes, bourses d'études et programmes d'excellence académique."),
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="Bureau CDECO | Équipe dirigeante"
        description="Découvrez le Bureau Exécutif National et le Comité Consultatif International de la CDECO, une équipe de leaders visionnaires dédiés au développement économique du Congo."
      />

      {/* ========== SECTION BUREAU EXÉCUTIF NATIONAL ========== */}
      <section className="py-20 bg-primary">
        <div className="container-cdeco">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent/60" />
              <div className="flex items-center gap-2 text-accent">
                <Users className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{t("about.leadershipBadge", "Leadership")}</span>
              </div>
              <div className="h-px w-12 bg-accent/60" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("team.title", "BUREAU EXÉCUTIF NATIONAL")}
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              {t("team.description", "Une équipe de leaders visionnaires dédiés au développement économique du Congo.")}
            </p>
          </div>

          {/* Grille des membres - première rangée (4 membres) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {localizedBureauMembers.slice(0, 4).map((member, index) => (
              <MemberCard key={member.name} {...member} variant="blue" index={index} />
            ))}
          </div>

          {/* Grille des membres - deuxième rangée (3 membres centrés) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {localizedBureauMembers.slice(4).map((member, index) => (
              <MemberCard key={member.name} {...member} variant="blue" index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION COMITÉ CONSULTATIF INTERNATIONAL ========== */}
      <section className="py-20 bg-background">
        <div className="container-cdeco">
          {/* En-tête */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent/60" />
              <div className="flex items-center gap-2 text-accent">
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">International</span>
              </div>
              <div className="h-px w-12 bg-accent/60" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              COMITÉ CONSULTATIF INTERNATIONAL (CCI-CDECO)
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une équipe d'experts internationaux dédiés au rayonnement de la CDECO à travers le monde.
            </p>
          </div>

          {/* Grille des membres CCI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cciMembers.map((member, index) => (
              <MemberCard key={member.name} {...member} variant="white" index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bureau;
