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

const VideoSection = () => {
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
              <SectionHeader label="Découvrez la CDECO" className="justify-start" />
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                La CDECO : Chambre de Diplomatie{" "}
                <span className="text-primary">Économique du Congo</span>
              </h2>
              <div className="space-y-4">
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                  Présentation
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                  La Chambre de Diplomatie Économique du Congo (CDECO) est une organisation à vocation stratégique, 
                  dédiée à la promotion des intérêts économiques et commerciaux de la République du Congo.
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
              <SectionHeader label="Découvrez la CDECO" className="justify-start" />
            </motion.div>
            
            <motion.h2 
              variants={staggerItem}
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
            >
              La CDECO : Chambre de Diplomatie{" "}
              <span className="text-primary">Économique du Congo</span>
            </motion.h2>

            <motion.div variants={staggerItem} className="space-y-4">
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                Présentation
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                La Chambre de Diplomatie Économique du Congo (CDECO) est une organisation à vocation stratégique, 
                dédiée à la promotion des intérêts économiques et commerciaux de la République du Congo sur la scène 
                régionale qu'internationale. Elle œuvre à travers la facilitation des investissements, le renforcement 
                des échanges commerciaux, l'accompagnement des opérateurs économiques, entrepreneurs africains et le 
                développement de la coopération technique dans l'espace économique mondial.
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-4">
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                Dans un contexte où les relations économiques et commerciales sont étroitement liées aux enjeux diplomatiques, 
                la République du Congo affirme sa place sur l'échiquier international grâce à une diplomatie proactive, 
                innovante et inclusive. La CDECO se positionne comme un hub et un levier stratégique pour l'attractivité 
                des investissements étrangers, jouer le rôle de passerelle économique entre les secteurs publics-privés, 
                créer des synergies économiques avec la diaspora africaine.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
