import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Heart } from "lucide-react"
import { Header } from "@/components/header"
import { getPoem, getPublishedPoems } from "@/lib/data"

interface PoemPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const poems = getPublishedPoems()
  return poems.map((poem) => ({ slug: poem.slug }))
}

export default async function PoemPage({ params }: PoemPageProps) {
  const { slug } = await params
  const poem = getPoem(slug)

  if (!poem) {
    notFound()
  }

  const poems = getPublishedPoems()
  const currentIndex = poems.findIndex((p) => p.slug === slug)
  const prevPoem = currentIndex > 0 ? poems[currentIndex - 1] : null
  const nextPoem = currentIndex < poems.length - 1 ? poems[currentIndex + 1] : null

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16">
        <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          {/* Back link */}
          <div className="mb-8">
            <Link 
              href="/poemas" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar aos poemas
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12 text-center">
            <time className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {new Date(poem.date).toLocaleDateString("pt-BR", { 
                day: "numeric", 
                month: "long", 
                year: "numeric" 
              })}
            </time>
            <h1 className="mt-4 font-serif text-3xl font-medium sm:text-4xl md:text-5xl">
              {poem.title}
            </h1>
          </header>

          {/* Poem content */}
          <div className="prose-poem mx-auto max-w-2xl text-center">
            {poem.content.split("\n\n").map((stanza, index) => (
              <p key={index} className="whitespace-pre-line text-lg leading-loose text-foreground/90 sm:text-xl">
                {stanza}
              </p>
            ))}
          </div>

          {/* Navigation */}
          <nav className="mt-16 flex items-center justify-between border-t border-border/50 pt-8">
            {prevPoem ? (
              <Link href={`/poemas/${prevPoem.slug}`} className="group flex flex-col items-start">
                <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
                  <ArrowLeft className="h-3 w-3" />
                  Anterior
                </span>
                <span className="mt-1 font-serif text-sm font-medium transition-colors group-hover:text-primary sm:text-base">
                  {prevPoem.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPoem ? (
              <Link href={`/poemas/${nextPoem.slug}`} className="group flex flex-col items-end text-right">
                <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
                  Próximo
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="mt-1 font-serif text-sm font-medium transition-colors group-hover:text-primary sm:text-base">
                  {nextPoem.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>

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
