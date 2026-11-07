import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plane, Ship, Train, Building2 } from "lucide-react";
import congoMapImage from "@/assets/congo-map.webp";
import { useTranslation } from "react-i18next";

interface MapPoint {
  id: string;
  name: string;
  type: "city" | "port" | "airport" | "railway";
  descriptionFr: string;
  descriptionEn: string;
  x: number;
  y: number;
  icon: typeof MapPin;
}

const mapPoints: MapPoint[] = [
  {
    id: "brazzaville",
    name: "Brazzaville",
    type: "city",
    descriptionFr: "Capitale politique et administrative. Siège du gouvernement et centre économique majeur.",
    descriptionEn: "Political and administrative capital. Seat of government and major financial hub.",
    x: 72,
    y: 82,
    icon: Building2,
  },
  {
    id: "pointe-noire",
    name: "Pointe-Noire",
    type: "port",
    descriptionFr: "Capitale économique et principal port en eau profonde sur l'océan Atlantique.",
    descriptionEn: "Economic capital and premier deepwater Atlantic maritime port.",
    x: 18,
    y: 92,
    icon: Ship,
  },
  {
    id: "maya-maya",
    name: "Aéroport Maya-Maya",
    type: "airport",
    descriptionFr: "Aéroport international de Brazzaville, hub aérien connectant le Congo au monde.",
    descriptionEn: "Maya-Maya International Airport in Brazzaville, connecting Congo to global destinations.",
    x: 68,
    y: 78,
    icon: Plane,
  },
  {
    id: "dolisie",
    name: "Dolisie",
    type: "city",
    descriptionFr: "Troisième ville du pays, carrefour commercial et nœud ferroviaire important.",
    descriptionEn: "Third largest city, key commercial crossroads, and critical rail junction.",
    x: 32,
    y: 85,
    icon: MapPin,
  },
  {
    id: "djambala",
    name: "Djambala",
    type: "city",
    descriptionFr: "Chef-lieu du département des Plateaux, centre agricole important.",
    descriptionEn: "Capital of the Plateaux department and key agricultural production hub.",
    x: 55,
    y: 62,
    icon: MapPin,
  },
  {
    id: "owando",
    name: "Owando",
    type: "city",
    descriptionFr: "Chef-lieu de la Cuvette, centre de l'exploitation forestière.",
    descriptionEn: "Capital of the Cuvette department and hub for sustainable timber and agro-forestry.",
    x: 52,
    y: 45,
    icon: MapPin,
  },
  {
    id: "ouesso",
    name: "Ouesso",
    type: "city",
    descriptionFr: "Chef-lieu de la Sangha, porte d'entrée vers le bassin forestier du nord.",
    descriptionEn: "Capital of the Sangha department and gateway to the northern forestry basin.",
    x: 45,
    y: 25,
    icon: MapPin,
  },
  {
    id: "impfondo",
    name: "Impfondo",
    type: "city",
    descriptionFr: "Chef-lieu de la Likouala, département le plus au nord du pays.",
    descriptionEn: "Capital of the Likouala department in the northernmost river basin.",
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

const CongoMap = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const activeData = mapPoints.find((p) => p.id === (activePoint || hoveredPoint));

  const typeLabels = {
    city: isEn ? "City" : "Ville",
    port: isEn ? "Port" : "Port",
    airport: isEn ? "Airport" : "Aéroport",
    railway: isEn ? "Railway" : "Chemin de fer",
  };

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
            {isEn ? "Geography" : "Géographie"}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {isEn ? "Interactive Map of Congo-Brazzaville" : "Carte interactive du Congo-Brazzaville"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isEn
              ? "Explore key cities, strategic transportation corridors, and logistical nodes."
              : "Explorez les principales villes et infrastructures stratégiques du pays"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative"
          >
            <div className="relative aspect-[3/4] rounded-3xl border border-border overflow-hidden shadow-xl">
              <img 
                src={congoMapImage} 
                alt={isEn ? "Map of Congo-Brazzaville 12 departments" : "Carte des 12 départements du Congo-Brazzaville"}
                className="absolute inset-0 w-full h-full object-contain bg-black"
              />

              {mapPoints.map((point) => {
                const Icon = point.icon;
                const isActive = activePoint === point.id || hoveredPoint === point.id;

                return (
                  <motion.button
                    key={point.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
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
                      <span
                        className={`absolute inset-0 rounded-full ${typeColors[point.type]} animate-ping opacity-30`}
                        style={{ animationDuration: "2s" }}
                      />
                    </div>
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

              <div className="absolute bottom-4 left-4 text-blue-400/60 text-sm font-medium italic">
                {isEn ? "Atlantic Ocean" : "Océan Atlantique"}
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
              <h3 className="font-heading font-bold text-foreground mb-4">
                {isEn ? "Legend" : "Légende"}
              </h3>
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
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn ? activeData.descriptionEn : activeData.descriptionFr}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-background/50 rounded-2xl p-6 border border-dashed border-border"
                >
                  <p className="text-muted-foreground text-center">
                    {isEn
                      ? "Click or hover over any map marker to see regional details"
                      : "Cliquez sur un point de la carte pour voir les détails"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-border">
              <h3 className="font-heading font-bold text-foreground mb-4">
                {isEn ? "At a Glance" : "En chiffres"}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{isEn ? "Land Area" : "Superficie"}</span>
                  <span className="font-semibold text-foreground">342 000 km²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{isEn ? "Population" : "Population"}</span>
                  <span className="font-semibold text-foreground">~6 millions</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{isEn ? "Capital" : "Capitale"}</span>
                  <span className="font-semibold text-foreground">Brazzaville</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{isEn ? "Official Language" : "Langue officielle"}</span>
                  <span className="font-semibold text-foreground">{isEn ? "French" : "Français"}</span>
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
