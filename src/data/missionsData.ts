import { Globe, GraduationCap, Handshake, Building2, Users, Briefcase, Rocket, Network, BarChart3 } from "lucide-react";

export const getMissionsAxes = (isEn: boolean) => [
  {
    id: "forums",
    icon: Globe,
    title: isEn ? "International Economic Forums" : "Forums Économiques Internationaux",
    description: isEn
      ? "Organizing and participating in high-level economic forums to position Congo prominently on the world stage."
      : "Organisation et participation aux forums économiques majeurs pour positionner le Congo sur la scène internationale.",
    details: isEn
      ? [
          "Organization of thematic sector forums (hydrocarbons, mining, agriculture)",
          "Participation in major African and global economic summits",
          "Facilitation of high-value B2B matchmaking between global investors and Congolese enterprises",
          "Active promotion of foreign investment incentives in Congo",
          "Creation of strategic exchange platforms for international operators",
        ]
      : [
          "Organisation de forums thématiques sectoriels (hydrocarbures, mines, agriculture)",
          "Participation aux grandes conférences économiques africaines et mondiales",
          "Facilitation de rencontres B2B entre investisseurs et entrepreneurs congolais",
          "Promotion des opportunités d'investissement au Congo",
          "Création de plateformes d'échange entre acteurs économiques",
        ],
  },
  {
    id: "capacites",
    icon: GraduationCap,
    title: isEn ? "Capacity Building & Training" : "Renforcement des Capacités",
    description: isEn
      ? "Executive training and support programs to sharpen the skills of economic leaders and rising talents."
      : "Programmes de formation et d'accompagnement pour développer les compétences des acteurs économiques.",
    details: isEn
      ? [
          "Leadership and strategic management academies for executives",
          "Workshops on international trade standards and certifications",
          "Comprehensive mentorship tracks for high-potential entrepreneurs",
          "Seminars on accessing international blended finance and debt vehicles",
          "Cross-cultural international negotiation masterclasses",
        ]
      : [
          "Formations en leadership et management pour dirigeants",
          "Ateliers sur les normes internationales et certifications",
          "Programmes de mentorat pour jeunes entrepreneurs",
          "Séminaires sur l'accès aux financements internationaux",
          "Formations en négociation commerciale internationale",
        ],
  },
  {
    id: "dialogue",
    icon: Handshake,
    title: isEn ? "Public-Private Dialogue" : "Dialogue Public-Privé",
    description: isEn
      ? "Facilitating constructive dialogue between sovereign authorities and the private sector for an optimal business climate."
      : "Facilitation du dialogue entre le secteur public et privé pour un environnement des affaires favorable.",
    details: isEn
      ? [
          "Roundtables between government ministries and business councils",
          "Evidence-based advocacy to improve regional ease of doing business",
          "Contribution to formulating progressive national economic policies",
          "Mediation between corporate investors and regulatory agencies",
          "Systematic monitoring of commercial legal reforms",
        ]
      : [
          "Organisation de tables rondes entre gouvernement et secteur privé",
          "Plaidoyer pour l'amélioration du climat des affaires",
          "Contribution à l'élaboration de politiques économiques",
          "Médiation dans les relations entreprises-administration",
          "Suivi des réformes du cadre réglementaire",
        ],
  },
  {
    id: "promotion",
    icon: Building2,
    title: isEn ? "Sectoral Promotion" : "Promotion Sectorielle",
    description: isEn
      ? "Promoting key Congolese economic sectors to national, regional, and international investors."
      : "Valorisation des secteurs économiques clés du Congo auprès des investisseurs nationaux et internationaux.",
    details: isEn
      ? [
          "In-depth sectoral studies and competitive market intelligence",
          "Organization of targeted overseas trade and investment missions",
          "Hosting incoming international delegations in Congo",
          "Publishing authoritative sector guidebooks and investment teasers",
          "Active representation at international business fairs and expos",
        ]
      : [
          "Études sectorielles et analyses de marché",
          "Organisation de missions économiques à l'étranger",
          "Accueil de délégations d'investisseurs au Congo",
          "Production de supports promotionnels sectoriels",
          "Participation aux salons et foires internationaux",
        ],
  },
  {
    id: "partenariats",
    icon: Users,
    title: isEn ? "Strategic Partnerships" : "Partenariats Stratégiques",
    description: isEn
      ? "Developing alliances with regional and international economic organizations, chambers, and think tanks."
      : "Développement de partenariats avec les organisations économiques régionales et internationales.",
    details: isEn
      ? [
          "Cooperation treaties with African chambers of commerce and industry",
          "Bilateral memorandums with international trade bodies",
          "Synergies with embassies, diplomatic missions, and consulates",
          "Relationships with multilateral development banks (AfDB, IFC, BDEAC)",
          "Active engagement with diaspora business networks worldwide",
        ]
      : [
          "Accords de coopération avec les chambres de commerce africaines",
          "Partenariats avec les organisations économiques internationales",
          "Collaborations avec les ambassades et consulats",
          "Relations avec les institutions financières internationales",
          "Réseautage avec les diasporas économiques",
        ],
  },
  {
    id: "academique",
    icon: Briefcase,
    title: isEn ? "Academic & Vocational Bridges" : "Accompagnement Académique",
    description: isEn
      ? "Bridging universities and the corporate world to ensure rapid vocational integration and top-tier talent readiness."
      : "Passerelles entre le monde académique et le tissu économique pour une meilleure insertion professionnelle.",
    details: isEn
      ? [
          "Institutional alliances with leading national and global universities",
          "High-impact internship programs with member corporations",
          "Merit scholarships for outstanding young researchers and students",
          "Campus lectures by seasoned industry diplomats and executives",
          "Student entrepreneurship incubation and advisory support",
        ]
      : [
          "Partenariats avec les universités et grandes écoles",
          "Programmes de stages en entreprise",
          "Bourses d'excellence pour étudiants méritants",
          "Conférences et interventions dans les établissements",
          "Accompagnement à l'entrepreneuriat étudiant",
        ],
  },
];

