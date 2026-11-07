import { FC } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LinkItem {
  name: string;
  href: string;
}

interface FooterMobileAccordionProps {
  quickLinks: LinkItem[];
}

export const FooterMobileAccordion: FC<FooterMobileAccordionProps> = ({ quickLinks }) => {
  const { t } = useTranslation();

  return (
    <Accordion type="single" collapsible className="space-y-2 md:hidden">
      <AccordionItem value="vision" className="border-b border-white/10">
        <AccordionTrigger className="py-4 text-white hover:text-accent">
          <span className="flex items-center gap-2">
            <div className="w-1 h-5 bg-accent rounded-full" />
            {t("footer.vision", "Notre Vision & Engagement")}
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-white/70 text-sm leading-relaxed pb-4">
          {t("footer.visionDesc", "Sous la direction de M. Arnold Wesley AKINA, la CDECO s'engage à promouvoir l'excellence économique et à renforcer les liens diplomatiques commerciaux entre le Congo et la communauté internationale.")}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="navigation" className="border-b border-white/10">
        <AccordionTrigger className="py-4 text-white hover:text-accent">
          <span className="flex items-center gap-2">
            <div className="w-1 h-5 bg-accent rounded-full" />
            {t("footer.navigation", "Navigation")}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-white/70 hover:text-accent transition-colors text-sm">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="contact" className="border-b border-white/10">
        <AccordionTrigger className="py-4 text-white hover:text-accent">
          <span className="flex items-center gap-2">
            <div className="w-1 h-5 bg-accent rounded-full" />
            {t("footer.coordinates", "Coordonnées")}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>{t("footer.address", "Moungali Centre-Ville, Brazzaville, République du Congo")}</span>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FooterMobileAccordion;

