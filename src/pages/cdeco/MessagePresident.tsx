/**
 * =============================================================================
 * MESSAGE-PRESIDENT.TSX - Message du Président Fondateur
 * =============================================================================
 * 
 * Cette page présente le message et la vision de M. Arnold Wesley AKINA,
 * Président-Fondateur de la CDECO.
 * 
 * ROUTE : /cdeco/message-president
 */

import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Shield, Award, Target } from "lucide-react";
import presidentImage from "@/assets/members/president-fondateur.jpg";
import { useTranslation } from "react-i18next";

const MessagePresident = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEOHead
        title="Message du Président Fondateur | CDECO"
        description="Découvrez le leadership de M. Arnold Wesley AKINA, Président-Fondateur de la Chambre de Diplomatie Économique du Congo."
        keywords="Arnold Wesley AKINA, président CDECO, fondateur CDECO, leadership Congo"
        canonicalUrl="/cdeco/message-president"
        ogType="profile"
        author="Arnold Wesley AKINA"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Arnold Wesley AKINA",
          "jobTitle": "Président-Fondateur",
          "worksFor": {
            "@type": "Organization",
            "name": "Chambre de Diplomatie Économique du Congo",
            "alternateName": "CDECO"
          },
          "description": "Président-Fondateur de la Chambre de Diplomatie Économique du Congo, leader visionnaire pour le développement économique du Congo.",
          "url": "https://cdeco.org/cdeco/message-president"
        }}
      />

      {/* Hero Section */}
      <section aria-labelledby="president-title" className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" aria-hidden="true" />
        <div className="container-cdeco relative z-10 text-center">
          <h1 id="president-title" className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("president.title", "Message du Président Fondateur")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {t("president.subtitle", "Découvrez la vision et le message de M. Arnold Wesley AKINA")}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <article className="py-16 lg:py-24 bg-background">
        <div className="container-cdeco">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <aside className="relative">
              <div className="sticky top-8">
                <figure>
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20">
                    <img
                      src={presidentImage}
                      alt="M. Arnold Wesley AKINA, Président-Fondateur de la CDECO"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <figcaption className="mt-6 text-center">
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      M. Arnold Wesley AKINA
                    </h2>
                    <p className="text-accent font-semibold mt-1">
                      Président-Fondateur
                    </p>
                  </figcaption>
                </figure>
              </div>
            </aside>

            {/* Text Content */}
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-accent font-semibold">CDECO</span>
              </div>

              <p className="text-lg">
                Sous l'impulsion du leadership transformationnel et stratégique de M. Arnold Wesley AKINA, 
                la Chambre de Diplomatie Économique du Congo (CDECO) s'installe officiellement en République du Congo. 
                Cette étape fondatrice incarne une vision éclairée bâtir des ponts durables en faveur d'une Afrique 
                connectée, économiquement influente et commercialement active sur la scène internationale.
              </p>

              <p>
                Porteur d'une vision ambitieuse pour un développement économique plus dynamique et un écosystème 
                entrepreneurial inclusif, M. AKINA positionne la CDECO comme un catalyseur stratégique de coopération 
                intelligente, d'innovation économique et de diplomatie proactive. L'institution est la réponse qui 
                converge de façon diplomatique et économique avec les États, les investisseurs internationaux, 
                les communautés économiques et les acteurs du changement.
              </p>

              <p>
                À travers cette mission, la CDECO affirme sa volonté de faire émerger une diplomatie économique solide, 
                inclusive et ancrée dans les réalités africaines contemporaines.
              </p>

              <section className="bg-muted/50 rounded-xl p-6 my-8" aria-labelledby="national-scope">
                <h3 id="national-scope" className="font-heading text-xl font-bold text-foreground mb-4">
                  {t("president.nationalTitle", "Sur le plan national")}
                </h3>
                <p>
                  {t("president.nationalText", "La CDECO s'engage à promouvoir les relations économiques et commerciales de la République du Congo, à valoriser ses ressources, à soutenir son potentiel entrepreneurial, et à mobiliser les forces vives.")}
                </p>
              </section>

              <section className="bg-muted/50 rounded-xl p-6 my-8" aria-labelledby="international-scope">
                <h3 id="international-scope" className="font-heading text-xl font-bold text-foreground mb-4">
                  {t("president.intlTitle", "Sur le plan international")}
                </h3>
                <p>
                  {t("president.intlText", "La CDECO ambitionne de devenir une interface stratégique de haut niveau, facilitant les échanges économiques entre le Congo, les États africains et les partenaires mondiaux.")}
                </p>
              </section>

              <p>
                À travers cette installation, la CDECO invite solennellement les gouvernements africains, 
                les acteurs économiques, ainsi que les institutions régionales et internationales à s'unir 
                à ses côtés afin de promouvoir une innovation continue dans les domaines économique, 
                diplomatique et commercial.
              </p>

              {/* Values */}
              <section className="mt-10" aria-labelledby="values-title">
                <h3 id="values-title" className="font-heading text-xl font-bold text-foreground mb-6">
                  Cette initiative s'inscrit dans le respect de nos valeurs fondamentales:
                </h3>
                
                <ul className="grid gap-4" role="list">
                  <li className="flex items-start gap-4 p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">L'intégrité</h4>
                      <p className="text-sm">
                        En agissant avec éthique, responsabilité et transparence
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Target className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Le leadership</h4>
                      <p className="text-sm">
                        En anticipant les enjeux et en proposant des solutions intelligentes
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">L'excellence</h4>
                      <p className="text-sm">
                        Dans la recherche constante de qualité et d'impact
                      </p>
                    </div>
                  </li>
                </ul>
              </section>

              <blockquote className="mt-10 p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20">
                <p className="text-lg font-medium text-foreground italic text-center">
                  "Ensemble, nous avons l'opportunité de bâtir une Afrique plus unie, plus influente et tournée vers l'avenir."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default MessagePresident;
