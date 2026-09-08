import { cn } from "@/lib/utils";

interface DoubleUnderlineProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  delay?: number;
  underlineClassName?: string;
}

export default function DoubleUnderline({
  className,
  children,
  active = false,
  delay = 0,
  underlineClassName = "",
  ...props
}: DoubleUnderlineProps) {
  return (
    <span
      {...props}
      className={cn(
        "relative inline-block",
        className
      )}
    >
      {children}

      {/* Trazo principal */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-[0.16em] left-0 h-px w-full origin-left",
          "bg-gradient-to-r from-transparent via-current/75 to-transparent",
          "transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)]",
          active
            ? "scale-x-100 opacity-70"
            : "scale-x-100 opacity-0",
          underlineClassName
        )}
        style={{
          transitionDuration: active ? "1500ms" : "900ms",
          transitionDelay: active ? `${delay}ms` : "0ms",
        }}
      />

      {/* Segundo trazo muy tenue */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-[0.22em] left-[4%] h-px w-[92%] origin-left",
          "bg-gradient-to-r from-transparent via-current/35 to-transparent",
          "transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)]",
          active
            ? "scale-x-100 opacity-40"
            : "scale-x-100 opacity-0",
          underlineClassName
        )}
        style={{
          transitionDuration: active ? "1900ms" : "1100ms",
          transitionDelay: active ? `${delay + 180}ms` : "0ms",
        }}
      />
    </span>
  );
}