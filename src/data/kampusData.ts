import { Users, Handshake, BookOpen, Award, Lightbulb, Rocket } from "lucide-react";

export const getKampusMissions = (isEn: boolean) => [
  {
    icon: Users,
    title: isEn ? "Career Guidance" : "Accompagnement Carrière",
    description: isEn
      ? "Guiding students and young graduates in orientation, career paths, and professional integration."
      : "Accompagner les étudiants et jeunes diplômés dans leur orientation, leurs choix de carrière et leur insertion professionnelle.",
  },
  {
    icon: Handshake,
    title: isEn ? "International Gateway" : "Pont vers l'International",
    description: isEn
      ? "Creating a bridge between young talents, businesses, institutions, and global partners."
      : "Créer un pont entre les jeunes talents, les entreprises, les institutions et les partenaires internationaux.",
  },
  {
    icon: BookOpen,
    title: isEn ? "Trainings & Masterclasses" : "Formations & Masterclass",
    description: isEn
      ? "Offering training programs, workshops, masterclasses, and practical sessions to develop in-demand skills."
      : "Proposer des programmes de Formation, Ateliers, Masterclass et Sessions pratiques pour développer les compétences recherchées.",
  },
  {
    icon: Award,
    title: isEn ? "Global Opportunities" : "Opportunités",
    description: isEn
      ? "Providing opportunities: internships, scholarships, trade missions, competitions, mentorship, academic exchanges..."
      : "Offrir des opportunités : stages, bourses, missions économiques, concours, mentorat, échanges académiques...",
  },
  {
    icon: Lightbulb,
    title: isEn ? "Innovation & Entrepreneurship" : "Innovation & Entrepreneuriat",
    description: isEn
      ? "Stimulating innovation and entrepreneurial spirit among the next generation of economic actors."
      : "Stimuler l'innovation et l'esprit entrepreneurial parmi les jeunes acteurs économiques.",
  },
];

export const getKampusObjectifs = (isEn: boolean) => [
  {
    icon: BookOpen,
    title: isEn ? "Educational Resources" : "Ressources Éducatives",
    description: isEn
      ? "Access to world-class educational resources and specialized study materials."
      : "Accès à des ressources éducatives de qualité mondiale",
  },
  {
    icon: Award,
    title: isEn ? "Scholarship Opportunities" : "Opportunités de Bourses",
    description: isEn
      ? "Study scholarships, grants, and international funding programs."
      : "Des bourses d'études et programmes de financement",
  },
  {
    icon: Users,
    title: isEn ? "Support Programs" : "Programmes d'Accompagnement",
    description: isEn
      ? "Personalized mentorship and guidance throughout each academic journey."
      : "Un accompagnement personnalisé tout au long du parcours",
  },
  {
    icon: Rocket,
    title: isEn ? "Professional Gateways" : "Passerelles Professionnelles",
    description: isEn
      ? "Direct pathways to the corporate world, internships, and dynamic employment."
      : "Des passerelles vers le monde professionnel et l'emploi",
  },
];

