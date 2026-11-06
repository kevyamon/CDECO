import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import { Shield, Globe, Handshake, MapPin, Ship, TrendingUp, Users } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations/variants";

export const InvestorEnvironmentSection = () => (
  <section className="py-20 bg-background">
    <div className="container-cdeco">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <motion.div variants={fadeInUp} className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl p-6 border border-green-500/20">
              <Shield className="h-10 w-10 text-green-600 mb-4" />
              <h4 className="font-bold text-foreground mb-2">Stabilité politique</h4>
              <p className="text-sm text-muted-foreground">
                Environnement prévisible pour la croissance économique
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-6 border border-blue-500/20">
              <Globe className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="font-bold text-foreground mb-2">Accords commerciaux</h4>
              <p className="text-sm text-muted-foreground">
                Accès facilité aux opportunités transfrontalières
              </p>
            </div>
            <div className="col-span-2 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
              <Handshake className="h-10 w-10 text-accent mb-4" />
              <h4 className="font-bold text-foreground mb-2">Porte d'entrée africaine</h4>
              <p className="text-sm text-muted-foreground">
                Plateforme logistique vers le marché de l'Afrique centrale et australe
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="order-1 lg:order-2">
          <SectionHeader label="Investisseurs" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            Un environnement favorable aux investisseurs
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Le Congo jouit d'une <strong className="text-primary">stabilité politique reconnue</strong>, ce qui renforce la confiance des investisseurs et crée un cadre prévisible pour les capitaux durables.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Grâce à ses accords régionaux (CEMAC, OHADA, ZLECAF), le Congo constitue une <strong className="text-primary">porte d'entrée majeure vers l'Afrique centrale</strong>.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export const WhyInvestSection = () => {
  const reasons = [
    {
      icon: MapPin,
      text: "Position géographique stratégique, au cœur d'un vaste réseau d'échanges régionaux",
    },
    {
      icon: Ship,
      text: "Infrastructures portuaires, ferroviaires et aériennes connectant efficacement les marchés",
    },
    {
      icon: TrendingUp,
      text: "Potentiel exceptionnel de diversification économique au-delà des hydrocarbures",
    },
    {
      icon: Users,
      text: "Population jeune, connectée et dynamique, favorable à l'innovation et aux projets d'envergure",
    },
    {
      icon: Shield,
      text: "Cadre juridique régional sécurisé (OHADA) et incitations fiscales ciblées pour les investisseurs",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container-cdeco">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionHeader label="Opportunités" variant="accent" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Pourquoi investir au Congo-Brazzaville ?
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="bg-accent/10 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                <reason.icon className="h-7 w-7 text-accent" />
              </div>
              <p className="text-foreground font-medium">{reason.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

