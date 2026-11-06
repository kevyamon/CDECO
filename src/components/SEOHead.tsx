import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  jsonLd?: object;
}

const SEOHead = ({
  title = "CDECO - Chambre de Diplomatie Économique du Congo",
  description = "La Chambre de Diplomatie Économique du Congo (CDECO) promeut les échanges économiques et diplomatiques, soutient les PME/PMI et renforce le climat des affaires au Congo.",
  keywords = "CDECO, Congo, diplomatie économique, chambre de commerce, PME, PMI, investissement, Brazzaville",
  canonicalUrl,
  ogImage = "/og-image.jpg",
  ogType = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = title.includes("CDECO") ? title : `${title} | CDECO`;
  const baseUrl = "https://cdeco.org";
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullImageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  // Default Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Chambre de Diplomatie Économique du Congo",
    "alternateName": "CDECO",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": description,
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Moungali Centre-Ville",
      "addressLocality": "Brazzaville",
      "addressCountry": "CG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+242-05-595-8119",
      "contactType": "customer service",
      "email": "contact@cdeco.com",
      "availableLanguage": ["French", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/cdeco",
      "https://www.facebook.com/cdeco"
    ]
  };

  // WebPage JSON-LD
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "description": description,
    "url": fullUrl,
    "inLanguage": "fr-FR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "CDECO",
      "url": baseUrl
    },
    ...(publishedTime && { "datePublished": publishedTime }),
    ...(modifiedTime && { "dateModified": modifiedTime }),
    ...(author && { 
      "author": {
        "@type": "Person",
        "name": author
      }
    })
  };

  // BreadcrumbList JSON-LD for navigation
  const getBreadcrumbJsonLd = () => {
    if (!canonicalUrl || canonicalUrl === "/") return null;
    
    const pathParts = canonicalUrl.split("/").filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": baseUrl
      }
    ];

    const routeNames: Record<string, string> = {
      "a-propos": "À Propos",
      "missions": "Missions",
      "evenements": "Événements",
      "contact": "Contact",
      "adhesion": "Adhésion",
      "ressources": "Ressources",
      "president-fondateur": "Président Fondateur"
    };

    let currentPath = "";
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": routeNames[part] || part,
        "item": `${baseUrl}${currentPath}`
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
  };

  const breadcrumbJsonLd = getBreadcrumbJsonLd();

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="CDECO" />
      <meta name="language" content="fr" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}
      {canonicalUrl && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="CDECO - Chambre de Diplomatie Économique du Congo" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cdeco_congo" />
      <meta name="twitter:creator" content="@cdeco_congo" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="CG" />
      <meta name="geo.placename" content="Brazzaville" />
      <meta name="geo.position" content="-4.2634;15.2429" />
      <meta name="ICBM" content="-4.2634, 15.2429" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webPageJsonLd)}
      </script>
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
