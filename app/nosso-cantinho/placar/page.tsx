"use client"

import { useState } from "react"
import { Trophy, Heart, Plus, Minus, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PlacarPage() {
  const [scoreEu, setScoreEu] = useState(9)
  const [scoreEla, setScoreEla] = useState(0)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
            <Trophy className="h-7 w-7 text-amber-500" />
          </div>
        </div>
        <h1 className="font-serif text-3xl font-medium sm:text-4xl">
          Nosso Placar
        </h1>
      </div>

      {/* Scoreboard */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5" />
            
            {/* Sparkles decoration */}
            <div className="absolute top-4 left-4">
              <Sparkles className="h-6 w-6 text-amber-400/50" />
            </div>
            <div className="absolute top-4 right-4">
              <Sparkles className="h-6 w-6 text-amber-400/50" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Heart className="h-5 w-5 text-primary/30" />
            </div>

            {/* Main score display */}
            <div className="relative flex items-center justify-center gap-4 py-16 sm:gap-8 sm:py-24">
              {/* Player 1 */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground sm:text-base">Islentinho</span>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-serif text-7xl font-bold tracking-tighter text-primary sm:text-9xl">
                    {scoreEu}
                  </span>
                </div>
              </div>

              {/* Separator */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-serif text-5xl font-light text-muted-foreground/50 sm:text-7xl">
                  x
                </span>
              </div>

              {/* Player 2 */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground sm:text-base">Dona autarquia</span>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-serif text-7xl font-bold tracking-tighter text-amber-500 sm:text-9xl">
                    {scoreEla}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Winner message */}
      <Card className="border-dashed">
        <CardContent className="py-6 text-center">
        <p className="font-serif text-lg italic text-muted-foreground">
            &ldquo; E aumentando... &rdquo;
        </p>
        </CardContent>
      </Card>
    </div>
  )
}
