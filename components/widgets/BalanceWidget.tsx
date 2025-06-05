"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface BalanceWidgetProps {
  balance: number
  totalIncome: number
  totalExpenses: number
  size: "small" | "medium" | "large"
}

export function BalanceWidget({ balance, totalIncome, totalExpenses, size }: BalanceWidgetProps) {
  const isLarge = size === "large"

  return (
    <Card className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white ${isLarge ? "col-span-2" : ""}`}>
      <CardContent className={`p-${isLarge ? "6" : "4"}`}>
        <div className="text-center">
          <p className="text-blue-100 text-sm">Solde Total</p>
          <h2 className={`${isLarge ? "text-3xl" : "text-xl"} font-bold`}>{balance.toFixed(2)} €</h2>
        </div>
        {isLarge && (
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Revenus</span>
              </div>
              <p className="font-semibold">{totalIncome.toFixed(2)} €</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm">Dépenses</span>
              </div>
              <p className="font-semibold">{totalExpenses.toFixed(2)} €</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
