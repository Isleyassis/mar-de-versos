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

  const formatDate = (dateString: string) => {
    const [datePart] = dateString.split("T")
    const [year, month, day] = datePart.split("-").map(Number)

    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(year, month - 1, day))
  } 

  const parseLocalDate = (dateString: string) => {
    const [datePart] = dateString.split("T")
    const [year, month, day] = datePart.split("-").map(Number)

    return new Date(year, month - 1, day)
  }

  const sortedMoments = [...moments].sort(
    (a, b) =>
      parseLocalDate(a.date).getTime() -
      parseLocalDate(b.date).getTime()
  )

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium sm:text-3xl">Nossos Momentos</h1>
          <p className="mt-1 text-muted-foreground">Os marcos especiais da nossa história</p>
        </div>
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
                          {formatDate(moment.date)}
                        </time>
                        <h3 className="mt-2 font-serif text-lg font-medium">{moment.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{moment.description}</p>
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
