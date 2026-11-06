import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, BookOpen, Users, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const documents = [
  {
    id: 1,
    title: "Présentation de la CDECO",
    description: "Document de présentation globale de la Chambre de Diplomatie Économique du Congo",
    icon: FileText,
    file: "/documents/presentation-cdeco.pdf",
  },
  {
    id: 2,
    title: "Charte Fondatrice de la CDECO",
    description: "Charte de déontologie et d'éthique de la CDECO",
    icon: BookOpen,
    file: "/documents/charte-cdeco.pdf",
  },
  {
    id: 3,
    title: "CCN & CCI-CDECO",
    description: "Document du Comité Consultatif International de la CDECO",
    icon: Users,
    file: "/documents/ccn-cci-cdeco.pdf",
  },
];

const Resources = () => {
  return (
    <Layout>
      <SEOHead
        title="Ressources | CDECO"
        description="Téléchargez les documents officiels de la CDECO : présentation, charte fondatrice et documents du Comité Consultatif International."
        keywords="CDECO ressources, documents officiels, charte CDECO, présentation CDECO, Congo"
        canonicalUrl="/ressources"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Ressources CDECO",
          "description": "Documents officiels de la Chambre de Diplomatie Économique du Congo",
          "url": "https://cdeco.org/ressources",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": documents.map((doc, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": doc.title,
              "description": doc.description
            }))
          }
        }}
      />

      {/* Hero Section */}
      <section aria-labelledby="resources-title" className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" aria-hidden="true" />
        <div className="container-cdeco relative z-10 text-center">
          <h1 id="resources-title" className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ressources
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Accédez aux documents officiels de la Chambre de Diplomatie Économique du Congo
          </p>
        </div>
      </section>

      {/* Section supprimée - contenu déplacé vers /cdeco/message-president */}

      {/* Documents Section */}
      <section aria-labelledby="documents-title" className="py-16 lg:py-24 bg-background">
        <div className="container-cdeco">
          <div className="text-center mb-12">
            <h2 id="documents-title" className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Documents à télécharger
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Retrouvez ici tous les documents officiels de la CDECO disponibles en téléchargement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto" role="list">
            {documents.map((doc) => (
              <article
                key={doc.id}
                role="listitem"
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors" aria-hidden="true">
                      <doc.icon className="w-8 h-8 text-accent" />
                    </div>
                    <CardTitle className="text-xl font-heading">{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    <Button
                      asChild
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-semibold"
                    >
                      <a href={doc.file} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4" />
                        Voir le document
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <a href={doc.file} download={`${doc.title}.pdf`}>
                        <Download className="w-4 h-4" />
                        Télécharger
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
