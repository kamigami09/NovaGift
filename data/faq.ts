export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "Quelle est la quantité minimale de commande ?",
    answer: "La quantité minimale varie selon les produits, généralement à partir de 25 pièces pour la personnalisation. Certains articles acceptent des commandes à partir de 10 unités. Contactez-nous pour votre besoin spécifique."
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "Le délai standard est de 7 à 15 jours ouvrables selon le produit et la complexité de la personnalisation. Pour les commandes urgentes, nous proposons un service express sous réserve de disponibilité."
  },
  {
    question: "Livrez-vous partout au Maroc ?",
    answer: "Oui, nous livrons partout au Maroc — Casablanca, Rabat, Marrakech, Fès, Tanger et toutes les autres villes. Les frais de livraison sont calculés selon la destination et le volume de la commande."
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