export const getMissionsProjets = (isEn: boolean) => [
  {
    id: "kampus",
    icon: Rocket,
    title: "KAMPUS-CDECO",
    status: isEn ? "Ongoing" : "En cours",
    statusColor: "bg-cdeco-green",
    description: isEn
      ? "Flagship academy and incubator dedicated to empowering young Congolese leaders and entrepreneurs."
      : "Programme phare de formation et d'incubation pour les jeunes entrepreneurs congolais.",
    objectifs: isEn
      ? [
          "Train 500 young entrepreneurs annually",
          "Incubate 50 high-potential startups",
          "Build an elite alumni network of founders",
          "Provide fundraising support through to seed capital",
        ]
      : [
          "Former 500 jeunes entrepreneurs par an",
          "Incuber 50 startups prometteuses",
          "Créer un réseau d'alumni entrepreneurs",
          "Accompagner jusqu'à la levée de fonds",
        ],
    impact: isEn
      ? "Job creation and sustainable revitalization of the Congolese entrepreneurial landscape."
      : "Création d'emplois et dynamisation de l'écosystème entrepreneurial congolais.",
  },
  {
    id: "diaspora",
    icon: Network,
    title: "Diaspora Connect",
    status: isEn ? "Launch 2025" : "Lancement 2025",
    statusColor: "bg-primary",
    description: isEn
      ? "Strategic platform connecting the Congolese diaspora with transformative national opportunities."
      : "Plateforme de connexion entre la diaspora congolaise et les opportunités économiques nationales.",
    objectifs: isEn
      ? [
          "Mobilize diaspora expertise for local industries",
          "Facilitate secure cross-border diaspora investments",
          "Establish an international registry of Congolese talents abroad",
          "Host recurring Diaspora-Congo trade summits",
        ]
      : [
          "Mobiliser les compétences de la diaspora",
          "Faciliter les investissements diasporiques",
          "Créer un annuaire des talents congolais à l'étranger",
          "Organiser des forums diaspora-Congo",
        ],
    impact: isEn
      ? "Knowledge transfer and a substantial increase in diaspora-led direct capital investment."
      : "Transfert de compétences et augmentation des investissements diasporiques.",
  },
  {
    id: "observatoire",
    icon: BarChart3,
    title: isEn ? "Business Climate Observatory" : "Observatoire du Climat des Affaires",
    status: isEn ? "In Development" : "En développement",
    statusColor: "bg-accent",
    description: isEn
      ? "Data-driven monitoring and intelligence tool tracking Congo's business environment to inform policy decisions."
      : "Outil de suivi et d'analyse du climat des affaires au Congo pour orienter les décisions.",
    objectifs: isEn
      ? [
          "Publish quarterly business climate indices",
          "Track key investment facilitation metrics",
          "Deliver actionable policy briefs to decision-makers",
          "Benchmark competitive indicators across CEMAC countries",
        ]
      : [
          "Produire des rapports trimestriels",
          "Créer des indicateurs de suivi",
          "Formuler des recommandations aux décideurs",
          "Benchmarker avec les pays de la sous-région",
        ],
    impact: isEn
      ? "Continuous, data-backed improvement of the national and regional business environment."
      : "Amélioration continue de l'environnement des affaires basée sur des données fiables.",
  },
];

