"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Category, Transaction } from "../types/finance"

interface EnhancedTransactionFormProps {
  categories: Category[]
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void
  onClose: () => void
}

export function EnhancedTransactionForm({ categories, onAddTransaction, onClose }: EnhancedTransactionFormProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    type: "expense" as "income" | "expense",
    needWant: "need" as "need" | "want",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const transaction = {
      description: formData.description,
      amount: formData.type === "expense" ? -Math.abs(Number(formData.amount)) : Number(formData.amount),
      category: formData.category,
      date: formData.date,
      type: formData.type,
      needWant: formData.type === "expense" ? formData.needWant : undefined,
      notes: formData.notes || undefined,
    }

    onAddTransaction(transaction)
    onClose()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Nouvelle Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Ex: Courses, Salaire..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant * (€)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Type de transaction</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.type === "income"}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, type: checked ? "income" : "expense" }))
                  }
                />
                <Label>{formData.type === "income" ? "Revenu" : "Dépense"}</Label>
              </div>
            </div>
          </div>

          {formData.type === "expense" && (
            <div className="space-y-2">
              <Label>Besoin ou Envie ?</Label>
              <Select
                value={formData.needWant}
                onValueChange={(value: "need" | "want") => setFormData((prev) => ({ ...prev, needWant: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="need">Besoin</SelectItem>
                  <SelectItem value="want">Envie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Informations supplémentaires..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              Ajouter
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
