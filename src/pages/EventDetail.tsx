import { FC, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarDays, MapPin, Share2, Check, ArrowRight } from "lucide-react";
import { eventService, CdecoEvent } from "@/api/eventService";
import { DEFAULT_HIGHLIGHT_EVENTS, DEFAULT_UPCOMING_EVENTS } from "@/components/events/defaultEventsData";
import { useTranslation } from "react-i18next";

export const EventDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [event, setEvent] = useState<CdecoEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchEvent = async () => {
      setLoading(true);
      if (!id) return;

      // 1. Cherche dans les événements par défaut locaux (accès instantané 0ms)
      const allDefaults = [...DEFAULT_HIGHLIGHT_EVENTS, ...DEFAULT_UPCOMING_EVENTS];
      const localMatch = allDefaults.find(
        (e) => String(e.id) === id || e.slug === id || String(e._id) === id
      );

      if (localMatch && isMounted) {
        setEvent(localMatch);
      }

      // 2. Synchronise avec l'API MongoDB
      try {
        const remoteEvent = await eventService.getEventById(id);
        if (remoteEvent && isMounted) {
          setEvent(remoteEvent);
        }
      } catch {
        // En cas d'erreur ou d'absence réseau, localMatch reste actif
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEvent();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const title = (isEn && event?.titleEn) ? event.titleEn : (event?.title || "Événement CDECO");
  const description = (isEn && event?.descriptionEn) ? event.descriptionEn : (event?.description || "");
  const date = (isEn && event?.dateEn) ? event.dateEn : (event?.date || "");
  const location = (isEn && event?.locationEn) ? event.locationEn : (event?.location || "Brazzaville, Congo");
  const type = (isEn && event?.typeEn) ? event.typeEn : (event?.type || "Sommet & Conférence");

  return (
    <Layout>
      <SEOHead
        title={`${title} - CDECO`}
        description={description.slice(0, 160)}
        keywords="CDECO, diplomatie économique, événement, sommet, conférence, Congo"
        canonicalUrl={`/evenements/${id}`}
      />

      {/* Barre supérieure avec bouton Retour */}
      <section className="pt-28 md:pt-32 pb-6 bg-primary text-primary-foreground">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs sm:text-sm font-semibold rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              {isEn ? "Back to Events" : "Retour aux Événements"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="gap-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-full"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{isEn ? "Link copied" : "Lien copié"}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isEn ? "Share" : "Partager"}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Contenu principal de l'événement */}
      <section className="py-8 md:py-14 bg-background">
        <div className="container-cdeco px-4 sm:px-6 max-w-4xl mx-auto">
          {loading && !event ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">{isEn ? "Loading event details..." : "Chargement des détails de l'événement..."}</p>
            </div>
          ) : !event ? (
            <div className="text-center py-20 space-y-4">
              <h2 className="text-xl font-bold font-heading">{isEn ? "Event Not Found" : "Événement Introuvable"}</h2>
              <p className="text-muted-foreground text-sm">{isEn ? "This event does not exist or has been removed." : "Cet événement n'existe pas ou a été retiré."}</p>
              <Link to="/evenements">
                <Button className="mt-4">{isEn ? "Return to all events" : "Retourner aux événements"}</Button>
              </Link>
            </div>
          ) : (
            <article className="space-y-6 md:space-y-8">
              {/* Image d'en-tête responsive */}
              {event.image && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border/80 shadow-md bg-muted">
                  <img
                    src={event.image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-white backdrop-blur text-xs font-semibold py-1 px-3">
                    {type}
                  </Badge>
                </div>
              )}

              {/* Métadonnées & Titre */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                  {date && (
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-accent" />
                      <span className="font-medium text-foreground">{date}</span>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-destructive" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>

                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {title}
                </h1>
              </div>

              {/* Récit / Description complète */}
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-line bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-accent mb-3 font-heading">
                  {isEn ? "About this highlight" : "À propos de ce temps fort"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {description || (isEn ? "Detailed information for this event will be published shortly." : "Le compte-rendu détaillé de cette rencontre sera enrichi prochainement.")}
                </p>
              </div>

              {/* Bouton d'action CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold gap-2 py-6">
                    {isEn ? "Participate or Partner" : "Participer ou Proposer un partenariat"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/adhesion" className="flex-1">
                  <Button variant="outline" className="w-full py-6 font-semibold">
                    {isEn ? "Join CDECO as Member" : "Devenir membre de la CDECO"}
                  </Button>
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EventDetail;

