"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface FortniteItem {
  id: string
  name: string
  type: string
  rarity: string
  status: string
  image: string
  description?: string
  releaseDate?: string
}

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [allItems, setAllItems] = useState<FortniteItem[]>([])
  const [filteredItems, setFilteredItems] = useState<FortniteItem[]>([])

  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem("fortnite-items")
      const items = stored ? JSON.parse(stored) : []
      setAllItems(items)
    }
  }, [open])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.rarity.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query),
    )
    setFilteredItems(results)
  }, [searchQuery, allItems])

  const handleClose = () => {
    setSearchQuery("")
    setFilteredItems([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Fortnite Items</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search by name, type, rarity, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full"
          />
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() === "" ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Start typing to search for items</p>
            ) : filteredItems.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No items found</p>
            ) : (
              <div className="grid gap-3">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-sans font-semibold">{item.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{item.type}</span>
                        <span>•</span>
                        <span className="capitalize">{item.rarity}</span>
                        <span>•</span>
                        <span className="capitalize">{item.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
