import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/ui/section-header";
import { GraduationCap, Globe, MapPin, Mail, Building2 } from "lucide-react";
import directeurKampusDefault from "@/assets/members/directeur-kampus.jpg";
import logoKampus from "@/assets/logo-kampus.png";
import { useTranslation } from "react-i18next";
import { FadeInUp, FadeInDown, FadeInRight, StaggerContainer, StaggerItem, HoverCard, PulseIcon, ScaleIn } from "@/components/animations/MotionWrapper";
import useSiteSettings from "@/hooks/useSiteSettings";
import { getKampusMissions, getKampusObjectifs } from "@/data/kampusData";

const KampusCdeco = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { settings } = useSiteSettings();

  const missions = getKampusMissions(isEn);
  const objectifs = getKampusObjectifs(isEn);

  const directorName = settings?.kampusDirectorName || "Steve Patrick MBOUKOU";
  const directorTitle = isEn
    ? settings?.kampusDirectorTitleEn || settings?.kampusDirectorTitle || "Director of KAMPUS CDECO"
    : settings?.kampusDirectorTitle || "Directeur KAMPUS CDECO";
  const directorBio = isEn
    ? settings?.kampusDirectorBioEn || settings?.kampusDirectorBio || "In charge of youth entrepreneurship and professional skill-building for the new Congolese generation."
    : settings?.kampusDirectorBio || "Chargé de l'entrepreneuriat des jeunes et du développement des compétences pour la nouvelle génération congolaise.";
  const directorImage = settings?.kampusDirectorImage || directeurKampusDefault;

  const kampusAddress = settings?.kampusAddress || "n°40 Av. des 3 martyrs, Moungali Brazzaville";
  const kampusEmail = settings?.kampusEmail || "contact@cdeco.com";
  const kampusWebsite = settings?.kampusWebsite || "www.cdeco.com";

  return (
    <Layout>
      <SEOHead
        title={isEn ? "KAMPUS CDECO - Academic Platform | CDECO" : "KAMPUS CDECO - Plateforme Académique | CDECO"}
        description={
          isEn
            ? "KAMPUS CDECO, academic platform of the Chamber of Economic Diplomacy of Congo. Guiding the Elite, Building the Future."
            : "KAMPUS CDECO, la plateforme académique de la Chambre de Diplomatie Économique du Congo. Accompagner l'Élite, C'est Bâtir l'Avenir."
        }
        keywords="KAMPUS CDECO, éducation, diplomatie économique, Congo, jeunes talents, formation, bourses"
        canonicalUrl="/kampus-cdeco"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary-foreground/90 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')]" />
        </div>
        
        <div className="hidden md:block absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="hidden md:block absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />
        
        <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24 flex flex-col items-center justify-center min-h-[80vh] md:min-h-[85vh]">
          <ScaleIn delay={0}>
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-110" />
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden bg-white shadow-2xl border-4 border-white/50">
                  <img src={logoKampus} alt="KAMPUS CDECO Logo" className="w-full h-full object-cover scale-110" />
                </div>
              </div>
            </div>
          </ScaleIn>

          <FadeInDown delay={0.15}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center mb-3 md:mb-4 tracking-tight">
              <span className="text-white">KAMPUS</span>
              <br />
              <span className="text-accent">CDECO</span>
            </h1>
          </FadeInDown>

          <FadeInUp delay={0.25}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium text-center mb-2 md:mb-3">
              {isEn ? "Academic Platform" : "Plateforme Académique"}
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <p className="text-base sm:text-lg md:text-xl text-white/80 text-center mb-6 md:mb-8 max-w-md md:max-w-lg px-2">
              {isEn ? "Chamber of Economic Diplomacy of Congo (CDECO)" : "Chambre de Diplomatie Économique du Congo (CDECO)"}
            </p>
          </FadeInUp>

          <FadeInUp delay={0.35}>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl sm:rounded-full px-5 sm:px-8 py-3 sm:py-4 mb-6 md:mb-8 max-w-[95%] sm:max-w-lg md:max-w-xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading font-semibold text-white italic text-center leading-relaxed">
                {isEn ? '"Guiding the Elite, Building the Future"' : '"Accompagner l\'Élite, C\'est Bâtir l\'Avenir"'}
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-white/80 text-sm sm:text-base mb-8 md:mb-10">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span>Est. 2025</span>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Brazzaville, Congo</span>
              </span>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-cdeco">
          <FadeInUp>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                {isEn ? "Education in Service of" : "L'Éducation au Service de la"}
                <span className="text-accent block mt-2">
                  {isEn ? "Economic Diplomacy" : "Diplomatie Économique"}
                </span>
              </h2>
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <StaggerContainer staggerDelay={0.12} className="space-y-6">
              <StaggerItem>
                <p className="text-lg text-foreground leading-relaxed">
                  <strong className="text-primary">Kampus CDECO</strong>,{" "}
                  {isEn
                    ? "is the academic platform of the Chamber of Economic Diplomacy of Congo (CDECO), dedicated to students, young graduates, and rising professionals."
                    : "est la plateforme académique de la Chambre de Diplomatie Économique du Congo (CDECO), dédiée aux étudiants, jeunes diplômés et professionnels en début de carrière."}
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <p className="text-muted-foreground leading-relaxed">
                  {isEn
                    ? "Its mission is to sharpen competencies, foster innovation, ignite entrepreneurship, and nurture a culture of economic and diplomatic leadership. The platform facilitates elite networking, mentorship, project incubation, and gateways with premier international universities and institutions, preparing a new generation equipped to meet regional and global challenges."
                    : "Elle a pour mission de renforcer les compétences, stimuler l'innovation, l'esprit entrepreneurial, l'employabilité et la culture diplomatique et économique. La plateforme favorise la mise en réseau, le mentorat, l'accompagnement de projets, et la passerelle avec les grandes universités et écoles internationales, dans le but de préparer une nouvelle génération d'acteurs capables de répondre aux grands enjeux économiques, sociaux et diplomatiques, au Congo et en Afrique."}
                </p>
              </StaggerItem>
            </StaggerContainer>

            {/* Dynamic Director Card */}
            <FadeInRight delay={0.2}>
              <div className="flex justify-center">
                <HoverCard className="bg-card border-2 border-border rounded-3xl p-8 shadow-xl max-w-sm text-center w-full">
                  <div className="relative inline-block mb-6">
                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-primary shadow-lg mx-auto">
                      <img src={directorImage} alt={`${directorName} - ${directorTitle}`} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold shadow-lg uppercase tracking-wider">
                      {isEn ? "Leadership" : "Directeur"}
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {directorName}
                  </h3>
                  <p className="text-primary font-semibold mb-4 text-sm md:text-base">
                    {directorTitle}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {directorBio}
                  </p>
                </HoverCard>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container-cdeco">
          <FadeInUp>
            <div className="text-center mb-12">
              <SectionHeader label={isEn ? "Our Missions" : "Nos Missions"} />
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                {isEn ? "MISSION" : "MISSION"}
              </h2>
              <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
                {isEn
                  ? "As part of its strategic commitment to advance higher education, capacity building, and youth integration into the economic ecosystem, KAMPUS CDECO implements actionable missions to guide young talent toward international excellence."
                  : "Dans le cadre de sa vision de promouvoir les formations supérieures et renforcement des capacités et d'intégration des jeunes dans l'écosystème économique et diplomatique, le KAMPUS CDECO se dote de missions claires et précises pour accompagner la jeunesse congolaise vers l'excellence et l'impact."}
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, index) => (
              <StaggerItem key={index}>
                <HoverCard className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                  <PulseIcon className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                    <mission.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </PulseIcon>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                    {mission.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {mission.description}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Objectifs Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-cdeco">
          <FadeInUp>
            <div className="text-center mb-12">
              <SectionHeader label={isEn ? "Our Objectives" : "Nos Objectifs"} />
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                {isEn ? "OBJECTIVES" : "OBJECTIF"}
              </h2>
              <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
                {isEn
                  ? "Deliver world-class education through comprehensive, rigorous, and accredited programs designed to prepare students for stellar academic and professional careers."
                  : "Offrir une éducation de classe mondiale à travers des programmes d'études complets, rigoureux et accrédités à l'échelle internationale, visant à préparer les étudiants à la réussite académique, professionnelle et à leur intégration dans le monde professionnel."}
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer staggerDelay={0.12} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectifs.map((objectif, index) => (
              <StaggerItem key={index}>
                <HoverCard className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 group h-full">
                  <PulseIcon className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <objectif.icon className="w-8 h-8 text-white" />
                  </PulseIcon>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {objectif.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {objectif.description}
                  </p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Info & Dynamic Contact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="container-cdeco">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-10">
                <PulseIcon className="inline-block">
                  <GraduationCap className="w-16 h-16 text-accent mx-auto mb-6" />
                </PulseIcon>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {isEn ? "A Platform of Excellence" : "Une Plateforme d'Excellence"}
                </h2>
                <p className="max-w-2xl mx-auto text-white/90 text-lg leading-relaxed">
                  {isEn
                    ? "KAMPUS CDECO trains and elevates a vanguard of leaders capable of driving the diplomatic, industrial, and digital future of Congo and Africa."
                    : "KAMPUS CDECO prépare une nouvelle génération d'acteurs capables de répondre aux grands enjeux économiques, sociaux et diplomatiques du Congo et de l'Afrique."}
                </p>
              </div>
            </FadeInUp>
            
            <StaggerContainer staggerDelay={0.15} className="grid sm:grid-cols-2 gap-6 mb-10">
              <StaggerItem>
                <HoverCard className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full">
                  <h3 className="font-heading font-bold text-white text-lg mb-3">
                    {isEn ? "« Diaspora Connect » Program" : "Programme « Diaspora Connect »"}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {isEn
                      ? "Mobilizing African and Congolese skills abroad to enrich national ventures and spark high-value collaborations."
                      : "Réintégration des expertises africaines à l'étranger pour enrichir l'écosystème économique national et créer des synergies durables."}
                  </p>
                </HoverCard>
              </StaggerItem>
              <StaggerItem>
                <HoverCard className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full">
                  <h3 className="font-heading font-bold text-white text-lg mb-3">
                    {isEn ? "International Gateways" : "Passerelles Internationales"}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {isEn
                      ? "Connecting directly with leading global universities and specialized institutions for exchanges and dual certification."
                      : "Connexion avec les grandes universités et écoles internationales pour des échanges académiques et des opportunités de formation continue."}
                  </p>
                </HoverCard>
              </StaggerItem>
            </StaggerContainer>

            {/* Dynamic Contact Info */}
            <FadeInUp delay={0.2}>
              <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm mb-8">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  {kampusAddress}
                </span>
                <a href={`mailto:${kampusEmail}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                  {kampusEmail}
                </a>
                <a href={`https://${kampusWebsite.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Globe className="w-4 h-4 text-accent" />
                  {kampusWebsite}
                </a>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KampusCdeco;
