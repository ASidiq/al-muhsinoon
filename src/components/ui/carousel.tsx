import { Carousel as CarouselPrimitive } from "@ark-ui/react/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

function Carousel({ className, ...props }: CarouselPrimitive.RootProps) {
  return (
    <CarouselPrimitive.Root
      data-slot="carousel"
      loop
      spacing="0px"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function CarouselItemGroup({
  className,
  ...props
}: CarouselPrimitive.ItemGroupProps) {
  return (
    <CarouselPrimitive.ItemGroup
      data-slot="carousel-item-group"
      className={cn("overflow-hidden rounded-xl shadow-soft", className)}
      {...props}
    />
  )
}

function CarouselItem({ className, ...props }: CarouselPrimitive.ItemProps) {
  return (
    <CarouselPrimitive.Item
      data-slot="carousel-item"
      className={cn("h-full w-full shrink-0", className)}
      {...props}
    />
  )
}

function CarouselPrevTrigger({
  className,
  ...props
}: CarouselPrimitive.PrevTriggerProps) {
  return (
    <CarouselPrimitive.PrevTrigger
      data-slot="carousel-prev-trigger"
      aria-label="Previous photo"
      className={cn(
        "focus-ring absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-maroon/70 text-cream backdrop-blur-sm transition-[transform,background-color] duration-200 ease-out hover:-translate-x-0.5 hover:bg-maroon active:translate-x-0 disabled:pointer-events-none disabled:opacity-0",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
    </CarouselPrimitive.PrevTrigger>
  )
}

function CarouselNextTrigger({
  className,
  ...props
}: CarouselPrimitive.NextTriggerProps) {
  return (
    <CarouselPrimitive.NextTrigger
      data-slot="carousel-next-trigger"
      aria-label="Next photo"
      className={cn(
        "focus-ring absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-maroon/70 text-cream backdrop-blur-sm transition-[transform,background-color] duration-200 ease-out hover:translate-x-0.5 hover:bg-maroon active:translate-x-0 disabled:pointer-events-none disabled:opacity-0",
        className
      )}
      {...props}
    >
      <ChevronRight className="h-5 w-5" aria-hidden="true" />
    </CarouselPrimitive.NextTrigger>
  )
}

function CarouselIndicatorGroup({
  className,
  ...props
}: CarouselPrimitive.IndicatorGroupProps) {
  return (
    <CarouselPrimitive.IndicatorGroup
      data-slot="carousel-indicator-group"
      className={cn(
        "absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5",
        className
      )}
      {...props}
    />
  )
}

function CarouselIndicator({
  className,
  ...props
}: CarouselPrimitive.IndicatorProps) {
  return (
    <CarouselPrimitive.Indicator
      data-slot="carousel-indicator"
      aria-label={`Go to photo ${props.index + 1}`}
      className={cn(
        "focus-ring h-1.5 w-1.5 rounded-full bg-cream/60 shadow-soft transition-transform duration-200 ease-out data-current:scale-150 data-current:bg-gold",
        className
      )}
      {...props}
    />
  )
}

export {
  Carousel,
  CarouselItemGroup,
  CarouselItem,
  CarouselPrevTrigger,
  CarouselNextTrigger,
  CarouselIndicatorGroup,
  CarouselIndicator,
}
