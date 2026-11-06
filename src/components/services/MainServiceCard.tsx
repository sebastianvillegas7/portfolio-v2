"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cardVariants } from "@/components/services/ServiceGroup";

type MainServiceCardProps = {
  image: string;
  index: string;
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  active: boolean;
  children?: ReactNode;
};

export function MainServiceCard({
  image,
  index,
  label,
  title,
  description,
  icon,
  active,
  children,
}: MainServiceCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      className="relative col-span-2 min-h-[18rem] overflow-hidden rounded-[1.55rem] border border-white/8 bg-black p-5 text-white"
    >
      <Image
        src={image}
        alt=""
        fill
        loading={active ? "eager" : "lazy"}
        sizes="(max-width: 767px) calc(100vw - 2.5rem), 680px"
        decoding="async"
        className="object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.24)_34%,rgba(0,0,0,0.94)_100%)]"
      />

      <div
        aria-hidden="true"
        className={[
          "service-main-sheen",
          active ? "is-active" : "",
        ].join(" ")}
      />

      <div className="relative z-10 flex min-h-[16rem] flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-3.5 py-2 shadow-[0_0_24px_rgba(255,255,255,0.05)] backdrop-blur-md">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white">
              {index}
            </span>

            <span className="h-3.5 w-px bg-white/25" />

            <span className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/90">
              {label}
            </span>
          </div>

          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/15 bg-black/25">
            {icon}
          </span>
        </div>

        <div>
          <h3 className="max-w-[12ch] text-[2rem] font-semibold leading-[0.96] tracking-[-0.05em]">
            {title}
          </h3>

          <p className="mt-3 max-w-[31rem] text-[0.8rem] leading-[1.55] text-white/72">
            {description}
          </p>

          {children}
        </div>
      </div>
    </motion.article>
  );
}

export function StackTags() {
  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "Node.js",
    "PostgreSQL",
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {technologies.map((technology) => (
        <span
          key={technology}
          className="rounded-full border border-white/12 bg-black/20 px-2.5 py-1 text-[0.57rem] font-medium text-white/72"
        >
          {technology}
        </span>
      ))}
    </div>
  );
}
