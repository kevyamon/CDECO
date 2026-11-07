import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Globe, Facebook, Linkedin, Twitter } from "lucide-react";
import { fadeInRight, staggerContainer, staggerItem } from "@/animations/variants";
import { useTranslation } from "react-i18next";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface ContactInfoSectionProps {
  getVariants: (v: Variants) => Variants;
}

interface ContactItem {
  icon: typeof MapPin;
  title: string;
  content: ReactNode;
  bgClass: string;
  iconClass: string;
}

export const ContactInfoSection: FC<ContactInfoSectionProps> = ({ getVariants }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const { settings } = useSiteSettings();

  const currentAddress = isEn ? (settings.addressEn || settings.address) : settings.address;
  const currentHours = isEn ? (settings.hoursEn || settings.hours) : settings.hours;

  const contactItems: ContactItem[] = [
    {
      icon: MapPin,
      title: isEn ? "Address" : "Adresse",
      content: (
        <span className="text-muted-foreground text-xs md:text-sm leading-relaxed block">
          {currentAddress}
        </span>
      ),
      bgClass: "bg-primary/10",
      iconClass: "text-primary",
    },
    {
      icon: Phone,
      title: isEn ? "Phone" : "Téléphone",
      content: (
        <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="text-muted-foreground text-xs md:text-sm hover:text-accent transition-colors font-medium">
          {settings.phone}
        </a>
      ),
      bgClass: "bg-accent/10",
      iconClass: "text-accent",
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <a href={`mailto:${settings.email}`} className="text-muted-foreground text-xs md:text-sm hover:text-accent transition-colors font-medium">
          {settings.email}
        </a>
      ),
      bgClass: "bg-primary/10",
      iconClass: "text-primary",
    },
    {
      icon: Clock,
      title: isEn ? "Office Hours" : "Horaires",
      content: (
        <span className="text-muted-foreground text-xs md:text-sm leading-relaxed block">
          {currentHours}
        </span>
      ),
      bgClass: "bg-accent/10",
      iconClass: "text-accent",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: settings.facebook || "#", label: "Facebook" },
    { icon: Linkedin, href: settings.linkedin || "#", label: "LinkedIn" },
    { icon: Twitter, href: settings.twitter || "#", label: "Twitter" },
    { icon: Globe, href: settings.website || "https://cdeco.org", label: isEn ? "Website" : "Site web" },
  ];

  return (
    <motion.div
      className="lg:col-span-2 space-y-4 md:space-y-6 order-1 lg:order-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={getVariants(staggerContainer)}
    >
      <motion.div variants={getVariants(fadeInRight)}>
        <Card className="card-hover">
          <CardContent className="p-4 md:p-5 lg:p-6">
            <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-3 md:mb-4">
              {isEn ? "Our Coordinates" : "Nos coordonnées"}
            </h3>
            <div className="space-y-3 md:space-y-4">
              {contactItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5 md:gap-3">
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${item.bgClass} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${item.iconClass}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-xs md:text-sm mb-0.5">
                      {item.title}
                    </p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={getVariants(fadeInRight)}>
        <Card className="card-hover">
          <CardContent className="p-4 md:p-5 lg:p-6">
            <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-3 md:mb-4">
              {isEn ? "Follow our official channels" : "Suivez nos canaux officiels"}
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:py-2 rounded-lg bg-secondary hover:bg-accent hover:text-white transition-all text-xs md:text-sm font-medium"
                >
                  <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={getVariants(fadeInRight)}>
        <Card className="bg-primary text-primary-foreground border-none shadow-lg">
          <CardContent className="p-4 md:p-5 lg:p-6 text-center space-y-2 md:space-y-3">
            <h4 className="font-heading font-bold text-sm md:text-base">
              {isEn ? "Want to join CDECO?" : "Vous souhaitez rejoindre la CDECO ?"}
            </h4>
            <p className="text-primary-foreground/80 text-xs md:text-sm">
              {isEn 
                ? "Become an active member and access our global trade networks and strategic programs."
                : "Devenez membre adhérent et accédez à nos réseaux d'affaires internationaux."}
            </p>
            <Link to="/adhesion" className="inline-block pt-1">
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-white font-semibold">
                {isEn ? "Submit Membership" : "Faire une demande d'adhésion"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfoSection;
