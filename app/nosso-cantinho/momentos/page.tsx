"use client"

import { useState } from "react"
import { Plus, Calendar, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { moments as initialMoments, type Moment } from "@/lib/data"

export default function MomentosPage() {
  const [moments, setMoments] = useState<Moment[]>(initialMoments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMoment, setEditingMoment] = useState<Moment | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  })

  const handleOpenDialog = (moment?: Moment) => {
    if (moment) {
      setEditingMoment(moment)
      setFormData({
        title: moment.title,
        description: moment.description,
        date: moment.date,
      })
    } else {
      setEditingMoment(null)
      setFormData({ title: "", description: "", date: "" })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.title || !formData.date) return

    if (editingMoment) {
      setMoments(moments.map(m => 
        m.id === editingMoment.id 
          ? { ...m, ...formData }
          : m
      ))
    } else {
      const newMoment: Moment = {
        id: Date.now().toString(),
        ...formData,
      }
      setMoments([...moments, newMoment])
    }
    setIsDialogOpen(false)
    setFormData({ title: "", description: "", date: "" })
    setEditingMoment(null)
  }

  const handleDelete = (id: string) => {
    setMoments(moments.filter(m => m.id !== id))
  }

  const sortedMoments = [...moments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium sm:text-3xl">Nossos Momentos</h1>
          <p className="mt-1 text-muted-foreground">Os marcos especiais da nossa história</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Momento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingMoment ? "Editar Momento" : "Novo Momento"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Nosso primeiro encontro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva esse momento especial..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  {editingMoment ? "Salvar" : "Criar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-1/2 sm:-translate-x-px" />

        <div className="space-y-8">
          {sortedMoments.map((moment, index) => (
            <div 
              key={moment.id} 
              className={`relative flex items-start gap-4 sm:gap-8 ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-primary sm:left-1/2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              </div>

              {/* Content */}
              <div className={`ml-8 flex-1 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                <Card className="group transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className={`flex items-start justify-between gap-2 ${index % 2 === 0 ? "sm:flex-row-reverse" : ""}`}>
                      <div className={index % 2 === 0 ? "sm:text-right" : ""}>
                        <time className="flex items-center gap-1 text-xs font-medium text-primary">
                          <Calendar className="h-3 w-3" />
                          {new Date(moment.date).toLocaleDateString("pt-BR", { 
                            day: "numeric", 
                            month: "long", 
                            year: "numeric" 
                          })}
                        </time>
                        <h3 className="mt-2 font-serif text-lg font-medium">{moment.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{moment.description}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleOpenDialog(moment)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(moment.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden sm:block sm:w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {moments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium">Nenhum momento ainda</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Adicione o primeiro marco da nossa história
            </p>
            <Button className="mt-4" onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Momento
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
