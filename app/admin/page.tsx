"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"


type ContentType = "skins" | "emotes" | "wraps" | "maps"
type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythic"
type Status = "Leaked" | "Upcoming" | "Confirmed" | "Released"

interface FortniteItem {
  id: string
  name: string
  type: ContentType
  rarity: Rarity
  status: Status
  description: string
  image: string
  releaseDate?: string
}

const defaultSkins = [
  {
    id: "default-1",
    name: "Ghostface",
    rarity: "Legendary",
    type: "skins",
    image: "/ghostface-fortnite.jpg",
    status: "Coming Oct 9",
    description: "The iconic Scream villain joins Fortnite for Fortnitemares 2025",
  },
  {
    id: "default-2",
    name: "Art the Clown",
    rarity: "Legendary",
    type: "skins",
    image: "/art-the-clown-fortnite.jpg",
    status: "Leaked",
    description: "Terrifier's terrifying clown leaked for Halloween event",
  },
  {
    id: "default-3",
    name: "Doja Cat",
    rarity: "Legendary",
    type: "skins",
    image: "/doja-cat-fortnite.jpg",
    status: "Coming Oct 9",
    description: "Music icon Doja Cat arrives as a defeatable mini boss",
  },
  {
    id: "default-4",
    name: "Jason Voorhees",
    rarity: "Legendary",
    type: "skins",
    image: "/jason-voorhees-fortnite.jpg",
    status: "Leaked",
    description: "Friday the 13th's Jason Voorhees leaked for Fortnitemares",
  },
  {
    id: "default-5",
    name: "Scooby-Doo",
    rarity: "Epic",
    type: "skins",
    image: "/scooby-doo-fortnite.jpg",
    status: "Coming Soon",
    description: "Everyone's favorite mystery-solving dog joins the island",
  },
  {
    id: "default-6",
    name: "Zoey (KPop Demon Hunter)",
    rarity: "Epic",
    type: "skins",
    image: "/zoey-kpop-fortnite.jpg",
    status: "Available Now",
    description: "Part of the KPop Demon Hunters collaboration",
  },
  {
    id: "default-7",
    name: "Rumi (KPop Demon Hunter)",
    rarity: "Epic",
    type: "skins",
    image: "/rumi-kpop-fortnite.jpg",
    status: "Available Now",
    description: "Part of the KPop Demon Hunters collaboration",
  },
  {
    id: "default-8",
    name: "Mira (KPop Demon Hunter)",
    rarity: "Epic",
    type: "skins",
    image: "/mira-kpop-fortnite.jpg",
    status: "Available Now",
    description: "Part of the KPop Demon Hunters collaboration",
  },
  {
    id: "default-9",
    name: "The Grabber",
    rarity: "Legendary",
    type: "skins",
    image: "/the-grabber-fortnite.jpg",
    status: "Leaked",
    description: "The Black Phone's villain leaked for Halloween",
  },
  {
    id: "default-10",
    name: "Poppy Playtime",
    rarity: "Epic",
    type: "skins",
    image: "/poppy-playtime-fortnite.jpg",
    status: "Coming Soon",
    description: "Horror game character coming to Fortnite",
  },
  {
    id: "default-11",
    name: "Mothman",
    rarity: "Rare",
    type: "skins",
    image: "/mothman-fortnite.jpg",
    status: "Leaked",
    description: "Cryptid creature leaked for Fortnitemares",
  },
  {
    id: "default-12",
    name: "Eternal Peely",
    rarity: "Epic",
    type: "skins",
    image: "/eternal-peely-fortnite.jpg",
    status: "Coming Soon",
    description: "Spooky version of the beloved banana",
  },
]

const defaultEmotes = [
  {
    id: "default-e1",
    name: "Peaceful Hips",
    rarity: "Epic",
    type: "emotes",
    image: "/peaceful-hips-emote.jpg",
    status: "Available Now",
    description: "Peacemaker collaboration emote",
  },
  {
    id: "default-e2",
    name: "Eat Peace",
    rarity: "Rare",
    type: "emotes",
    image: "/eat-peace-emote.jpg",
    status: "Available Now",
    description: "Peacemaker collaboration emote",
  },
  {
    id: "default-e3",
    name: "Demon Dance",
    rarity: "Epic",
    type: "emotes",
    image: "/demon-dance-emote.jpg",
    status: "Leaked",
    description: "KPop Demon Hunters themed dance",
  },
  {
    id: "default-e4",
    name: "KPop Shuffle",
    rarity: "Rare",
    type: "emotes",
    image: "/kpop-shuffle-emote.jpg",
    status: "Available Now",
    description: "KPop Demon Hunters themed emote",
  },
]

