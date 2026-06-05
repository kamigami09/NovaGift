import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import ProductDetailClient from "./ProductDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ productSlug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);
  if (!product) return {};

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.keywords,
    alternates: {
      canonical: `https://novagift.me/produit/${product.slug}`,
      languages: {
        "fr-MA": `https://novagift.me/produit/${product.slug}`,
        "x-default": `https://novagift.me/produit/${product.slug}`
      }
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `https://novagift.me/produit/${product.slug}`,
      siteName: "Nova Gift",
      locale: "fr_MA",
      type: "website",
      images: [{
        url: `https://novagift.me${product.images.default}`,
        width: 1200,
        height: 630,
        alt: product.name
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.seoDescription,
      images: [`https://novagift.me${product.images.default}`]
    }
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const category = getCategoryBySlug(product.categorySlug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    image: `https://novagift.me${product.images.default}`,
    brand: { "@type": "Brand", name: "Nova Gift" },
    category: product.categoryName,
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      ...(product.price != null ? { price: String(product.price) } : {}),
      availability: "https://schema.org/InStock",
      url: `https://novagift.me/produit/${product.slug}`,
      seller: { "@id": "https://novagift.me/#organization" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MA"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 10, maxValue: 15, unitCode: "DAY" }
        }
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://novagift.me/" },
      { "@type": "ListItem", position: 2, name: "Catalogue", item: "https://novagift.me/catalogue" },
      { "@type": "ListItem", position: 3, name: product.categoryName, item: `https://novagift.me/catalogue/${product.categorySlug}` },
      { "@type": "ListItem", position: 4, name: product.name, item: `https://novagift.me/produit/${product.slug}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#FAFAFA] border-b border-[#E8E8E8] px-6 py-3">
          <div className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-2 font-body text-xs text-[#7A7A7A]">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-gold transition-colors">Catalogue</Link>
            <span>/</span>
            <Link href={`/catalogue/${product.categorySlug}`} className="hover:text-gold transition-colors">{product.categoryName}</Link>
            <span>/</span>
            <span className="text-navy font-semibold truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        {/* Product Main */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
          <ProductDetailClient product={product} />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="bg-[#FAFAFA] border-t border-[#E8E8E8] py-16">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
              <h2 className="font-display font-light text-3xl text-black mb-10">
                Produits similaires
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/produit/${p.slug}`}
                    className="group bg-white border border-[#E8E8E8] rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="relative aspect-square bg-[#FAFAFA]">
                      <img
                        src={p.images.default}
                        alt={p.name}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-body font-semibold text-xs text-black group-hover:text-gold transition-colors leading-snug">{p.name}</h4>
                      <p className="font-body text-[10px] text-[#7A7A7A] mt-1">Min. {p.minQuantity} pcs</p>
                    </div>
                  </Link>
                ))}
              </div>
              {category && (
                <div className="mt-8 text-center">
                  <Link
                    href={`/catalogue/${product.categorySlug}`}
                    className="font-body font-semibold text-xs tracking-[1.5px] uppercase text-gold border border-gold px-8 py-3 rounded-xl hover:bg-gold hover:text-white transition-all"
                  >
                    Voir tous les {category.name.toLowerCase()}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom WhatsApp CTA */}
        <div className="bg-navy py-14 text-center">
          <h2 className="font-display font-light text-3xl text-white mb-4">Personnalisez le {product.name}</h2>
          <p className="font-body text-sm text-white/70 mb-8 max-w-lg mx-auto">
            Envoyez-nous votre logo et vos quantités. Devis gratuit sous 48h, BAT offert.
          </p>
          <a
            href={`https://wa.me/212693567650?text=${encodeURIComponent(`Bonjour Nova Gift,\nJe souhaite un devis pour :\nProduit : ${product.name}\nCatégorie : ${product.categoryName}\n\nNom :\nEntreprise :\nQuantité souhaitée :\nVille :\n\nMerci.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-body font-semibold text-sm uppercase tracking-[1.5px] px-10 py-5 rounded-xl hover:bg-[#1ea850] transition-all shadow-lg"
          >
            Demander un devis WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
