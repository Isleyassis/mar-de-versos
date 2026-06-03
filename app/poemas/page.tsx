import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import { Header } from "@/components/header"
import { getPublishedPoems } from "@/lib/data"

export default function PoemasPage() {
  const poems = getPublishedPoems()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="border-b border-border/50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h1 className="font-serif text-3xl font-medium sm:text-4xl md:text-5xl">
              Poemas
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Uma coleção de versos que traduzem sentimentos, memórias e momentos especiais em palavras.
            </p>
          </div>
        </section>

        {/* Poems Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {poems.map((poem) => (
                <Link key={poem.id} href={`/poemas/${poem.slug}`} className="group">
                  <article className="h-full rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                    <time className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {new Date(poem.date).toLocaleDateString("pt-BR", { 
                        day: "numeric", 
                        month: "long", 
                        year: "numeric" 
                      })}
                    </time>
                    <h2 className="mt-3 font-serif text-xl font-medium transition-colors group-hover:text-primary sm:text-2xl">
                      {poem.title}
                    </h2>
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
