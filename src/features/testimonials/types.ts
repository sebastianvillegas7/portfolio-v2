export type TechnologyId =
  | "java"
  | "javascript"
  | "python"
  | "angular"
  | "react"
  | "c-family"
  | "sql"
  | "mongodb"
  | "html-css";

/**
 * Modelo interno del documento guardado en Firestore.
 * Nunca se entrega completo al navegador.
 */
export type TestimonialRecord = {
  id: string;
  nombre: string;
  fotoUrl: string;
  comentario: string;
  fecha: Date | null;
  rating: number;
  perfilUrl?: string;
  visible: boolean;
  institucion?: string;
  tecnologias: TechnologyId[];
  userUid?: string;
  userEmail?: string;
};

/**
 * DTO público que sí puede serializarse y llegar al Client Component.
 * Deliberadamente no contiene visible, userUid ni userEmail.
 */
export type PublicTestimonial = {
  id: string;
  name: string;
  photoUrl: string;
  comment: string;
  date: string | null;
  rating: number;
  institution?: string;
  technologies: TechnologyId[];
};
