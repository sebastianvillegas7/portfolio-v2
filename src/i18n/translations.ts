import type { Project } from "@/types/project";

export type Language = "es" | "en";

export const translations = {
  es: {
    hero: {
      roles: [
        "Desarrollo web",
        "Aplicaciones a medida",
        "Full-stack development",
        "Clases de programación",
        "Tutorías de proyectos",
      ],
      badge: "Productos digitales a medida",
      headlinePrefix: "De una idea a un producto digital que",
      headlineHighlight: "realmente funciona.",
      descriptionPrefix: "Desarrollo ",
      descriptionStrong: "soluciones claras, funcionales y atractivas",
      descriptionSuffix: ", pensadas para resolver necesidades reales.",
      primaryAction: "Ver trabajos",
      secondaryAction: "Hablemos",
    },
    selectedWork: {
      eyebrow: "Proyectos destacados",
      title: "Trabajo seleccionado",
      intro:
        "Una selección de productos digitales, experiencias web y e-commerce desarrollados para necesidades reales.",
      designDevelopment: "Diseño & desarrollo",
      exploreProject: "Explorar proyecto",
    },
    otherWork: {
      eyebrow: "Más proyectos",
      title: "Otros trabajos",
      exploreProject: "Explorar proyecto",
      projectInDevelopment: "Proyecto en desarrollo",
      visitProject: "Ver proyecto ↗",
      inDevelopment: "En desarrollo",
      projectLabel: "Proyecto",
      previous: "Anterior",
      next: "Siguiente",
    },
    language: {
      selectorLabel: "Seleccionar idioma",
    },
  },
  en: {
    hero: {
      roles: [
        "Web development",
        "Custom applications",
        "Full-stack development",
        "Programming lessons",
        "Project tutoring",
      ],
      badge: "Custom digital products",
      headlinePrefix: "From an idea to a digital product that",
      headlineHighlight: "actually works.",
      descriptionPrefix: "I build ",
      descriptionStrong: "clear, functional and attractive solutions",
      descriptionSuffix: ", designed to solve real needs.",
      primaryAction: "View work",
      secondaryAction: "Let's talk",
    },
    selectedWork: {
      eyebrow: "Selected Work",
      title: "Selected Work",
      intro:
        "A selection of digital products, web experiences and e-commerce projects built around real needs.",
      designDevelopment: "Design & development",
      exploreProject: "Explore project",
    },
    otherWork: {
      eyebrow: "More Projects",
      title: "Other Work",
      exploreProject: "Explore project",
      projectInDevelopment: "Project in development",
      visitProject: "Visit project ↗",
      inDevelopment: "In development",
      projectLabel: "Project",
      previous: "Previous",
      next: "Next",
    },
    language: {
      selectorLabel: "Select language",
    },
  },
} as const;

type ProjectTranslation = Partial<
  Pick<
    Project,
    | "title"
    | "client"
    | "location"
    | "country"
    | "category"
    | "description"
    | "longDescription"
  >
>;

const projectTranslations: Record<
  Language,
  Record<string, ProjectTranslation>
> = {
  es: {},
  en: {
    "revia-cloud": {
      location: "Spain",
      country: "Spain",
      category: "Cloud / Corporate website",
      description:
        "Web development for a European cloud solutions company commercializing vBoxx technology, a Dutch provider specialized in business storage and collaboration.",
      longDescription:
        "Design and development of a corporate website for Revia Cloud, a company specialized in private cloud solutions for businesses in Spain. The project clearly presents its storage, synchronization and secure file transfer services, together with commercial plans and contact channels.",
    },
    "pancho-vina": {
      location: "Spain",
      country: "Spain",
      category: "E-commerce / Shopify",
      description:
        "Online store specialized in European wines, built on Shopify to combine catalog, sales and content in a complete shopping experience.",
      longDescription:
        "Development and customization of an e-commerce store specialized in high-end wines, mainly from Italian and French wineries. The store integrates a broad product catalog, collections, quantity promotions, memberships, events, associated wineries, cart and checkout within the Shopify ecosystem.",
    },
    "tts-studio": {
      country: "United States",
      category: "Beauty / Web design",
      description:
        "Web experience for a studio specialized in lashes & brows, combining a premium aesthetic with services, promotions and appointment booking.",
      longDescription:
        "Design and development of the TTs Studio website, a brows & lashes studio located in Sunnyside, Queens. The project combines a premium visual identity with services, promotions, products, studio content and calls to action focused on making appointment booking easier.",
    },
    "sol-hair-stylist": {
      country: "United States",
      category: "Beauty / Web design",
      description:
        "Website for a hair styling, color and makeup professional, with a warm presentation of services and calls to action focused on booking.",
    },
    "artcut": {
      country: "United States",
      category: "Beauty / Web design",
      description:
        "Website for a beauty salon offering hair and nail bar services, built around a premium visual experience focused on bookings.",
    },
    "new-era": {
      country: "United States",
      category: "Beauty / Web design",
      description:
        "Website for a salon and barbershop in Washington Heights, focused on visual identity, services and appointment booking.",
    },
    "henry-junk-removal": {
      country: "United States",
      category: "Services / Web design",
      description:
        "Website for a junk removal, demolition and cleanup company, designed to present services and make quote requests easier.",
    },
    "agenda-clases": {
      title: "Appointment Manager",
      client: "Own product",
      category: "SaaS / Appointment management",
      description:
        "Web application for organizing clients and students, appointments, packages and payments, designed to evolve into a booking system adaptable to different services.",
    },
  },
};

export function localizeProjects(
  projects: Project[],
  language: Language,
): Project[] {
  if (language === "es") {
    return projects;
  }

  return projects.map((project) => ({
    ...project,
    ...projectTranslations[language][project.slug],
  }));
}
