import { TestimonialsContactClient } from "@/components/testimonials/TestimonialsContactClient";
import { getPublicTestimonials } from "@/server/testimonials/testimonial.service";

/**
 * Server Component:
 * consulta Firestore del lado servidor y entrega únicamente el DTO público.
 */
export async function TestimonialsContact() {
  const testimonials = await getPublicTestimonials();

  return (
    <TestimonialsContactClient
      testimonials={testimonials}
    />
  );
}
