import { cn } from "@/lib/utils";

export default function AnimatedGradientText({
  className,
  children,
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-block bg-size-[200%_auto] animate-bg-position bg-linear-to-r bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}