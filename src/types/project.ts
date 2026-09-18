export type ProjectPreview = {
  desktop: string;
  mobile: string;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;

  location: string;

  country: string;
  countryCode: string;

  year: number;

  category: string;

  description: string;
  longDescription?: string;

  technologies: string[];

  cover: string;

  preview: ProjectPreview;

  images: string[];

  url?: string;
  repository?: string;

  featured: boolean;
  order: number;
};