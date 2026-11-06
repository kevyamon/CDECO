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
  LogIn,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const MemberSpace = () => {
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
        title: "Erreur",
        description: "Impossible de récupérer les informations d'adhésion.",
        variant: "destructive",
      });
      setMembershipRequest(null);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

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
          label: "Approuvée",
          icon: CheckCircle,
          className: "bg-emerald-100 text-emerald-700 border-emerald-200",
          description: "Félicitations ! Votre demande d'adhésion a été approuvée.",
          color: "text-emerald-600",
        };
      case "rejected":
        return {
          label: "Refusée",
          icon: XCircle,
          className: "bg-red-100 text-red-700 border-red-200",
          description: "Votre demande n'a pas été retenue. Contactez-nous pour plus d'informations.",
          color: "text-red-600",
        };
      default:
        return {
          label: "En attente",
          icon: Clock,
          className: "bg-amber-100 text-amber-700 border-amber-200",
          description: "Votre demande est en cours d'examen par notre équipe.",
          color: "text-amber-600",
        };
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Récemment";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <RefreshCw className="h-10 w-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/20 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-2">
                <ArrowLeft className="h-4 w-4" />
                Retour au site
              </Link>
              <h1 className="text-3xl font-heading font-bold">Espace Membre</h1>
              <p className="text-muted-foreground">Suivi de votre statut d'adhérent CDECO</p>
            </div>
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            )}
          </div>

          {!user && (
            <Card className="max-w-xl mx-auto shadow-sm">
              <CardHeader className="text-center">
                <LogIn className="h-10 w-10 text-primary mx-auto mb-2" />
                <CardTitle>Connexion requise</CardTitle>
                <CardDescription>
                  Connectez-vous avec l'adresse email utilisée lors de votre inscription pour accéder à votre espace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/auth-membre" className="block">
                  <Button className="w-full">Se connecter</Button>
                </Link>
                <Link to="/adhesion" className="block text-center text-sm text-primary hover:underline">
                  Pas encore inscrit ? Remplir le formulaire d'adhésion
                </Link>
              </CardContent>
            </Card>
          )}

          {isLoading && (
            <div className="flex justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!isLoading && hasSearched && !membershipRequest && user && (
            <Card className="text-center p-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <CardTitle className="text-xl mb-2">Aucune demande trouvée</CardTitle>
              <CardDescription className="mb-6">
                Aucune adhésion n'est associée à l'adresse <strong>{user.email}</strong>.
              </CardDescription>
              <Link to="/adhesion">
                <Button>Faire une demande d'adhésion</Button>
              </Link>
            </Card>
          )}

          {!isLoading && membershipRequest && (
            <div className="space-y-6">
              {(() => {
                const statusConfig = getStatusConfig(membershipRequest.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <Card className="shadow-sm overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                            <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-xl">Statut de votre demande</CardTitle>
                            <CardDescription>{statusConfig.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-sm px-3 py-1 ${statusConfig.className}`}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Transmise le {formatDate(membershipRequest.createdAt || membershipRequest.created_at)}</span>
                    </CardContent>
                  </Card>
                );
              })()}

              <Card className="shadow-sm">
                <CardHeader className="border-b bg-muted/20">
                  <CardTitle className="text-lg">Récapitulatif de votre profil</CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Nom et prénom</p>
                      <p className="font-medium">{membershipRequest.firstName || membershipRequest.first_name} {membershipRequest.lastName || membershipRequest.last_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{membershipRequest.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Téléphone</p>
                      <p className="font-medium">{membershipRequest.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                    <Building className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Organisation</p>
                      <p className="font-medium">{membershipRequest.organization || "Non spécifié"}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Adresse</p>
                      <p className="font-medium">{membershipRequest.address || "Non spécifiée"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MemberSpace;
