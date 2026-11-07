/**
 * =============================================================================
 * VIDEO SECTION - Présentation vidéo de la CDECO
 * =============================================================================
 * 
 * Affiche la vidéo institutionnelle si elle est enregistrée sur le serveur,
 * ou une miniature institutionnelle élégante en attente de diffusion
 * (évite de télécharger 8.8Mo inutilement lors du premier chargement).
 */

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, FC } from "react";
import SectionHeader from "@/components/ui/section-header";
import { staggerContainer, staggerItem, scaleIn } from "@/animations/variants";
import { useTranslation } from "react-i18next";
import { useSiteMedia } from "@/hooks/useSiteMedia";
import { Play, Film, Clock } from "lucide-react";
import heroMeetingImg from "@/assets/hero-meeting.webp";

interface VideoMiniatureProps {
  isEn: boolean;
  isLoading: boolean;
}

const VideoMiniature: FC<VideoMiniatureProps> = ({ isEn, isLoading }) => (
  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-900 flex flex-col justify-between p-6 sm:p-8">
    {/* Image de fond institutionnelle en miniature avec voile sombre */}
    <img
      src={heroMeetingImg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-[1px] scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-primary/60" />

    {/* En-tête de la miniature */}
    <div className="relative z-10 flex items-center justify-between">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
        <Film className="w-3.5 h-3.5" />
        {isEn ? "Official Institutional Video" : "Vidéo Officielle CDECO"}
      </span>
      {isLoading && (
        <span className="inline-flex items-center gap-1.5 text-[11px] text-white/70">
          <Clock className="w-3 h-3 animate-spin text-accent" />
          {isEn ? "Syncing with cloud..." : "Synchronisation serveur..."}
        </span>
      )}
    </div>

    {/* Centre : Bouton de lecture doré & Annonce */}
    <div className="relative z-10 flex flex-col items-center text-center my-auto space-y-3 py-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/25 border-2 border-accent/70 flex items-center justify-center text-accent shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
        <Play className="w-7 h-7 sm:w-9 sm:h-9 translate-x-0.5 fill-accent text-accent" />
      </div>
      <div className="space-y-1">
        <h3 className="font-heading font-bold text-base sm:text-lg text-white">
          {isEn ? "Video Presentation Coming Soon" : "Vidéo de présentation bientôt disponible"}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 max-w-sm mx-auto">
          {isEn
            ? "The official CDECO presentation film will be broadcast upon completion."
            : "La capsule vidéo institutionnelle de la CDECO sera diffusée très prochainement."}
        </p>
      </div>
    </div>

    {/* Pied de la miniature */}
    <div className="relative z-10 text-center">
      <p className="text-[11px] text-white/60 uppercase tracking-widest font-semibold">
        {isEn ? "Diplomacy & Economic Growth • Congo" : "Diplomatie Économique • République du Congo"}
      </p>
    </div>
  </div>
);

const VideoSection = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { getMedia, isLoading } = useSiteMedia();
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Seules les vidéos explicitement publiées sur le backoffice sont chargées
  const videoUrl = getMedia("home_video", "");
  const hasCustomVideo = Boolean(videoUrl && videoUrl.trim().length > 0);

  // Version statique pour préférences de mouvement réduit
  if (shouldReduceMotion) {
    return (
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {hasCustomVideo ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                  ref={videoRef}
                  key={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  onLoadedData={() => setIsVideoReady(true)}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            ) : (
              <VideoMiniature isEn={isEn} isLoading={isLoading} />
            )}
            <div className="space-y-6">
              <SectionHeader label={t("video.badge", "Présentation Vidéo")} className="justify-start" />
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                {t("video.title", "Découvrez la CDECO en Vidéo")}
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                  {t("video.description", "La Chambre de Diplomatie Économique du Congo (CDECO) est une organisation à vocation stratégique, dédiée à la promotion des intérêts économiques et commerciaux de la République du Congo.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container-cdeco px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Lecteur vidéo ou miniature institutionnelle */}
          <motion.div 
            className="relative"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {hasCustomVideo ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                  ref={videoRef}
                  key={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  onLoadedData={() => setIsVideoReady(true)}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            ) : (
              <VideoMiniature isEn={isEn} isLoading={isLoading} />
            )}
          </motion.div>

          {/* Contenu textuel */}
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={staggerItem}>
              <SectionHeader label={t("video.badge", "Présentation Vidéo")} className="justify-start" />
            </motion.div>
            
            <motion.h2 
              variants={staggerItem}
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
            >
              {t("video.title", "Découvrez la CDECO en Vidéo")}
            </motion.h2>

            <motion.div variants={staggerItem} className="space-y-4">
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                {t("video.description", "La Chambre de Diplomatie Économique du Congo (CDECO) est une organisation à vocation stratégique, dédiée à la promotion des intérêts économiques et commerciaux de la République du Congo sur la scène régionale qu'internationale.")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
