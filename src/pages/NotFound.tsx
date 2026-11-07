import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <Layout>
      <SEOHead
        title={isEn ? "404 - Page Not Found | CDECO" : "404 - Page Non Trouvée | CDECO"}
        canonicalUrl="/404"
      />
      <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-24 text-center">
        <div className="max-w-md space-y-6">
          <div className="text-7xl sm:text-8xl font-black font-heading text-primary">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            {isEn ? "Page Not Found" : "Page non trouvée"}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {isEn
              ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
              : "La page que vous recherchez n'existe pas, a été déplacée ou est temporairement inaccessible."}
          </p>
          <div>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary font-bold gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                {isEn ? "Return to Homepage" : "Retour à l'accueil"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
