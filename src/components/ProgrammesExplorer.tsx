import * as React from "react"

import { programmes } from "@/data/programmes"
import { InteractiveSelector, type SelectorItem } from "@/components/ui/interactive-selector"
import {
  Carousel,
  CarouselItemGroup,
  CarouselItem,
  CarouselPrevTrigger,
  CarouselNextTrigger,
  CarouselIndicatorGroup,
  CarouselIndicator,
} from "@/components/ui/carousel"

function indexFromHash(hash: string) {
  const slug = hash.replace("#", "")
  const index = programmes.findIndex((programme) => programme.slug === slug)
  return index === -1 ? 0 : index
}

function ProgrammesExplorer() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const active = programmes[activeIndex]

  React.useEffect(() => {
    setActiveIndex(indexFromHash(window.location.hash))
  }, [])

  const selectorItems: SelectorItem[] = React.useMemo(
    () =>
      programmes.map((programme) => ({
        slug: programme.slug,
        title: programme.title,
        description: programme.summary,
        image: programme.gallery[0]?.photo.src,
        icon: <programme.icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />,
      })),
    []
  )

  function handleSelect(index: number) {
    setActiveIndex(index)
    const slug = programmes[index]?.slug
    if (slug) window.history.replaceState(null, "", `#${slug}`)
  }

  return (
    <div>
      <InteractiveSelector
        items={selectorItems}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start lg:gap-14">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-sand/15 text-maroon"
            >
              <active.icon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-[1.5rem] font-medium text-maroon">
              {active.title}
            </h3>
          </div>
          <p className="font-body text-[15.5px] leading-[1.75] text-ink/70">
            {active.body}
          </p>
        </div>

        {active.gallery.length > 0 ? (
          <Carousel
            key={active.slug}
            slideCount={active.gallery.length}
            className="aspect-[4/3] w-full sm:aspect-[16/10]"
          >
            <CarouselItemGroup className="h-full">
              {active.gallery.map((image, index) => (
                <CarouselItem
                  key={image.photo.src}
                  index={index}
                  className="relative h-full overflow-hidden bg-maroon-dark"
                >
                  <img
                    src={image.photo.src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.55]"
                  />
                  <img
                    src={image.photo.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="relative h-full w-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselItemGroup>
            {active.gallery.length > 1 && (
              <>
                <CarouselPrevTrigger />
                <CarouselNextTrigger />
                <CarouselIndicatorGroup>
                  {active.gallery.map((image, index) => (
                    <CarouselIndicator key={image.photo.src} index={index} />
                  ))}
                </CarouselIndicatorGroup>
              </>
            )}
          </Carousel>
        ) : (
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-xl border border-gold/25 bg-gradient-to-br from-maroon to-maroon-dark p-10 text-center shadow-soft sm:aspect-[16/10]">
            <active.icon className="h-10 w-10 text-gold" aria-hidden="true" />
            <p className="font-display text-lg text-cream">Every gift stays local.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export { ProgrammesExplorer }
