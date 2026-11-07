import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown, UserCircle } from "lucide-react";
import logoCdeco from "@/assets/logo-cdeco.png";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCdecoOpen, setIsCdecoOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { isAdmin } = useAuth();

  const [currentLang, setCurrentLang] = useState(() => {
    return (i18n.language || "fr").toUpperCase().substring(0, 2);
  });

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang.toUpperCase());
    try {
      localStorage.setItem("cdeco_language", lang);
    } catch {}
  };

  useEffect(() => {
    const onLanguageChanged = (lng: string) => {
      setCurrentLang((lng || "fr").toUpperCase().substring(0, 2));
    };
    i18n.on("languageChanged", onLanguageChanged);
    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsCdecoOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const cdecoSubmenu = [
    { name: t("nav.presentation", "Présentation"), href: "/cdeco/presentation" },
    { name: t("nav.presidentMessage", "Message du Président"), href: "/cdeco/message-president" },
    { name: t("nav.missions", "Missions"), href: "/cdeco/missions" },
    { name: t("nav.bureau", "Bureau"), href: "/cdeco/bureau" },
    { name: t("nav.events", "Événements"), href: "/evenements" },
    { name: t("nav.resources", "Ressources"), href: "/ressources" },
  ];

  const navLinks = [
    { name: t("nav.home", "Accueil"), href: "/" },
    { name: t("nav.congo", "Le Congo"), href: "/le-congo" },
    { name: "KAMPUS CDECO", href: "/kampus-cdeco" },
    { name: t("nav.events", "Événements"), href: "/evenements" },
    { name: t("nav.contact", "Contact"), href: "/contact" },
  ];

  const isCdecoActive = location.pathname.startsWith("/cdeco");

  return (
    <header
      role="banner"
      aria-label="En-tête principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav role="navigation" aria-label="Navigation principale" className="container-cdeco px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group focus-visible:outline-primary">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-white/95 p-1 shadow-sm border border-white/20 flex items-center justify-center shrink-0">
                <img src={logoCdeco} alt="Logo CDECO" width={48} height={48} className="h-full w-full object-contain rounded-lg" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span
                className={`font-heading font-bold text-lg sm:text-xl tracking-tight transition-colors ${
                  isScrolled ? "text-primary" : "text-white"
                }`}
              >
                CDECO
              </span>
              <span
                className={`text-[10px] sm:text-xs font-medium tracking-wide transition-colors ${
                  isScrolled ? "text-muted-foreground" : "text-white/80"
                }`}
              >
                {t("hero.badge", "Diplomatie Économique")}
              </span>
            </div>
          </Link>

          {/* Navigation Bureau */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                location.pathname === "/"
                  ? isScrolled
                    ? "text-primary font-semibold"
                    : "text-accent font-semibold"
                  : isScrolled
                  ? "text-foreground/80 hover:text-primary hover:bg-secondary/50"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {t("nav.home", "Accueil")}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                    isCdecoActive
                      ? isScrolled
                        ? "text-primary font-semibold"
                        : "text-accent font-semibold"
                      : isScrolled
                      ? "text-foreground/80 hover:text-primary hover:bg-secondary/50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>CDECO</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card z-50 w-64">
                {cdecoSubmenu.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className={`w-full cursor-pointer ${
                        location.pathname === item.href ? "text-primary font-semibold" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  location.pathname === link.href
                    ? isScrolled
                      ? "text-primary font-semibold"
                      : "text-accent font-semibold"
                    : isScrolled
                    ? "text-foreground/80 hover:text-primary hover:bg-secondary/50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Boutons Bureau */}
          <div className="hidden lg:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-1.5 px-2.5 ${
                    isScrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-semibold text-xs">{currentLang}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card z-50">
                <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("en")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to={isAdmin ? "/admin" : "/espace-membre"}>
              <Button variant="outline" size="sm" className="gap-2">
                <UserCircle className="h-4 w-4" />
                {t("nav.memberSpace", "Espace Membre")}
              </Button>
            </Link>

            <Link to="/adhesion">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md font-semibold px-6">
                {t("nav.join", "Adhérer")}
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"
            }`}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <NavbarMobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isCdecoOpen={isCdecoOpen}
          setIsCdecoOpen={setIsCdecoOpen}
          isCdecoActive={isCdecoActive}
          pathname={location.pathname}
          navLinks={navLinks}
          cdecoSubmenu={cdecoSubmenu}
          currentLang={currentLang}
          handleLanguageChange={handleLanguageChange}
          t={t}
          isAdmin={isAdmin}
        />
      </nav>
    </header>
  );
};

export default Navbar;
