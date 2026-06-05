import { Product } from "@/data/products";

export interface OrderItem {
  product: Product;
  quantity: number;
  colorName?: string;
}

export function generateWhatsAppUrl(
  orderItems: Map<string, OrderItem>,
  name: string = "",
  company: string = "",
  city: string = ""
): string {
  const phoneNumber = "212693567650"; // Clean format for wa.me
  
  let text = "Bonjour Nova Gift, je souhaite demander un devis pour :\n";
  
  let index = 1;
  orderItems.forEach((item) => {
    const colorStr = item.colorName ? ` — Couleur: ${item.colorName}` : "";
    text += `${index}. ${item.product.name}${colorStr} — Quantité: ${item.quantity}\n`;
    index++;
  });
  
  text += `\nNom: ${name}\n`;
  text += `Entreprise: ${company}\n`;
  text += `Ville: ${city}\n`;
  text += "Merci.";
  
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
}

export function generateProductWhatsAppUrl(
  productName: string,
  categoryName: string,
  colorName: string,
  quantity: number,
  customization: string
): string {
  const phoneNumber = "212693567650";
  const text =
    `Bonjour Nova Gift,\nJe souhaite demander un devis pour :\nProduit : ${productName}\nCatégorie : ${categoryName}\nCouleur : ${colorName}\nQuantité : ${quantity}\nPersonnalisation : ${customization}\n\nNom :\nEntreprise :\nVille :\n\nMerci.`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}


export function generateEmailMailto(
  orderItems: Map<string, OrderItem>,
  name: string = "",
  company: string = "",
  phone: string = "",
  budget: string = "",
  message: string = ""
): string {
  const email = "contact@novagift.me";
  const subject = `Demande de Devis — ${company || name || `${orderItems.size} article(s)`}`;
  
  let body = "Bonjour,\n\nJe souhaite recevoir un devis pour les articles suivants :\n\n";
  body += "────────────────────────────────\n";
  
  let index = 1;
  orderItems.forEach((item) => {
    const colorStr = item.colorName ? ` (Couleur: ${item.colorName})` : "";
    body += `${index}. ${item.product.name}${colorStr}\n`;
    body += `   Catégorie : ${item.product.category}\n`;
    body += `   Quantité  : ${item.quantity} pièce(s)\n\n`;
    index++;
  });
  
  body += "────────────────────────────────\n\n";
  body += `Nom : ${name}\n`;
  body += `Entreprise : ${company || "Non renseignée"}\n`;
  body += `Téléphone : ${phone}\n`;
  body += `Budget approximatif : ${budget || "Non renseigné"}\n\n`;
  
  if (message.trim()) {
    body += `Message supplémentaire :\n${message}\n\n`;
  }
  
  body += "Merci de me faire parvenir un devis détaillé.\n\nCordialement,";
  
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
