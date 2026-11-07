import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { membershipService } from "@/api/membershipService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  FileText,
  ArrowLeft,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";

const MemberSpace = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [membershipRequest, setMembershipRequest] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchMembershipByEmail = useCallback(async (email: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await membershipService.getMemberships({ search: email.toLowerCase().trim() });
      const found = res.data?.find(
        (r: any) => r.email.toLowerCase().trim() === email.toLowerCase().trim()
      );
      setMembershipRequest(found || null);
    } catch {
      toast({
        title: isEn ? "Error" : "Erreur",
        description: isEn ? "Unable to load membership details." : "Impossible de récupérer les informations d'adhésion.",
        variant: "destructive",
      });
      setMembershipRequest(null);
    } finally {
      setIsLoading(false);
    }
  }, [isEn, toast]);

  useEffect(() => {
    if (loading) return;
    if (user && isAdmin) {
      navigate("/admin");
      return;
    }
    if (user?.email && !isAdmin) {
      fetchMembershipByEmail(user.email);
    }
  }, [user, isAdmin, loading, fetchMembershipByEmail, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          label: isEn ? "Approved" : "Approuvée",
          icon: CheckCircle,
          className: "bg-emerald-100 text-emerald-700 border-emerald-200",
          description: isEn
            ? "Congratulations! Your membership request has been officially approved."
            : "Félicitations ! Votre demande d'adhésion a été approuvée.",
          color: "text-emerald-600",
        };
      case "rejected":
        return {
          label: isEn ? "Declined" : "Refusée",
          icon: XCircle,
          className: "bg-red-100 text-red-700 border-red-200",
          description: isEn
            ? "Your application was not accepted. Please reach out to us for more information."
            : "Votre demande n'a pas été retenue. Contactez-nous pour plus d'informations.",
          color: "text-red-600",
        };
      default:
        return {
          label: isEn ? "Under Review" : "En attente",
          icon: Clock,
          className: "bg-amber-100 text-amber-700 border-amber-200",
          description: isEn
            ? "Your application is currently being evaluated by our admissions board."
            : "Votre demande est en cours d'examen par notre équipe.",
          color: "text-amber-600",
        };
    }
  };

  const statusConfig = getStatusConfig(membershipRequest?.status || "pending");
  const StatusIcon = statusConfig.icon;

  return (
    <Layout>
      <div className="min-h-screen bg-muted/20 py-24 sm:py-32">
        <div className="container-cdeco px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary mb-2 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                {isEn ? "Back to Homepage" : "Retour à l'accueil"}
              </Link>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                {isEn ? "Member Portal" : "Espace Membre"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEn ? "Welcome," : "Bienvenue,"} <span className="font-semibold text-foreground">{user?.email}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => user?.email && fetchMembershipByEmail(user.email)}
                disabled={isLoading}
                className="gap-1.5 text-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                {isEn ? "Refresh" : "Actualiser"}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5 text-xs text-muted-foreground">
                <LogOut className="w-3.5 h-3.5" />
                {isEn ? "Sign Out" : "Déconnexion"}
              </Button>
            </div>
          </div>

          {/* Statut Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/20 border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base sm:text-lg">
                    {isEn ? "Membership Application Status" : "Statut de votre demande d'adhésion"}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {statusConfig.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className={`gap-1.5 px-3 py-1 text-xs font-semibold ${statusConfig.className}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  {statusConfig.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {membershipRequest ? (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                      <User className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{isEn ? "Full Name" : "Nom & Prénom"}</p>
                        <p className="font-semibold text-sm">
                          {membershipRequest.firstName} {membershipRequest.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                      <Building className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{isEn ? "Category" : "Catégorie"}</p>
                        <p className="font-semibold text-sm">
                          {membershipRequest.memberType || (isEn ? "General Member" : "Membre Adhérent")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                      <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-semibold text-sm">{membershipRequest.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                      <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{isEn ? "Phone" : "Téléphone"}</p>
                        <p className="font-semibold text-sm">{membershipRequest.phone || "-"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                      <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{isEn ? "Address / Headquarters" : "Adresse / Siège"}</p>
                        <p className="font-semibold text-sm">{membershipRequest.address || "-"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40">
                      <Calendar className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{isEn ? "Application Date" : "Date de soumission"}</p>
                        <p className="font-semibold text-sm">
                          {new Date(membershipRequest.createdAt).toLocaleDateString(isEn ? "en-US" : "fr-FR")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {membershipRequest.motivation && (
                    <div className="p-4 rounded-xl bg-muted/40 space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                        <FileText className="w-3.5 h-3.5 text-accent" />
                        {isEn ? "Expressed Motivation" : "Motivation exprimée"}
                      </p>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                        "{membershipRequest.motivation}"
                      </p>
                    </div>
                  )}
                </div>
              ) : hasSearched ? (
                <div className="text-center py-8 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {isEn
                      ? "No active membership application was found for this email address."
                      : "Aucun dossier d'adhésion en cours n'a été trouvé avec cette adresse email."}
                  </p>
                  <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-primary font-bold">
                    <Link to="/adhesion">
                      {isEn ? "Submit Membership Application" : "Déposer une demande d'adhésion"}
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  {isEn ? "Loading dossier..." : "Chargement du dossier..."}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MemberSpace;
