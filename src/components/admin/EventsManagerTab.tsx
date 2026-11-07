import { FC, useState, useEffect } from "react";
import { eventService, CdecoEvent } from "@/api/eventService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, PlusCircle, Edit2, Trash2, RefreshCw, Check, Sparkles, MapPin, X } from "lucide-react";
import { DEFAULT_UPCOMING_EVENTS, DEFAULT_HIGHLIGHT_EVENTS, DEFAULT_PAST_EVENTS } from "@/components/events/defaultEventsData";

export const EventsManagerTab: FC = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<"upcoming" | "highlight" | "past">("upcoming");
  const [events, setEvents] = useState<CdecoEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Formulaire d'événement
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [date, setDate] = useState("");
  const [dateEn, setDateEn] = useState("");
  const [location, setLocation] = useState("");
  const [locationEn, setLocationEn] = useState("");
  const [type, setType] = useState("Conférence");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [image, setImage] = useState("");
  const [impact, setImpact] = useState("");
  const [impactEn, setImpactEn] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getEvents();
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        // Initialise avec les événements par défaut
        setEvents([...DEFAULT_UPCOMING_EVENTS, ...DEFAULT_HIGHLIGHT_EVENTS, ...DEFAULT_PAST_EVENTS]);
      }
    } catch {
      setEvents([...DEFAULT_UPCOMING_EVENTS, ...DEFAULT_HIGHLIGHT_EVENTS, ...DEFAULT_PAST_EVENTS]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setTitleEn("");
    setDate("");
    setDateEn("");
    setLocation("");
    setLocationEn("");
    setType("Conférence");
    setDescription("");
    setDescriptionEn("");
    setImage("");
    setImpact("");
    setImpactEn("");
    setShowForm(false);
  };

  const handleEdit = (ev: CdecoEvent) => {
    setEditingId(String(ev._id || ev.id));
    setTitle(ev.title || "");
    setTitleEn(ev.titleEn || "");
    setDate(ev.date || "");
    setDateEn(ev.dateEn || "");
    setLocation(ev.location || "");
    setLocationEn(ev.locationEn || "");
    setType(ev.type || "Conférence");
    setDescription(ev.description || "");
    setDescriptionEn(ev.descriptionEn || "");
    setImage(ev.image || "");
    setImpact(ev.impact || "");
    setImpactEn(ev.impactEn || "");
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast({ title: "Titre requis", variant: "destructive" });
      return;
    }

    setSaving(true);
    const payload: Partial<CdecoEvent> = {
      title,
      titleEn: titleEn || title,
      category: activeCategory,
      date,
      dateEn: dateEn || date,
      location,
      locationEn: locationEn || location,
      type,
      description,
      descriptionEn,
      image,
      impact,
      impactEn,
    };

    try {
      if (editingId && editingId.match(/^[0-9a-fA-F]{24}$/)) {
        await eventService.updateEvent(editingId, payload);
        toast({ title: "Événement mis à jour avec succès !" });
      } else {
        await eventService.createEvent(payload);
        toast({ title: "Nouvel événement créé et publié !" });
      }
      resetForm();
      fetchEvents();
    } catch {
      toast({ title: "Erreur lors de l'enregistrement", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!id || !confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
    try {
      if (String(id).match(/^[0-9a-fA-F]{24}$/)) {
        await eventService.deleteEvent(String(id));
      }
      setEvents((prev) => prev.filter((e) => String(e._id || e.id) !== String(id)));
      toast({ title: "Événement supprimé !" });
    } catch {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  const currentEvents = events.filter((e) => e.category === activeCategory);

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/20 border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Gestionnaire des Événements & Moments Forts
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Ajoutez, modifiez ou supprimez les événements à venir, les moments forts avec page dédiée, et la rétrospective.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => { resetForm(); setShowForm(!showForm); }}
                className="gap-1.5 bg-accent hover:bg-accent/90 text-white font-semibold text-xs"
              >
                {showForm ? <X className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
                {showForm ? "Fermer formulaire" : "Ajouter un événement"}
              </Button>
            </div>
          </div>

          {/* Onglets de filtrage */}
          <div className="flex flex-wrap gap-2 pt-4">
            <Button
              type="button"
              size="sm"
              variant={activeCategory === "upcoming" ? "default" : "outline"}
              className="text-xs h-8"
              onClick={() => { setActiveCategory("upcoming"); resetForm(); }}
            >
              À venir ({events.filter(e => e.category === "upcoming").length})
            </Button>
            <Button
              type="button"
              size="sm"
              variant={activeCategory === "highlight" ? "default" : "outline"}
              className="text-xs h-8"
              onClick={() => { setActiveCategory("highlight"); resetForm(); }}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-accent" />
              Moments Forts & Sommets ({events.filter(e => e.category === "highlight").length})
            </Button>
            <Button
              type="button"
              size="sm"
              variant={activeCategory === "past" ? "default" : "outline"}
              className="text-xs h-8"
              onClick={() => { setActiveCategory("past"); resetForm(); }}
            >
              Événements Précédents ({events.filter(e => e.category === "past").length})
            </Button>
          </div>
        </CardHeader>

        {/* Formulaire d'ajout / modification */}
        {showForm && (
          <CardContent className="p-4 sm:p-6 bg-accent/5 border-b border-border">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-accent" />
                {editingId ? "Modifier l'événement" : "Créer un nouvel événement"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Titre en Français *</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ex: Forum Économique Congo-Europe 2026" required />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Titre en Anglais (English)</Label>
                  <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="ex: Congo-Europe Economic Forum 2026" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Date (ex: 15-17 Mars 2026)</Label>
                  <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date en Français" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Date en Anglais (ex: March 15-17)</Label>
                  <Input value={dateEn} onChange={(e) => setDateEn(e.target.value)} placeholder="Date in English" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Lieu / Ville (ex: Brazzaville, Paris)</Label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lieu de l'événement" />
                </div>
              </div>

              {activeCategory === "highlight" && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">URL de la Photo d'illustration</Label>
                  <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://... (copiez un lien depuis l'onglet Médiathèque)" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Description / Récit (Français)</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Présentation complète pour la page dédiée..." />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Description / Story (English)</Label>
                  <Textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} rows={3} placeholder="Full event description for English visitors..." />
                </div>
              </div>

              {activeCategory === "past" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Impact / Bilan (Français)</Label>
                    <Input value={impact} onChange={(e) => setImpact(e.target.value)} placeholder="ex: 120 jeunes formés, 15 startups incubées" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Impact / Results (English)</Label>
                    <Input value={impactEn} onChange={(e) => setImpactEn(e.target.value)} placeholder="ex: 120 youth trained, 15 startups incubated" />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={saving} className="bg-accent hover:bg-accent/90 text-white font-semibold text-xs">
                  {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Check className="w-3.5 h-3.5 mr-1" />}
                  {editingId ? "Enregistrer les modifications" : "Publier l'événement"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={resetForm} className="text-xs">
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* Liste des événements existants */}
        <CardContent className="p-4 sm:p-6">
          {loading ? (
            <div className="py-8 text-center text-xs text-muted-foreground">Chargement des événements...</div>
          ) : currentEvents.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">Aucun événement enregistré dans cette catégorie.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentEvents.map((ev, index) => {
                const id = ev._id || ev.id || index;
                return (
                  <div key={String(id)} className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between space-y-3">
                    <div>
                      {ev.image && (
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-2">
                          <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold text-accent">{ev.date || "Date non définie"}</span>
                        <Badge variant="secondary" className="text-[10px]">{ev.type || "Événement"}</Badge>
                      </div>
                      <h4 className="font-heading font-semibold text-sm text-foreground line-clamp-1">{ev.title}</h4>
                      {ev.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                          <MapPin className="w-3 h-3 text-destructive shrink-0" />
                          {ev.location}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                        {ev.impact || ev.description || "Aucune description"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <Button type="button" size="sm" variant="outline" onClick={() => handleEdit(ev)} className="flex-1 text-xs h-7 gap-1">
                        <Edit2 className="w-3 h-3 text-accent" />
                        Modifier
                      </Button>
                      <Button type="button" size="sm" variant="ghost" onClick={() => handleDelete(id)} className="text-xs h-7 text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsManagerTab;

