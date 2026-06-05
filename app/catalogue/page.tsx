import type { Metadata } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import CatalogueClient from "./CatalogueClient";

export const metadata: Metadata = {
  title: "Catalogue Cadeaux Promotionnels Maroc | Nova Gift",
  description: "Découvrez notre catalogue complet de cadeaux d'entreprise personnalisés au Maroc : agendas, sacs, gourdes, mugs, stylos, bracelets et trophées. Devis sous 48h.",
  alternates: {
    canonical: "https://novagift.me/catalogue",
    languages: { "fr-MA": "https://novagift.me/catalogue", "x-default": "https://novagift.me/catalogue" }
  },
  openGraph: {
    title: "Catalogue Nova Gift — Cadeaux Promotionnels Personnalisés au Maroc",
    description: "Agendas, sacs, gourdes, mugs, stylos, bracelets, trophées — personnalisés pour votre entreprise. Devis gratuit sous 48h.",
    url: "https://novagift.me/catalogue",
    siteName: "Nova Gift",
    locale: "fr_MA",
    type: "website",
    images: [{ url: "https://novagift.me/images/hero-novagift-showcase.png", width: 1200, height: 630, alt: "Catalogue Nova Gift" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogue Nova Gift — Cadeaux Promotionnels Maroc",
    description: "Agendas, sacs, gourdes, mugs, stylos, bracelets, trophées personnalisés. Devis sous 48h.",
    images: ["https://novagift.me/images/hero-novagift-showcase.png"]
  }
};

export default function CataloguePage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catalogue Nova Gift",
    url: "https://novagift.me/catalogue",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.shortDescription,
        url: `https://novagift.me/produit/${p.slug}`,
        image: `https://novagift.me${p.images.default}`,
        brand: { "@type": "Brand", name: "Nova Gift" }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <CatalogueClient allProducts={products} categories={categories} />
    </>
  );
}