const defaultWraps = [
  {
    id: "default-w1",
    name: "Clearly Peaceful",
    rarity: "Epic",
    type: "wraps",
    image: "/clearly-peaceful-wrap.jpg",
    status: "Available Now",
    description: "Peacemaker collaboration weapon wrap",
  },
  {
    id: "default-w2",
    name: "Demon Hunter",
    rarity: "Legendary",
    type: "wraps",
    image: "/demon-hunter-wrap.jpg",
    status: "Available Now",
    description: "KPop Demon Hunters themed wrap",
  },
  {
    id: "default-w3",
    name: "Ghostface Terror",
    rarity: "Epic",
    type: "wraps",
    image: "/ghostface-wrap.jpg",
    status: "Coming Oct 9",
    description: "Scream-themed weapon wrap",
  },
  {
    id: "default-w4",
    name: "Horror Night",
    rarity: "Rare",
    type: "wraps",
    image: "/horror-night-wrap.jpg",
    status: "Leaked",
    description: "Fortnitemares themed wrap",
  },
]

const defaultMaps = [
  {
    id: "default-m1",
    name: "Demon Rush Mode",
    rarity: "Legendary",
    type: "maps",
    image: "/demon-rush-mode.jpg",
    status: "Available Now",
    description: "Limited time mode featuring demon hunting",
  },
  {
    id: "default-m2",
    name: "Haunted Castle",
    rarity: "Epic",
    type: "maps",
    image: "/haunted-castle-poi.jpg",
    status: "Leaked",
    description: "New POI for Fortnitemares event",
  },
  {
    id: "default-m3",
    name: "Ghostface Medallion Zone",
    rarity: "Legendary",
    type: "maps",
    image: "/ghostface-zone.jpg",
    status: "Coming Oct 9",
    description: "Special zone where Ghostface boss spawns",
  },
  {
    id: "default-m4",
    name: "Jason Medallion Zone",
    rarity: "Legendary",
    type: "maps",
    image: "/jason-zone.jpg",
    status: "Coming Soon",
    description: "Special zone where Jason boss will spawn",
  },
]

