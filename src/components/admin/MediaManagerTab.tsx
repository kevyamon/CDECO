import { useState, useEffect } from "react";
import { mediaService, SiteMediaItem } from "@/api/mediaService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Trash2, Image as ImageIcon, Copy, Check, RefreshCw } from "lucide-react";

export const MediaManagerTab = () => {
  const { toast } = useToast();
  const [medias, setMedias] = useState<SiteMediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Formulaire d'upload
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<SiteMediaItem["category"]>("hero");
  const [altText, setAltText] = useState("");

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
      formData.append("key", key || `media_${Date.now()}`);
      formData.append("title", title || file.name);
      formData.append("category", category);
      formData.append("altText", altText || title || "Image CDECO");

      await mediaService.uploadMedia(formData);

      toast({
        title: "Image téléversée !",
        description: "L'image a été synchronisée avec succès sur Cloudinary.",
      });

      // Réinitialisation
      setFile(null);
      setKey("");
      setTitle("");
      setAltText("");
      fetchMedias();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Échec du téléversement vers Cloudinary.";
      toast({
        title: "Erreur d'upload",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette image de Cloudinary et du site ?")) return;

    try {
      await mediaService.deleteMedia(id);
      setMedias((prev) => prev.filter((m) => (m._id || m.id) !== id));
      toast({
        title: "Image supprimée",
        description: "La ressource a été retirée.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Échec de la suppression de l'image.",
        variant: "destructive",
      });
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
    toast({
      title: "URL copiée",
      description: "Lien Cloudinary copié dans le presse-papiers.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Formulaire d'upload Cloudinary */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-primary" />
            Téléverser une image sur Cloudinary
          </CardTitle>
          <CardDescription>
            Ajoutez ou remplacez des images officielles du site (Bannières, Photo du Président, Galerie, Partenaires).
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <Label htmlFor="media-category">Emplacement / Catégorie</Label>
              <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                <SelectTrigger id="media-category">
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Bannière Hero (Accueil)</SelectItem>
                  <SelectItem value="leadership">Présidence / Bureau</SelectItem>
                  <SelectItem value="gallery">Galerie d'événements</SelectItem>
                  <SelectItem value="partner">Logo Partenaire</SelectItem>
                  <SelectItem value="general">Média Général</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="media-key">Clé unique (ex: hero_banner)</Label>
              <Input
                id="media-key"
                placeholder="hero_banner, president_photo..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="media-title">Titre descriptif</Label>
              <Input
                id="media-title"
                placeholder="Bannière principale 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="media-alt">Texte alternatif (SEO / Accessibilité)</Label>
              <Input
                id="media-alt"
                placeholder="Chambre de Diplomatie Économique..."
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button type="submit" className="w-full gap-2" disabled={uploading}>
                {uploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Envoi vers Cloudinary...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    Téléverser l'image
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Galerie des médias actifs */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Médiathèque Cloudinary ({medias.length})
            </CardTitle>
            <CardDescription>Images actives et optimisées stockées sur le CDN Cloudinary</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchMedias} disabled={loading} className="gap-2">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {medias.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-base font-medium">Aucune image personnalisée pour le moment.</p>
              <p className="text-sm">Téléversez vos premières images pour les intégrer au site.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {medias.map((media) => {
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
                      <Badge className="absolute top-2 left-2 text-xs bg-background/80 text-foreground backdrop-blur">
                        {media.category}
                      </Badge>
                    </div>
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs truncate max-w-[180px]" title={media.title}>
                          {media.title || media.key}
                        </span>
                        <code className="text-[10px] text-muted-foreground px-1 py-0.5 rounded bg-muted">
                          {media.key}
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

