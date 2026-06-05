import { Metadata, Viewport } from "next";

export const siteViewport: Viewport = {
  themeColor: "#1C2B4A"
};

export const siteMetadata: Metadata = {
  title: "Nova Gift — Cadeaux Promotionnels Personnalisés au Maroc",
  description: "Cadeaux d'entreprise personnalisés au Maroc : agendas, sacs, gourdes, trophées. Gravure laser, broderie, sérigraphie. Devis gratuit sous 48h.",
  keywords: [
    "nova gift maroc",
    "cadeaux entreprise maroc",
    "cadeaux promotionnels maroc",
    "objets publicitaires personnalisés maroc",
    "goodies entreprise casablanca",
    "cadeaux corporate maroc",
    "solutions branding maroc",
    "cadeau publicitaire personnalisé",
    "agenda personnalisé entreprise",
    "gourde isotherme personnalisée",
    "trophée cristal casablanca",
    "sac publicitaire coton",
    "gravure laser maroc",
    "broderie logo entreprise",
    "goodies personnalisés maroc",
    "objets publicitaires personnalisés",
    "marquage corporate maroc",
    "cadeaux fin d'année entreprise maroc"
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  authors: [{ name: "Nova Gift" }],
  publisher: "Nova Gift",
  alternates: {
    canonical: "https://novagift.me",
    languages: {
      "fr-MA": "https://novagift.me",
      "x-default": "https://novagift.me"
    }
  },
  openGraph: {
    title: "Nova Gift — Cadeaux Promotionnels & Solutions de Branding au Maroc",
    description: "Nova Gift, votre partenaire marocain pour des cadeaux promotionnels premium et personnalisés. Agendas, sacs, gourdes, high-tech, trophées — gravure laser, broderie, sérigraphie. Devis gratuit sous 48h.",
    url: "https://novagift.me/",
    siteName: "Nova Gift",
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "https://novagift.me/images/hero-novagift-showcase.png",
        width: 1200,
        height: 630,
        alt: "Sélection de cadeaux promotionnels Nova Gift — agendas, sacs, gourdes, trophées personnalisés au Maroc"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Gift — Cadeaux Promotionnels Premium au Maroc",
    description: "Cadeaux promotionnels personnalisés : agendas, sacs, gourdes, high-tech, trophées. Gravure laser, broderie, sérigraphie. Devis gratuit sous 48h. Livraison partout au Maroc.",
    images: ["https://novagift.me/images/hero-novagift-showcase.png"]
  }
};

// Geo Meta Tags to be injected manually in the <head> since they aren't fully standard in Next.js Metadata API
export const geoMetaTags = {
  region: "MA-CAS",
  placename: "Casablanca, Morocco",
  position: "33.5731;-7.5898",
  icbm: "33.5731, -7.5898"
};

// JSON-LD schema generators/constants
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://novagift.me/#business",
  "name": "Nova Gift",
  "alternateName": "Nova Gift Maroc",
  "description": "Nova Gift — Cadeaux promotionnels premium et personnalisés au Maroc. Solutions de branding : agendas, sacs, gourdes isothermes, high-tech, trophées, bracelets. Gravure laser, broderie, sérigraphie, impression UV. Livraison partout au Maroc.",
  "telephone": "+212693567650",
  "email": "contact@novagift.me",
  "image": {
    "@type": "ImageObject",
    "url": "https://novagift.me/images/hero-novagift-showcase.png",
    "width": 1200,
    "height": 630
  },
  "logo": {
    "@type": "ImageObject",
    "url": "https://novagift.me/favicon.svg"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Casablanca",
    "addressLocality": "Casablanca",
    "addressRegion": "Casablanca-Settat",
    "addressCountry": "MA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.5731,
    "longitude": -7.5898
  },
  "areaServed": [
    { "@type": "Country", "name": "Morocco" },
    { "@type": "City", "name": "Casablanca" },
    { "@type": "City", "name": "Rabat" },
    { "@type": "City", "name": "Marrakech" },
    { "@type": "City", "name": "Tanger" },
    { "@type": "City", "name": "Fès" }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+212693567650",
    "contactType": "sales",
    "areaServed": "MA",
    "availableLanguage": ["French", "Arabic"]
  },
  "url": "https://novagift.me",
  "priceRange": "$$",
  "currenciesAccepted": "MAD",
  "paymentAccepted": "Cash, Bank Transfer",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": ["https://wa.me/212693567650"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Catalogue Nova Gift — Cadeaux Promotionnels",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Bloc-notes, carnets et articles de bureau personnalisés" },
      { "@type": "OfferCatalog", "name": "Coffrets cadeaux d'entreprise personnalisés" },
      { "@type": "OfferCatalog", "name": "Bracelets événementiels et objets personnalisés" },
      { "@type": "OfferCatalog", "name": "Gourdes, mugs et bouteilles personnalisés" },
      { "@type": "OfferCatalog", "name": "Objets high-tech personnalisés" },
      { "@type": "OfferCatalog", "name": "Porte-clés personnalisés pas chers" },
      { "@type": "OfferCatalog", "name": "Textile, tote bags et sacs personnalisés" },
      { "@type": "OfferCatalog", "name": "Trophées, coupes et récompenses personnalisés" }
    ]
  },
  "knowsLanguage": ["fr", "ar"],
  "slogan": "Plus que des objets, des ambassadeurs de votre marque"
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://novagift.me/#organization",
  "name": "Nova Gift",
  "alternateName": "Nova Gift Maroc",
  "url": "https://novagift.me",
  "logo": "https://novagift.me/favicon.svg",
  "description": "Spécialiste marocain des cadeaux promotionnels personnalisés et solutions de branding pour entreprises.",
  "email": "contact@novagift.me",
  "telephone": "+212693567650",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Casablanca",
    "addressCountry": "MA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+212693567650",
    "contactType": "customer service",
    "areaServed": "MA",
    "availableLanguage": ["French", "Arabic"]
  },
  "sameAs": ["https://wa.me/212693567650"],
  "foundingDate": "2016",
  "foundingLocation": "Casablanca, Morocco",
  "knowsAbout": [
    "Cadeaux d'entreprise personnalisés",
    "Objets publicitaires",
    "Goodies personnalisés",
    "Gravure laser",
    "Broderie sur textile",
    "Sérigraphie",
    "Impression UV",
    "Dorure à chaud",
    "Marquage corporate"
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 5,
    "maxValue": 20
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://novagift.me/#website",
  "name": "Nova Gift",
  "url": "https://novagift.me",
  "description": "Cadeaux promotionnels premium et personnalisés au Maroc — agendas, sacs, gourdes, high-tech, trophées",
  "publisher": { "@id": "https://novagift.me/#organization" },
  "inLanguage": "fr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://novagift.me/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://novagift.me/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Catalogue Cadeaux Promotionnels",
      "item": "https://novagift.me/#catalogue"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "À Propos",
      "item": "https://novagift.me/#about"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "FAQ",
      "item": "https://novagift.me/#faq"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Contact & Devis",
      "item": "https://novagift.me/#contact"
    }
  ]
};

