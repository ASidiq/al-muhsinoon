import * as React from "react"

import { cn } from "@/lib/utils"

export interface SelectorItem {
  slug: string
  title: string
  description: string
  /** Omit for programmes with no photo archive — renders a branded gradient instead. */
  image?: string
  icon: React.ReactNode
}

interface InteractiveSelectorProps {
  items: SelectorItem[]
  activeIndex: number
  onSelect: (index: number) => void
  className?: string
}

function InteractiveSelector({
  items,
  activeIndex,
  onSelect,
  className,
}: InteractiveSelectorProps) {
  const [revealed, setRevealed] = React.useState<number[]>([])

  React.useEffect(() => {
    const timers = items.map((_, i) =>
      setTimeout(() => setRevealed((prev) => [...prev, i]), 90 * i)
    )
    return () => timers.forEach(clearTimeout)
  }, [items])

  return (
    <div
      data-slot="interactive-selector"
      className={cn(
        "relative flex h-[230px] w-full overflow-hidden rounded-2xl shadow-lift sm:h-[300px] md:h-[380px] lg:h-[420px]",
        className
      )}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex
        const isRevealed = revealed.includes(index)

        return (
          <button
            key={item.slug}
            type="button"
            aria-pressed={isActive}
            aria-label={item.title}
            onClick={() => onSelect(index)}
            style={
              item.image
                ? {
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: isActive ? "auto 100%" : "auto 120%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }
                : undefined
            }
            className={cn(
              "focus-ring group relative flex min-w-[24px] shrink-0 flex-col justify-end border bg-maroon-dark bg-cover transition-[flex-grow,border-color,box-shadow,background-size] duration-700 ease-out sm:min-w-[36px] md:min-w-[52px]",
              !item.image && "bg-gradient-to-br from-maroon via-maroon-dark to-ink",
              isActive
                ? "flex-[7_1_0%] border-gold shadow-[0_20px_50px_rgba(42,21,24,0.45)]"
                : "flex-[1_1_0%] border-cream/15 shadow-[0_8px_24px_rgba(42,21,24,0.25)] hover:border-gold/50",
              isRevealed
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-maroon-dark/95 via-maroon-dark/35 to-transparent"
            />

            {!item.image && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 flex items-center justify-center text-gold/25 transition-opacity duration-500 [&>svg]:h-12 [&>svg]:w-12 sm:[&>svg]:h-16 sm:[&>svg]:w-16",
                  isActive ? "opacity-100" : "opacity-60"
                )}
              >
                {item.icon}
              </span>
            )}

            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 mb-4 ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/30 bg-maroon/70 text-cream backdrop-blur-sm sm:h-11 sm:w-11",
                isActive ? "flex" : "hidden sm:flex"
              )}
            >
              {item.icon}
            </span>

            <span
              className={cn(
                "relative z-10 mb-5 ml-3 mr-4 block",
                isActive ? "max-w-[220px] sm:max-w-xs" : "whitespace-nowrap"
              )}
            >
              <span
                className={cn(
                  "block font-display text-[1.05rem] font-medium text-cream transition-[opacity,transform] duration-500 ease-out sm:text-[1.2rem]",
                  isActive
                    ? "translate-x-0 opacity-100 delay-150"
                    : "translate-x-4 opacity-0"
                )}
              >
                {item.title}
              </span>
              <span
                className={cn(
                  "block font-body text-[13px] text-cream/75 transition-[opacity,transform] duration-500 ease-out sm:text-[14.5px]",
                  isActive
                    ? "translate-x-0 opacity-100 delay-150"
                    : "translate-x-4 opacity-0"
                )}
              >
                {item.description}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { InteractiveSelector }
