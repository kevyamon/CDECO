import { useState, useEffect } from "react";
import { Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "react-i18next";
import { memberService, Member } from "@/api/memberService";

// Images par défaut des membres du Bureau Exécutif
import presidentImg from "@/assets/members/president-new.webp";
import vicePresidentImg from "@/assets/members/vice-president.webp";
import vicePresidenteImg from "@/assets/members/vice-presidente.webp";
import secretaireImg from "@/assets/members/secretaire-new.webp";
import communicationImg from "@/assets/members/communication.webp";
import tresoriereImg from "@/assets/members/tresoriere-new.webp";
import directeurKampusImg from "@/assets/members/directeur-kampus.webp";

// Images par défaut des membres du CCI
import cciNajibImg from "@/assets/members/cci-najib.webp";
import cciDeveImg from "@/assets/members/cci-deve.webp";
import cciArseneImg from "@/assets/members/cci-arsene.webp";
import cciAminaImg from "@/assets/members/cci-amina.webp";

interface FormattedMember {
  name: string;
  role: string;
  roleEn?: string;
  roleColor?: string;
  description: string;
  descriptionEn?: string;
  image: string;
  type?: "bureau" | "cci" | "other";
}

const defaultBureauMembers: FormattedMember[] = [
  {
    name: "Arnold Wesley AKINA",
    role: "Président Fondateur",
    roleEn: "Founding President",
    roleColor: "bg-accent text-white",
    description: "Visionnaire et leader engagé pour le développement économique du Congo.",
    descriptionEn: "Visionary leader committed to the economic empowerment and regional integration of Congo.",
    image: presidentImg,
    type: "bureau",
  },
  {
    name: "Igor Theogene NDINGA",
    role: "Vice-Président",
    roleEn: "Vice President",
    roleColor: "bg-accent text-white",
    description: "Chargé du développement économique, des partenariats privés et des Investissements.",
    descriptionEn: "In charge of economic development, private partnerships, and strategic investments.",
    image: vicePresidentImg,
    type: "bureau",
  },
  {
    name: "Rachel NGUILI AKANDA",
    role: "Vice-Présidente",
    roleEn: "Vice President",
    roleColor: "bg-accent text-white",
    description: "Chargée de l'agriculture, l'industrie et le développement de partenariats avec les PME.",
    descriptionEn: "In charge of agriculture, industry, and accelerating SME partnerships.",
    image: vicePresidenteImg,
    type: "bureau",
  },
  {
    name: "Makoumbou Laurensaint",
    role: "Secrétaire Général",
    roleEn: "Secretary General",
    roleColor: "bg-green-600 text-white",
    description: "Coordination stratégique et gestion des opérations de la CDECO.",
    descriptionEn: "Strategic coordination and operational management of CDECO.",
    image: secretaireImg,
    type: "bureau",
  },
  {
    name: "Grace BOUSSIMANITOU BENAZO",
    role: "Chargée de Communication",
    roleEn: "Communications Officer",
    roleColor: "bg-primary/80 text-white",
    description: "Chargée de la communication et des relations avec les Médias.",
    descriptionEn: "In charge of corporate communications and international media relations.",
    image: communicationImg,
    type: "bureau",
  },
  {
    name: "Dakar Boteba",
    role: "Trésorière",
    roleEn: "Treasurer",
    roleColor: "bg-primary/80 text-white",
    description: "Gestion financière rigoureuse et transparente de l'organisation.",
    descriptionEn: "Rigorous financial oversight and organizational transparency.",
    image: tresoriereImg,
    type: "bureau",
  },
  {
    name: "Steve Patrick MBOUKOU",
    role: "Directeur KAMPUS CDECO",
    roleEn: "Director of KAMPUS CDECO",
    roleColor: "bg-primary/80 text-white",
    description: "Chargé de l'entrepreneuriat des jeunes et Directeur du Centre KAMPUS CDECO.",
    descriptionEn: "In charge of youth entrepreneurship and Director of KAMPUS CDECO Center.",
    image: directeurKampusImg,
    type: "bureau",
  },
];

const defaultCciMembers: FormattedMember[] = [
  {
    name: "NAJIB BREDAA",
    role: "Directeur Relations Diplomatiques",
    roleEn: "Director of Diplomatic Relations",
    roleColor: "bg-primary text-white",
    description: "Directeur des relations diplomatiques et bilatérales.",
    descriptionEn: "Director of diplomatic and bilateral relations.",
    image: cciNajibImg,
    type: "cci",
  },
  {
    name: "Deve MABOUNGOU",
    role: "Directeur Intelligence Économique",
    roleEn: "Director of Economic Intelligence",
    roleColor: "bg-primary text-white",
    description: "Directeur de l'Intelligence Économique et des stratégies d'influence à l'international.",
    descriptionEn: "Director of Economic Intelligence and international influence strategies.",
    image: cciDeveImg,
    type: "cci",
  },
  {
    name: "Dr Arsène TATSAZEU-KENFACK",
    role: "Directeur Affaires Éducatives",
    roleEn: "Director of Educational Affairs",
    roleColor: "bg-primary text-white",
    description: "Directeur des Affaires éducatives, scientifiques et Culturelles avec l'Amérique latine.",
    descriptionEn: "Director of Educational, Scientific and Cultural Affairs with Latin America.",
    image: cciArseneImg,
    type: "cci",
  },
  {
    name: "Amina ONDZE",
    role: "Directrice Relations Institutionnelles",
    roleEn: "Director of Institutional Relations",
    roleColor: "bg-primary text-white",
    description: "Directrice des relations institutionnelles à l'international.",
    descriptionEn: "Director of international institutional relations.",
    image: cciAminaImg,
    type: "cci",
  },
];

interface MemberCardProps {
  name: string;
  role: string;
  roleColor?: string;
  description: string;
  image: string;
  variant?: "blue" | "white";
  index?: number;
}

const MemberCard = ({ name, role, roleColor = "bg-primary/80 text-white", description, image, variant = "blue", index = 0 }: MemberCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
      variant === "blue" ? "bg-primary/20 border border-white/10" : "bg-card border border-border shadow-lg"
    }`}
  >
    <div>
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-accent/30 shadow-lg bg-muted">
          <img src={image} alt={name} className="w-full h-full object-cover object-top" />
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
    </div>
  </motion.div>
);

const Bureau = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [dbMembers, setDbMembers] = useState<Member[]>([]);

  useEffect(() => {
    memberService.getMembers().then((data) => {
      if (data && data.length > 0) {
        setDbMembers(data);
      }
    }).catch(() => {});
  }, []);

  const memberImageMap: Record<string, string> = {
    "Arnold Wesley AKINA": presidentImg,
    "Igor Theogene NDINGA": vicePresidentImg,
    "Rachel NGUILI AKANDA": vicePresidenteImg,
    "Makoumbou Laurensaint": secretaireImg,
    "Grace BOUSSIMANITOU BENAZO": communicationImg,
    "Dakar Boteba": tresoriereImg,
    "Steve Patrick MBOUKOU": directeurKampusImg,
    "NAJIB BREDAA": cciNajibImg,
    "Deve MABOUNGOU": cciDeveImg,
    "Dr Arsène TATSAZEU-KENFACK": cciArseneImg,
    "Amina ONDZE": cciAminaImg,
  };

  const resolveMemberImage = (m: Member, fallback: string) => {
    if (m.image && m.image.startsWith("http")) return m.image;
    if (memberImageMap[m.name]) return memberImageMap[m.name];
    if (m.image) return m.image;
    return fallback;
  };

  const dynamicBureau = dbMembers.filter((m) => m.type === "bureau" || (m as any).category === "bureau");
  const dynamicCci = dbMembers.filter((m) => m.type === "cci" || (m as any).category === "cci");

  const bureauToDisplay: FormattedMember[] = dynamicBureau.length > 0
    ? dynamicBureau.map((m) => ({
        name: m.name,
        role: isEn ? m.roleEn || m.role : m.role,
        description: isEn ? m.bioEn || m.bio || "" : m.bio || "",
        image: resolveMemberImage(m, presidentImg),
        roleColor: "bg-accent text-white",
      }))
    : defaultBureauMembers.map((m) => ({
        ...m,
        role: isEn ? m.roleEn || m.role : m.role,
        description: isEn ? m.descriptionEn || m.description : m.description,
      }));

  const cciToDisplay: FormattedMember[] = dynamicCci.length > 0
    ? dynamicCci.map((m) => ({
        name: m.name,
        role: isEn ? m.roleEn || m.role : m.role,
        description: isEn ? m.bioEn || m.bio || "" : m.bio || "",
        image: resolveMemberImage(m, cciNajibImg),
        roleColor: "bg-primary text-white",
      }))
    : defaultCciMembers.map((m) => ({
        ...m,
        role: isEn ? m.roleEn || m.role : m.role,
        description: isEn ? m.descriptionEn || m.description : m.description,
      }));

  return (
    <Layout>
      <SEOHead
        title={isEn ? "CDECO Leadership & Board | Executive Team" : "Bureau CDECO | Équipe dirigeante"}
        description={
          isEn
            ? "Discover CDECO's National Executive Board and International Advisory Committee, visionary leaders dedicated to Congo's economic diplomacy."
            : "Découvrez le Bureau Exécutif National et le Comité Consultatif International de la CDECO, une équipe de leaders visionnaires dédiés au développement économique du Congo."
        }
      />

      {/* ========== SECTION BUREAU EXÉCUTIF NATIONAL ========== */}
      <section className="py-20 bg-primary">
        <div className="container-cdeco">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent/60" />
              <div className="flex items-center gap-2 text-accent">
                <Users className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{isEn ? "Leadership" : "Leadership"}</span>
              </div>
              <div className="h-px w-12 bg-accent/60" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {isEn ? "NATIONAL EXECUTIVE BOARD" : "BUREAU EXÉCUTIF NATIONAL"}
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              {isEn
                ? "A dedicated team of visionary leaders advancing Congo's economic growth and diplomatic influence."
                : "Une équipe de leaders visionnaires dédiés au développement économique du Congo."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {bureauToDisplay.slice(0, 4).map((member, index) => (
              <MemberCard key={member.name} {...member} variant="blue" index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {bureauToDisplay.slice(4).map((member, index) => (
              <MemberCard key={member.name} {...member} variant="blue" index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION COMITÉ CONSULTATIF INTERNATIONAL ========== */}
      <section className="py-20 bg-background">
        <div className="container-cdeco">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent/60" />
              <div className="flex items-center gap-2 text-accent">
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{isEn ? "International" : "International"}</span>
              </div>
              <div className="h-px w-12 bg-accent/60" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isEn ? "INTERNATIONAL ADVISORY COMMITTEE (CCI-CDECO)" : "COMITÉ CONSULTATIF INTERNATIONAL (CCI-CDECO)"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn
                ? "An international task force of experts driving CDECO's strategic reach and bilateral partnerships across continents."
                : "Une équipe d'experts internationaux dédiés au rayonnement de la CDECO à travers le monde."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cciToDisplay.map((member, index) => (
              <MemberCard key={member.name} {...member} variant="white" index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bureau;
