# Portfolio V2

Nueva versión del portfolio de Sebastián Villegas.

Esta base reemplaza la arquitectura anterior Angular + Bootstrap con un proyecto nuevo y desacoplado. El portfolio viejo se utilizará únicamente como fuente para recuperar contenido y assets cuando corresponda.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui (estructura y primer componente base)
- Motion (instalado para etapas posteriores)
- Lucide React

## Requisitos

- Node.js 20.9 o superior
- npm

## Instalación

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Validaciones

```bash
npm run lint
npm run build
```

## Estructura principal

- `src/app`: rutas, layout y estilos globales.
- `src/components/layout`: Header y Footer.
- `src/components/sections`: secciones de la home.
- `src/components/project`: componentes de proyectos.
- `src/components/ui`: componentes shadcn/ui y equivalentes.
- `src/components/effects`: futuros efectos, animaciones y 3D.
- `src/data`: datos desacoplados de proyectos, servicios y testimonios.
- `src/types`: modelos TypeScript.
- `public/images`: assets del portfolio.
- `public/models`: futuros modelos 3D.

## Estado actual

La UI es intencionalmente mínima. Sólo comprueba la arquitectura y el flujo general. No contiene todavía diseño definitivo, proyectos reales, animaciones ni 3D.
