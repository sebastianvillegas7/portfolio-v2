"use client";

import GibberishText from "@/components/animata/text/gibberish-text";
import { cn } from "@/lib/utils";

type AnimatedNameProps = {
  className?: string;
};

export function AnimatedName({
  className,
}: AnimatedNameProps) {
  return (
    <div className={cn("hero-name", className)}>
      <GibberishText
        text="Sebastián Villegas"
        intervalMs={65}
        pauseMs={5000}
      />
    </div>
  );
}
