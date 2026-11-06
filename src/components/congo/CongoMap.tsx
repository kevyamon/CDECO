/**
 * =============================================================================
 * CONGO MAP - Carte interactive du Congo-Brazzaville
 * Affiche les principales villes et infrastructures
 * =============================================================================
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plane, Ship, Train, Building2 } from "lucide-react";
import congoMapImage from "@/assets/congo-map.png";

interface MapPoint {
  id: string;
  name: string;
  type: "city" | "port" | "airport" | "railway";
  description: string;
  x: number; // percentage position based on actual map
  y: number;
  icon: typeof MapPin;
}

// Positions ajustées selon la vraie carte du Congo-Brazzaville
const mapPoints: MapPoint[] = [
  {
    id: "brazzaville",
    name: "Brazzaville",
    type: "city",
    description: "Capitale politique et administrative. Siège du gouvernement et centre économique majeur.",
    x: 72,
    y: 82,
    icon: Building2,
  },
  {
    id: "pointe-noire",
    name: "Pointe-Noire",
    type: "port",
    description: "Capitale économique et principal port en eau profonde sur l'océan Atlantique.",
    x: 18,
    y: 92,
    icon: Ship,
  },
  {
    id: "maya-maya",
    name: "Aéroport Maya-Maya",
    type: "airport",
    description: "Aéroport international de Brazzaville, hub aérien connectant le Congo au monde.",
    x: 68,
    y: 78,
    icon: Plane,
  },
  {
    id: "dolisie",
    name: "Dolisie",
    type: "city",
    description: "Troisième ville du pays, carrefour commercial et nœud ferroviaire important.",
    x: 32,
    y: 85,
    icon: MapPin,
  },
  {
    id: "djambala",
    name: "Djambala",
    type: "city",
    description: "Chef-lieu du département des Plateaux, centre agricole important.",
    x: 55,
    y: 62,
    icon: MapPin,
  },
  {
    id: "owando",
    name: "Owando",
    type: "city",
    description: "Chef-lieu de la Cuvette, centre de l'exploitation forestière.",
    x: 52,
    y: 45,
    icon: MapPin,
  },
  {
    id: "ouesso",
    name: "Ouesso",
    type: "city",
    description: "Chef-lieu de la Sangha, porte d'entrée vers le bassin forestier du nord.",
    x: 45,
    y: 25,
    icon: MapPin,
  },
  {
    id: "impfondo",
    name: "Impfondo",
    type: "city",
    description: "Chef-lieu de la Likouala, département le plus au nord du pays.",
    x: 72,
    y: 18,
    icon: MapPin,
  },
];

const typeColors = {
  city: "bg-primary",
  port: "bg-blue-500",
  airport: "bg-purple-500",
  railway: "bg-amber-500",
};

const typeLabels = {
  city: "Ville",
  port: "Port",
  airport: "Aéroport",
  railway: "Chemin de fer",
};

const CongoMap = () => {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const activeData = mapPoints.find((p) => p.id === (activePoint || hoveredPoint));

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container-cdeco">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
            Géographie
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Carte interactive du Congo
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explorez les principales villes et infrastructures stratégiques du pays
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative"
          >
            <div className="relative aspect-[3/4] rounded-3xl border border-border overflow-hidden shadow-xl">
              {/* Real Congo Map Image */}
              <img 
                src={congoMapImage} 
                alt="Carte des 12 départements du Congo-Brazzaville"
                className="absolute inset-0 w-full h-full object-contain bg-black"
              />

              {/* Map Points */}
              {mapPoints.map((point) => {
                const Icon = point.icon;
                const isActive = activePoint === point.id || hoveredPoint === point.id;

                return (
                  <motion.button
                    key={point.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group`}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
                    onMouseEnter={() => setHoveredPoint(point.id)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full ${typeColors[point.type]} text-white shadow-lg transition-all duration-300 ${
                        isActive ? "ring-4 ring-white/50 scale-110" : ""
                      }`}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      {/* Pulse animation */}
                      <span
                        className={`absolute inset-0 rounded-full ${typeColors[point.type]} animate-ping opacity-30`}
                        style={{ animationDuration: "2s" }}
                      />
                    </div>
                    {/* Label */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap text-xs font-semibold px-2 py-0.5 rounded bg-background/90 border border-border shadow-sm transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {point.name}
                    </span>
                  </motion.button>
                );
              })}

              {/* Atlantic Ocean label */}
              <div className="absolute bottom-4 left-4 text-blue-400/60 text-sm font-medium italic">
                Océan Atlantique
              </div>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Legend */}
            <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-heading font-bold text-foreground mb-4">Légende</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(typeColors).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${color}`} />
                    <span className="text-sm text-muted-foreground">
                      {typeLabels[type as keyof typeof typeLabels]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Point Details */}
            <AnimatePresence mode="wait">
              {activeData ? (
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-background rounded-2xl p-6 border border-border shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${typeColors[activeData.type]} flex items-center justify-center text-white`}
                    >
                      <activeData.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{activeData.name}</h3>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {typeLabels[activeData.type]}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{activeData.description}</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-background/50 rounded-2xl p-6 border border-dashed border-border"
                >
                  <p className="text-muted-foreground text-center">
                    Cliquez sur un point de la carte pour voir les détails
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-border">
              <h3 className="font-heading font-bold text-foreground mb-4">En chiffres</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Superficie</span>
                  <span className="font-semibold text-foreground">342 000 km²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Population</span>
                  <span className="font-semibold text-foreground">~6 millions</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Capitale</span>
                  <span className="font-semibold text-foreground">Brazzaville</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Langue officielle</span>
                  <span className="font-semibold text-foreground">Français</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CongoMap;
