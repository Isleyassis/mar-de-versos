"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, Music, Calendar, FileText, Moon, Sun, ArrowLeft, X, Menu, Trophy } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navigation = [
  { name: "Início", href: "/nosso-cantinho", icon: Home },
  { name: "Momentos", href: "/nosso-cantinho/momentos", icon: Heart },
  { name: "Placar", href: "/nosso-cantinho/placar", icon: Trophy },
  { name: "Músicas", href: "/nosso-cantinho/musicas", icon: Music },
  { name: "Posts", href: "/nosso-cantinho/posts", icon: FileText },
]

export default function NossoCantinhoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border/40 bg-background/70 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
        <span className="font-serif text-sm font-medium">Nosso Cantinho</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-border/40 bg-background transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between border-b border-border/40 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-4 w-4 text-primary" />
            </div>
            <span className="font-serif text-lg font-medium">Nosso Cantinho</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="h-8 w-8 lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-border/40 p-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao site
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden h-8 w-8 lg:flex"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Alternar tema</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pt-14 lg:pl-64 lg:pt-0">
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
