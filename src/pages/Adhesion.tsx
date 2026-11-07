import { useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import MembershipHero from "@/components/adhesion/MembershipHero";
import MembershipIntro from "@/components/adhesion/MembershipIntro";
import MembershipTypes from "@/components/adhesion/MembershipTypes";
import MembershipProcess from "@/components/adhesion/MembershipProcess";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";
import { CheckCircle, ChevronLeft, ChevronRight, User, Briefcase, FileText } from "lucide-react";
import { z } from "zod";
import membershipService from "@/api/membershipService";
import {
  AdhesionFormData,
  Step1Personal,
  Step2Professional,
  Step3Motivation,
  Step4Recap,
} from "@/components/adhesion/AdhesionWizardSteps";
import { useTranslation } from "react-i18next";

const createValidationSchemas = (isEn: boolean) => ({
  personal: z.object({
    lastName: z.string().trim().min(2, isEn ? "Last name must contain at least 2 characters" : "Le nom doit contenir au moins 2 caractères"),
    firstName: z.string().trim().min(2, isEn ? "First name must contain at least 2 characters" : "Le prénom doit contenir au moins 2 caractères"),
    age: z.string().refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 18 && num <= 120;
    }, isEn ? "Age must be between 18 and 120 years" : "L'âge doit être compris entre 18 et 120 ans"),
    nationality: z.string().trim().min(2, isEn ? "Nationality is required" : "La nationalité est requise"),
    phone: z.string().trim().min(8, isEn ? "Invalid phone number" : "Numéro de téléphone invalide"),
    email: z.string().trim().email(isEn ? "Invalid email address" : "Adresse email invalide"),
  }),
  professional: z.object({
    memberType: z.string().min(1, isEn ? "Please select a membership category" : "Veuillez sélectionner un type de membre"),
    organization: z.string().trim().min(2, isEn ? "Organization or company name is required" : "L'organisation est requise"),
    profession: z.string().trim().min(2, isEn ? "Profession or role is required" : "La profession ou fonction est requise"),
    address: z.string().trim().min(5, isEn ? "Full address is required" : "L'adresse complète est requise"),
  }),
  motivation: z.object({
    motivation: z.string().trim().min(50, isEn ? "Motivation statement must contain at least 50 characters" : "Votre motivation doit contenir au moins 50 caractères"),
    acceptStatutes: z.literal(true, {
      errorMap: () => ({ message: isEn ? "You must accept CDECO's statutes and bylaws" : "Vous devez accepter les statuts de la CDECO" }),
    }),
  }),
});

const initialFormData: AdhesionFormData = {
  lastName: "",
  firstName: "",
  age: "",
  nationality: "Congolaise",
  phone: "",
  email: "",
  memberType: "",
  organization: "",
  profession: "",
  address: "",
  motivation: "",
  acceptStatutes: false,
};

const formStepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

