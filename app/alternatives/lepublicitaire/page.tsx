import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";

const URL = "https://novagift.me/alternatives/lepublicitaire";
const UPDATED = "juin 2026";

export const metadata: Metadata = {
  title: "Alternative à Le Publicitaire : Nova Gift (2026)",
  description:
    "Vous cherchez une alternative à Le Publicitaire pour vos objets publicitaires au Maroc ? Comparatif honnête : techniques, délais, devis 48h. Nova Gift premium.",
  keywords: [
    "alternative le publicitaire maroc",
    "le publicitaire avis",
    "objets publicitaires maroc",
    "cadeaux d'entreprise personnalisés maroc",
    "fournisseur cadeaux entreprise casablanca",
    "broderie objets personnalisés maroc",
  ],
  alternates: {
    canonical: URL,
    languages: { "fr-MA": URL, "x-default": URL },
  },
  openGraph: {
    title: "Alternative à Le Publicitaire : Nova Gift (2026)",
    description:
      "Comparatif honnête entre Nova Gift et Le Publicitaire pour les objets publicitaires et cadeaux d'entreprise personnalisés au Maroc.",
    url: URL,
    siteName: "Nova Gift",
    locale: "fr_MA",
    type: "article",
    images: [
      {
        url: "https://novagift.me/images/hero-novagift-showcase.png",
        width: 1200,
        height: 630,
        alt: "Nova Gift, alternative premium à Le Publicitaire au Maroc",
      },
    ],
  },
};

const WHATSAPP =
  "https://wa.me/212693567650?text=Bonjour%20Nova%20Gift%2C%20je%20souhaite%20un%20devis%20pour%20des%20objets%20publicitaires%20personnalis%C3%A9s.";

// ── Honest, sourced feature matrix ───────────────────────────────
const matrix: { critere: string; nova: string; concurrent: string }[] = [
  { critere: "Objets publicitaires personnalisés", nova: "oui", concurrent: "oui" },
  { critere: "Devis personnalisé sous 48h", nova: "oui", concurrent: "oui" },
  { critere: "Commande en ligne (panier)", nova: "non — devis WhatsApp / e-mail", concurrent: "oui — boutique e-commerce" },
  { critere: "Prix affichés en ligne", nova: "à partir de ~10 Dh / article (sur devis)", concurrent: "catalogue avec prix" },
  { critere: "Gravure laser", nova: "oui", concurrent: "oui" },
  { critere: "Sérigraphie", nova: "oui", concurrent: "oui" },
  { critere: "Broderie", nova: "oui", concurrent: "partiel / non mis en avant" },
  { critere: "Impression UV", nova: "oui", concurrent: "partiel / non mis en avant" },
  { critere: "Dorure à chaud", nova: "oui", concurrent: "partiel / non mis en avant" },
  { critere: "Sublimation", nova: "sur demande", concurrent: "oui" },
  { critere: "Livraison partout au Maroc", nova: "oui", concurrent: "oui" },
  { critere: "Accompagnement / conseil sur-mesure", nova: "oui — service premium", concurrent: "self-service e-commerce" },
  { critere: "Données structurées produit (rich results)", nova: "oui — complètes", concurrent: "limitées" },
  { critere: "Couverture multi-villes", nova: "Casablanca + livraison nationale", concurrent: "couverture multi-villes" },
];

const techniques: { tech: string; ideal: string }[] = [
  { tech: "Gravure laser", ideal: "Métal, bois, cuir — rendu durable et élégant (stylos, trophées, agendas)." },
  { tech: "Broderie", ideal: "Textile — polos, casquettes, sacs : rendu premium et résistant." },
  { tech: "Sérigraphie", ideal: "Grands volumes — tote bags, t-shirts, objets plastiques." },
  { tech: "Impression UV", ideal: "Surfaces dures et couleurs vives — gourdes, powerbanks, coffrets." },
  { tech: "Dorure à chaud", ideal: "Finitions haut de gamme — agendas, carnets, coffrets cadeaux." },
];

