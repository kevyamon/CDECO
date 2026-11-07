import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/api/authService";
import apiClient from "@/api/client";
import logoCdeco from "@/assets/logo-cdeco.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const createAuthSchema = (isEn: boolean) =>
  z.object({
    email: z
      .string()
      .min(3, isEn ? "Please provide a valid username or email" : "Veuillez renseigner un identifiant ou un email valide")
      .toLowerCase()
      .trim(),
    password: z.string().min(1, isEn ? "Password is required" : "Le mot de passe est requis"),
  });

const MemberAuth = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

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

    const authSchema = createAuthSchema(isEn);
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: isEn ? "Validation Error" : "Validation",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsServerWaking(false);

    wakingTimerRef.current = setTimeout(() => {
      setIsServerWaking(true);
    }, 3500);

    try {
      const response = await authService.login(email, password);
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);

      if (response.user.role === "admin") {
        toast({
          title: isEn ? "Admin Portal Access" : "Accès Administrateur",
          description: isEn ? "Welcome to CDECO management dashboard." : "Bienvenue dans le tableau de bord de gestion CDECO.",
        });
        navigate("/admin");
      } else {
        toast({
          title: isEn ? "Login Successful" : "Connexion réussie",
          description: isEn ? "Welcome to your member portal." : "Bienvenue dans votre espace membre.",
        });
        navigate("/espace-membre");
      }
    } catch (error: any) {
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);
      setIsServerWaking(false);

      if (!error.response) {
        toast({
          title: isEn ? "Server starting up" : "Serveur en cours de démarrage",
          description: isEn
            ? "The secure backend cloud server is waking up on Render. Please hold on 15 to 25 seconds then try again."
            : "Le serveur sécurisé est en cours de réveil sur Render (cloud). Veuillez patienter 15 à 25 secondes puis réessayer.",
          variant: "destructive",
        });
      } else if (error.response.status === 429) {
        toast({
          title: isEn ? "Rate Limit Exceeded" : "Sécurité / Limite de débit",
          description: error.response.data?.message || (isEn ? "Too many attempts. Please pause a moment before retrying." : "Trop de tentatives consécutives. Veuillez patienter avant de réessayer."),
          variant: "destructive",
        });
      } else if (error.response.status === 401 || error.response.status === 400) {
        toast({
          title: isEn ? "Authentication Error" : "Erreur d'authentification",
          description: error.response.data?.message || (isEn ? "Invalid credentials." : "Identifiant ou mot de passe incorrect."),
          variant: "destructive",
        });
      } else {
        toast({
          title: isEn ? "Connection Error" : "Erreur de connexion",
          description: error.response.data?.message || (isEn ? "Failed to communicate with the server." : "Une erreur est survenue lors de la communication avec le serveur."),
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

    const authSchema = createAuthSchema(isEn);
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: isEn ? "Validation Error" : "Validation",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: isEn ? "Passwords do not match" : "Mots de passe non identiques",
        description: isEn ? "Please make sure both passwords match exactly." : "Veuillez saisir deux mots de passe identiques.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await authService.login(email, password);
      toast({
        title: isEn ? "Account Configured" : "Compte configuré",
        description: isEn ? "Your member credentials are ready." : "Votre compte membre est opérationnel.",
      });
      navigate("/espace-membre");
    } catch {
      toast({
        title: isEn ? "Information" : "Information",
        description: isEn ? "Your account will be activated once your membership application is approved." : "Votre compte sera validé dès l'approbation de votre adhésion par le secrétariat.",
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
          {isEn ? "Return to CDECO Home" : "Retour au site CDECO"}
        </Link>
      </div>
      <Card className="w-full max-w-md shadow-md border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 h-16 w-16 rounded-2xl bg-white shadow-sm border border-border p-1.5 flex items-center justify-center overflow-hidden">
            <img src={logoCdeco} alt="Logo CDECO" className="h-full w-full object-contain rounded-xl" />
          </div>
          <CardTitle className="text-2xl font-heading">
            {mode === "signup"
              ? (isEn ? "Create Member Account" : "Créer un compte membre")
              : (isEn ? "CDECO Portal Sign In" : "Connexion CDECO")}
          </CardTitle>
          <CardDescription>
            {mode === "signup"
              ? (isEn ? "Create your login to monitor your membership status" : "Créez votre compte pour suivre le statut de votre demande d'adhésion")
              : (isEn ? "Enter your credentials to access your member space" : "Renseignez vos identifiants pour accéder à votre espace")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="member-email">{isEn ? "Username or Email Address" : "Identifiant ou Adresse Email"}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="member-email"
                  type="text"
                  placeholder={isEn ? "your username or email" : "votre identifiant ou email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-password">{isEn ? "Password" : "Mot de passe"}</Label>
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
                  autoComplete="current-password"
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
                <Label htmlFor="member-confirm-password">{isEn ? "Confirm Password" : "Confirmer le mot de passe"}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="member-confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                </div>
              </div>
            )}

            {isServerWaking && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                <span>
                  {isEn
                    ? "Backend cloud server is waking up on Render. Please hold on a few seconds..."
                    : "Le serveur cloud sécurisé se réveille sur Render. Veuillez patienter quelques secondes..."}
                </span>
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-primary font-bold">
              {isLoading
                ? (isEn ? "Verifying..." : "Vérification en cours...")
                : mode === "signup"
                ? (isEn ? "Create Account" : "Créer mon compte")
                : (isEn ? "Sign In" : "Se connecter")}
            </Button>

            <div className="text-center pt-2 text-xs">
              {mode === "signup" ? (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary hover:underline font-semibold"
                >
                  {isEn ? "Already have an account? Sign in" : "Déjà un compte ? Se connecter"}
                </button>
              ) : (
                <div className="flex flex-col gap-1.5 text-muted-foreground">
                  <Link to="/adhesion" className="text-accent hover:underline font-semibold">
                    {isEn ? "Not a member yet? Apply online" : "Pas encore membre ? Adhérer en ligne"}
                  </Link>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberAuth;