const Adhesion = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AdhesionFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { toast } = useToast();
  const { checkRateLimit, recordAttempt, getBlockTimeRemaining } = useRateLimit({
    maxAttempts: 3,
    windowMs: 60000,
    blockDurationMs: 300000,
  });
  const prefersReducedMotion = useReducedMotion();
  const formRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: 1, title: isEn ? "Personal" : "Personnel", icon: User },
    { id: 2, title: isEn ? "Professional" : "Professionnel", icon: Briefcase },
    { id: 3, title: isEn ? "Motivation" : "Motivation", icon: FileText },
    { id: 4, title: isEn ? "Review" : "Validation", icon: CheckCircle },
  ];

  const getVariants = (variant: any) => (prefersReducedMotion ? {} : variant);

  const updateFormData = (field: keyof AdhesionFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const schemas = createValidationSchemas(isEn);
    try {
      if (step === 1) schemas.personal.parse(formData);
      else if (step === 2) schemas.professional.parse(formData);
      else if (step === 3) schemas.motivation.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("membership-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!checkRateLimit()) {
      toast({
        title: isEn ? "Too many attempts" : "Trop de tentatives",
        description: isEn
          ? `Please wait ${getBlockTimeRemaining()} seconds before trying again.`
          : `Veuillez attendre ${getBlockTimeRemaining()} secondes avant de réessayer.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    recordAttempt();

    try {
      await membershipService.submitMembership({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: parseInt(formData.age),
        nationality: formData.nationality.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        memberType: formData.memberType,
        organization: formData.organization.trim(),
        profession: formData.profession.trim(),
        address: formData.address.trim(),
        motivation: formData.motivation.trim(),
      });

      setIsSubmitted(true);
      toast({
        title: isEn ? "Application Submitted!" : "Demande enregistrée !",
        description: isEn
          ? "Your membership dossier has been submitted to the secretariat."
          : "Votre adhésion a été transmise à notre secrétariat général.",
      });
    } catch (error: any) {
      const msg = error.response?.data?.message || (isEn ? "An error occurred while submitting." : "Une erreur est survenue lors de l'enregistrement.");
      toast({
        title: isEn ? "Submission failed" : "Échec de transmission",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <SEOHead
          title={isEn ? "Application Received - CDECO" : "Demande Envoyée - CDECO"}
          canonicalUrl="/adhesion"
        />
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground text-center px-4">
          <div className="container-cdeco max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              {isEn ? "Membership Application Received" : "Demande d'adhésion reçue"}
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg">
              {isEn ? (
                <>
                  Thank you <strong className="text-white">{formData.firstName} {formData.lastName}</strong>. Your application has been forwarded to the membership committee. You will receive an official notification at <strong className="text-white">{formData.email}</strong>.
                </>
              ) : (
                <>
                  Merci <strong className="text-white">{formData.firstName} {formData.lastName}</strong>. Votre dossier a été transmis à la commission d'examen des membres. Vous recevrez une notification par email à <strong className="text-white">{formData.email}</strong>.
                </>
              )}
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  const stepProps = {
    formData,
    updateFormData,
    errors,
    getVariants,
    formStepVariants,
    prefersReducedMotion,
  };

  return (
    <Layout>
      <SEOHead
        title={isEn ? "Join CDECO | Membership Application" : "Adhésion - CDECO"}
        description={
          isEn
            ? "Join the Chamber of Economic Diplomacy of Congo. Become a member and unlock prestigious opportunities to scale your ventures."
            : "Rejoignez la Chambre de Diplomatie Économique du Congo. Devenez membre et bénéficiez d'opportunités uniques pour développer vos activités."
        }
        keywords="adhésion CDECO, membre, inscription, Congo, PME, PMI"
        canonicalUrl="/adhesion"
      />

      <MembershipHero />
      <MembershipIntro />
      <MembershipTypes />
      <MembershipProcess onStartClick={scrollToForm} />

      <AnimatePresence>
        {showForm && (
          <motion.section
            id="membership-form"
            ref={formRef}
            className="py-12 bg-background border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-cdeco px-4 max-w-3xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep >= step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="w-4 h-4" />
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`h-1 w-12 sm:w-20 mx-2 rounded ${
                          currentStep > step.id ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <Card className="shadow-sm border-border">
                <CardContent className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && <Step1Personal {...stepProps} />}
                    {currentStep === 2 && <Step2Professional {...stepProps} />}
                    {currentStep === 3 && <Step3Motivation {...stepProps} />}
                    {currentStep === 4 && <Step4Recap {...stepProps} />}
                  </AnimatePresence>

                  <div className="flex justify-between items-center mt-8 pt-6 border-t">
                    {currentStep > 1 ? (
                      <Button variant="outline" onClick={handlePrevious}>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        {isEn ? "Previous" : "Précédent"}
                      </Button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 4 ? (
                      <Button onClick={handleNext}>
                        {isEn ? "Next" : "Suivant"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting
                          ? (isEn ? "Submitting..." : "Envoi en cours...")
                          : (isEn ? "Submit Application" : "Soumettre mon adhésion")}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Adhesion;
