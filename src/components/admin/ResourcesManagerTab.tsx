import { useState, useEffect, useCallback, FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { FileText, Plus, Edit, Trash2, RefreshCw, Upload, CheckCircle2, Download, ExternalLink } from "lucide-react";
import { resourceService, ResourceItem } from "@/api/resourceService";
import apiClient from "@/api/client";
import { AdminCardGridSkeleton } from "./AdminSkeletonLoader";

export const ResourcesManagerTab: FC = () => {
  const { toast } = useToast();
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

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
        title: isEn ? "Error" : "Erreur",
        description: isEn ? "Unable to load documents." : "Impossible de charger les documents.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [isEn, toast]);

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
        toast({
          title: isEn ? "File Uploaded" : "Fichier téléversé",
          description: isEn ? "The document is ready to be published." : "Le document est prêt à être publié.",
        });
      }
    } catch {
      toast({
        title: isEn ? "Upload Error" : "Erreur téléversement",
        description: isEn ? "Failed to upload document." : "Impossible d'envoyer le document.",
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleEdit = (res: ResourceItem) => {
    setEditingId(res._id || null);
    setForm({
      title: res.title || "",
      titleEn: res.titleEn || "",
      category: res.category || "guide",
      description: res.description || "",
      descriptionEn: res.descriptionEn || "",
      fileUrl: res.fileUrl || "",
      fileName: res.fileName || "",
      fileSize: res.fileSize || "",
      order: res.order || 0,
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
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
      toast({
        title: isEn ? "Required Fields" : "Champs requis",
        description: isEn ? "Please provide a title and PDF link." : "Veuillez renseigner le titre et le lien PDF.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await resourceService.updateResource(editingId, form);
        toast({
          title: isEn ? "Document Updated" : "Document mis à jour",
          description: isEn ? "Resource changes saved." : "Le document a été mis à jour avec succès.",
        });
      } else {
        await resourceService.createResource(form);
        toast({
          title: isEn ? "Document Published" : "Document publié",
          description: isEn ? "New resource is live on the site." : "Le nouveau document est désormais téléchargeable.",
        });
      }
      handleCancel();
      loadResources();
    } catch {
      toast({
        title: isEn ? "Error" : "Erreur",
        description: isEn ? "Failed to save document." : "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmMsg = isEn ? "Are you sure you want to delete this document?" : "Êtes-vous sûr de vouloir supprimer ce document ?";
    if (!window.confirm(confirmMsg)) return;
    try {
      await resourceService.deleteResource(id);
      toast({
        title: isEn ? "Document Removed" : "Document supprimé",
        description: isEn ? "The file was successfully removed." : "Le document a été retiré avec succès.",
      });
      loadResources();
    } catch {
      toast({
        title: isEn ? "Error" : "Erreur",
        description: isEn ? "Failed to delete document." : "Impossible de supprimer le document.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire Ajout / Édition */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            {editingId
              ? isEn
                ? "Edit Resource (PDF)"
                : "Modifier la ressource (PDF)"
              : isEn
                ? "Publish New Resource (PDF)"
                : "Publier une nouvelle ressource (PDF)"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {isEn
              ? "Add or modify official downloadable documents, presentations, charters, and economic guides."
              : "Ajoutez ou modifiez des présentations, chartes, rapports économiques ou guides téléchargeables."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Document Title (French) *" : "Titre du document (Français) *"}</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="ex: Charte des Investissements 2026"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Document Title (English)" : "Titre du document (English)"}</Label>
                <Input
                  value={form.titleEn}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  placeholder="ex: Investment Charter 2026"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Category *" : "Catégorie *"}</Label>
                <Select value={form.category} onValueChange={(val: any) => setForm({ ...form, category: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guide">Guide & Dépliant</SelectItem>
                    <SelectItem value="rapport">Rapport & Bilan</SelectItem>
                    <SelectItem value="texte">Texte & Charte Officielle</SelectItem>
                    <SelectItem value="other">Autre document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Description (French)" : "Description (Français)"}</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brève description du contenu du document..."
                  rows={2}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Description (English)" : "Description (English)"}</Label>
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
                <Label className="text-xs font-semibold">{isEn ? "PDF Link or URL *" : "Lien ou URL du fichier PDF *"}</Label>
                <Input
                  value={form.fileUrl}
                  onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                  placeholder="https://... ou téléversez le document ci-contre"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Upload Document (PDF)" : "Téléverser un document (PDF)"}</Label>
                <Input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileUpload}
                  disabled={uploadingFile}
                  className="cursor-pointer file:cursor-pointer text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  {isEn ? "Cancel" : "Annuler"}
                </Button>
              )}
              <Button type="submit" disabled={submitting || uploadingFile} className="bg-accent text-white">
                {submitting
                  ? isEn
                    ? "Publishing..."
                    : "Publication..."
                  : editingId
                    ? isEn
                      ? "Update Document"
                      : "Mettre à jour le document"
                    : isEn
                      ? "Publish Document"
                      : "Publier le document"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Liste des Ressources */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">
              {isEn ? `Active Documents (${resources.length})` : `Documents actifs (${resources.length})`}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {isEn ? "Publications available on /ressources page." : "Publications disponibles sur la page /ressources."}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadResources} disabled={loading} className="gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            {isEn ? "Refresh" : "Actualiser"}
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {loading ? (
            <AdminCardGridSkeleton count={4} />
          ) : resources.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted-foreground">
              {isEn ? "No documents registered yet." : "Aucun document enregistré en base."}
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
                      {isEn ? "Open File" : "Ouvrir le fichier"}
                    </a>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(res)} className="h-8 px-2 text-xs gap-1">
                        <Edit className="w-3.5 h-3.5" />
                        {isEn ? "Edit" : "Modifier"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => res._id && handleDelete(res._id)}
                        className="h-8 px-2 text-xs text-red-500 hover:text-red-600 gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {isEn ? "Delete" : "Supprimer"}
                      </Button>
                    </div>
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
