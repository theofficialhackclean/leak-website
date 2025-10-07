"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SearchDialog } from "@/components/search-dialog"

export function Header() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    setDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.documentElement.classList.toggle("dark", newDarkMode)
    localStorage.setItem("theme", newDarkMode ? "dark" : "light")
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const contentSection = document.getElementById("browse-content")

    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth", block: "start" })

      timeoutRef.current = setTimeout(() => {
        const tabTrigger = document.querySelector(`[data-value="${tab}"]`) as HTMLButtonElement

        if (tabTrigger) {
          tabTrigger.click()
        }
      }, 600)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-sans text-xl font-bold text-primary-foreground">FN</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-sans text-lg font-bold leading-none">Fortnite Leaks</h1>
            <p className="text-xs text-muted-foreground">Upcoming Content Hub</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#skins"
            onClick={(e) => handleNavClick(e, "skins")}
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Skins
          </a>
          <a
            href="#emotes"
            onClick={(e) => handleNavClick(e, "emotes")}
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Emotes
          </a>
          <a
            href="#wraps"
            onClick={(e) => handleNavClick(e, "wraps")}
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Wraps
          </a>
          <a
            href="#maps"
            onClick={(e) => handleNavClick(e, "maps")}
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Maps
          </a>
          <a
            href="#item-shop"
            onClick={(e) => handleNavClick(e, "item-shop")}
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Item Shop
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/admin">
            <Button variant="outline" size="icon" className="rounded-full bg-transparent">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="sr-only">Admin Panel</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent"
            onClick={() => setSearchOpen(true)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="container flex flex-col gap-2 px-4 py-4">
            <a
              href="#skins"
              onClick={(e) => handleNavClick(e, "skins")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              Skins
            </a>
            <a
              href="#emotes"
              onClick={(e) => handleNavClick(e, "emotes")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              Emotes
            </a>
            <a
              href="#wraps"
              onClick={(e) => handleNavClick(e, "wraps")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              Wraps
            </a>
            <a
              href="#maps"
              onClick={(e) => handleNavClick(e, "maps")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              Maps
            </a>
            <a
              href="#item-shop"
              onClick={(e) => handleNavClick(e, "item-shop")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              Item Shop
            </a>
          </nav>
        </div>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
