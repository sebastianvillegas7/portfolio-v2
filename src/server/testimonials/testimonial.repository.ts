import "server-only";

import {
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase-admin/firestore";

import type {
  TechnologyId,
  TestimonialRecord,
} from "@/features/testimonials/types";
import { adminDb } from "@/server/firebase/admin";

const COLLECTION = "testimonios";

function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function parseDate(value: unknown): Date | null {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  return null;
}

function mapDocument(
  document: QueryDocumentSnapshot<DocumentData>,
): TestimonialRecord {
  const data = document.data();

  return {
    id: document.id,
    nombre:
      typeof data.nombre === "string" ? data.nombre.trim() : "",
    fotoUrl:
      typeof data.fotoUrl === "string" ? data.fotoUrl.trim() : "",
    comentario:
      typeof data.comentario === "string"
        ? data.comentario.trim()
        : "",
    fecha: parseDate(data.fecha),
    rating:
      typeof data.rating === "number"
        ? Math.max(1, Math.min(5, Math.round(data.rating)))
        : 1,
    perfilUrl: optionalString(data.perfilUrl),
    visible: data.visible === true,
    institucion: optionalString(data.institucion),
    tecnologias: Array.isArray(data.tecnologias)
      ? (data.tecnologias.filter(
          (technology): technology is TechnologyId =>
            typeof technology === "string",
        ) as TechnologyId[])
      : [],
    userUid: optionalString(data.userUid),
    userEmail: optionalString(data.userEmail),
  };
}

/**
 * Acceso a datos exclusivamente server-side.
 * Para la vista pública pedimos solo documentos aprobados:
 * no tiene sentido traer borradores/pending al proceso público.
 */
export async function findVisibleTestimonials(): Promise<
  TestimonialRecord[]
> {
  const snapshot = await adminDb
    .collection(COLLECTION)
    .where("visible", "==", true)
    .get();

  return snapshot.docs.map(mapDocument);
}

/**
 * Preparado para el futuro flujo autenticado de alta/edición.
 * No se usa en la UI pública actual.
 */
export async function findTestimonialsByUserUid(
  userUid: string,
): Promise<TestimonialRecord[]> {
  const snapshot = await adminDb
    .collection(COLLECTION)
    .where("userUid", "==", userUid)
    .get();

  return snapshot.docs.map(mapDocument);
}
