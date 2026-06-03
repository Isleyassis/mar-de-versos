import Link from "next/link"
import { ArrowRight, Heart, Waves } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { siteConfig, getRecentPoems } from "@/lib/data"

export default function HomePage() {
  const recentPoems = getRecentPoems(3)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Animated waves decoration */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-30">
            <svg viewBox="0 0 1440 320" className="w-full fill-primary/20">
              <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-wave" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Waves className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h1 className="animate-fade-in font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {siteConfig.name}
            </h1>
            
            {/* Tagline */}
            <p className="mt-6 animate-fade-in font-serif text-xl italic text-muted-foreground sm:text-2xl" style={{ animationDelay: "0.1s" }}>
              {siteConfig.tagline}
            </p>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-lg animate-fade-in text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: "0.2s" }}>
              {siteConfig.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex animate-fade-in flex-col items-center gap-4 sm:flex-row sm:justify-center" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/poemas">
                  Ver Poemas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/nosso-cantinho">
                  <Heart className="mr-2 h-4 w-4" />
                  Nosso Cantinho
                </Link>
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 p-1">
              <div className="h-2 w-1.5 rounded-full bg-muted-foreground/50 mx-auto" />
            </div>
          </div>
        </section>

        {/* Recent Poems Preview */}
        <section className="border-t border-border/50 bg-muted/30 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-2xl font-medium sm:text-3xl">
                Últimos Versos
              </h2>
              <p className="mt-3 text-muted-foreground">
                Poemas escritos com o coração
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPoems.map((poem, index) => (
                <Link 
                  key={poem.id} 
                  href={`/poemas/${poem.slug}`}
                  className="group"
                >
                  <article 
                    className="h-full rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <time className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {new Date(poem.date).toLocaleDateString("pt-BR", { 
                        day: "numeric", 
                        month: "long" 
                      })}
                    </time>
                    <h3 className="mt-3 font-serif text-xl font-medium transition-colors group-hover:text-primary">
                      {poem.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {poem.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Ler poema
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/poemas">
                  Ver todos os poemas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-sm text-muted-foreground">
              Feito com <Heart className="inline h-3 w-3 text-primary" /> para ti
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
