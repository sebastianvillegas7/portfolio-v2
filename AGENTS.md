# Portfolio V2 — Agent Context

## Goal

Build a complete new version of Sebastián Villegas' professional portfolio.

The previous portfolio was built with Angular 16 + Bootstrap. This repository is a clean replacement built with Next.js/React and must not inherit the old Angular architecture.

## Fixed stack

- Next.js (App Router)
- React
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui as a reusable UI foundation
- Motion for animation when needed
- Lucide React for icons
- Future 3D: Spline first, React Three Fiber when greater control is required

Do not introduce Bootstrap.
Do not introduce Angular.
Do not add another CSS framework unless explicitly requested.

## UI philosophy

The final portfolio should feel modern, minimal, dynamic and professional. It will use selected prebuilt components/effects from sources such as 21st.dev, Aceternity UI, Magic UI, React Bits, Origin UI, Motion Primitives and similar sources when they provide value.

Do not recreate a component from scratch if an appropriate reusable implementation is intentionally selected for the project.
Do not indiscriminately combine effects. Visual consistency matters more than the number of animations.

## Current stage

This repository currently contains architecture only.

Do not independently design or finish sections unless the user explicitly asks for that section.
Do not invent portfolio projects, clients, testimonials, URLs, technologies or business claims.
Do not migrate old content until it is reviewed and classified.

## Architecture rules

- Home sections live in `src/components/sections`.
- Layout components live in `src/components/layout`.
- Project-specific reusable components live in `src/components/project`.
- Reusable UI primitives live in `src/components/ui`.
- Special animations, visual effects and 3D wrappers live in `src/components/effects`.
- Projects are data-driven through `src/data/projects.ts` and `src/types/project.ts`.
- Do not hardcode individual portfolio projects inside section components.
- Individual project case studies use `/work/[slug]`.
- Keep imports using the `@/` alias.
- Prefer Server Components unless client-side behavior is actually required.
- Add `"use client"` only where necessary.

## Workflow

Implement the portfolio section by section with the user.
Before large architectural changes, preserve existing agreed decisions.
Avoid broad unsolicited refactors while working on a specific visual section.
