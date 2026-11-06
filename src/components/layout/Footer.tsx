import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, ArrowUp } from "lucide-react";
import logo from "@/assets/logo-cdeco.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterMobileAccordion from "./FooterMobileAccordion";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

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
          start: "top 90%",
        },
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "Le Congo", href: "/le-congo" },
    { name: "Présentation", href: "/cdeco/presentation" },
    { name: "Bureau", href: "/cdeco/bureau" },
    { name: "Missions", href: "/cdeco/missions" },
    { name: "Événements", href: "/evenements" },
    { name: "Ressources", href: "/ressources" },
    { name: "KAMPUS CDECO", href: "/kampus-cdeco" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/chambre-de-diplomatie-economique-du-congo/",
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1B3SMHVzWk/?mibextid=wwXIfr",
      label: "Facebook",
    },
    { icon: Twitter, href: "https://twitter.com/cdeco", label: "Twitter" },
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
      <div className="container-cdeco py-12 md:py-16 px-4 sm:px-6 relative z-10">
        {/* Mobile Accordion View */}
        <div className="md:hidden space-y-4">
          <div className="space-y-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src={logo} alt="CDECO" width={57} height={48} className="h-12 w-auto" />
              <div>
                <span className="font-heading font-bold text-lg text-white">CDECO</span>
                <p className="text-xs text-white/70">Diplomatie Économique</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              La CDECO œuvre pour le rayonnement économique du Congo en facilitant les partenariats stratégiques.
            </p>
            <p className="text-accent font-heading font-semibold italic text-sm">
              "Agir localement. Rayonner globalement."
            </p>
          </div>
          <FooterMobileAccordion quickLinks={quickLinks} />
        </div>

        {/* Desktop 4-Column Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="CDECO" width={57} height={48} className="h-12 w-auto" />
              <div>
                <span className="font-heading font-bold text-xl text-white">CDECO</span>
                <p className="text-xs text-white/70">Diplomatie Économique</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              La Chambre de Diplomatie Économique du Congo promeut le développement des PME/PMI, valorise les atouts du pays et attire les investissements stratégiques.
            </p>
            <p className="text-accent font-heading font-semibold italic text-sm">
              "Agir localement. Rayonner globalement."
            </p>
          </div>

          <div className="space-y-4">
            <SectionTitle>Navigation</SectionTitle>
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

          <div className="space-y-4">
            <SectionTitle>Opportunités</SectionTitle>
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
                  Devenir membre adhérent →
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <SectionTitle>Coordonnées</SectionTitle>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Moungali Centre-Ville, Brazzaville, République du Congo</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="tel:+242055958119" className="hover:text-accent transition-colors">
                  +242 05 595 8119
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="mailto:contact@cdeco.com" className="hover:text-accent transition-colors">
                  contact@cdeco.com
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

      {/* Barre inférieure */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-cdeco py-5 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} CDECO — Tous droits réservés.
            </p>

            <nav aria-label="Liens légaux" className="flex items-center gap-4 text-sm text-white/60">
              <Link to="/cdeco/presentation" className="hover:text-accent transition-colors">
                Mentions Légales
              </Link>
              <span className="text-white/30" aria-hidden="true">|</span>
              <Link to="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-xl bg-accent text-white shadow-lg hover:scale-105 transition-all flex items-center justify-center z-40"
        aria-label="Remonter en haut de page"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;
