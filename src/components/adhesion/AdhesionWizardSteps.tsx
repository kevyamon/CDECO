import { FC } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Briefcase, FileText, CheckCircle } from "lucide-react";
import { staggerContainer, staggerItem, scaleIn, fadeInUp } from "@/animations/variants";
import { useTranslation } from "react-i18next";

export const getMemberTypes = (isEn: boolean) => [
  isEn ? "Associate Member (Individual)" : "Membre Adhérent (Particulier)",
  isEn ? "Active Member (Professional)" : "Membre Actif (Professionnel)",
  isEn ? "Benefactor Member (Patron)" : "Membre Bienfaiteur (Mécène)",
  isEn ? "Honorary Member" : "Membre d'Honneur",
  isEn ? "Enterprise / SME" : "Entreprise / PME",
  isEn ? "Large Corporation / Group" : "Grande Entreprise / Groupe",
  isEn ? "Institution / Organization" : "Institution / Organisation",
  isEn ? "Congolese Diaspora" : "Diaspora Congolaise",
];

export interface AdhesionFormData {
  firstName: string;
  lastName: string;
  age: string;
  nationality: string;
  phone: string;
  email: string;
  memberType: string;
  organization: string;
  profession: string;
  address: string;
  motivation: string;
  acceptStatutes: boolean;
}

interface StepProps {
  formData: AdhesionFormData;
  updateFormData: (field: keyof AdhesionFormData, value: string | boolean) => void;
  errors: Record<string, string>;
  getVariants: (v: any) => any;
  formStepVariants: any;
  prefersReducedMotion: boolean | null;
}

export const Step1Personal: FC<StepProps> = ({
  formData,
  updateFormData,
  errors,
  getVariants,
  formStepVariants,
  prefersReducedMotion,
}) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <motion.div
      key="step1"
      className="space-y-6"
      variants={prefersReducedMotion ? {} : formStepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex items-center gap-3 mb-6" variants={getVariants(scaleIn)}>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {isEn ? "Personal Information" : "Informations Personnelles"}
        </h2>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 gap-4" variants={getVariants(staggerContainer)}>
        <motion.div className="space-y-2" variants={getVariants(staggerItem)}>
          <Label htmlFor="lastName">{isEn ? "Last Name *" : "Nom *"}</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            placeholder={isEn ? "Your last name" : "Votre nom"}
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
        </motion.div>
        <motion.div className="space-y-2" variants={getVariants(staggerItem)}>
          <Label htmlFor="firstName">{isEn ? "First Name *" : "Prénom *"}</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            placeholder={isEn ? "Your first name" : "Votre prénom"}
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
        </motion.div>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 gap-4" variants={getVariants(staggerContainer)}>
        <motion.div className="space-y-2" variants={getVariants(staggerItem)}>
          <Label htmlFor="age">{isEn ? "Age *" : "Âge *"}</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData("age", e.target.value)}
            placeholder={isEn ? "Your age" : "Votre âge"}
            min="18"
            max="120"
            className={errors.age ? "border-destructive" : ""}
          />
          {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
        </motion.div>
        <motion.div className="space-y-2" variants={getVariants(staggerItem)}>
          <Label htmlFor="nationality">{isEn ? "Nationality *" : "Nationalité *"}</Label>
          <Input
            id="nationality"
            value={formData.nationality}
            onChange={(e) => updateFormData("nationality", e.target.value)}
            placeholder={isEn ? "Your nationality" : "Votre nationalité"}
            className={errors.nationality ? "border-destructive" : ""}
          />
          {errors.nationality && <p className="text-sm text-destructive">{errors.nationality}</p>}
        </motion.div>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 gap-4" variants={getVariants(staggerContainer)}>
        <motion.div className="space-y-2" variants={getVariants(staggerItem)}>
          <Label htmlFor="phone">{isEn ? "Phone Number *" : "Téléphone *"}</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            placeholder="+242 XX XXX XXXX"
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </motion.div>
        <motion.div className="space-y-2" variants={getVariants(staggerItem)}>
          <Label htmlFor="email">{isEn ? "Email Address *" : "Email *"}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="votre@email.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Step2Professional: FC<StepProps> = ({
  formData,
  updateFormData,
  errors,
  getVariants,
  formStepVariants,
  prefersReducedMotion,
}) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const memberTypeList = getMemberTypes(isEn);

  return (
    <motion.div
      key="step2"
      className="space-y-6"
      variants={prefersReducedMotion ? {} : formStepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex items-center gap-3 mb-6" variants={getVariants(scaleIn)}>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {isEn ? "Professional Information" : "Informations Professionnelles"}
        </h2>
      </motion.div>

      <motion.div className="space-y-2" variants={getVariants(fadeInUp)}>
        <Label htmlFor="memberType">{isEn ? "Membership Category *" : "Type de Membre *"}</Label>
        <Select value={formData.memberType} onValueChange={(value) => updateFormData("memberType", value)}>
          <SelectTrigger className={errors.memberType ? "border-destructive" : ""}>
            <SelectValue placeholder={isEn ? "Select your category" : "Sélectionnez votre catégorie"} />
          </SelectTrigger>
          <SelectContent className="bg-card z-50">
            {memberTypeList.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.memberType && <p className="text-sm text-destructive">{errors.memberType}</p>}
      </motion.div>

      <motion.div className="space-y-2" variants={getVariants(fadeInUp)}>
        <Label htmlFor="organization">{isEn ? "Organization / Company *" : "Organisation / Entreprise *"}</Label>
        <Input
          id="organization"
          value={formData.organization}
          onChange={(e) => updateFormData("organization", e.target.value)}
          placeholder={isEn ? "Name of your enterprise" : "Nom de votre organisation"}
          className={errors.organization ? "border-destructive" : ""}
        />
        {errors.organization && <p className="text-sm text-destructive">{errors.organization}</p>}
      </motion.div>

      <motion.div className="space-y-2" variants={getVariants(fadeInUp)}>
        <Label htmlFor="profession">{isEn ? "Profession / Role *" : "Profession / Fonction *"}</Label>
        <Input
          id="profession"
          value={formData.profession}
          onChange={(e) => updateFormData("profession", e.target.value)}
          placeholder={isEn ? "Your profession or executive title" : "Votre profession ou fonction"}
          className={errors.profession ? "border-destructive" : ""}
        />
        {errors.profession && <p className="text-sm text-destructive">{errors.profession}</p>}
      </motion.div>

      <motion.div className="space-y-2" variants={getVariants(fadeInUp)}>
        <Label htmlFor="address">{isEn ? "Business Address *" : "Adresse *"}</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => updateFormData("address", e.target.value)}
          placeholder={isEn ? "Full address" : "Adresse complète"}
          className={errors.address ? "border-destructive" : ""}
        />
        {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
      </motion.div>
    </motion.div>
  );
};

