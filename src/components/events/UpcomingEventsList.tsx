import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, ArrowRight, Globe, Briefcase, GraduationCap, Handshake } from "lucide-react";
import { staggerContainer, staggerItemScale } from "@/animations/variants";

export const upcomingEvents = [
  {
    id: 1,
    title: "Forum Économique Congo-Europe 2025",
    date: "15-17 Mars 2025",
    location: "Brazzaville, Congo",
    type: "Forum",
    typeColor: "bg-primary",
    description: "Rencontre stratégique entre investisseurs européens et acteurs économiques congolais pour explorer les opportunités de partenariat.",
    icon: Globe,
    attendees: "200+ participants attendus",
  },
  {
    id: 2,
    title: "Séminaire PME/PMI : Accès aux Marchés Internationaux",
    date: "5 Avril 2025",
    location: "Pointe-Noire, Congo",
    type: "Formation",
    typeColor: "bg-cdeco-green",
    description: "Formation intensive sur les stratégies d'internationalisation pour les petites et moyennes entreprises congolaises.",
    icon: GraduationCap,
    attendees: "50 places disponibles",
  },
  {
    id: 3,
    title: "Mission B2B : Secteur Agricole",
    date: "20-25 Mai 2025",
    location: "Abidjan, Côte d'Ivoire",
    type: "Mission",
    typeColor: "bg-accent",
    description: "Mission commerciale pour connecter les producteurs congolais avec les importateurs et distributeurs ivoiriens.",
    icon: Briefcase,
    attendees: "30 entreprises sélectionnées",
  },
  {
    id: 4,
    title: "Conférence Annuelle CDECO 2025",
    date: "10-12 Juin 2025",
    location: "Brazzaville, Congo",
    type: "Conférence",
    typeColor: "bg-destructive",
    description: "L'événement phare de l'année réunissant tous les membres et partenaires de la CDECO pour définir les orientations stratégiques.",
    icon: Handshake,
    attendees: "500+ participants",
  },
];

interface UpcomingEventsListProps {
  shouldReduceMotion: boolean | null;
}

export const UpcomingEventsList: FC<UpcomingEventsListProps> = ({ shouldReduceMotion }) => {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 md:gap-8"
      variants={staggerContainer}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-50px" }}
    >
      {upcomingEvents.map((event) => (
        <motion.div
          key={event.id}
          className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
          variants={staggerItemScale}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <motion.div
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <event.icon className="w-7 h-7 md:w-8 md:h-8" />
              </motion.div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full text-primary-foreground ${event.typeColor}`}>
                {event.type}
              </span>
            </div>

            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
              {event.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-destructive" />
                </div>
                <span className="text-foreground">{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Users className="w-4 h-4 text-cdeco-green" />
                </div>
                <span className="text-muted-foreground">{event.attendees}</span>
              </div>
            </div>

            <Link to="/contact">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold group/btn">
                S'inscrire
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default UpcomingEventsList;

