"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { poems as initialPoems, type Poem } from "@/lib/data"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function PostsPage() {
  const [poems, setPoems] = useState<Poem[]>(initialPoems)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    published: true,
  })

  const handleOpenDialog = (poem?: Poem) => {
    if (poem) {
      setEditingPoem(poem)
      setFormData({
        title: poem.title,
        content: poem.content,
        excerpt: poem.excerpt,
        published: poem.published,
      })
    } else {
      setEditingPoem(null)
      setFormData({ title: "", content: "", excerpt: "", published: true })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.title || !formData.content) return

    const excerpt = formData.excerpt || formData.content.split("\n")[0].slice(0, 100) + "..."

    if (editingPoem) {
      setPoems(poems.map(p => 
        p.id === editingPoem.id 
          ? { 
              ...p, 
              ...formData,
              excerpt,
              slug: generateSlug(formData.title),
            }
          : p
      ))
    } else {
      const newPoem: Poem = {
        id: Date.now().toString(),
        slug: generateSlug(formData.title),
        title: formData.title,
        content: formData.content,
        excerpt,
        date: new Date().toISOString().split("T")[0],
        published: formData.published,
      }
      setPoems([newPoem, ...poems])
    }
    setIsDialogOpen(false)
    setFormData({ title: "", content: "", excerpt: "", published: true })
    setEditingPoem(null)
  }

  const handleDelete = (id: string) => {
    setPoems(poems.filter(p => p.id !== id))
  }

  const togglePublished = (id: string) => {
    setPoems(poems.map(p => 
      p.id === id ? { ...p, published: !p.published } : p
    ))
  }

  const filteredPoems = poems.filter(poem =>
    poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poem.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium sm:text-3xl">Gerenciar Posts</h1>
          <p className="mt-1 text-muted-foreground">Criar, editar e organizar os poemas</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Poema
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar poemas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Posts list */}
      <div className="space-y-3">
        {filteredPoems.map((poem) => (
          <Card key={poem.id} className="group transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{poem.title}</h3>
                  <Badge variant={poem.published ? "default" : "secondary"} className="text-xs">
                    {poem.published ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{poem.excerpt}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => togglePublished(poem.id)}
                  title={poem.published ? "Despublicar" : "Publicar"}
                >
                  {poem.published ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleOpenDialog(poem)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleDelete(poem.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPoems.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium">
              {searchTerm ? "Nenhum resultado" : "Nenhum poema ainda"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchTerm 
                ? "Tente buscar com outras palavras"
                : "Comece escrevendo seu primeiro poema"
              }
            </p>
            {!searchTerm && (
              <Button className="mt-4" onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Poema
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingPoem ? "Editar Poema" : "Novo Poema"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título do poema"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Escreva seu poema aqui...

Use linhas em branco para separar estrofes."
                rows={12}
                className="font-serif"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Resumo (opcional)</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Um breve trecho para preview..."
                rows={2}
              />
              <p className="text-xs text-muted-foreground">
                Se não preencher, será usado o início do poema.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="published" className="text-sm font-normal">
                Publicar imediatamente
              </Label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {editingPoem ? "Salvar" : "Criar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
