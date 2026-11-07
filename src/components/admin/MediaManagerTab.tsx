import { useState, useEffect } from "react";
import { mediaService, SiteMediaItem } from "@/api/mediaService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, Image as ImageIcon, Copy, Check, RefreshCw, Info, Layers } from "lucide-react";
import KeySectionsMediaManager from "./KeySectionsMediaManager";
import { DESTINATION_CATEGORIES, DestinationCategory } from "./mediaSlotsConfig";

export const MediaManagerTab = () => {
  const { toast } = useToast();
  const [medias, setMedias] = useState<SiteMediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Formulaire d'ajout d'un nouveau média
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DestinationCategory["value"]>("gallery");
  const [altText, setAltText] = useState("");

  const activeCategoryConfig = DESTINATION_CATEGORIES.find((c) => c.value === category);

  const fetchMedias = async () => {
    setLoading(true);
    try {
      const data = await mediaService.getMediaList();
      setMedias(data);
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de charger la médiathèque.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedias();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Fichier requis",
        description: "Veuillez sélectionner un fichier image à téléverser.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const generatedKey = `${category}_${Date.now()}`;
      formData.append("key", generatedKey);
      formData.append("title", title || file.name);
      formData.append("category", category);
      formData.append("altText", altText || title || "Photo officielle CDECO");

      await mediaService.uploadMedia(formData);

      toast({
        title: "Nouveau média ajouté !",
        description: `Le média "${title || file.name}" a été publié dans la section ${activeCategoryConfig?.label || category}.`,
      });

      // Réinitialisation
      setFile(null);
      setTitle("");
      setAltText("");
      const fileInput = document.getElementById("media-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      fetchMedias();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Échec de l'enregistrement du média.";
      toast({
        title: "Erreur de téléversement",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer définitivement ce média du site ?")) return;

    try {
      await mediaService.deleteMedia(id);
      setMedias((prev) => prev.filter((m) => (m._id || m.id) !== id));
      toast({
        title: "Média supprimé",
        description: "La ressource a été retirée du site.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Échec de la suppression du média.",
        variant: "destructive",
      });
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
    toast({
      title: "Lien copié",
      description: "Le lien direct a été copié dans le presse-papiers.",
    });
  };

  const filteredMedias = filterCategory === "all"
    ? medias
    : medias.filter((m) => m.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* 1. Modification directe des médias clés existants (Haut, Vidéo, 3 Piliers, 10 Secteurs) */}
      <KeySectionsMediaManager />

      {/* 2. Ajout d'un nouveau média ciblé selon l'architecture du site */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-accent" />
                Ajouter un Nouveau Média (Conférences, Événements & Partenaires)
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Enrichissez la plateforme avec de nouvelles photos officielles en ciblant leur emplacement exact sur le site.
              </CardDescription>
            </div>
            <Badge variant="outline" className="w-fit bg-accent/10 text-accent border-accent/30 font-semibold">
              Publication instantanée
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="media-file">Fichier Image *</Label>
                <Input
                  id="media-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="media-category">Emplacement / Destination sur le site *</Label>
                <Select
                  value={category}
                  onValueChange={(v: DestinationCategory["value"]) => setCategory(v)}
                >
                  <SelectTrigger id="media-category">
                    <SelectValue placeholder="Choisir l'emplacement" />
                  </SelectTrigger>
                  <SelectContent>
                    {DESTINATION_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex flex-col text-left py-0.5">
                          <span className="font-semibold">{cat.label}</span>
                          <span className="text-[11px] text-muted-foreground">{cat.pageTarget}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Guide d'emplacement en direct */}
            {activeCategoryConfig && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-accent/10 border border-accent/20 text-xs text-foreground">
                <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-accent">{activeCategoryConfig.pageTarget} : </span>
                  <span className="text-muted-foreground">{activeCategoryConfig.hint}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="media-title">Titre ou Sujet du média *</Label>
                <Input
                  id="media-title"
                  placeholder="ex: Conférence de Paris 2026, Logo Banque Mondiale..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="media-alt">Texte descriptif (SEO & Accessibilité)</Label>
                <Input
                  id="media-alt"
                  placeholder="ex: Délégation CDECO lors du forum économique..."
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full sm:w-auto gap-2 bg-accent hover:bg-accent/90 text-white font-semibold" disabled={uploading}>
                {uploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Enregistrement du média en cours...
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    Ajouter ce média à la plateforme
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 3. Médiathèque officielle des médias actifs */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Médiathèque et Galerie Officielle ({filteredMedias.length})
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Médias et photos officiels enregistrés et diffusés sur la plateforme.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchMedias} disabled={loading} className="gap-2 self-start sm:self-auto">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </CardHeader>

        {/* Filtres par catégorie */}
        <div className="px-6 pt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={filterCategory === "all" ? "default" : "outline"}
            className="text-xs h-7"
            onClick={() => setFilterCategory("all")}
          >
            Tous ({medias.length})
          </Button>
          {DESTINATION_CATEGORIES.map((cat) => {
            const count = medias.filter((m) => m.category === cat.value).length;
            return (
              <Button
                key={cat.value}
                type="button"
                size="sm"
                variant={filterCategory === cat.value ? "default" : "outline"}
                className="text-xs h-7"
                onClick={() => setFilterCategory(cat.value)}
              >
                {cat.label.split(" (")[0]} ({count})
              </Button>
            );
          })}
        </div>

        <CardContent className="p-4 sm:p-6">
          {filteredMedias.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">Aucun média enregistré dans cet emplacement pour l'instant.</p>
              <p className="text-xs">Utilisez le formulaire ci-dessus pour ajouter des photos de conférences ou partenaires.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMedias.map((media) => {
                const id = media._id || media.id || media.key;
                return (
                  <Card key={id} className="overflow-hidden border border-border group">
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      <img
                        src={media.url}
                        alt={media.altText || media.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <Badge className="absolute top-2 left-2 text-[10px] bg-background/90 text-foreground backdrop-blur">
                        {media.category}
                      </Badge>
                    </div>
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs truncate max-w-[170px]" title={media.title}>
                          {media.title || media.key}
                        </span>
                        <code className="text-[10px] text-muted-foreground px-1 py-0.5 rounded bg-muted">
                          {media.key.slice(0, 15)}
                        </code>
                      </div>
                      <div className="flex items-center gap-1 pt-1 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs flex-1 gap-1"
                          onClick={() => handleCopyUrl(media.url, id)}
                        >
                          {copiedKey === id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              Copié
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Lien
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-destructive hover:text-destructive"
                          onClick={() => handleDelete(id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManagerTab;
