"use client"

import { useEffect, useState } from "react"
import { ContentCard } from "@/components/content-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface FortniteItem {
  id: string | number
  name: string
  rarity: string
  type: string
  image: string
  status: string
}

export function ContentGrid() {
  const [skins, setSkins] = useState<FortniteItem[]>([])
  const [emotes, setEmotes] = useState<FortniteItem[]>([])
  const [wraps, setWraps] = useState<FortniteItem[]>([])
  const [maps, setMaps] = useState<FortniteItem[]>([])

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch('/api/items')
        if (response.ok) {
          const dbItems = await response.json()
          const userItems = dbItems.map((item: any) => ({ ...item, id: item.id.toString() } as FortniteItem))

          // Separate items by type
          const userSkins = userItems.filter((item: any) => item.type === "skins")
          const userEmotes = userItems.filter((item: any) => item.type === "emotes")
          const userWraps = userItems.filter((item: any) => item.type === "wraps")
          const userMaps = userItems.filter((item: any) => item.type === "maps")

          setSkins(userSkins)
          setEmotes(userEmotes)
          setWraps(userWraps)
          setMaps(userMaps)
        } else {
          console.error("Error loading items:", response.statusText)
          // No items in database, show empty arrays
          setSkins([])
          setEmotes([])
          setWraps([])
          setMaps([])
        }
      } catch (error) {
        console.error("Error loading items:", error)
        // No items in database, show empty arrays
        setSkins([])
        setEmotes([])
        setWraps([])
        setMaps([])
      }
    }

    loadItems()

    // Listen for custom event
    const handleUpdate = () => loadItems()
    window.addEventListener("fortniteItemsUpdated", handleUpdate)

    return () => {
      window.removeEventListener("fortniteItemsUpdated", handleUpdate)
    }
  }, [])

  return (
    <section id="browse-content" className="container px-4 py-16">
      <Tabs defaultValue="skins" className="w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 font-sans text-3xl font-bold">Browse Content</h2>
            <p className="text-muted-foreground">Explore the latest leaks and upcoming releases</p>
          </div>
        </div>

        <TabsList className="mb-8 grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="skins" data-value="skins">
            Skins
          </TabsTrigger>
          <TabsTrigger value="emotes" data-value="emotes">
            Emotes
          </TabsTrigger>
          <TabsTrigger value="wraps" data-value="wraps">
            Wraps
          </TabsTrigger>
          <TabsTrigger value="maps" data-value="maps">
            Maps
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skins" className="mt-0">
          {skins.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <h3 className="mb-2 font-sans text-xl font-semibold">No skins yet</h3>
                <p className="text-muted-foreground">Upload items from the admin panel to get started</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {skins.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="emotes" className="mt-0">
          {emotes.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <h3 className="mb-2 font-sans text-xl font-semibold">No emotes yet</h3>
                <p className="text-muted-foreground">Upload items from the admin panel to get started</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {emotes.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="wraps" className="mt-0">
          {wraps.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <h3 className="mb-2 font-sans text-xl font-semibold">No wraps yet</h3>
                <p className="text-muted-foreground">Upload items from the admin panel to get started</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wraps.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="maps" className="mt-0">
          {maps.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <h3 className="mb-2 font-sans text-xl font-semibold">No maps yet</h3>
                <p className="text-muted-foreground">Upload items from the admin panel to get started</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {maps.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
