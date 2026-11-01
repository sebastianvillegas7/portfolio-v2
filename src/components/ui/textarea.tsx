import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-none rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-3 text-sm text-foreground outline-none transition-[border-color,box-shadow,background-color] placeholder:text-foreground-subtle focus:border-brand-500/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-brand-500/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
