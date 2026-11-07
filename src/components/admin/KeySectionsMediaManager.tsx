import { FC, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { mediaService } from "@/api/mediaService";
import { useSiteMedia } from "@/hooks/useSiteMedia";
import { RefreshCw, Upload, Video, Image as ImageIcon, CheckCircle, Layers, Grid } from "lucide-react";
import { KEY_SLOTS, MediaSlot, MediaGroup } from "./mediaSlotsConfig";

export const KeySectionsMediaManager: FC = () => {
  const { toast } = useToast();
  const { getMedia, updateMediaLocal } = useSiteMedia();
  const [activeGroup, setActiveGroup] = useState<MediaGroup>("all");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const fileInputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const filteredSlots = activeGroup === "all" 
    ? KEY_SLOTS 
    : KEY_SLOTS.filter(s => s.group === activeGroup);

  const handleFileChange = async (slot: MediaSlot, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(slot.key);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", slot.key);
      formData.append("title", slot.title);
      formData.append("category", slot.category);
      formData.append("altText", `${slot.section} - CDECO`);

      const savedMedia = await mediaService.uploadMedia(formData);

      // Met à jour instantanément le cache local et notifie l'application entière
      updateMediaLocal(slot.key, savedMedia.url);
      if (slot.fallbackKey) {
        updateMediaLocal(slot.fallbackKey, savedMedia.url);
      }

      toast({
        title: "Média remplacé avec succès !",
        description: `La ressource pour "${slot.title}" a été mise à jour en haute définition.`,
      });
    } catch (error: any) {
      const msg = error.response?.data?.message || "Échec du téléversement du média.";
      toast({
        title: "Erreur de téléversement",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setUploadingKey(null);
      if (fileInputsRef.current[slot.key]) {
        fileInputsRef.current[slot.key]!.value = "";
      }
    }
  };

  const triggerFileInput = (key: string) => {
    fileInputsRef.current[key]?.click();
  };

  return (
    <Card className="border-border shadow-sm mb-6">
      <CardHeader className="bg-muted/20 border-b pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              Médias des Sections Clés (Accueil & Secteurs)
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Visualisez et modifiez instantanément les 10 images de fond des secteurs, les 3 piliers, la vidéo et le haut du site.
            </CardDescription>
          </div>
          <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20">
            {KEY_SLOTS.length} emplacements modifiables
          </Badge>
        </div>

        {/* Barre de filtrage par groupe */}
        <div className="flex flex-wrap gap-2 pt-3">
          <Button
            type="button"
            size="sm"
            variant={activeGroup === "all" ? "default" : "outline"}
            className="text-xs h-8"
            onClick={() => setActiveGroup("all")}
          >
            <Grid className="w-3.5 h-3.5 mr-1" />
            Tous ({KEY_SLOTS.length})
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activeGroup === "sectors" ? "default" : "outline"}
            className="text-xs h-8"
            onClick={() => setActiveGroup("sectors")}
          >
            <Layers className="w-3.5 h-3.5 mr-1" />
            10 Secteurs d'Investissement (10)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activeGroup === "pillars" ? "default" : "outline"}
            className="text-xs h-8"
            onClick={() => setActiveGroup("pillars")}
          >
            Trois Piliers (3)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={activeGroup === "hero_video" ? "default" : "outline"}
            className="text-xs h-8"
            onClick={() => setActiveGroup("hero_video")}
          >
            Haut & Vidéo (2)
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSlots.map((slot) => {
            const fallbackVal = slot.fallbackKey 
              ? getMedia(slot.fallbackKey, slot.defaultAsset) 
              : slot.defaultAsset;
            const currentUrl = getMedia(slot.key, fallbackVal);
            const isUploading = uploadingKey === slot.key;

            return (
              <div
                key={slot.key}
                className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between space-y-3 hover:border-accent/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent truncate">
                      {slot.section}
                    </span>
                    <Badge variant="secondary" className="text-[10px] uppercase">
                      {slot.type === "video" ? (
                        <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Vidéo</span>
                      ) : (
                        <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Image</span>
                      )}
                    </Badge>
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
                    {slot.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                    {slot.description}
                  </p>
                </div>

                {/* Aperçu du média actuel */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-[#002B49]/40 border border-border/80">
                  {isUploading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/80 z-20 text-white p-3 text-center">
                      <RefreshCw className="h-6 w-6 animate-spin text-accent mb-2" />
                      <span className="text-xs font-medium">Mise à jour du média en cours...</span>
                    </div>
                  ) : null}

                  {slot.type === "video" ? (
                    <video
                      src={currentUrl}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={currentUrl}
                      alt={slot.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Input caché et bouton d'action Modifier */}
                <input
                  type="file"
                  ref={(el) => (fileInputsRef.current[slot.key] = el)}
                  accept={slot.type === "video" ? "video/mp4,video/webm,video/quicktime" : "image/*"}
                  className="hidden"
                  onChange={(e) => handleFileChange(slot, e)}
                  disabled={isUploading}
                />

                <Button
                  type="button"
                  onClick={() => triggerFileInput(slot.key)}
                  disabled={isUploading}
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-accent/40 text-accent hover:bg-accent hover:text-white transition-all font-semibold"
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Remplacement en cours...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Modifier
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeySectionsMediaManager;
