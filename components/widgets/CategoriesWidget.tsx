"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Budget } from "../../types/finance"

interface CategoriesWidgetProps {
  budgets: Budget[]
  size: "small" | "medium" | "large"
}

export function CategoriesWidget({ budgets, size }: CategoriesWidgetProps) {
  const sortedBudgets = budgets.sort((a, b) => b.spent - a.spent).slice(0, 3)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Top Catégories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedBudgets.map((budget, index) => (
            <div key={budget.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${budget.color}`} />
                <span className="text-sm">{budget.category}</span>
              </div>
              <span className="text-sm font-medium">{budget.spent.toFixed(0)} €</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
