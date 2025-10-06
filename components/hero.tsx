"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"


export function Hero() {
  const [stats, setStats] = useState({
    skins: 0,
    emotes: 0,
    wrapsAndPois: 0,
  })

  useEffect(() => {
    const countItems = async () => {
      try {
        const response = await fetch('/api/items')
        if (response.ok) {
          const dbItems = await response.json()
          const userSkins = dbItems.filter((item: any) => item.type === "skins").length
          const userEmotes = dbItems.filter((item: any) => item.type === "emotes").length
          const userWraps = dbItems.filter((item: any) => item.type === "wraps").length
          const userMaps = dbItems.filter((item: any) => item.type === "maps").length

          setStats({
            skins: userSkins,
            emotes: userEmotes,
            wrapsAndPois: userWraps + userMaps,
          })
        } else {
          console.error("Error counting items:", response.statusText)
          // No items
          setStats({
            skins: 0,
            emotes: 0,
            wrapsAndPois: 0,
          })
        }
      } catch (error) {
        console.error("Error counting items:", error)
        // No items
        setStats({
          skins: 0,
          emotes: 0,
          wrapsAndPois: 0,
        })
      }
    }

    countItems()

    // Listen for updates
    const handleUpdate = () => countItems()
    window.addEventListener("fortniteItemsUpdated", handleUpdate)

    return () => {
      window.removeEventListener("fortniteItemsUpdated", handleUpdate)
    }
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container px-4 py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 xs:mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 text-xs xs:text-xs sm:text-sm font-medium text-primary">
            <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <span>Chapter 6 Season 4 Live Now</span>
          </div>

          <h1 className="mb-4 xs:mb-4 sm:mb-6 font-sans text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-balance">
            Chapter 6 Season 4
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Leaks & Updates
            </span>
          </h1>

          <p className="mb-6 xs:mb-6 sm:mb-8 text-sm xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground text-balance px-4">
            Explore the latest leaks from Chapter 6 Season 4: Shock 'N Awesome. Discover upcoming skins, emotes, wraps,
            and map changes before they drop.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 xs:gap-3 sm:gap-4 sm:flex-row px-4">
            <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              View Latest Leaks
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full border-primary/20 bg-transparent"
            >
              Browse All Content
            </Button>
          </div>

          <div className="mt-8 xs:mt-8 sm:mt-12 grid grid-cols-3 gap-4 xs:gap-4 sm:gap-6 md:gap-8 border-t border-border/40 pt-6 xs:pt-6 sm:pt-8">
            <div>
              <div className="mb-1 font-sans text-2xl xs:text-2xl sm:text-3xl font-bold text-primary">{stats.skins}</div>
              <div className="text-xs xs:text-xs sm:text-sm text-muted-foreground">Leaked Skins</div>
            </div>
            <div>
              <div className="mb-1 font-sans text-2xl xs:text-2xl sm:text-3xl font-bold text-accent">{stats.emotes}</div>
              <div className="text-xs xs:text-xs sm:text-sm text-muted-foreground">New Emotes</div>
            </div>
            <div>
              <div className="mb-1 font-sans text-2xl xs:text-2xl sm:text-3xl font-bold text-chart-3">{stats.wrapsAndPois}</div>
              <div className="text-xs xs:text-xs sm:text-sm text-muted-foreground">Wraps & POIs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]" />
    </section>
  )
}
