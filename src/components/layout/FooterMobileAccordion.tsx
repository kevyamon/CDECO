import { FC } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin, LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteSettings } from "@/hooks/useSiteSettings";

interface LinkItem {
  name: string;
  href: string;
}

interface SocialLinkItem {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface FooterMobileAccordionProps {
  quickLinks: LinkItem[];
  settings?: SiteSettings;
  currentAddress?: string;
  socialLinks?: SocialLinkItem[];
}

export const FooterMobileAccordion: FC<FooterMobileAccordionProps> = ({
  quickLinks,
  settings,
  currentAddress,
  socialLinks,
}) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const address = currentAddress || t("footer.address", "Moungali Centre-Ville, Brazzaville, République du Congo");
  const phone = settings?.phone || "+242 05 595 8119";
  const email = settings?.email || "contact@cdeco.com";

  return (
    <Accordion type="single" collapsible className="space-y-2 md:hidden">
      {/* 1. Notre Vision & Engagement */}
      <AccordionItem value="vision" className="border-b border-white/10">
        <AccordionTrigger className="py-3.5 text-white hover:text-accent">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-1 h-4 bg-accent rounded-full" />
            {t("footer.vision", "Notre Vision & Engagement")}
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-white/70 text-xs leading-relaxed pb-3">
          {t(
            "footer.visionDesc",
            "Sous la direction de M. Arnold Wesley AKINA, la CDECO s'engage à promouvoir l'excellence économique et à renforcer les liens diplomatiques commerciaux entre le Congo et la communauté internationale."
          )}
        </AccordionContent>
      </AccordionItem>

      {/* 2. Navigation Rapide */}
      <AccordionItem value="navigation" className="border-b border-white/10">
        <AccordionTrigger className="py-3.5 text-white hover:text-accent">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-1 h-4 bg-accent rounded-full" />
            {t("footer.navigation", "Navigation & Opportunités")}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-3">
          <ul className="grid grid-cols-2 gap-2.5 pt-1">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-white/70 hover:text-accent transition-colors text-xs block truncate"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-2.5 border-t border-white/10">
            <Link
              to="/adhesion"
              className="text-accent hover:underline font-semibold text-xs flex items-center gap-1"
            >
              <span>{t("footer.becomeMember", "Devenir membre adhérent")}</span>
              <span>→</span>
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 3. Coordonnées & Réseaux */}
      <AccordionItem value="contact" className="border-b border-white/10">
        <AccordionTrigger className="py-3.5 text-white hover:text-accent">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-1 h-4 bg-accent rounded-full" />
            {t("footer.coordinates", "Coordonnées & Réseaux")}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-3 space-y-3">
          <ul className="space-y-2.5 text-xs text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-accent flex-shrink-0" />
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="hover:text-accent transition-colors"
              >
                {phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-accent flex-shrink-0" />
              <a
                href={`mailto:${email}`}
                className="hover:text-accent transition-colors truncate"
              >
                {email}
              </a>
            </li>
          </ul>

          {/* Liens Réseaux Sociaux */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] text-white/50 block mb-2 font-medium">
                {isEn ? "Follow CDECO:" : "Suivez la CDECO :"}
              </span>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-3.5 w-3.5 text-accent hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FooterMobileAccordion;
