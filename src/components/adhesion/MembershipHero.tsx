import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { ArrowRight, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo-cdeco.png";
import heroImg from "@/assets/hero-meeting.jpg";
import { useTranslation } from "react-i18next";

const MembershipHero = () => {
  const { t } = useTranslation();
  const textRef = useScrollAnimation<HTMLDivElement>({ type: "fadeUp" });

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImg} 
          alt="CDECO" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#172554]/90 via-[#1E3A8A]/85 to-[#172554]/95" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 container-cdeco px-4 text-center py-16">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src={logoImg} 
            alt="CDECO Logo" 
            className="h-16 md:h-20 mx-auto object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl mx-auto leading-tight">
          CHAMBRE DE DIPLOMATIE ÉCONOMIQUE DU CONGO
        </h1>

        {/* Subtitle */}
        <p className="text-accent text-lg md:text-xl font-semibold mb-6">
          {t("footer.slogan", "Agir localement. Rayonner globalement.")}
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-6 text-base"
          onClick={() => {
            const processSection = document.querySelector('[data-section="membership-process"]');
            if (processSection) {
              processSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {t("cta.joinNow", "Adhérer maintenant")}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        {/* Bottom info */}
        <div className="mt-10 flex items-center justify-center gap-2 text-white/70 text-sm">
          <Handshake className="h-4 w-4" />
          <span>République du Congo</span>
        </div>
      </div>
    </section>
  );
};

export default MembershipHero;
