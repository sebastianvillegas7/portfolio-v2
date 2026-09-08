import { cn } from "@/lib/utils";

export default function DoubleUnderline({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn(
        "group relative inline-block cursor-default",
        className,
      )}
    >
      {children}

      <span
        aria-hidden
        className="
          pointer-events-none
          absolute -bottom-[0.12em] left-0
          h-px w-full
          origin-left scale-x-0
          bg-current opacity-55
          transition-transform duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-x-100
        "
      />

      <span
        aria-hidden
        className="
          pointer-events-none
          absolute -bottom-[0.22em] left-[8%]
          h-px w-[84%]
          origin-right scale-x-0
          bg-current opacity-25
          transition-transform
          delay-75 duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-x-100
        "
      />
    </span>
  );
}