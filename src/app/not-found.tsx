import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Proyecto no encontrado</h1>
      <Link className="mt-6 text-sm underline underline-offset-4" href="/">
        Volver al portfolio
      </Link>
    </div>
  );
}
