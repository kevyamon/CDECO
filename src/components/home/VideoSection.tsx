/**
 * =============================================================================
 * VIDEO SECTION - Présentation vidéo de la CDECO
 * =============================================================================
 * 
 * Section affichant une vidéo MP4 native avec lecteur intégré.
 * Utilise Framer Motion pour les animations d'entrée fluides.
 */

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/section-header";
import { staggerContainer, staggerItem, scaleIn } from "@/animations/variants";
import { useTranslation } from "react-i18next";

const VideoSection = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Return static version if reduced motion is preferred
  if (shouldReduceMotion) {
    return (
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-cdeco px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/videos/presentation-cdeco.mp4#t=0.5"
              >
                <source src="/videos/presentation-cdeco.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
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
          {/* Video Player with entrance animation */}
          <motion.div 
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              poster="/videos/presentation-cdeco.mp4#t=0.5"
            >
              <source src="/videos/presentation-cdeco.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </motion.div>

          {/* Content with staggered animation */}
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
