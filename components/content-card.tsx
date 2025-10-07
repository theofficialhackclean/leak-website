"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { useState } from "react"

interface ContentItem {
  id: number | string
  name: string
  rarity: string
  type: string
  image: string
  previewImage?: string
  status: string
  description?: string
  releaseDate?: string
}

export function ContentCard({ item }: { item: ContentItem }) {
  const [isOpen, setIsOpen] = useState(false)

  const rarityColors = {
    Legendary: "bg-chart-3 text-chart-3",
    Epic: "bg-primary text-primary",
    Rare: "bg-accent text-accent",
  }

  const rarityColor = rarityColors[item.rarity as keyof typeof rarityColors] || "bg-muted text-muted-foreground"

  return (
    <>
      <Card className="group overflow-hidden border-border/40 bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          {item.type === "emotes" ? (
            <Image unoptimized src={item.previewImage || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          ) : (
            <Image unoptimized src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
          <div className="absolute right-3 top-3">
            <Badge variant="secondary" className="border-border/40 bg-card/80 backdrop-blur-sm">
              {item.status}
            </Badge>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <div className="flex-1">
              <h3 className="mb-1 font-sans text-lg font-bold leading-tight text-balance">{item.name}</h3>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${rarityColor.split(" ")[0]}`} />
                <span className="text-sm text-muted-foreground">{item.rarity}</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{item.type}</span>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>View</span>
            </button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
              {item.type === "emotes" && item.image?.startsWith("data:video") ? (
                <video
                  src={item.image}
                  className="w-full h-full object-cover"
                  controls
                  poster={item.previewImage || "/placeholder.svg"}
                />
              ) : (
                <Image
                  unoptimized
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Rarity</h3>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${rarityColor.split(" ")[0]}`} />
                  <span className="font-semibold">{item.rarity}</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Type</h3>
                <p className="font-semibold capitalize">{item.type}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Status</h3>
                <Badge variant="secondary">{item.status}</Badge>
              </div>
              {item.description && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="text-sm leading-relaxed">{item.description}</p>
                </div>
              )}
              {item.releaseDate && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">Release Date</h3>
                  <p className="font-semibold">{item.releaseDate}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
