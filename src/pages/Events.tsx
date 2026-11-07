import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PhotoGallery, { GalleryImage } from "@/components/PhotoGallery";
import UpcomingEventsList from "@/components/events/UpcomingEventsList";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";
import { useTranslation } from "react-i18next";
import { mediaService } from "@/api/mediaService";

// Importations des photos de la galerie
import eventsForum from "@/assets/gallery/events-forum.jpg";
import eventsNetworking from "@/assets/gallery/events-networking.jpg";
import eventsPartenariat from "@/assets/gallery/events-partenariat.jpg";
import eventsDiplomatie from "@/assets/gallery/events-diplomatie.jpg";
import eventsConference from "@/assets/gallery/events-conference.jpg";
import eventsAudience from "@/assets/gallery/events-audience.jpg";
import eventsEquipe from "@/assets/gallery/events-equipe.jpg";
import eventsWef from "@/assets/gallery/events-wef.jpg";
import eventsRencontre from "@/assets/gallery/events-rencontre.jpg";
import parisConference1 from "@/assets/gallery/paris-conference-1.jpg";
import parisOcdeTeam from "@/assets/gallery/paris-ocde-team.jpg";
import parisIefaConference from "@/assets/gallery/paris-iefa-conference.jpg";

const galleryImages: GalleryImage[] = [
  { src: eventsForum, alt: "Forum CDECO - participants", title: "Forum Économique", category: "Forum" },
  { src: eventsDiplomatie, alt: "Rencontre diplomatique", title: "Rencontre Diplomatique", category: "Diplomatie" },
  { src: parisConference1, alt: "Membres CDECO à la Conférence de Paris", title: "Conférence de Paris", category: "International" },
  { src: parisOcdeTeam, alt: "Équipe CDECO à l'OCDE", title: "Délégation OCDE", category: "International" },
  { src: parisIefaConference, alt: "CDECO au Forum IEFA Paris", title: "Forum IEFA Paris", category: "International" },
  { src: eventsConference, alt: "Conférence CDECO", title: "Panel de Conférence", category: "Conférence" },
  { src: eventsEquipe, alt: "Équipe CDECO - WEF", title: "Women Economic Forum", category: "Équipe" },
  { src: eventsPartenariat, alt: "Partenariat d'affaires", title: "Partenariat Stratégique", category: "Partenariat" },
  { src: eventsWef, alt: "WEF Congo", title: "Délégation WEF", category: "International" },
  { src: eventsAudience, alt: "Audience conférence", title: "Public Engagé", category: "Audience" },
  { src: eventsNetworking, alt: "Networking professionnel", title: "Networking", category: "Networking" },
  { src: eventsRencontre, alt: "Rencontre networking", title: "Échanges VIP", category: "Rencontre" },
];

const pastEvents = [
  {
    title: "KAMPUS-CDECO : Promotion 2024",
    date: "Novembre 2024",
    impact: "120 jeunes formés, 15 startups incubées",
  },
  {
    title: "Forum Diaspora Connect",
    date: "Septembre 2024",
    impact: "80 talents de la diaspora mobilisés",
  },
  {
    title: "Mission Économique en Chine",
    date: "Juin 2024",
    impact: "12 accords de partenariat signés",
  },
];

const Events = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [dynamicGallery, setDynamicGallery] = useState<GalleryImage[]>([]);

  useEffect(() => {
    mediaService
      .getMediaList("gallery")
      .then((items) => {
        if (items && items.length > 0) {
          const formatted: GalleryImage[] = items.map((item) => ({
            src: item.url,
            alt: item.altText || item.title || "Photo Événement CDECO",
            title: item.title || "Conférence & Événement",
            category: "Conférence",
          }));
          setDynamicGallery(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const allGalleryImages = [...dynamicGallery, ...galleryImages];

  return (
    <Layout>
      <SEOHead
        title="Événements - CDECO"
        description="Découvrez les prochains événements de la CDECO : forums économiques, séminaires PME/PMI, rencontres diplomatiques et ateliers de formation."
        keywords="événements CDECO, forums économiques, séminaires, Congo, Brazzaville"
        canonicalUrl="/evenements"
      />

      <section className="pt-28 md:pt-32 pb-16 md:pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div
          className="container-cdeco text-center relative z-10 px-4 sm:px-6"
          variants={staggerContainer}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.div variants={staggerItem}>
            <SectionHeader label={t("events.badge", "Calendrier & Galerie")} variant="light" />
          </motion.div>
          <motion.h1
            variants={staggerItem}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t("events.title", "Événements CDECO")}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-primary-foreground/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {t("events.description", "Forums, conférences internationales, missions économiques et rencontres networking de haut niveau.")}
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container-cdeco px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={fadeInUp}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
          >
            <SectionHeader label={t("events.upcomingBadge", "À venir")} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("events.upcomingTitle", "Prochains Événements")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {t("events.upcomingDescription", "Ne manquez pas nos prochaines rencontres et opportunités de networking stratégique.")}
            </p>
          </motion.div>

          <UpcomingEventsList shouldReduceMotion={shouldReduceMotion} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container-cdeco px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={fadeInUp}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
          >
            <SectionHeader label={t("events.galleryBadge", "Galerie Photos")} variant="accent" />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("events.galleryTitle", "Moments Forts & Sommets")}
            </h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {t("events.galleryDescription", "Revivez les temps forts de la CDECO à Paris, Brazzaville, au Forum IEFA et auprès de l'OCDE.")}
            </p>
          </motion.div>

          <PhotoGallery images={allGalleryImages} columns={3} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="text-center mb-12">
            <SectionHeader label="Rétrospective" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Événements Précédents
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pastEvents.map((event, idx) => (
              <div key={idx} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <p className="text-xs font-semibold text-primary mb-1">{event.date}</p>
                <h3 className="font-heading font-bold text-lg mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {event.impact}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" className="gap-2">
                Proposer un partenariat événementiel
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
