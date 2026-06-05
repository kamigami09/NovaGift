export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "01",
    quote: "Sélection de produits premium, contrôle des finitions et conseil sur la technique de marquage adaptée à chaque support.",
    author: "Qualité Constante",
    company: "Agendas, sacs, gourdes, high-tech et trophées"
  },
  {
    id: "02",
    quote: "Un processus clair pour les équipes marketing, RH et achats : sélection, devis, validation du logo, production puis livraison.",
    author: "Délais Maîtrisés",
    company: "Devis sous 48h et suivi de commande"
  },
  {
    id: "03",
    quote: "Accompagnement pour choisir des cadeaux cohérents avec votre image de marque, votre budget et le contexte de l'événement.",
    author: "Conseil Corporate",
    company: "Cadeaux clients, collaborateurs et partenaires"
  }
];
