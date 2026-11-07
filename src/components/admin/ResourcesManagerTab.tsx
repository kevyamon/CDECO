import { useState, useEffect, useCallback, FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, Trash2, RefreshCw, Upload, CheckCircle2, Download, ExternalLink } from "lucide-react";
import { resourceService, ResourceItem } from "@/api/resourceService";
import apiClient from "@/api/client";

export const ResourcesManagerTab: FC = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    category: "guide" as "guide" | "rapport" | "texte" | "other",
    description: "",
    descriptionEn: "",
    fileUrl: "",
    fileName: "",
    fileSize: "",
    order: 0,
  });

  const loadResources = useCallback(async () => {
    setLoading(true);
    try {
      const data = await resourceService.getResources();
      setResources(data);
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de charger les documents.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + " Mo";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "documents");
    formData.append("title", form.title || file.name);

    setUploadingFile(true);
    try {
      const res = await apiClient.post<{ success: boolean; data: { url: string } }>("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.data?.url) {
        setForm((prev) => ({
          ...prev,
          fileUrl: res.data.data.url,
          fileName: file.name,
          fileSize: fileSizeFormatted,
        }));
        toast({ title: "Fichier téléversé", description: "Le document est prêt à être publié." });
      }
    } catch {
      toast({ title: "Erreur téléversement", description: "Impossible d'envoyer le document.", variant: "destructive" });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      title: "",
      titleEn: "",
      category: "guide",
      description: "",
      descriptionEn: "",
      fileUrl: "",
      fileName: "",
      fileSize: "",
      order: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.fileUrl) {
      toast({ title: "Champs requis", description: "Veuillez renseigner un titre et joindre un fichier.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await resourceService.updateResource(editingId, form);
        toast({ title: "Document mis à jour", description: "La ressource a été mise à jour." });
      } else {
        await resourceService.createResource(form);
        toast({ title: "Document publié", description: "Le nouveau document est désormais téléchargeable sur le site." });
      }
      handleCancel();
      loadResources();
    } catch {
      toast({ title: "Erreur", description: "Impossible d'enregistrer le document.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Supprimer ce document de la bibliothèque officielle ?")) return;
    try {
      await resourceService.deleteResource(id);
      toast({ title: "Document supprimé", description: "La ressource a été retirée du site." });
      loadResources();
    } catch {
      toast({ title: "Erreur", description: "Impossible de supprimer la ressource.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire Publication */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            {editingId ? "Modifier le document officiel" : "Publier une nouvelle ressource (PDF)"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Ajoutez des présentations, chartes, rapports économiques ou guides téléchargeables par les visiteurs et investisseurs.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Titre du document (Français) *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="ex: Charte des Investissements 2026"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Titre du document (English)</Label>
                <Input
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  placeholder="ex: Investment Charter 2026"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Catégorie *</Label>
                <Select value={form.category} onValueChange={(val: any) => setForm({ ...form, category: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guide">Guide & Dépliant</SelectItem>
                    <SelectItem value="rapport">Rapport & Bilan Économique</SelectItem>
                    <SelectItem value="texte">Charte & Statuts Officiels</SelectItem>
                    <SelectItem value="other">Autre document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Description (Français)</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brève description du contenu du document..."
                  rows={2}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Description (English)</Label>
                <Textarea
                  value={form.descriptionEn}
                  onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                  placeholder="Brief summary in English..."
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Lien ou URL du fichier PDF *</Label>
                <Input
                  value={form.fileUrl}
                  onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                  placeholder="https://... ou téléversez le document ci-contre"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Téléverser un document (PDF)</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    disabled={uploadingFile}
                    className="text-xs"
                  />
                  {uploadingFile && <RefreshCw className="w-4 h-4 animate-spin text-accent" />}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90 text-white gap-2">
                {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {editingId ? "Enregistrer les modifications" : "Publier le document"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Annuler
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Liste des Ressources */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">Documents actifs ({resources.length})</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Publications disponibles sur la page /ressources.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadResources} disabled={loading} className="gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {resources.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted-foreground">
              Aucun document additionnel n'est encore enregistré en base. Les 3 documents officiels par défaut du site sont actifs.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res) => (
                <div key={res._id} className="border rounded-xl p-4 bg-card flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold uppercase">
                        {res.category}
                      </span>
                      {res.fileSize && <span className="text-xs text-muted-foreground">{res.fileSize}</span>}
                    </div>
                    <h4 className="font-heading font-bold text-sm text-foreground mb-1">{res.title}</h4>
                    {res.titleEn && <p className="text-xs text-muted-foreground italic mb-2">{res.titleEn}</p>}
                    <p className="text-xs text-muted-foreground line-clamp-2">{res.description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t">
                    <a
                      href={res.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Ouvrir le fichier
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => res._id && handleDelete(res._id)}
                      className="h-8 px-2 text-xs text-red-500 hover:text-red-600 gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesManagerTab;

