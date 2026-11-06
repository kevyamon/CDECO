import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";
import { Send, MapPin } from "lucide-react";
import { z } from "zod";
import contactService from "@/api/contactService";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  staggerContainer,
  staggerItem,
  scaleIn,
} from "@/animations/variants";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  subject: z.string().trim().min(5, "Le sujet doit contenir au moins 5 caractères").max(150),
  message: z.string().trim().min(20, "Le message doit contenir au moins 20 caractères").max(1000),
});

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { checkRateLimit, recordAttempt, getBlockTimeRemaining } = useRateLimit({
    maxAttempts: 3,
    windowMs: 60000,
    blockDurationMs: 300000,
  });
  const prefersReducedMotion = useReducedMotion();

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkRateLimit()) {
      toast({
        title: "Trop de tentatives",
        description: `Veuillez attendre ${getBlockTimeRemaining()} secondes avant de réessayer.`,
        variant: "destructive",
      });
      return;
    }

    try {
      contactSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      recordAttempt();

      await contactService.submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      setFormData(initialFormData);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        const message = error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.";
        toast({
          title: "Erreur",
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVariants = (variant: any) => (prefersReducedMotion ? {} : variant);

  return (
    <Layout>
      <SEOHead
        title="Contact - CDECO"
        description="Contactez la Chambre de Diplomatie Économique du Congo. Notre équipe est à votre écoute pour toute question, partenariat ou demande d'adhésion."
        keywords="contact CDECO, chambre commerce Congo, Brazzaville, adhésion, partenariat"
        canonicalUrl="/contact"
      />
      <section className="pt-24 pb-10 md:pt-32 md:pb-16 bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 opacity-50"></div>
        <motion.div
          className="container-cdeco text-center relative z-10 px-4"
          initial="hidden"
          animate="visible"
          variants={getVariants(staggerContainer)}
        >
          <motion.div variants={getVariants(fadeInDown)}>
            <SectionHeader label="Contactez-nous" variant="light" />
          </motion.div>
          <motion.h1
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6"
            variants={getVariants(fadeInUp)}
          >
            Restons en <span className="text-accent">Contact</span>
          </motion.h1>
          <motion.p
            className="text-primary-foreground/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2"
            variants={getVariants(fadeInUp)}
          >
            Une question, un partenariat ou une demande d'adhésion ? Notre équipe est à votre écoute.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-10 md:py-16 lg:py-20 bg-background">
        <div className="container-cdeco px-4">
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
            <motion.div
              className="lg:col-span-3 order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={getVariants(fadeInLeft)}
            >
              <Card className="card-hover">
                <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8">
                  <motion.div
                    className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
                    variants={getVariants(scaleIn)}
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Send className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                      Envoyez-nous un message
                    </h2>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <motion.div
                      className="grid sm:grid-cols-2 gap-3 md:gap-4"
                      variants={getVariants(staggerContainer)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.div className="space-y-1.5 md:space-y-2" variants={getVariants(staggerItem)}>
                        <Label htmlFor="name" className="text-sm">Nom complet *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          placeholder="Votre nom"
                          className={`text-sm md:text-base ${errors.name ? "border-destructive" : ""}`}
                        />
                        {errors.name && <p className="text-xs md:text-sm text-destructive">{errors.name}</p>}
                      </motion.div>
                      <motion.div className="space-y-1.5 md:space-y-2" variants={getVariants(staggerItem)}>
                        <Label htmlFor="email" className="text-sm">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          placeholder="votre@email.com"
                          className={`text-sm md:text-base ${errors.email ? "border-destructive" : ""}`}
                        />
                        {errors.email && <p className="text-xs md:text-sm text-destructive">{errors.email}</p>}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="space-y-1.5 md:space-y-2"
                      variants={getVariants(fadeInUp)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="subject" className="text-sm">Sujet *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => updateFormData("subject", e.target.value)}
                        placeholder="Objet de votre message"
                        className={`text-sm md:text-base ${errors.subject ? "border-destructive" : ""}`}
                      />
                      {errors.subject && <p className="text-xs md:text-sm text-destructive">{errors.subject}</p>}
                    </motion.div>

                    <motion.div
                      className="space-y-1.5 md:space-y-2"
                      variants={getVariants(fadeInUp)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="message" className="text-sm">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateFormData("message", e.target.value)}
                        placeholder="Décrivez votre demande en détail..."
                        rows={5}
                        className={`text-sm md:text-base ${errors.message ? "border-destructive" : ""}`}
                      />
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {formData.message.length}/1000 caractères
                      </p>
                      {errors.message && <p className="text-xs md:text-sm text-destructive">{errors.message}</p>}
                    </motion.div>

                    <motion.div
                      variants={getVariants(scaleIn)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Button type="submit" className="w-full text-sm md:text-base" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Envoi en cours...</>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <ContactInfoSection getVariants={getVariants} />
          </div>
        </div>
      </section>

      <motion.section
        className="bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={getVariants(fadeInUp)}
      >
        <div className="container-cdeco py-6 md:py-8 px-4">
          <motion.div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6" variants={getVariants(scaleIn)}>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-bold text-foreground">
              Notre localisation
            </h2>
          </motion.div>
        </div>
        <motion.div
          className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-muted"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15918.037047898768!2d15.2742!3d-4.2634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a33a3f25a7d69%3A0x4f85d3f1d2b4c8a0!2sMoungali%2C%20Brazzaville%2C%20Congo!5e0!3m2!1sfr!2s!4v1703936000000!5m2!1sfr!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation CDECO - Moungali, Brazzaville"
          />
        </motion.div>
      </motion.section>
    </Layout>
  );
};

export default Contact;
