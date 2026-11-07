import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/assets/logo-cdeco.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import FooterMobileAccordion from "./FooterMobileAccordion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const { settings } = useSiteSettings();
  const isEn = i18n.language === "en";
  const currentAddress = isEn ? settings.addressEn || settings.address : settings.address;

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: t("nav.home", "Accueil"), href: "/" },
    { name: t("nav.congo", "Le Congo-Brazzaville"), href: "/le-congo" },
    { name: t("nav.presentation", "Présentation"), href: "/cdeco/presentation" },
    { name: t("nav.bureau", "Bureau"), href: "/cdeco/bureau" },
    { name: t("nav.missions", "Missions"), href: "/cdeco/missions" },
    { name: t("nav.events", "Événements"), href: "/evenements" },
    { name: t("nav.resources", "Ressources"), href: "/ressources" },
    { name: "KAMPUS CDECO", href: "/kampus-cdeco" },
    { name: t("nav.contact", "Contact"), href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: settings.linkedin || "https://www.linkedin.com/company/chambre-de-diplomatie-economique-du-congo/",
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: settings.facebook || "https://www.facebook.com/share/1B3SMHVzWk/?mibextid=wwXIfr",
      label: "Facebook",
    },
    { icon: Twitter, href: settings.twitter || "https://twitter.com/cdeco", label: "Twitter" },
  ];

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-heading font-bold text-lg flex items-center gap-2 text-white">
      <div className="w-1 h-6 bg-accent rounded-full" />
      {children}
    </h3>
  );

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      aria-label="Pied de page CDECO"
      className="bg-primary text-white relative overflow-hidden"
    >
      <div className="container-cdeco py-8 md:py-16 px-4 sm:px-6 relative z-10">
        {/* ========================================================= */}
        {/* VUE MOBILE - Entièrement Rétractable                      */}
        {/* ========================================================= */}
        <div className="md:hidden">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-sm transition-all duration-300">
            {/* Barre de contrôle rétractable (toujours visible) */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-10 w-10 rounded-xl overflow-hidden bg-white/10 p-1 border border-white/20 flex items-center justify-center shrink-0">
                  <img
                    src={logo}
                    alt="CDECO"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain rounded-lg"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-bold text-base text-white tracking-wide">CDECO</span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold">
                      {isEn ? "Footer" : "Pied de page"}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70 truncate">
                    {t("footer.slogan", "Agir localement. Rayonner globalement.")}
                  </p>
                </div>
              </div>

              {/* Bouton pour Déplier / Replier */}
              <button
                type="button"
                onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-all duration-200 shadow-md shrink-0 active:scale-95"
                aria-expanded={isMobileExpanded}
                aria-controls="mobile-footer-expanded-content"
              >
                <span>{isMobileExpanded ? (isEn ? "Replier" : "Replier") : (isEn ? "Déplier" : "Déplier")}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                    isMobileExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Indication visuelle si rétracté */}
            {!isMobileExpanded && (
              <p className="text-[11px] text-white/50 mt-2.5 pt-2 border-t border-white/10 text-center">
                {isEn
                  ? "Tap \"Déplier\" to view navigation, contact & partner links"
                  : "Touchez « Déplier » pour afficher la navigation, les contacts et liens utiles"}
              </p>
            )}

            {/* Contenu dépliable avec animation fluide */}
            <div
              id="mobile-footer-expanded-content"
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isMobileExpanded
                  ? "max-h-[1600px] opacity-100 mt-4 pt-4 border-t border-white/10"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <div className="space-y-4">
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  {t(
                    "footer.description",
                    "La CDECO œuvre pour le rayonnement économique du Congo en facilitant les partenariats stratégiques."
                  )}
                </p>

                {/* Accordéons mobiles (Vision, Navigation, Coordonnées) */}
                <FooterMobileAccordion
                  quickLinks={quickLinks}
                  settings={settings}
                  currentAddress={currentAddress}
                  socialLinks={socialLinks}
                />

                {/* Bouton rapide de repli en bas du bloc déplié */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setIsMobileExpanded(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium transition-colors"
                  >
                    <ChevronUp className="h-3.5 w-3.5 text-accent" />
                    <span>{isEn ? "Replier le pied de page" : "Replier le pied de page"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VUE DESKTOP - Grille à 4 colonnes                         */}
        {/* ========================================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Colonne 1 : Présentation & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-white/10 p-1 border border-white/20 flex items-center justify-center shrink-0">
                <img
                  src={logo}
                  alt="CDECO"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain rounded-lg"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-white">CDECO</span>
                <p className="text-xs text-white/70">{t("hero.badge", "Diplomatie Économique")}</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {t(
                "footer.description",
                "La Chambre de Diplomatie Économique du Congo promeut le développement des PME/PMI, valorise les atouts du pays et attire les investissements stratégiques."
              )}
            </p>
            <p className="text-accent font-heading font-semibold italic text-sm">
              "{t("footer.slogan", "Agir localement. Rayonner globalement.")}"
            </p>
          </div>

          {/* Colonne 2 : Liens de navigation */}
          <div className="space-y-4">
            <SectionTitle>{t("footer.navigation", "Navigation")}</SectionTitle>
            <ul className="space-y-2.5">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Opportunités & Adhésion */}
          <div className="space-y-4">
            <SectionTitle>{t("footer.opportunities", "Opportunités")}</SectionTitle>
            <ul className="space-y-2.5">
              {quickLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/adhesion" className="text-accent hover:underline font-semibold text-sm">
                  {t("footer.becomeMember", "Devenir membre adhérent →")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées & Réseaux Sociaux */}
          <div className="space-y-4">
            <SectionTitle>{t("footer.coordinates", "Coordonnées")}</SectionTitle>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{currentAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-accent transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-accent transition-colors truncate">
                  {settings.email}
                </a>
              </li>
            </ul>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-accent hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barre inférieure des mentions légales et droits d'auteur */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-cdeco py-5 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} CDECO — {t("footer.rights", "Tous droits réservés.")}
            </p>

            <nav aria-label="Liens légaux" className="flex items-center gap-4 text-xs sm:text-sm text-white/60">
              <Link to="/cdeco/presentation" className="hover:text-accent transition-colors">
                {t("footer.legal", "Mentions Légales")}
              </Link>
              <span className="text-white/30" aria-hidden="true">
                |
              </span>
              <Link to="/contact" className="hover:text-accent transition-colors">
                {t("nav.contact", "Contact")}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
