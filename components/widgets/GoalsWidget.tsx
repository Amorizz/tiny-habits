"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { FinancialGoal } from "../../types/finance"

interface GoalsWidgetProps {
  goals: FinancialGoal[]
  size: "small" | "medium" | "large"
}

export function GoalsWidget({ goals, size }: GoalsWidgetProps) {
  const primaryGoal = goals.sort((a, b) => a.priority - b.priority)[0]

  if (!primaryGoal) return null

  const percentage = (primaryGoal.currentAmount / primaryGoal.targetAmount) * 100
  const remaining = primaryGoal.targetAmount - primaryGoal.currentAmount

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Objectif Principal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium text-sm">{primaryGoal.name}</h3>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{primaryGoal.currentAmount.toFixed(0)} €</span>
            <span>{primaryGoal.targetAmount.toFixed(0)} €</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-green-600">Plus que {remaining.toFixed(0)} € à économiser</p>
        </div>
      </CardContent>
    </Card>
  )
}
