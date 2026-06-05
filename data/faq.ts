export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "Quelle est la quantité minimale de commande ?",
    answer: "La quantité minimale varie selon les produits, généralement à partir de 50 pièces pour la personnalisation, et à partir de 100 pièces pour les petits objets (porte-clés, bracelets, stylos). Certains articles premium acceptent des commandes dès 25 unités. Des prix dégressifs s'appliquent au-delà de 250 et 500 pièces. Contactez-nous avec votre quantité cible et nous établissons un devis adapté sous 48h."
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "Le délai standard est de 7 à 15 jours ouvrables après validation du bon à tirer (BAT), selon le produit et la complexité de la personnalisation. La gravure laser et l'impression sur stock sont les plus rapides ; la broderie et les coffrets sur-mesure demandent un peu plus de temps. Pour les commandes urgentes (événements, salons), nous proposons un service express sous réserve de disponibilité. La livraison s'effectue partout au Maroc."
  },
  {
    question: "Livrez-vous partout au Maroc ?",
    answer: "Oui, nous livrons partout au Maroc : Casablanca, Rabat, Marrakech, Fès, Tanger et toutes les autres villes. Les frais de livraison sont calculés selon la destination et le volume de la commande."
  },
  {
    question: "La personnalisation est-elle possible sur tous les produits ?",
    answer: "Pratiquement tous nos produits sont personnalisables : gravure laser, broderie, sérigraphie, impression UV ou dorure à chaud. Envoyez-nous votre logo et nous vous conseillons sur la meilleure technique."
  },
  {
    question: "Comment obtenir un devis ?",
    answer: "Sélectionnez vos produits dans le catalogue, indiquez vos quantités et cliquez sur « Envoyer la Commande » par WhatsApp ou Email. Vous recevrez un devis détaillé sous 48h."
  }
];