const faq: { q: string; a: string }[] = [
  {
    q: "Quelle est la meilleure alternative à Le Publicitaire au Maroc ?",
    a: "Nova Gift est une alternative premium à Le Publicitaire pour les cadeaux d'entreprise personnalisés au Maroc. Nova Gift mise sur le conseil sur-mesure, des techniques de marquage haut de gamme (broderie, impression UV, dorure) et un devis sous 48h, tandis que Le Publicitaire propose une boutique en ligne avec prix affichés et une large couverture multi-villes.",
  },
  {
    q: "Nova Gift propose-t-il la commande en ligne comme Le Publicitaire ?",
    a: "Nova Gift fonctionne sur devis : vous sélectionnez vos produits dans le catalogue puis envoyez votre demande par WhatsApp ou e-mail, et recevez un devis détaillé sous 48h. Le Publicitaire propose une boutique e-commerce avec ajout au panier et prix affichés.",
  },
  {
    q: "Quelles techniques de personnalisation propose Nova Gift ?",
    a: "Nova Gift propose la gravure laser, la broderie, la sérigraphie, l'impression UV et la dorure à chaud. Envoyez votre logo et l'équipe vous conseille sur la technique la plus adaptée à chaque produit.",
  },
  {
    q: "Nova Gift livre-t-il partout au Maroc ?",
    a: "Oui, Nova Gift livre partout au Maroc : Casablanca, Rabat, Marrakech, Fès, Tanger et les autres villes. Les frais de livraison sont calculés selon la destination et le volume de la commande.",
  },
];

