import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "revia-cloud",
    title: "Revia Cloud",
    client: "Revia Cloud",
    location: "España",
    country: "España",
    year: 2026,
    category: "Cloud / Sitio corporativo",

    description:
      "Presencia digital para una empresa de soluciones cloud orientadas al entorno empresarial, con foco en seguridad, almacenamiento y colaboración.",

    longDescription:
      "Diseño y desarrollo de un sitio corporativo para Revia Cloud, una empresa especializada en soluciones de cloud privado para empresas en España. El proyecto presenta de forma clara sus servicios de almacenamiento, sincronización y transferencia segura de archivos, junto con planes comerciales y canales de contacto.",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "GSAP",
      "AOS",
    ],

    cover: "/images/projects/revia-cloud-cover.webp",

    images: [
      "/images/projects/revia-cloud-01.webp",
      "/images/projects/revia-cloud-02.webp",
      "/images/projects/revia-cloud-03.webp",
    ],

    url: "https://reviacloud.es/",

    featured: true,
    order: 1,
  },

  {
    slug: "pancho-vina",
    title: "Pancho Viña",
    client: "Pancho Viña",
    location: "España",
    country: "España",
    year: 2026,
    category: "E-commerce / Shopify",

    description:
      "Tienda online especializada en vinos europeos, desarrollada sobre Shopify para combinar catálogo, venta y contenido en una experiencia de compra completa.",

    longDescription:
      "Desarrollo y personalización de un e-commerce especializado en vinos de alta gama procedentes principalmente de bodegas italianas y francesas. La tienda integra un amplio catálogo de productos, colecciones, promociones por cantidad, membresías, eventos, bodegas asociadas, carrito y proceso de compra dentro del ecosistema Shopify.",

    technologies: [
      "Shopify",
    ],

    cover: "/images/projects/pancho-vina-cover.webp",

    images: [
      "/images/projects/pancho-vina-01.webp",
      "/images/projects/pancho-vina-02.webp",
      "/images/projects/pancho-vina-03.webp",
    ],

    url: "https://panchovina.com/",

    featured: true,
    order: 2,
  },

  {
    slug: "tts-studio",
    title: "TTs Studio",
    client: "TTs Studio",
    location: "Sunnyside, Queens",
    country: "Estados Unidos",
    year: 2026,
    category: "Beauty / Diseño web",

    description:
      "Experiencia web para un estudio especializado en lashes & brows, combinando una estética premium con servicios, promociones y reserva de citas.",

    longDescription:
      "Diseño y desarrollo del sitio web de TTs Studio, un estudio especializado en brows & lashes ubicado en Sunnyside, Queens. El proyecto combina una identidad visual premium con presentación de servicios, promociones, productos, contenido del estudio y llamadas a la acción orientadas a facilitar la reserva de citas.",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Swiper",
      "AOS",
    ],

    cover: "/images/projects/tts-studio-cover.webp",

    images: [
      "/images/projects/tts-studio-01.webp",
      "/images/projects/tts-studio-02.webp",
      "/images/projects/tts-studio-03.webp",
    ],

    featured: true,
    order: 3,
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);