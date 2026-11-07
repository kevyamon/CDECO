import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, Clock, Globe, Facebook, Linkedin, Twitter, Save, RefreshCw, GraduationCap } from "lucide-react";
import { settingsService, ContactSettings, DEFAULT_CONTACT_SETTINGS } from "@/api/settingsService";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AdminFormSkeleton } from "./AdminSkeletonLoader";

export const ContactSettingsTab: FC = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { updateSettingsLocal } = useSiteSettings();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<ContactSettings>(DEFAULT_CONTACT_SETTINGS);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    settingsService
      .getContactSettings()
      .then((data) => {
        if (isMounted && data) {
          setFormData(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field: keyof ContactSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await settingsService.updateContactSettings(formData);
      updateSettingsLocal(updated || formData);
      toast({
        title: isEn ? "Settings Saved!" : "Paramètres enregistrés !",
        description: isEn
          ? "Official contact details and KAMPUS CDECO info have been updated."
          : "Les informations de contact et les données KAMPUS CDECO ont été mises à jour.",
      });
    } catch {
      toast({
        title: isEn ? "Error" : "Erreur",
        description: isEn ? "Failed to save settings." : "Impossible d'enregistrer les paramètres.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-border shadow-sm mb-6">
      <CardHeader className="bg-muted/20 border-b pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              Paramètres des Coordonnées & KAMPUS CDECO
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Modifiez l'adresse, les emails, réseaux sociaux et informations du Directeur KAMPUS CDECO.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {loading ? (
          <AdminFormSkeleton />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Téléphone & Email */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2 pb-1 border-b">
                <Mail className="w-4 h-4 text-accent" />
                Téléphone & Messagerie Officielle
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone" className="text-xs font-semibold">Téléphone Principal</Label>
                  <Input
                    id="contact-phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+242 05 595 8119"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className="text-xs font-semibold">Email Professionnel</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="contact@cdeco.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Adresse physique */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2 pb-1 border-b">
                <MapPin className="w-4 h-4 text-accent" />
                Localisation & Siège
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-addr-fr" className="text-xs font-semibold">Adresse (Français)</Label>
                  <Input
                    id="contact-addr-fr"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Moungali Centre-Ville, Brazzaville, République du Congo"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-addr-en" className="text-xs font-semibold">Adresse (English)</Label>
                  <Input
                    id="contact-addr-en"
                    value={formData.addressEn}
                    onChange={(e) => handleChange("addressEn", e.target.value)}
                    placeholder="Moungali Downtown, Brazzaville, Republic of the Congo"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Horaires */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2 pb-1 border-b">
                <Clock className="w-4 h-4 text-accent" />
                Horaires d'Ouverture des Bureaux
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-hours-fr" className="text-xs font-semibold">Horaires (Français)</Label>
                  <Input
                    id="contact-hours-fr"
                    value={formData.hours}
                    onChange={(e) => handleChange("hours", e.target.value)}
                    placeholder="Lun - Ven : 8h00 - 17h00 | Sam : 9h00 - 13h00"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-hours-en" className="text-xs font-semibold">Horaires (English)</Label>
                  <Input
                    id="contact-hours-en"
                    value={formData.hoursEn}
                    onChange={(e) => handleChange("hoursEn", e.target.value)}
                    placeholder="Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Réseaux Sociaux */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2 pb-1 border-b">
                <Globe className="w-4 h-4 text-accent" />
                Réseaux Sociaux & Présence en Ligne
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                    Page LinkedIn
                  </Label>
                  <Input
                    value={formData.linkedin}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                    Page Facebook
                  </Label>
                  <Input
                    value={formData.facebook}
                    onChange={(e) => handleChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Twitter className="w-3.5 h-3.5 text-foreground" />
                    Compte Twitter / X
                  </Label>
                  <Input
                    value={formData.twitter}
                    onChange={(e) => handleChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-accent" />
                    Site Web Officiel
                  </Label>
                  <Input
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="https://cdeco.org"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: KAMPUS CDECO Configuration Dynamique */}
            <div className="space-y-3 pt-2">
              <h4 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2 pb-1 border-b">
                <GraduationCap className="w-4 h-4 text-accent" />
                KAMPUS CDECO — Directeur & Coordonnées
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Nom du Directeur KAMPUS</Label>
                  <Input
                    value={formData.kampusDirectorName || ""}
                    onChange={(e) => handleChange("kampusDirectorName", e.target.value)}
                    placeholder="Steve Patrick MBOUKOU"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">URL Photo du Directeur</Label>
                  <Input
                    value={formData.kampusDirectorImage || ""}
                    onChange={(e) => handleChange("kampusDirectorImage", e.target.value)}
                    placeholder="https://... ou laissez vide pour la photo par défaut"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Titre du poste (Français)</Label>
                  <Input
                    value={formData.kampusDirectorTitle || ""}
                    onChange={(e) => handleChange("kampusDirectorTitle", e.target.value)}
                    placeholder="Directeur KAMPUS CDECO"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Titre du poste (English)</Label>
                  <Input
                    value={formData.kampusDirectorTitleEn || ""}
                    onChange={(e) => handleChange("kampusDirectorTitleEn", e.target.value)}
                    placeholder="Director of KAMPUS CDECO"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-xs font-semibold">Biographie / Rôle (Français)</Label>
                  <Textarea
                    value={formData.kampusDirectorBio || ""}
                    onChange={(e) => handleChange("kampusDirectorBio", e.target.value)}
                    placeholder="Chargé de l'entrepreneuriat des jeunes..."
                    rows={2}
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-xs font-semibold">Biographie / Rôle (English)</Label>
                  <Textarea
                    value={formData.kampusDirectorBioEn || ""}
                    onChange={(e) => handleChange("kampusDirectorBioEn", e.target.value)}
                    placeholder="In charge of youth entrepreneurship..."
                    rows={2}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Adresse KAMPUS CDECO</Label>
                  <Input
                    value={formData.kampusAddress || ""}
                    onChange={(e) => handleChange("kampusAddress", e.target.value)}
                    placeholder="n°40 Av. des 3 martyrs, Moungali Brazzaville"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Email KAMPUS</Label>
                  <Input
                    value={formData.kampusEmail || ""}
                    onChange={(e) => handleChange("kampusEmail", e.target.value)}
                    placeholder="contact@cdeco.com"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-xs font-semibold">Site Web KAMPUS</Label>
                  <Input
                    value={formData.kampusWebsite || ""}
                    onChange={(e) => handleChange("kampusWebsite", e.target.value)}
                    placeholder="www.cdeco.com"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={saving} className="w-full sm:w-auto gap-2 bg-accent hover:bg-accent/90 text-white font-semibold">
                {saving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Enregistrement en cours...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Enregistrer toutes les coordonnées
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactSettingsTab;
