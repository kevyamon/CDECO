import { FC, useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, CalendarDays, MapPin, ExternalLink } from "lucide-react";
import UpcomingEventsList from "@/components/events/UpcomingEventsList";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";
import { useTranslation } from "react-i18next";
import { eventService, CdecoEvent } from "@/api/eventService";
import { DEFAULT_HIGHLIGHT_EVENTS, DEFAULT_PAST_EVENTS } from "@/components/events/defaultEventsData";

export const Events: FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const shouldReduceMotion = useReducedMotion();

  const [highlights, setHighlights] = useState<CdecoEvent[]>(DEFAULT_HIGHLIGHT_EVENTS);
  const [pastEvents, setPastEvents] = useState<CdecoEvent[]>(DEFAULT_PAST_EVENTS);

  useEffect(() => {
    let isMounted = true;
    // Charge les moments forts depuis l'API MongoDB
    eventService
      .getEvents("highlight")
      .then((items) => {
        if (isMounted && items && items.length > 0) {
          setHighlights(items);
        }
      })
      .catch(() => {});

    // Charge les événements passés depuis l'API MongoDB
    eventService
      .getEvents("past")
      .then((items) => {
        if (isMounted && items && items.length > 0) {
          setPastEvents(items);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <SEOHead
        title={isEn ? "Events - CDECO" : "Événements - CDECO"}
        description={isEn 
          ? "Discover upcoming CDECO events: economic forums, SME summits, diplomatic conferences, and trade missions."
          : "Découvrez les prochains événements de la CDECO : forums économiques, séminaires PME/PMI, rencontres diplomatiques et ateliers de formation."}
        keywords="événements CDECO, forums économiques, séminaires, Congo, Brazzaville"
        canonicalUrl="/evenements"
      />

      {/* Header Héro */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="container-cdeco text-center relative z-10 px-4 sm:px-6"
          variants={staggerContainer}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.div variants={staggerItem}>
            <SectionHeader label={isEn ? "Calendar & Highlights" : t("events.badge", "Calendrier & Galerie")} variant="light" />
          </motion.div>
          <motion.h1
            variants={staggerItem}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {isEn ? "CDECO Summits & Events" : t("events.title", "Événements CDECO")}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-primary-foreground/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {isEn 
              ? "International forums, bilateral summits, trade missions, and high-level economic networking assemblies."
              : t("events.description", "Forums, conférences internationales, missions économiques et rencontres networking de haut niveau.")}
          </motion.p>
        </motion.div>
      </section>

      {/* 1. Prochains Événements (Upcoming) */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-cdeco px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={fadeInUp}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
          >
            <SectionHeader label={isEn ? "Upcoming" : t("events.upcomingBadge", "À venir")} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isEn ? "Upcoming Events" : t("events.upcomingTitle", "Prochains Événements")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {isEn 
                ? "Join our forthcoming economic summits and high-level networking conferences."
                : t("events.upcomingDescription", "Ne manquez pas nos prochaines rencontres et opportunités de networking stratégique.")}
            </p>
          </motion.div>

          <UpcomingEventsList shouldReduceMotion={shouldReduceMotion} />
        </div>
      </section>

      {/* 2. Moments Forts & Sommets (Highlights cliquables ouvrant la page dédiée) */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container-cdeco px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={fadeInUp}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
          >
            <SectionHeader label={isEn ? "Highlights & Gallery" : t("events.galleryBadge", "Moments Forts")} variant="accent" />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {isEn ? "Key Summits & Highlights" : t("events.galleryTitle", "Moments Forts & Sommets")}
            </h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {isEn 
                ? "Click any card to read the full report, keynote summaries, and official photos from our global assemblies."
                : "Cliquez sur une carte pour découvrir le compte-rendu officiel, les photos et les déclarations de chaque rencontre."}
            </p>
          </motion.div>

          {/* Grille des cartes Moments Forts 100% responsive et cliquable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const targetId = item.slug || item._id || item.id || `hl-${index + 1}`;
              const title = (isEn && item.titleEn) ? item.titleEn : item.title;
              const description = (isEn && item.descriptionEn) ? item.descriptionEn : (item.description || "");
              const date = (isEn && item.dateEn) ? item.dateEn : item.date;
              const location = (isEn && item.locationEn) ? item.locationEn : item.location;
              const type = (isEn && item.typeEn) ? item.typeEn : (item.type || "Sommet");

              return (
                <Link
                  key={String(targetId)}
                  to={`/evenements/${targetId}`}
                  className="group rounded-2xl overflow-hidden bg-card text-card-foreground border border-border/80 shadow-md hover:border-accent hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/20 text-muted-foreground text-xs">
                        {title}
                      </div>
                    )}
                    <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/90 text-white backdrop-blur">
                      {type}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {date && (
                          <span className="flex items-center gap-1 font-medium text-foreground">
                            <CalendarDays className="w-3.5 h-3.5 text-accent" />
                            {date}
                          </span>
                        )}
                        {location && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3.5 h-3.5 text-destructive" />
                            {location}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-base md:text-lg text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-accent group-hover:text-accent/90">
                      <span>{isEn ? "Read full report" : "Lire le compte-rendu"}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Événements Précédents (Rétrospective dynamique et bilingue) */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="text-center mb-12">
            <SectionHeader label={isEn ? "Retrospective" : "Rétrospective"} />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {isEn ? "Past Achievements & Missions" : "Événements Précédents"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              {isEn 
                ? "A summary of recent milestones, incubation cohorts, and bilateral missions successfully carried out."
                : "Bilan des récentes réalisations, promotions de formation et missions bilatérales menées avec succès."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pastEvents.map((event, idx) => {
              const title = (isEn && event.titleEn) ? event.titleEn : event.title;
              const date = (isEn && event.dateEn) ? event.dateEn : event.date;
              const impact = (isEn && event.impactEn) ? event.impactEn : (event.impact || event.description || "");

              return (
                <div key={event._id || event.id || idx} className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-accent mb-1">{date}</p>
                    <h3 className="font-heading font-bold text-base md:text-lg mb-2 text-foreground">{title}</h3>
                  </div>
                  {impact && (
                    <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 pt-2 border-t border-border/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      {impact}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-white font-semibold">
                {isEn ? "Propose an Event Partnership" : "Proposer un partenariat événementiel"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
