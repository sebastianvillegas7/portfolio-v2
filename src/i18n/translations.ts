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
    services: {
      eyebrow: "Servicios",
      title: "Cómo puedo ayudarte",
      development: {
        label: "Programación",
        title: "Desarrollo de productos digitales",
        description:
          "Webs, aplicaciones y soluciones a medida pensadas para resolver necesidades concretas y crecer con cada proyecto.",
        webTitle: "Webs & e-commerce",
        webText:
          "Sitios corporativos, portfolios, landings y tiendas online.",
        appsTitle: "Apps & sistemas",
        appsText:
          "Aplicaciones web, paneles, APIs e integraciones a medida.",
        capabilities: [
          {
            title: "Gestión",
            text: "Paneles y herramientas para gestionar tu negocio.",
          },
          {
            title: "Automatización",
            text: "Menos tareas repetitivas y procesos más ágiles.",
          },
          {
            title: "Integraciones",
            text: "Conectá sistemas, servicios y plataformas.",
          },
        ],
        webItems: [
          {
            title: "Sitios web",
            text: "Webs corporativas, portfolios y experiencias enfocadas en comunicar mejor.",
          },
          {
            title: "E-commerce",
            text: "Tiendas online pensadas para mostrar, vender y facilitar la compra.",
          },
          {
            title: "Landing pages",
            text: "Páginas claras y directas para presentar servicios, productos o campañas.",
          },
        ],
        appItems: [
          {
            title: "Apps & paneles",
            text: "Interfaces y herramientas para gestionar procesos reales.",
          },
          {
            title: "APIs & backend",
            text: "Lógica, datos y servicios preparados para integrarse y crecer.",
          },
          {
            title: "Integraciones",
            text: "Conexión entre sistemas, servicios y flujos de trabajo.",
          },
        ],
      },
      teaching: {
        label: "Clases de programación",
        title: "Clases personalizadas, enfocadas en avanzar",
        description:
          "Acompañamiento individual para aprender, preparar exámenes o desarrollar proyectos con una explicación adaptada a cada alumno.",
        modalityTitle: "Modalidad online",
        modalityText:
          "Clases individuales, pantalla compartida y material de apoyo para seguir practicando.",
        modalityItems: [
          {
            title: "Clases 1 a 1",
            text: "El ritmo y la explicación se adaptan a cada alumno.",
          },
          {
            title: "Pantalla compartida",
            text: "Trabajamos juntos sobre código, ejercicios y proyectos reales.",
          },
          {
            title: "Material de apoyo",
            text: "Teoría y ejercicios para continuar practicando después de la clase.",
          },
        ],        
        technologiesTitle: "Lenguajes y tecnologías",
        technologiesText:
          "Tecnologías y lenguajes adaptados a la materia, carrera o proyecto.",
        comingSoon: "Próximamente",
        testimonialsTitle: "Experiencias de alumnos",
        testimonialsText:
          "Este espacio quedará preparado para incorporar testimonios reales y el acceso directo a mi publicación de Mercado Libre.",
      },
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
    services: {
      eyebrow: "Services",
      title: "How I can help",
      development: {
        label: "Development",
        title: "Digital product development",
        description:
          "Websites, applications and custom solutions built to solve concrete needs and grow with each project.",
        webTitle: "Websites & e-commerce",
        webText:
          "Corporate sites, portfolios, landing pages and online stores.",
        appsTitle: "Apps & systems",
        appsText:
          "Web applications, dashboards, APIs and custom integrations.",
        capabilities: [
          {
            title: "Management",
            text: "Dashboards and tools to manage your business.",
          },
          {
            title: "Automation",
            text: "Fewer repetitive tasks and smoother processes.",
          },
          {
            title: "Integrations",
            text: "Connect systems, services and platforms.",
          },
        ],
        webItems: [
          {
            title: "Websites",
            text: "Corporate sites, portfolios and experiences focused on clearer communication.",
          },
          {
            title: "E-commerce",
            text: "Online stores designed to showcase, sell and simplify the buying process.",
          },
          {
            title: "Landing pages",
            text: "Clear and direct pages for services, products and campaigns.",
          },
        ],
        appItems: [
          {
            title: "Apps & dashboards",
            text: "Interfaces and tools for managing real workflows.",
          },
          {
            title: "APIs & backend",
            text: "Logic, data and services prepared to integrate and scale.",
          },
          {
            title: "Integrations",
            text: "Connections between systems, services and workflows.",
          },
        ],
      },
      teaching: {
        label: "Programming lessons",
        title: "Personalized lessons focused on progress",
        description:
          "One-to-one support for learning, exam preparation or project development, with explanations adapted to each student.",
        modalityTitle: "Online format",
        modalityText:
          "Individual lessons, screen sharing and support material for continued practice.",
        modalityItems: [
          {
            title: "One-to-one lessons",
            text: "The pace and explanations adapt to each student.",
          },
          {
            title: "Screen sharing",
            text: "We work together on code, exercises and real projects.",
          },
          {
            title: "Support material",
            text: "Theory and exercises to keep practicing after each lesson.",
          },
        ],        
        technologiesTitle: "Languages & technologies",
        technologiesText:
          "Technologies and languages adapted to the subject, degree or project.",
        comingSoon: "Coming soon",
        testimonialsTitle: "Student experiences",
        testimonialsText:
          "This space is ready to include real testimonials and direct access to my Mercado Libre listing.",
      },
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
