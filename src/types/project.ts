export type Project = {
  slug: string;
  title: string;
  client?: string;

  location: string;
  country: string;
  year: number;

  category: string;

  description: string;
  longDescription?: string;

  technologies: string[];

  cover: string;
  images: string[];

  url?: string;
  repository?: string;

  featured: boolean;
  order: number;
};