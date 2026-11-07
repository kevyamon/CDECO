import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/api/authService";
import apiClient from "@/api/client";
import logoCdeco from "@/assets/logo-cdeco.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const authSchema = z.object({
  email: z.string().min(3, "Veuillez renseigner un identifiant ou un email valide").toLowerCase().trim(),
  password: z.string().min(1, "Le mot de passe est requis"),
});

const MemberAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading } = useAuth();
  const [searchParams] = useSearchParams();

  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerWaking, setIsServerWaking] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const wakingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Réveil silencieux anticipé de l'instance cloud Render dès l'accès à la page
  useEffect(() => {
    apiClient.get("/health").catch(() => {});
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/espace-membre");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsServerWaking(false);

    // Déclenche un indicateur prévenant après 3.5s si Render est en phase de boot
    wakingTimerRef.current = setTimeout(() => {
      setIsServerWaking(true);
    }, 3500);

    try {
      const response = await authService.login(email, password);
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);

      if (response.user.role === "admin") {
        toast({
          title: "Accès Administrateur",
          description: "Bienvenue dans le tableau de bord de gestion CDECO.",
        });
        navigate("/admin");
      } else {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace membre.",
        });
        navigate("/espace-membre");
      }
    } catch (error: any) {
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);
      setIsServerWaking(false);

      if (!error.response) {
        toast({
          title: "Serveur en cours de démarrage",
          description: "Le serveur sécurisé est en cours de réveil sur Render (cloud). Veuillez patienter 15 à 25 secondes puis réessayer.",
          variant: "destructive",
        });
      } else if (error.response.status === 429) {
        toast({
          title: "Sécurité / Limite de débit",
          description: error.response.data?.message || "Trop de tentatives consécutives. Veuillez patienter avant de réessayer.",
          variant: "destructive",
        });
      } else if (error.response.status === 401 || error.response.status === 400) {
        toast({
          title: "Erreur d'authentification",
          description: error.response.data?.message || "Identifiant ou mot de passe incorrect.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur de connexion",
          description: error.response.data?.message || "Une erreur est survenue lors de la communication avec le serveur.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setIsServerWaking(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Mots de passe non identiques",
        description: "Veuillez saisir deux mots de passe identiques.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Inscription membre via endpoint d'authentification
      await authService.login(email, password);
      toast({
        title: "Compte configuré",
        description: "Votre compte membre est opérationnel.",
      });
      navigate("/espace-membre");
    } catch (error: any) {
      toast({
        title: "Information",
        description: "Votre compte sera validé dès l'approbation de votre adhésion par le secrétariat.",
      });
      navigate("/adhesion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Retour au site CDECO
        </Link>
      </div>
      <Card className="w-full max-w-md shadow-md border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 h-16 w-16 rounded-2xl bg-white shadow-sm border border-border p-1.5 flex items-center justify-center overflow-hidden">
            <img src={logoCdeco} alt="Logo CDECO" className="h-full w-full object-contain rounded-xl" />
          </div>
          <CardTitle className="text-2xl font-heading">
            {mode === "signup" ? "Créer un compte membre" : "Connexion CDECO"}
          </CardTitle>
          <CardDescription>
            {mode === "signup"
              ? "Créez votre compte pour suivre le statut de votre demande d'adhésion"
              : "Renseignez vos identifiants pour accéder à votre espace"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="member-email">Identifiant ou Adresse Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="member-email"
                  type="text"
                  placeholder="votre identifiant ou email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="member-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="member-confirm-password">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="member-confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full relative" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isServerWaking ? "Réveil du serveur Render..." : "Connexion en cours..."}
                </span>
              ) : mode === "signup" ? (
                "Créer mon compte"
              ) : (
                "Se connecter"
              )}
            </Button>
            {isLoading && isServerWaking && (
              <p className="text-xs text-center text-amber-600 dark:text-amber-400 animate-pulse pt-1">
                Le serveur sécurisé sort de veille (Render cloud). Veuillez patienter quelques secondes...
              </p>
            )}

            <div className="text-center text-sm text-muted-foreground pt-2">
              {mode === "signup" ? (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary hover:underline"
                >
                  Déjà un compte ? Se connecter
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-primary hover:underline"
                >
                  Pas encore de compte ? S'inscrire
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberAuth;
