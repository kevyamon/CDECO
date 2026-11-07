import { useState, useEffect, useCallback, FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Edit, Trash2, RefreshCw, Upload, CheckCircle2 } from "lucide-react";
import { memberService, Member } from "@/api/memberService";
import apiClient from "@/api/client";

export const BureauManagerTab: FC = () => {
  const { toast } = useToast();
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
        title: "Erreur",
        description: "Impossible de charger la liste des membres.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

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
        toast({ title: "Photo téléversée", description: "L'image a été mise en ligne avec succès." });
      }
    } catch {
      toast({ title: "Erreur téléversement", description: "Impossible d'envoyer la photo.", variant: "destructive" });
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
      toast({ title: "Champs requis", description: "Veuillez renseigner au moins le nom et le rôle.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await memberService.updateMember(editingId, form);
        toast({ title: "Membre mis à jour", description: "Les informations ont été enregistrées avec succès." });
      } else {
        await memberService.createMember(form);
        toast({ title: "Membre ajouté", description: "Le nouveau membre a été ajouté à la gouvernance." });
      }
      handleCancel();
      loadMembers();
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue lors de l'enregistrement.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) return;
    try {
      await memberService.deleteMember(id);
      toast({ title: "Membre supprimé", description: "Le profil a été retiré de la liste." });
      loadMembers();
    } catch {
      toast({ title: "Erreur", description: "Impossible de supprimer le membre.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire Ajout / Modification */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            {editingId ? "Modifier un membre de la Gouvernance" : "Ajouter un membre (Bureau ou CCI)"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Gérez les profils officiels affichés sur l'onglet Bureau (Bureau Exécutif National et Comité Consultatif International).
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Nom complet *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="ex: Arnold Wesley AKINA"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Instance / Branche *</Label>
                <Select value={form.type} onValueChange={(val: any) => setForm({ ...form, type: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez l'organe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bureau">Bureau Exécutif National</SelectItem>
                    <SelectItem value="cci">Comité Consultatif International (CCI)</SelectItem>
                    <SelectItem value="other">Autre commission</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Ordre d'affichage</Label>
                <Input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Titre / Rôle (Français) *</Label>
                <Input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="ex: Président Fondateur"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Titre / Rôle (English)</Label>
                <Input
                  value={form.roleEn}
                  onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
                  placeholder="ex: Founding President"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Biographie / Missions (Français)</Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Description du rôle et des missions..."
                  rows={2}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Biographie / Missions (English)</Label>
                <Textarea
                  value={form.bioEn}
                  onChange={(e) => setForm({ ...form, bioEn: e.target.value })}
                  placeholder="Role description in English..."
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">URL de la photo officielle</Label>
                <Input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://... ou téléversez un fichier ci-contre"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Téléverser une photo</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={uploadingImage}
                    className="text-xs"
                  />
                  {uploadingImage && <RefreshCw className="w-4 h-4 animate-spin text-accent" />}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={submitting} className="bg-accent hover:bg-accent/90 text-white gap-2">
                {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {editingId ? "Enregistrer les modifications" : "Ajouter le membre"}
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

      {/* Liste des membres */}
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">Membres enregistrés ({members.length})</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Liste des profils actifs dans la base de données.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={loadMembers} disabled={loading} className="gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {members.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted-foreground">
              Aucun membre personnalisé n'est encore enregistré en base. Les profils par défaut du site sont actuellement affichés.
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
                      Modifier
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => m._id && handleDelete(m._id)} className="h-8 px-2 text-xs text-red-500 hover:text-red-600 gap-1">
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

export default BureauManagerTab;