export default function ComparisonPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${URL}/#webpage`,
        url: URL,
        name: "Alternative à Le Publicitaire : Nova Gift (2026)",
        description:
          "Comparatif honnête entre Nova Gift et Le Publicitaire pour les objets publicitaires et cadeaux d'entreprise personnalisés au Maroc.",
        inLanguage: "fr-MA",
        isPartOf: { "@id": "https://novagift.me/#website" },
        publisher: { "@id": "https://novagift.me/#organization" },
        dateModified: "2026-06-05",
        about: [
          { "@type": "Organization", name: "Nova Gift", url: "https://novagift.me/" },
          { "@type": "Organization", name: "Le Publicitaire", url: "https://www.lepublicitaire.com/" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://novagift.me/" },
          { "@type": "ListItem", position: 2, name: "Comparatifs", item: "https://novagift.me/alternatives/" },
          { "@type": "ListItem", position: 3, name: "Alternative à Le Publicitaire", item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}/#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div className="bg-[#FAFAFA] border-b border-[#E8E8E8] px-6 py-3">
        <div className="max-w-[860px] mx-auto flex flex-wrap items-center gap-2 font-body text-xs text-[#7A7A7A]">
          <Link href="/" className="hover:text-gold">Accueil</Link>
          <span>/</span>
          <span>Comparatifs</span>
          <span>/</span>
          <span className="text-navy">Alternative à Le Publicitaire</span>
        </div>
      </div>

      <article className="max-w-[860px] mx-auto px-6 py-12 md:py-16">
        {/* Disclosure */}
        <p className="text-[11px] uppercase tracking-[2px] text-gold font-semibold mb-3">Comparatif · Mis à jour {UPDATED}</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-navy leading-tight">
          Nova Gift : l&apos;alternative premium à Le Publicitaire au Maroc
        </h1>

        <p className="mt-5 text-[#444] leading-relaxed">
          <strong>Vous cherchez une alternative à Le Publicitaire</strong> pour vos objets publicitaires et cadeaux
          d&apos;entreprise personnalisés au Maroc&nbsp;? Voici un comparatif honnête entre Nova Gift et Le Publicitaire
          pour vous aider à choisir le bon partenaire selon vos priorités&nbsp;: commande en ligne immédiate, ou rendu
          premium et accompagnement sur-mesure.
        </p>
        <p className="mt-3 text-sm text-[#7A7A7A] italic">
          Transparence&nbsp;: cette page est publiée par Nova Gift. Les informations sur Le Publicitaire proviennent de
          sources publiques (leur site) et sont datées de {UPDATED}. Nous créditons honnêtement leurs points forts.
        </p>

        {/* Verdict en bref */}
        <section className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-5">
            <h2 className="font-display text-lg text-navy mb-2">Choisissez Nova Gift si…</h2>
            <p className="text-sm text-[#555] leading-relaxed">
              Vous voulez un rendu <strong>premium</strong>, un <strong>conseil sur-mesure</strong> et des techniques
              haut de gamme (broderie, impression UV, dorure à chaud), avec un <strong>devis sous 48h</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-5">
            <h2 className="font-display text-lg text-navy mb-2">Choisissez Le Publicitaire si…</h2>
            <p className="text-sm text-[#555] leading-relaxed">
              Vous préférez <strong>commander en ligne immédiatement</strong> avec un panier et des
              <strong> prix affichés</strong>, sur un large catalogue e-commerce.
            </p>
          </div>
        </section>

        {/* CTA soft */}
        <div className="mt-6">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-navy font-body font-bold text-xs tracking-[1.5px] uppercase px-6 py-3 rounded-full hover:bg-navy hover:text-white transition-colors">
            Devis gratuit sous 48h
          </a>
        </div>

        {/* Matrix */}
        <h2 className="font-display text-2xl text-navy mt-12 mb-4">Tableau comparatif</h2>
        <div className="overflow-x-auto rounded-xl border border-[#E8E8E8]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white text-left">
                <th className="p-3 font-semibold">Critère</th>
                <th className="p-3 font-semibold">Nova Gift</th>
                <th className="p-3 font-semibold">Le Publicitaire</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={row.critere} className={i % 2 ? "bg-[#FAFAFA]" : "bg-white"}>
                  <td className="p-3 font-medium text-navy">{row.critere}</td>
                  <td className="p-3 text-[#555]">{row.nova}</td>
                  <td className="p-3 text-[#555]">{row.concurrent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-[#9CA3AF]">Données publiques au {UPDATED}, à revérifier régulièrement.</p>

        {/* Le Publicitaire en bref */}
        <h2 className="font-display text-2xl text-navy mt-12 mb-3">Le Publicitaire en bref</h2>
        <p className="text-[#444] leading-relaxed">
          Le Publicitaire est un acteur établi des objets publicitaires au Maroc, avec une{" "}
          <strong>boutique e-commerce</strong>, un <strong>large catalogue de prix affichés</strong> et une{" "}
          <strong>couverture multi-villes</strong>. C&apos;est un bon choix si votre priorité est de commander en ligne
          rapidement, sans passer par un devis. Source&nbsp;:{" "}
          <a href="https://www.lepublicitaire.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-gold hover:underline">
            lepublicitaire.com
          </a>.
        </p>

        {/* Nova Gift en bref */}
        <h2 className="font-display text-2xl text-navy mt-10 mb-3">Nova Gift en bref</h2>
        <p className="text-[#444] leading-relaxed">
          Nova Gift est un fournisseur marocain de cadeaux promotionnels et d&apos;objets publicitaires personnalisés,
          basé à Casablanca. Nous mettons l&apos;accent sur le <strong>service premium</strong>, le{" "}
          <strong>conseil sur-mesure</strong> et des techniques de marquage haut de gamme — <strong>broderie</strong>,{" "}
          <strong>impression UV</strong>, <strong>dorure à chaud</strong>, gravure laser et sérigraphie. Chaque demande
          reçoit un <strong>devis détaillé sous 48h</strong> et une livraison partout au Maroc.
        </p>

        {/* Cas d'usage */}
        <h2 className="font-display text-2xl text-navy mt-10 mb-3">Quel fournisseur pour quel besoin&nbsp;?</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-navy">Vous voulez commander en ligne rapidement&nbsp;?</h3>
            <p className="text-sm text-[#555] leading-relaxed">Le Publicitaire, grâce à sa boutique e-commerce et ses prix affichés.</p>
          </div>
          <div>
            <h3 className="font-semibold text-navy">Vous voulez un rendu premium et un conseil sur-mesure&nbsp;?</h3>
            <p className="text-sm text-[#555] leading-relaxed">Nova Gift, pour la broderie, l&apos;impression UV, la dorure et l&apos;accompagnement personnalisé.</p>
          </div>
          <div>
            <h3 className="font-semibold text-navy">Vous avez un gros volume événementiel&nbsp;?</h3>
            <p className="text-sm text-[#555] leading-relaxed">Comparez les deux devis — Nova Gift applique des prix dégressifs au-delà de 250 et 500 pièces.</p>
          </div>
        </div>

        {/* Techniques */}
        <h2 className="font-display text-2xl text-navy mt-10 mb-4">Techniques de marquage comparées</h2>
        <div className="overflow-x-auto rounded-xl border border-[#E8E8E8]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAFAFA] text-left">
                <th className="p-3 font-semibold text-navy">Technique</th>
                <th className="p-3 font-semibold text-navy">Idéale pour</th>
              </tr>
            </thead>
            <tbody>
              {techniques.map((t) => (
                <tr key={t.tech} className="border-t border-[#E8E8E8]">
                  <td className="p-3 font-medium text-navy whitespace-nowrap">{t.tech}</td>
                  <td className="p-3 text-[#555]">{t.ideal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <h2 className="font-display text-2xl text-navy mt-12 mb-4">Questions fréquentes</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="rounded-xl border border-[#E8E8E8] bg-white overflow-hidden group">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-navy text-sm list-none flex justify-between items-center">
                {f.q}
                <span className="text-gold group-open:rotate-45 transition-transform text-lg leading-none">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm text-[#555] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        {/* Verdict + CTA */}
        <div className="mt-12 rounded-2xl bg-navy text-white p-8 text-center">
          <h2 className="font-display text-2xl mb-2">Notre verdict</h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-xl mx-auto">
            Les deux sont de bons choix selon vos priorités. Pour un <strong className="text-gold">rendu premium</strong>,
            un conseil sur-mesure et des techniques haut de gamme, demandez un devis Nova Gift — réponse sous 48h.
          </p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="inline-flex mt-5 bg-gold text-navy font-body font-bold text-xs tracking-[1.5px] uppercase px-7 py-3.5 rounded-full hover:bg-white transition-colors">
            Demander mon devis Nova Gift
          </a>
        </div>

        {/* Internal links */}
        <div className="mt-10 border-t border-[#E8E8E8] pt-6">
          <p className="text-xs uppercase tracking-[1.5px] text-[#9CA3AF] mb-3">Explorez nos catégories</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/catalogue" className="text-xs font-semibold text-navy border border-navy/20 hover:border-gold hover:text-gold rounded-full px-4 py-2 transition-colors">
              Tout le catalogue
            </Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/catalogue/${c.slug}`} className="text-xs text-[#555] border border-[#E8E8E8] hover:border-gold hover:text-gold rounded-full px-4 py-2 transition-colors">
                {c.shortLabel}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-[#9CA3AF]">
          Méthodologie&nbsp;: comparatif établi à partir des sites publics de Nova Gift et Le Publicitaire. Dernière mise
          à jour&nbsp;: {UPDATED}. Les caractéristiques et tarifs peuvent évoluer&nbsp;; vérifiez auprès de chaque
          fournisseur avant commande.
        </p>
      </article>
    </main>
  );
}
