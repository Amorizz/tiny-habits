"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Budget } from "../../types/finance"

interface ExpensesWidgetProps {
  budgets: Budget[]
  size: "small" | "medium" | "large"
}

export function ExpensesWidget({ budgets, size }: ExpensesWidgetProps) {
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const percentage = (totalSpent / totalBudget) * 100

  const getColor = () => {
    if (percentage < 70) return "text-green-600"
    if (percentage < 90) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Dépenses Mensuelles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{totalSpent.toFixed(0)} €</span>
            <span className="text-gray-500">{totalBudget.toFixed(0)} €</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <p className={`text-xs ${getColor()}`}>
            {percentage < 100
              ? `Reste ${(totalBudget - totalSpent).toFixed(0)} €`
              : `Dépassement de ${(totalSpent - totalBudget).toFixed(0)} €`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
