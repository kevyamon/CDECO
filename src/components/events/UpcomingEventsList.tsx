import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, ArrowRight, Globe, Briefcase, GraduationCap, Handshake } from "lucide-react";
import { staggerContainer, staggerItemScale } from "@/animations/variants";
import { useTranslation } from "react-i18next";
import { eventService, CdecoEvent } from "@/api/eventService";
import { DEFAULT_UPCOMING_EVENTS } from "./defaultEventsData";

interface UpcomingEventsListProps {
  shouldReduceMotion: boolean | null;
}

const getEventIcon = (type?: string) => {
  const t = (type || "").toLowerCase();
  if (t.includes("formation") || t.includes("training") || t.includes("seminar")) return GraduationCap;
  if (t.includes("mission") || t.includes("b2b") || t.includes("trade")) return Briefcase;
  if (t.includes("conférence") || t.includes("conference") || t.includes("sommet")) return Handshake;
  return Globe;
};

export const UpcomingEventsList: FC<UpcomingEventsListProps> = ({ shouldReduceMotion }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const [events, setEvents] = useState<CdecoEvent[]>(DEFAULT_UPCOMING_EVENTS);

  useEffect(() => {
    let isMounted = true;
    eventService
      .getEvents("upcoming")
      .then((items) => {
        if (isMounted && items && items.length > 0) {
          setEvents(items);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-6 md:gap-8"
      variants={staggerContainer}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-50px" }}
    >
      {events.map((event, index) => {
        const IconComponent = getEventIcon(event.type);
        const title = (isEn && event.titleEn) ? event.titleEn : event.title;
        const description = (isEn && event.descriptionEn) ? event.descriptionEn : event.description;
        const date = (isEn && event.dateEn) ? event.dateEn : event.date;
        const location = (isEn && event.locationEn) ? event.locationEn : (event.location || "Brazzaville, Congo");
        const type = (isEn && event.typeEn) ? event.typeEn : (event.type || "Événement");
        const attendees = (isEn && event.attendeesEn) ? event.attendeesEn : event.attendees;
        const eventId = event._id || event.id || index;

        return (
          <motion.div
            key={String(eventId)}
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
                  <IconComponent className="w-7 h-7 md:w-8 md:h-8" />
                </motion.div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full text-white ${event.typeColor || "bg-primary"}`}>
                  {type}
                </span>
              </div>

              <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {title}
              </h3>

              <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                {description}
              </p>

              <div className="space-y-3 mb-6">
                {date && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      <CalendarDays className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{date}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-foreground">{location}</span>
                  </div>
                )}
                {attendees && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-muted-foreground">{attendees}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Link to={`/contact?subject=${encodeURIComponent(title)}`} className="flex-1">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold group/btn">
                    {isEn ? "Register / Inquire" : "S'inscrire"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to={`/evenements/${event.slug || eventId}`}>
                  <Button variant="outline" size="sm" className="px-3">
                    {isEn ? "Details" : "Détails"}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default UpcomingEventsList;