export default function AdminPage() {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editingItem, setEditingItem] = useState<FortniteItem | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin") {
      setIsAuthenticated(true)
    } else {
      toast({
        title: "Error",
        description: "Incorrect password",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Admin Access</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Enter</Button>
          </form>
        </Card>
      </div>
    )
  }

  const [formData, setFormData] = useState({
    name: "",
    type: "skins" as ContentType,
    rarity: "Epic" as Rarity,
    status: "Leaked" as Status,
    description: "",
    releaseDate: "",
  })

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        type: editingItem.type,
        rarity: editingItem.rarity,
        status: editingItem.status,
        description: editingItem.description,
        releaseDate: editingItem.releaseDate || "",
      })
      setImagePreview(editingItem.image)
    }
  }, [editingItem])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted")
    console.log("[v0] Selected file:", selectedFile)
    console.log("[v0] Editing item:", editingItem)

    if (!selectedFile && !editingItem) {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      let imageUrl = editingItem?.image || ""

      if (selectedFile) {
        console.log("[v0] Converting image to base64...")
        imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = () => reject(new Error("Failed to read file"))
          reader.readAsDataURL(selectedFile)
        })
        console.log("[v0] Image converted successfully")
      }

      console.log("[v0] Saving to database...")

      if (editingItem) {
        const updatedItem = {
          ...formData,
          image: imageUrl,
          releaseDate: formData.releaseDate,
        }
        console.log("[v0] Updating item:", updatedItem)

        const response = await fetch(`/api/items/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        })
        if (!response.ok) throw new Error('Failed to update item')
        console.log("[v0] Item updated in database")
        toast({
          title: "Success!",
          description: `${formData.name} has been updated successfully`,
        })
      } else {
        const newItem = {
          ...formData,
          image: imageUrl,
          releaseDate: formData.releaseDate,
        }
        console.log("[v0] Creating new item:", newItem)
        const response = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        })
        if (!response.ok) throw new Error('Failed to add item')
        console.log("[v0] New item saved to database")
        toast({
          title: "Success!",
          description: `${formData.name} has been added successfully`,
        })
      }

      console.log("[v0] Dispatching update event")
      window.dispatchEvent(new Event("fortniteItemsUpdated"))

      setFormData({
        name: "",
        type: "skins",
        rarity: "Epic",
        status: "Leaked",
        description: "",
        releaseDate: "",
      })
      setSelectedFile(null)
      setImagePreview("")
      setEditingItem(null)
      console.log("[v0] Form reset complete")
    } catch (error) {
      console.error("[v0] Error during submit:", error)
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? "update" : "add"} item. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setFormData({
      name: "",
      type: "skins",
      rarity: "Epic",
      status: "Leaked",
      description: "",
      releaseDate: "",
    })
    setSelectedFile(null)
    setImagePreview("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Upload and manage Fortnite leaks and upcoming content
          </p>
        </div>

        <Card className="p-4 sm:p-6 bg-card border-border">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            {editingItem ? `Edit ${editingItem.name}` : "Add New Item"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Item Image {!editingItem && "*"}</Label>
              <div className="flex flex-col gap-4">
                <div className="relative border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required={!editingItem}
                  />
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-muted-foreground">
                      {editingItem ? "Click to change image" : "Click or drag image to upload"}
                    </p>
                  </div>
                </div>

                {imagePreview && (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Item Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Ghostface"
                required
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ContentType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skins">Skin</SelectItem>
                  <SelectItem value="emotes">Emote</SelectItem>
                  <SelectItem value="wraps">Wrap</SelectItem>
                  <SelectItem value="maps">Map</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rarity */}
            <div className="space-y-2">
              <Label htmlFor="rarity">Rarity *</Label>
              <Select
                value={formData.rarity}
                onValueChange={(value: Rarity) => setFormData({ ...formData, rarity: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Common">Common</SelectItem>
                  <SelectItem value="Uncommon">Uncommon</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                  <SelectItem value="Epic">Epic</SelectItem>
                  <SelectItem value="Legendary">Legendary</SelectItem>
                  <SelectItem value="Mythic">Mythic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Status) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leaked">Leaked</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Released">Released</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add details about this item..."
                rows={4}
              />
            </div>

            {/* Release Date */}
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date (Optional)</Label>
              <Input
                id="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={uploading} size="lg">
                {uploading ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {editingItem ? "Updating..." : "Uploading..."}
                  </>
                ) : (
                  <>
                    {editingItem ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Update Item
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Add Item
                      </>
                    )}
                  </>
                )}
              </Button>
              {editingItem && (
                <Button type="button" variant="outline" onClick={handleCancelEdit} size="lg">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Manage Items Section */}
        <ManageItems onEdit={setEditingItem} />
      </main>
    </div>
  )
}

function ManageItems({ onEdit }: { onEdit: (item: FortniteItem) => void }) {
  const { toast } = useToast()
  const [items, setItems] = useState<FortniteItem[]>([])

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch('/api/items')
        if (response.ok) {
          const dbItems = await response.json()
          setItems(dbItems.map((item: any) => ({ ...item, id: item.id.toString() } as FortniteItem)))
        } else {
          console.error("Error loading items:", response.statusText)
          setItems([])
        }
      } catch (error) {
        console.error("Error loading items:", error)
        setItems([])
      }
    }
    loadItems()

    const handleUpdate = () => {
      loadItems()
    }
    window.addEventListener("fortniteItemsUpdated", handleUpdate)

    return () => {
      window.removeEventListener("fortniteItemsUpdated", handleUpdate)
    }
  }, [])

  const handleDelete = async (item: FortniteItem) => {
    if (!confirm(`Are you sure you want to delete ${item.name}?`)) {
      return
    }

    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')

      window.dispatchEvent(new Event("fortniteItemsUpdated"))

      toast({
        title: "Deleted",
        description: `${item.name} has been removed`,
      })
    } catch (error) {
      console.error("Error deleting:", error)
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Manage Items</h2>
        <Card className="p-6 sm:p-8 bg-card border-border">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-muted-foreground mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 00-.707.293h-3.172a1 1 0 00-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No items yet</h3>
            <p className="text-muted-foreground">Upload your first item using the form above to get started</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mt-8 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Manage Items ({items.length})</h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
        Click the edit button to modify or delete button to remove items.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Card key={item.id} className="p-3 sm:p-4 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="flex gap-3 sm:gap-4">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate text-sm sm:text-base">{item.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {item.type} • {item.rarity}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{item.status}</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => onEdit(item)} className="gap-1 text-xs sm:text-sm">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item)}
                  className="gap-1 text-xs sm:text-sm"
                >
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
