import { Music, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { spotifyPlaylistId, spotifyPlaylistUrl } from "@/lib/data"

export default function MusicasPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-medium sm:text-3xl">Nossas Músicas</h1>
        <p className="mt-1 text-muted-foreground">A trilha sonora do nosso amor</p>
      </div>

      {/* Spotify Embed */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`}
            width="100%"
            height="552"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
            title="Nossa Playlist"
          />
        </CardContent>
      </Card>

      {/* Open in Spotify button */}
      <div className="flex justify-center">
        <Button asChild variant="outline" className="gap-2">
          <a href={spotifyPlaylistUrl} target="_blank" rel="noopener noreferrer">
            <svg className="h-5 w-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Abrir no Spotify
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* Info card */}
      <Card className="bg-gradient-to-br from-[#1DB954]/5 to-[#1DB954]/10 border-[#1DB954]/20">
        <CardContent className="flex items-start gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DB954]/10">
            <Music className="h-6 w-6 text-[#1DB954]" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium">Nossa Playlist</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Cada música dessa playlist carrega uma memória especial. São as canções que 
              tocaram em momentos importantes, que cantamos juntos, ou que simplesmente 
              nos fazem lembrar um do outro.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
