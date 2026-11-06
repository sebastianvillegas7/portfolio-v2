"use client";

import { Fragment } from "react";

import { motion } from "motion/react";

import { cardVariants } from "@/components/services/ServiceGroup";
import type { MicroSlide } from "@/components/services/types";

type CapabilityServiceCardProps = {
  items: readonly MicroSlide[];
  active: boolean;
};

export function CapabilityServiceCard({
  items,
  active,
}: CapabilityServiceCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      className="service-mini-card service-mini-card--textured relative overflow-hidden rounded-[1.55rem] border p-5 text-white"
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Fragment key={item.title}>
              <div className="flex items-center gap-3">
                <div className="service-mini-card-icon flex size-9 shrink-0 items-center justify-center rounded-full border">
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-white/70"
                  />
                </div>

                <div>
                  <h4 className="text-[0.95rem] font-semibold leading-tight">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-[0.66rem] leading-[1.35] text-white/55">
                    {item.text}
                  </p>
                </div>
              </div>

              {index < items.length - 1 ? (
                <div className="relative ml-[1.1rem] h-5 w-px bg-white/12">
                  <span
                    aria-hidden="true"
                    className={[
                      "service-capability-dot absolute left-1/2 top-0 size-1 rounded-full bg-white/60",
                      active ? "is-active" : "",
                    ].join(" ")}
                  />
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </motion.article>
  );
}
