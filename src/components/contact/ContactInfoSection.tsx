import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Globe, Facebook, Linkedin, Twitter } from "lucide-react";
import { fadeInRight, staggerContainer, staggerItem, scaleIn } from "@/animations/variants";

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
  const contactItems: ContactItem[] = [
    {
      icon: MapPin,
      title: "Adresse",
      content: (
        <>
          Moungali Centre-Ville
          <br />
          Brazzaville, République du Congo
        </>
      ),
      bgClass: "bg-primary/10",
      iconClass: "text-primary",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: (
        <a href="tel:+242055958119" className="text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors">
          +242 05 595 8119
        </a>
      ),
      bgClass: "bg-accent/10",
      iconClass: "text-accent",
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <a href="mailto:contact@cdeco.com" className="text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors">
          contact@cdeco.com
        </a>
      ),
      bgClass: "bg-primary/10",
      iconClass: "text-primary",
    },
    {
      icon: Clock,
      title: "Horaires",
      content: (
        <>
          Lun - Ven : 8h00 - 17h00
          <br />
          Sam : 9h00 - 13h00
        </>
      ),
      bgClass: "bg-accent/10",
      iconClass: "text-accent",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1B3SMHVzWk/?mibextid=wwXIfr",
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/chambre-de-diplomatie-economique-du-congo/",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Globe, href: "#", label: "Site web" },
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
              Nos coordonnées
            </h3>
            <motion.div className="space-y-3 md:space-y-4" variants={getVariants(staggerContainer)}>
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  variants={getVariants(staggerItem)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${item.bgClass} flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${item.iconClass}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm md:text-base">{item.title}</p>
                    <p className="text-muted-foreground text-xs md:text-sm">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={getVariants(fadeInRight)}>
        <Card className="card-hover">
          <CardContent className="p-4 md:p-5 lg:p-6">
            <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-3 md:mb-4">
              Suivez-nous
            </h3>
            <motion.div className="flex gap-2 md:gap-3" variants={getVariants(staggerContainer)}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label={social.label}
                  variants={getVariants(staggerItem)}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </motion.a>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={getVariants(scaleIn)}>
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4 md:p-5 lg:p-6">
            <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-1.5 md:mb-2">
              Besoin d'adhérer ?
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
              Rejoignez la CDECO et participez au développement économique du Congo.
            </p>
            <Link to="/adhesion">
              <Button variant="outline" className="w-full text-sm md:text-base">
                Formulaire d'adhésion
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfoSection;

