import Link from "next/link"
import { Heart, Music, FileText, Calendar, ArrowRight, Waves, Trophy, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { poems, moments, spotifyPlaylistUrl } from "@/lib/data"

export default function NossoCantinhoPage() {
  const stats = [
    { name: "Poemas", value: poems.length, icon: FileText, href: "/poemas" },
    { name: "Momentos", value: moments.length, icon: Heart, href: "/nosso-cantinho/momentos" },
    { name: "Placar", value: "9 x 0", icon: Trophy, href: "/nosso-cantinho/placar" },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Waves className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h1 className="font-serif text-3xl font-medium sm:text-4xl">
          Bem-vinda ao nosso cantinho
        </h1>
        <p className="mt-3 text-muted-foreground">
          Um espaço especial com nossas memórias, músicas e momentos
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="group transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick access */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/nosso-cantinho/momentos">
          <Card className="group h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-medium">Nossos Momentos</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Os marcos especiais da nossa história juntos
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Ver momentos
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <a href={spotifyPlaylistUrl} target="_blank" rel="noopener noreferrer">
          <Card className="group h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954]/10 transition-colors group-hover:bg-[#1DB954]/20">
                <svg className="h-5 w-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-xl font-medium">Abrir no Spotify</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Nossa playlist completa
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-[#1DB954]">
                Abrir playlist
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </a>

        <Link href="/nosso-cantinho/placar">
          <Card className="group h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 transition-colors group-hover:bg-amber-500/20">
                <Trophy className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-medium">Nosso Placar</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Quem está ganhando no amor?
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-amber-500">
                Ver placar
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/nosso-cantinho/posts">
          <Card className="group h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-medium">Gerenciar Posts</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Criar, editar e organizar os poemas
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Gerenciar
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/nosso-cantinho/musicas">
          <Card className="group h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-medium">Nossas Músicas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A trilha sonora do nosso amor
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Ver playlist
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/nosso-cantinho/para-voce">
          <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-rose-200/50 dark:border-rose-800/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 dark:bg-rose-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="relative p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 transition-colors group-hover:bg-rose-500/20">
                <Mail className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-medium text-rose-900 dark:text-rose-100">Para Você</h3>
              <p className="mt-2 text-sm text-rose-700/80 dark:text-rose-300/80">
                Uma pequena declaração de amor escrita especialmente para ti...
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-rose-500">
                Ler declaração
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
