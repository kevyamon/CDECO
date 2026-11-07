import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import { Ship, Train, Plane, Building2, Briefcase, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

export const InfrastructureSection = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const infrastructures = [
    {
      icon: Ship,
      title: isEn ? "Port of Pointe-Noire" : "Port de Pointe-Noire",
      subtitle: isEn ? "Maritime Gateway" : "Accès Maritime",
      description: isEn
        ? "Located on the Atlantic Ocean, this world-class deepwater port is one of Central Africa's prime logistics hubs, providing rapid multimodal access to sub-regional and global markets."
        : "Situé sur l'océan Atlantique, c'est l'un des atouts logistiques majeurs du pays. Il constitue une fenêtre sur le monde pour le commerce international et permet d'accéder rapidement aux marchés de la sous-région.",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      icon: Train,
      title: isEn ? "Congo-Ocean Railway" : "Chemin de fer Congo-Océan",
      subtitle: isEn ? "Rail Corridor" : "Réseau Terrestre",
      description: isEn
        ? "Connecting Brazzaville to Pointe-Noire, this vital transit spine carries freight and passengers, offering a high-capacity, dependable alternative to road corridors."
        : "Reliant Brazzaville à Pointe-Noire, c'est un corridor stratégique pour le transport de marchandises et de personnes. Ce réseau facilite les échanges et offre une alternative efficace à la voie routière.",
      color: "from-green-500/20 to-green-600/10",
    },
    {
      icon: Plane,
      title: isEn ? "Maya-Maya International Airport" : "Aéroport Maya-Maya",
      subtitle: isEn ? "Aviation Hub" : "Connexions Aériennes",
      description: isEn
        ? "A modernized national aviation network, headlined by Brazzaville's Maya-Maya Airport, delivers international connectivity and effortless business travel."
        : "Un réseau d'aéroports moderne, notamment l'aéroport international Maya-Maya à Brazzaville, assure une connectivité importante avec le reste du monde, facilitant les déplacements d'affaires.",
      color: "from-purple-500/20 to-purple-600/10",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-cdeco">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionHeader label={isEn ? "Infrastructure" : "Infrastructures"} />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {isEn ? "First-Rate Logistics Assets" : "Atouts logistiques de premier plan"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isEn
              ? "Modern multimodal infrastructure connecting Congo-Brazzaville to regional and global supply chains."
              : "Des infrastructures modernes connectant le Congo aux marchés mondiaux."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {infrastructures.map((infra, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${infra.color} rounded-3xl p-8 border border-border hover:shadow-lg transition-all duration-300`}
            >
              <div className="bg-background w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <infra.icon className="h-8 w-8 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {infra.subtitle}
              </span>
              <h3 className="text-xl font-heading font-bold text-foreground mt-2 mb-4">
                {infra.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{infra.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const EconomySection = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const economyPoints = [
    {
      icon: Building2,
      title: isEn ? "Natural Wealth" : "Ressources naturelles",
      description: isEn
        ? "Congo boasts substantial oil and gas reserves, vast sustainable timber tracks, and high-grade mineral deposits, forming a resilient bedrock for heavy industry and energy projects."
        : "Le Congo est riche en pétrole, gaz, bois et minerais sous-exploités. Ces richesses constituent une base solide pour l'investissement industriel, énergétique et manufacturier.",
    },
    {
      icon: Briefcase,
      title: isEn ? "Business-Friendly Framework" : "Environnement des affaires",
      description: isEn
        ? "As a core member of CEMAC and OHADA, Congo provides unified legal safeguards, free movement of capital, and proactive tax incentives for international corporations."
        : "Membre de la CEMAC et de l'OHADA, le cadre juridique congolais offre des conditions favorables pour les investisseurs, y compris la libre circulation des biens et des services.",
    },
    {
      icon: Leaf,
      title: isEn ? "Accelerated Diversification" : "Diversification économique",
      description: isEn
        ? "Agribusiness, renewable forestry, green tech, logistics, and in-country mineral processing are rapidly expanding, creating vibrant avenues for high-yield ventures."
        : "L'agriculture, l'agro-industrie, l'exploitation forestière durable, les technologies et la transformation locale sont en plein essor et offrent des opportunités significatives.",
    },
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container-cdeco">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionHeader label={isEn ? "Economic Potential" : "Potentiel Économique"} variant="light" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {isEn ? "A Thriving Ground for Global Capital" : "Un terreau fertile pour l'investissement"}
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            {isEn
              ? "Cross-sector opportunities within a high-potential and transforming regional economy."
              : "Des opportunités multisectorielles dans une économie en pleine mutation."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {economyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <point.icon className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-xl font-heading font-bold mb-3">{point.title}</h3>
              <p className="text-white/80 leading-relaxed text-sm">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