// Generates FAQPage schema from the on-page FAQ (AI/LLM citation benefit)
export function generateFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://novagift.me/#faq",
    "mainEntity": faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };
}

// Generates the ItemList schema dynamically from the current products list
export function generateItemListSchema(products: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Catalogue Nova Gift — Cadeaux Promotionnels Personnalisés au Maroc",
    "description": "Catalogue complet de cadeaux d'entreprise personnalisés : agendas, sacs, gourdes, objets high-tech, trophées, bracelets et accessoires.",
    "url": "https://novagift.me/#catalogue",
    "numberOfItems": products.length,
    "itemListElement": products.slice(0, 10).map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "description": p.shortDescription,
        "image": `https://novagift.me${p.images.default}`,
        "category": p.category,
        "brand": { "@type": "Brand", "name": "Nova Gift" },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "MAD",
          ...(p.price != null ? { "price": String(p.price) } : {}),
          "availability": "https://schema.org/InStock",
          "url": "https://novagift.me/#catalogue",
          "seller": { "@id": "https://novagift.me/#organization" },
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "MA"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 5, "unitCode": "DAY" },
              "transitTime": { "@type": "QuantitativeValue", "minValue": 5, "maxValue": 10, "unitCode": "DAY" }
            }
          }
        }
      }
    }))
  };
}
