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
  const [itemShop, setItemShop] = useState<FortniteItem[]>([])
  const [loadingShop, setLoadingShop] = useState(true)

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

  const fetchItemShop = async () => {
    try {
      const response = await fetch('/api/shop')
      if (response.ok) {
        const apiResponse = await response.json()
        const entries = apiResponse.data?.entries || []

        const mappedItems = entries.map((entry: any) => {
          let name = entry.items && entry.items.length > 0 ? entry.items[0].name : entry.devName
          let image = entry.newDisplayAsset?.materialInstances[0]?.images?.Background ||
                      (entry.items && entry.items.length > 0 ? entry.items[0].images?.icon : '') ||
                      (entry.items && entry.items.length > 0 ? entry.items[0].images?.featured : '') ||
                      ''
          let rarity = entry.items && entry.items.length > 0 ? entry.items[0].rarity?.value : 'common'

          // Handle bundles
          if (entry.bundle) {
            name = entry.bundle.name
            image = entry.bundle.image
            rarity = 'legendary' // Bundles are usually high rarity
          }

          return {
            id: entry.offerId,
            name,
            rarity,
            type: 'item-shop',
            image,
            status: 'available'
          }
        })

        setItemShop(mappedItems)
      } else {
        console.error("Error fetching item shop:", response.statusText)
        setItemShop([])
      }
    } catch (error) {
      console.error("Error fetching item shop:", error)
      setItemShop([])
    } finally {
      setLoadingShop(false)
    }
  }

    loadItems()
    fetchItemShop()

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

        <TabsList className="mb-8 grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
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
          <TabsTrigger value="item-shop" data-value="item-shop">
            Item Shop
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

        <TabsContent value="item-shop" className="mt-0">
          {loadingShop ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <h3 className="mb-2 font-sans text-xl font-semibold">Loading item shop...</h3>
                <p className="text-muted-foreground">Fetching current Fortnite item shop items</p>
              </div>
            </div>
          ) : itemShop.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <h3 className="mb-2 font-sans text-xl font-semibold">Failed to load item shop</h3>
                <p className="text-muted-foreground">Unable to fetch items from the API</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {itemShop.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
