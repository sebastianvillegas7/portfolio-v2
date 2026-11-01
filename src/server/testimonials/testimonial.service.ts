import "server-only";

import type {
  PublicTestimonial,
  TestimonialRecord,
} from "@/features/testimonials/types";
import { findVisibleTestimonials } from "@/server/testimonials/testimonial.repository";

function isPublishable(
  testimonial: TestimonialRecord,
): boolean {
  return (
    testimonial.visible &&
    testimonial.nombre.length > 0 &&
    testimonial.comentario.length > 0
  );
}

function toPublicDto(
  testimonial: TestimonialRecord,
): PublicTestimonial {
  return {
    id: testimonial.id,
    name: testimonial.nombre,
    photoUrl: testimonial.fotoUrl,
    comment: testimonial.comentario,
    date: testimonial.fecha?.toISOString() ?? null,
    rating: testimonial.rating,
    institution: testimonial.institucion,
    technologies: testimonial.tecnologias,
  };
}

/**
 * Único punto de entrada para la UI pública.
 * Esta función es la frontera entre datos internos y datos públicos.
 */
export async function getPublicTestimonials(): Promise<
  PublicTestimonial[]
> {
  const records = await findVisibleTestimonials();

  return records
    .filter(isPublishable)
    .sort((a, b) => {
      const aTime = a.fecha?.getTime() ?? 0;
      const bTime = b.fecha?.getTime() ?? 0;
      return bTime - aTime;
    })
    .map(toPublicDto);
}
