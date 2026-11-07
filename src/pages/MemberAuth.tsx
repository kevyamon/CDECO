import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { authService } from "@/api/authService";
import { z } from "zod";
import { ArrowLeft, Lock, Mail, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo-cdeco.webp";

const createAuthSchema = (isEn: boolean) =>
  z.object({
    email: z.string().trim().min(1, isEn ? "Username or email is required." : "L'identifiant ou l'email est requis."),
    password: z
      .string()
      .min(6, isEn ? "Password must be at least 6 characters." : "Le mot de passe doit contenir au moins 6 caractères."),
  });

const MemberAuth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Préchargement en arrière-plan du module Admin pour une redirection à 0ms
    const preloadAdmin = () => {
      import("@/pages/Admin");
    };
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(preloadAdmin);
    } else {
      setTimeout(preloadAdmin, 200);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!navigator.onLine) {
      toast({
        title: isEn ? "No Internet Connection" : "Connexion Internet absente",
        description: isEn
          ? "You are currently offline. Please check your network connection and try again."
          : "Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion réseau et réessayer.",
        variant: "destructive",
      });
      return;
    }

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

    try {
      const response = await authService.login(email, password);

      if (response.user.role === "admin") {
        toast({
          title: isEn ? "Admin Portal Access" : "Accès Administrateur",
          description: isEn ? "Welcome to CDECO management dashboard." : "Bienvenue dans le tableau de bord de gestion CDECO.",
        });
        navigate("/admin", { replace: true });
      } else {
        toast({
          title: isEn ? "Login Successful" : "Connexion réussie",
          description: isEn ? "Welcome to your member portal." : "Bienvenue dans votre espace membre.",
        });
        navigate("/espace-membre");
      }
    } catch (error: any) {
      if (!navigator.onLine || (error.code === "ERR_NETWORK" && !navigator.onLine)) {
        toast({
          title: isEn ? "No Internet Connection" : "Connexion Internet absente",
          description: isEn
            ? "Unable to reach the server. Please check your network connection."
            : "Impossible de joindre le serveur. Veuillez vérifier votre connexion Internet.",
          variant: "destructive",
        });
      } else if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        toast({
          title: isEn ? "Request Timed Out" : "Délai d'attente dépassé",
          description: isEn
            ? "The server took more than 60 seconds to respond. Please verify your connection and try again."
            : "Le serveur a mis plus de 60 secondes à répondre. Veuillez vérifier votre connexion et réessayer.",
          variant: "destructive",
        });
      } else if (!error.response) {
        toast({
          title: isEn ? "Service Temporarily Unavailable" : "Service temporairement indisponible",
          description: isEn
            ? "The server is taking longer than usual to respond. Please wait a few moments and try again."
            : "Le serveur met plus de temps que d'habitude à répondre. Veuillez patienter un instant et réessayer.",
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
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!navigator.onLine) {
      toast({
        title: isEn ? "No Internet Connection" : "Connexion Internet absente",
        description: isEn
          ? "You are currently offline. Please check your network connection and try again."
          : "Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion réseau et réessayer.",
        variant: "destructive",
      });
      return;
    }

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
      await authService.register(email, password);
      toast({
        title: isEn ? "Account Created" : "Compte créé",
        description: isEn ? "Your account was successfully registered. You can now log in." : "Votre compte a été créé. Vous pouvez désormais vous connecter.",
      });
      setMode("login");
    } catch (error: any) {
      if (!navigator.onLine) {
        toast({
          title: isEn ? "No Internet Connection" : "Connexion Internet absente",
          description: isEn ? "Network error. Please verify your connection." : "Erreur réseau. Veuillez vérifier votre connexion.",
          variant: "destructive",
        });
      } else {
        toast({
          title: isEn ? "Registration Failed" : "Échec d'inscription",
          description: error.response?.data?.message || (isEn ? "Failed to create account. Please try again." : "Impossible de créer le compte. Veuillez réessayer."),
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {isEn ? "Return to CDECO Home" : "Retour à l'accueil CDECO"}
      </Link>

      <Card className="w-full max-w-md shadow-xl border-border">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 rounded-2xl bg-primary/5 p-2 border border-primary/10 flex items-center justify-center">
              <img src={logo} alt="CDECO" className="h-full w-full object-contain" />
            </div>
          </div>
          <CardTitle className="font-heading text-2xl font-bold">
            {mode === "login"
              ? (isEn ? "CDECO Portal Sign In" : "Connexion Portail CDECO")
              : (isEn ? "Create Member Account" : "Créer un Compte Membre")}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {mode === "login"
              ? (isEn ? "Enter your credentials to access your member space" : "Saisissez vos identifiants pour accéder à votre espace membre")
              : (isEn ? "Fill in the form to register your account" : "Remplissez le formulaire pour enregistrer votre compte")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="member-email" className="text-xs font-semibold">
                {isEn ? "Username or Email Address" : "Identifiant ou Adresse Email"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="member-email"
                  type="text"
                  placeholder={isEn ? "user@org or identifier" : "user@org ou identifiant"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-password" className="text-xs font-semibold">
                {isEn ? "Password" : "Mot de passe"}
              </Label>
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
                <Label htmlFor="member-confirm-password" className="text-xs font-semibold">
                  {isEn ? "Confirm Password" : "Confirmer le mot de passe"}
                </Label>
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

            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-primary font-bold">
              {isLoading
                ? (isEn ? "Connecting..." : "Connexion en cours...")
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
