import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { membershipService } from "@/api/membershipService";
import { contactService } from "@/api/contactService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Users, 
  Mail, 
  RefreshCw, 
  CheckCircle,
  Home,
  TrendingUp,
  Clock,
  Image as ImageIcon
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import MembershipRequestsTable from "@/components/admin/MembershipRequestsTable";
import ContactMessagesTable from "@/components/admin/ContactMessagesTable";
import MembershipChart from "@/components/admin/MembershipChart";
import MediaManagerTab from "@/components/admin/MediaManagerTab";
import { Badge } from "@/components/ui/badge";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading, signOut } = useAdminAuth();

  const [membershipRequests, setMembershipRequests] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth-membre");
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [membershipsRes, messagesRes] = await Promise.all([
        membershipService.getMemberships({ limit: 100 }),
        contactService.getMessages({ limit: 100 }),
      ]);

      const normalizedMemberships = (membershipsRes.data || []).map((r: any) => ({
        id: r._id || r.id,
        first_name: r.firstName || r.first_name || "",
        last_name: r.lastName || r.last_name || "",
        email: r.email || "",
        phone: r.phone || "",
        nationality: r.nationality || "Congolaise",
        age: r.age || 0,
        profession: r.profession || "",
        organization: r.organization || "",
        address: r.address || "",
        member_type: r.memberType || r.member_type || "individuel",
        motivation: r.motivation || "",
        status: r.status || "pending",
        created_at: r.createdAt || r.created_at || new Date().toISOString(),
      }));

      const normalizedMessages = (messagesRes.data || []).map((m: any) => ({
        id: m._id || m.id,
        name: m.name || "",
        email: m.email || "",
        subject: m.subject || "",
        message: m.message || "",
        is_read: m.isRead !== undefined ? m.isRead : m.is_read ?? false,
        created_at: m.createdAt || m.created_at || new Date().toISOString(),
      }));

      setMembershipRequests(normalizedMemberships);
      setContactMessages(normalizedMessages);
    } catch {
      toast({
        title: "Erreur de chargement",
        description: "Impossible d'actualiser les données d'administration.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, fetchData]);

  const updateRequestStatus = async (id: string, newStatus: "pending" | "approved" | "rejected") => {
    try {
      await membershipService.updateStatus(id, newStatus);
      setMembershipRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      toast({
        title: "Statut mis à jour",
        description: `Demande marquée comme ${newStatus === "approved" ? "approuvée" : "rejetée"}.`,
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Échec de la mise à jour du statut.",
        variant: "destructive",
      });
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      await membershipService.deleteMembership(id);
      setMembershipRequests((prev) => prev.filter((r) => r.id !== id));
      toast({
        title: "Demande supprimée",
        description: "La demande d'adhésion a été définitivement supprimée.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la demande.",
        variant: "destructive",
      });
    }
  };

  const markMessageAsRead = async (id: string, isRead: boolean = true) => {
    try {
      await contactService.toggleReadStatus(id, isRead);
      setContactMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: isRead } : m))
      );
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'état du message.",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await contactService.deleteMessage(id);
      setContactMessages((prev) => prev.filter((m) => m.id !== id));
      toast({
        title: "Message supprimé",
        description: "Le message a été supprimé de la boîte de réception.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le message.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  // Indicateurs statistiques
  const pendingCount = membershipRequests.filter((r) => r.status === "pending").length;
  const approvedCount = membershipRequests.filter((r) => r.status === "approved").length;
  const unreadCount = contactMessages.filter((m) => !m.is_read).length;
  const approvalRate =
    membershipRequests.length > 0
      ? Math.round((approvedCount / membershipRequests.length) * 100)
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Barre supérieure */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-5 w-5" />
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="font-heading font-bold text-lg md:text-xl text-foreground">
              Dashboard Administration CDECO
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex bg-primary/10 text-primary">
              MERN Stack
            </Badge>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2 text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatsCard
            title="Total Adhésions"
            value={membershipRequests.length}
            subtitle="Toutes catégories confondues"
            icon={Users}
            iconClassName="bg-primary/10"
          />
          <StatsCard
            title="En attente"
            value={pendingCount}
            subtitle="Demandes à valider"
            icon={Clock}
            iconClassName="bg-amber-500/10"
          />
          <StatsCard
            title="Taux d'approbation"
            value={`${approvalRate}%`}
            subtitle={`${approvedCount} adhésions validées`}
            icon={TrendingUp}
            iconClassName="bg-emerald-500/10"
          />
          <StatsCard
            title="Messages"
            value={contactMessages.length}
            subtitle={`${unreadCount} non lu${unreadCount !== 1 ? "s" : ""}`}
            icon={Mail}
            iconClassName="bg-blue-500/10"
          />
        </div>

        {/* Évolution des adhésions */}
        <MembershipChart requests={membershipRequests} />

        {/* Onglets d'administration */}
        <Tabs defaultValue="memberships" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="memberships" className="gap-2">
              <Users className="h-4 w-4" />
              Demandes d'adhésion
              {pendingCount > 0 && (
                <Badge className="ml-1 h-5 min-w-5 px-1.5 flex items-center justify-center text-xs bg-amber-500 text-white">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <Mail className="h-4 w-4" />
              Messages
              {unreadCount > 0 && (
                <Badge className="ml-1 h-5 min-w-5 px-1.5 flex items-center justify-center text-xs bg-primary">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="media" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Médiathèque Cloudinary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="memberships">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Demandes d'adhésion</CardTitle>
                <CardDescription>Gérez et validez les adhésions des particuliers et entreprises.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <MembershipRequestsTable
                  requests={membershipRequests}
                  onUpdateStatus={updateRequestStatus}
                  onDelete={deleteRequest}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg">Messages de contact</CardTitle>
                <CardDescription>Consultez les messages reçus depuis le site officiel.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ContactMessagesTable
                  messages={contactMessages}
                  onMarkAsRead={markMessageAsRead}
                  onDelete={deleteMessage}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <MediaManagerTab />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CDECO — Chambre de Diplomatie Économique du Congo. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default Admin;
