import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory, products } from "@/data/products";
import CategoryPageClient from "./CategoryPageClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((cat) => ({ categorySlug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    keywords: category.keywords,
    alternates: {
      canonical: `https://novagift.me/catalogue/${category.slug}`,
      languages: {
        "fr-MA": `https://novagift.me/catalogue/${category.slug}`,
        "x-default": `https://novagift.me/catalogue/${category.slug}`
      }
    },
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      url: `https://novagift.me/catalogue/${category.slug}`,
      siteName: "Nova Gift",
      locale: "fr_MA",
      type: "website",
      images: [{
        url: `https://novagift.me${category.heroImage}`,
        width: 1200,
        height: 630,
        alt: category.name
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: category.seoTitle,
      description: category.seoDescription,
      images: [`https://novagift.me${category.heroImage}`]
    }
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(categorySlug);
  const relatedCategories = categories.filter((c) =>
    category.relatedSlugs.includes(c.slug)
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.seoTitle,
    description: category.seoDescription,
    url: `https://novagift.me/catalogue/${category.slug}`,
    numberOfItems: categoryProducts.length,
    itemListElement: categoryProducts.map((p, i) => ({
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://novagift.me/" },
      { "@type": "ListItem", position: 2, name: "Catalogue", item: "https://novagift.me/catalogue" },
      { "@type": "ListItem", position: 3, name: category.name, item: `https://novagift.me/catalogue/${category.slug}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#FAFAFA] border-b border-[#E8E8E8] px-6 py-3">
          <div className="max-w-[1280px] mx-auto flex items-center gap-2 font-body text-xs text-[#7A7A7A]">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-gold transition-colors">Catalogue</Link>
            <span>/</span>
            <span className="text-navy font-semibold">{category.name}</span>
          </div>
        </div>

        {/* Category Hero */}
        <div className="bg-navy py-10 px-6 text-center">
          <p className="font-display italic text-sm text-gold tracking-[3px] uppercase mb-4">
            {category.icon} Catégorie
          </p>
          <h1 className="font-display font-light text-4xl md:text-5xl text-white">
            {category.name}
          </h1>
          <p className="font-body text-sm text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            {category.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href={`https://wa.me/212693567650?text=${encodeURIComponent(`Bonjour Nova Gift, je souhaite un devis pour des ${category.name} personnalisés pour mon entreprise.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-body font-semibold text-xs tracking-[1.5px] uppercase px-8 py-4 rounded-xl hover:bg-[#1ea850] transition-all"
            >
              Demander un devis gratuit
            </a>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-body font-semibold text-xs tracking-[1.5px] uppercase px-8 py-4 rounded-xl hover:border-gold hover:text-gold transition-all"
            >
              Voir tout le catalogue
            </Link>
          </div>
        </div>

        {/* Products */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
          <CategoryPageClient products={categoryProducts} />
        </div>

        {/* FAQ */}
        {category.faq.length > 0 && (
          <div className="bg-[#FAFAFA] border-t border-[#E8E8E8] py-16">
            <div className="max-w-[760px] mx-auto px-6">
              <h2 className="font-display font-light text-3xl text-black text-center mb-10">
                Questions fréquentes — {category.name}
              </h2>
              <div className="flex flex-col gap-4">
                {category.faq.map((item, i) => (
                  <details key={i} className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-body font-medium text-sm text-black hover:text-gold transition-colors list-none">
                      {item.question}
                      <span className="text-gold ml-4 shrink-0">+</span>
                    </summary>
                    <div className="px-6 pb-6 font-body font-light text-sm text-[#7A7A7A] leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <div className="py-16 border-t border-[#E8E8E8]">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
              <h2 className="font-display font-light text-2xl text-black mb-8 text-center">
                Catégories similaires
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {relatedCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/catalogue/${cat.slug}`}
                    className="group flex items-center gap-3 border border-[#E8E8E8] hover:border-gold rounded-xl px-6 py-4 transition-all hover:shadow-md"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <div className="font-body font-semibold text-sm text-black group-hover:text-gold transition-colors">{cat.name}</div>
                      <div className="font-body text-[10px] text-[#7A7A7A] mt-0.5">{getProductsByCategory(cat.slug).length} produits</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="bg-navy py-16 text-center">
          <h2 className="font-display font-light text-3xl text-white mb-4">
            Prêt à personnaliser vos {category.name.toLowerCase()} ?
          </h2>
          <p className="font-body text-sm text-white/70 mb-8 max-w-lg mx-auto">
            Contactez notre équipe pour un devis sur-mesure sous 48h, avec BAT offert.
          </p>
          <a
            href={`https://wa.me/212693567650?text=${encodeURIComponent(`Bonjour Nova Gift, je souhaite un devis pour des ${category.name} personnalisés.\n\nNom :\nEntreprise :\nQuantité souhaitée :\nVille :\n\nMerci.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-body font-semibold text-sm tracking-[1.5px] uppercase px-10 py-5 rounded-xl hover:bg-[#1ea850] transition-all shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.59 7.449h-.004a9.935 9.935 0 01-5.029-1.367l-.361-.214-3.741.982.998-3.648-.235-.374a9.927 9.927 0 01-1.529-5.34c.001-5.495 4.474-9.963 9.98-9.963 2.668 0 5.175 1.039 7.063 2.927a9.93 9.93 0 012.92 7.063c-.001 5.496-4.474 9.964-9.962 9.964M19.484 4.44A11.806 11.806 0 0011.96 1.21c-6.515.001-11.82 5.305-11.821 11.82 0 2.083.543 4.119 1.575 5.917L.785 23.52l4.726-1.24a11.87 11.87 0 005.666 1.44h.005c6.514 0 11.819-5.304 11.82-11.819a11.766 11.766 0 00-3.517-8.461" /></svg>
            Demander un devis WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