export const Step3Motivation: FC<StepProps> = ({
  formData,
  updateFormData,
  errors,
  getVariants,
  formStepVariants,
  prefersReducedMotion,
}) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <motion.div
      key="step3"
      className="space-y-6"
      variants={prefersReducedMotion ? {} : formStepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex items-center gap-3 mb-6" variants={getVariants(scaleIn)}>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {isEn ? "Motivation & Commitment" : "Motivation & Engagement"}
        </h2>
      </motion.div>

      <motion.div className="space-y-2" variants={getVariants(fadeInUp)}>
        <Label htmlFor="motivation">
          {isEn ? "Why do you wish to join CDECO? *" : "Pourquoi souhaitez-vous rejoindre la CDECO ? *"}
        </Label>
        <Textarea
          id="motivation"
          value={formData.motivation}
          onChange={(e) => updateFormData("motivation", e.target.value)}
          placeholder={
            isEn
              ? "Describe your motivation, objectives, and how you wish to contribute to CDECO's economic diplomacy mission..."
              : "Décrivez vos motivations, vos attentes et comment vous souhaitez contribuer..."
          }
          rows={6}
          className={errors.motivation ? "border-destructive" : ""}
        />
        <p className="text-sm text-muted-foreground">
          {formData.motivation.length}/1000 {isEn ? "characters (minimum 50)" : "caractères (minimum 50)"}
        </p>
        {errors.motivation && <p className="text-sm text-destructive">{errors.motivation}</p>}
      </motion.div>

      <motion.div className="flex items-start space-x-3 pt-4" variants={getVariants(fadeInUp)}>
        <Checkbox
          id="acceptStatutes"
          checked={formData.acceptStatutes}
          onCheckedChange={(checked) => updateFormData("acceptStatutes", Boolean(checked))}
        />
        <div className="space-y-1">
          <Label htmlFor="acceptStatutes" className="cursor-pointer">
            {isEn
              ? "I agree to the bylaws and statutes of CDECO *"
              : "J'accepte les statuts et le règlement intérieur de la CDECO *"}
          </Label>
          <p className="text-sm text-muted-foreground">
            {isEn
              ? "By checking this box, you pledge to respect CDECO's values of integrity and excellence."
              : "En cochant cette case, vous vous engagez à respecter les valeurs d'intégrité et d'excellence de la CDECO."}
          </p>
        </div>
      </motion.div>
      {errors.acceptStatutes && <p className="text-sm text-destructive">{errors.acceptStatutes}</p>}
    </motion.div>
  );
};

export const Step4Recap: FC<StepProps> = ({ formData, getVariants, formStepVariants, prefersReducedMotion }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <motion.div
      key="step4"
      className="space-y-6"
      variants={prefersReducedMotion ? {} : formStepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex items-center gap-3 mb-6" variants={getVariants(scaleIn)}>
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-accent" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {isEn ? "Application Summary" : "Récapitulatif de la Demande"}
        </h2>
      </motion.div>

      <motion.div className="space-y-4" variants={getVariants(staggerContainer)}>
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> {isEn ? "Personal Details" : "Informations Personnelles"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">{isEn ? "Last Name:" : "Nom :"}</span> {formData.lastName}</p>
              <p><span className="font-medium text-foreground">{isEn ? "First Name:" : "Prénom :"}</span> {formData.firstName}</p>
              <p><span className="font-medium text-foreground">{isEn ? "Age:" : "Âge :"}</span> {formData.age} {isEn ? "years" : "ans"}</p>
              <p><span className="font-medium text-foreground">{isEn ? "Nationality:" : "Nationalité :"}</span> {formData.nationality}</p>
              <p><span className="font-medium text-foreground">{isEn ? "Phone:" : "Téléphone :"}</span> {formData.phone}</p>
              <p><span className="font-medium text-foreground">Email:</span> {formData.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> {isEn ? "Professional Details" : "Informations Professionnelles"}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">{isEn ? "Category:" : "Catégorie :"}</span> {formData.memberType}</p>
              <p><span className="font-medium text-foreground">{isEn ? "Organization:" : "Organisation :"}</span> {formData.organization}</p>
              <p><span className="font-medium text-foreground">{isEn ? "Profession:" : "Profession :"}</span> {formData.profession}</p>
              <p><span className="font-medium text-foreground">{isEn ? "Address:" : "Adresse :"}</span> {formData.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> {isEn ? "Motivation:" : "Motivation :"}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{formData.motivation}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
