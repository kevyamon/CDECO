import { useState, useEffect, useCallback, FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Users, Edit, Trash2, RefreshCw } from "lucide-react";
import { memberService, Member } from "@/api/memberService";
import apiClient from "@/api/client";
import { AdminCardGridSkeleton } from "./AdminSkeletonLoader";

export const BureauManagerTab: FC = () => {
  const { toast } = useToast();
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    roleEn: "",
    type: "bureau" as "bureau" | "cci" | "other",
    bio: "",
    bioEn: "",
    image: "",
    order: 0,
  });

  const loadMembers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await memberService.getMembers();
      setMembers(data);
    } catch {
      toast({
        title: isEn ? "Error" : "Erreur",
        description: isEn ? "Failed to load members list." : "Impossible de charger la liste des membres.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [isEn, toast]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "bureau");
    formData.append("title", form.name ? `Membre - ${form.name}` : file.name);

    setUploadingImage(true);
    try {
      const res = await apiClient.post<{ success: boolean; data: { url: string } }>("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.data?.url) {
        setForm((prev) => ({ ...prev, image: res.data.data.url }));
        toast({
          title: isEn ? "Photo Uploaded" : "Photo téléversée",
          description: isEn ? "Image was successfully saved." : "L'image a été mise en ligne avec succès.",
        });
      }
    } catch {
      toast({
        title: isEn ? "Upload Error" : "Erreur téléversement",
        description: isEn ? "Unable to upload photo." : "Impossible d'envoyer la photo.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (member: Member) => {
    setEditingId(member._id || null);
    setForm({
      name: member.name || "",
      role: member.role || "",
      roleEn: member.roleEn || "",
      type: member.type || "bureau",
      bio: member.bio || "",
      bioEn: member.bioEn || "",
      image: member.image || "",
      order: member.order || 0,
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      name: "",
      role: "",
      roleEn: "",
      type: "bureau",
      bio: "",
      bioEn: "",
      image: "",
      order: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      toast({
        title: isEn ? "Required Fields" : "Champs requis",
        description: isEn ? "Please provide at least a name and role." : "Veuillez renseigner au moins le nom et le rôle.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await memberService.updateMember(editingId, form);
        toast({
          title: isEn ? "Member Updated" : "Membre mis à jour",
          description: isEn ? "Governance information saved successfully." : "Les informations ont été enregistrées avec succès.",
        });
      } else {
        await memberService.createMember(form);
        toast({
          title: isEn ? "Member Added" : "Membre ajouté",
          description: isEn ? "New governance profile added." : "Le nouveau membre a été ajouté à la gouvernance.",
        });
      }
      handleCancel();
      loadMembers();
    } catch {
      toast({
        title: isEn ? "Error" : "Erreur",
        description: isEn ? "An error occurred while saving." : "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmMsg = isEn ? "Are you sure you want to delete this member?" : "Êtes-vous sûr de vouloir supprimer ce membre ?";
    if (!window.confirm(confirmMsg)) return;
    try {
      await memberService.deleteMember(id);
      toast({
        title: isEn ? "Member Deleted" : "Membre supprimé",
        description: isEn ? "Profile removed from list." : "Le profil a été retiré de la liste.",
      });
      loadMembers();
    } catch {
      toast({
        title: isEn ? "Error" : "Erreur",
        description: isEn ? "Failed to delete member." : "Impossible de supprimer le membre.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            {editingId ? (isEn ? "Edit Governance Member" : "Modifier un membre de la Gouvernance") : (isEn ? "Add Member (Bureau or CCI)" : "Ajouter un membre (Bureau ou CCI)")}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {isEn ? "Manage executive board members and international advisory committee profiles." : "Gérez les profils officiels affichés sur l'onglet Bureau (Bureau Exécutif National et Comité Consultatif International)."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Full Name *" : "Nom complet *"}</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="ex: Arnold Wesley AKINA" required />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Branch / Board *" : "Instance / Branche *"}</Label>
                <Select value={form.type} onValueChange={(val: any) => setForm({ ...form, type: val })}>
                  <SelectTrigger><SelectValue placeholder="Sélectionnez l'organe" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bureau">Bureau Exécutif National</SelectItem>
                    <SelectItem value="cci">Comité Consultatif International (CCI)</SelectItem>
                    <SelectItem value="other">Autre commission</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Display Order" : "Ordre d'affichage"}</Label>
                <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Title / Role (French) *" : "Titre / Rôle (Français) *"}</Label>
                <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="ex: Président Fondateur" required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Title / Role (English)" : "Titre / Rôle (English)"}</Label>
                <Input value={form.roleEn} onChange={(e) => setForm({ ...form, roleEn: e.target.value })} placeholder="ex: Founding President" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Biography / Missions (French)" : "Biographie / Missions (Français)"}</Label>
                <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Description du rôle et des missions..." rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Biography / Missions (English)" : "Biographie / Missions (English)"}</Label>
                <Textarea value={form.bioEn} onChange={(e) => setForm({ ...form, bioEn: e.target.value })} placeholder="Role description in English..." rows={2} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Official Photo URL" : "URL de la photo officielle"}</Label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://... ou téléversez un fichier ci-contre" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">{isEn ? "Upload Photo" : "Téléverser une photo"}</Label>
                <div className="flex gap-2">
                  <Input type="file" accept="image/*" onChange={handleImageFileChange} disabled={uploadingImage} className="cursor-pointer file:cursor-pointer text-xs" />
                  {form.image && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border shrink-0 bg-muted">
                      <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  {isEn ? "Cancel" : "Annuler"}
                </Button>
              )}
              <Button type="submit" disabled={submitting || uploadingImage} className="bg-accent text-white">
                {submitting ? (isEn ? "Saving..." : "Enregistrement...") : editingId ? (isEn ? "Update Member" : "Mettre à jour le membre") : (isEn ? "Add Member" : "Ajouter le membre")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Liste des membres */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">
              {isEn ? `Registered Members (${members.length})` : `Membres enregistrés (${members.length})`}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {isEn ? "Active governance profiles in the database." : "Liste des profils actifs dans la base de données."}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadMembers} disabled={loading} className="gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            {isEn ? "Refresh" : "Actualiser"}
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {loading ? (
            <AdminCardGridSkeleton count={6} />
          ) : members.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted-foreground">
              {isEn ? "No members registered yet." : "Aucun membre enregistré en base de données."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((m) => (
                <div key={m._id} className="border rounded-xl p-4 bg-card flex flex-col justify-between shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0 border">
                      {m.image ? (
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {m.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-sm truncate">{m.name}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-semibold uppercase">
                          {m.type}
                        </span>
                      </div>
                      <p className="text-xs text-primary font-medium truncate">{m.role}</p>
                      {m.roleEn && <p className="text-[11px] text-muted-foreground italic truncate">{m.roleEn}</p>}
                    </div>
                  </div>
                  {m.bio && <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{m.bio}</p>}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(m)} className="h-8 px-2 text-xs gap-1">
                      <Edit className="w-3.5 h-3.5" />
                      {isEn ? "Edit" : "Modifier"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => m._id && handleDelete(m._id)} className="h-8 px-2 text-xs text-red-500 hover:text-red-600 gap-1">
                      <Trash2 className="w-3.5 h-3.5" />
                      {isEn ? "Delete" : "Supprimer"}
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

export default BureauManagerTab;
