import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ContentGrid } from "@/components/content-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ContentGrid />
      <Footer />
    </div>
  )
}
