"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Coffee, CheckCircle, Lightbulb } from "lucide-react"

interface SmallWidgetProps {
  type: string
  title: string
  coffeeCount?: number
  goodDecisions?: number
}

export function SmallWidget({ type, title, coffeeCount, goodDecisions }: SmallWidgetProps) {
  const renderContent = () => {
    switch (type) {
      case "alerts":
        return (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-sm">2 dépassements</span>
          </div>
        )

      case "coffee":
        return (
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-brown-500" />
            <span className="text-sm">{coffeeCount} cafés ce mois</span>
          </div>
        )

      case "decisions":
        return (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">{goodDecisions} bonnes décisions</span>
          </div>
        )

      case "tips":
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="text-xs font-medium">Astuce du jour</span>
            </div>
            <p className="text-xs text-gray-600">Préparez vos repas pour économiser sur la nourriture</p>
          </div>
        )

      case "avoid":
        return (
          <div className="space-y-1">
            <span className="text-xs font-medium text-red-600">À éviter aujourd'hui</span>
            <p className="text-xs text-gray-600">Livraisons (vous dépensez souvent trop le vendredi)</p>
          </div>
        )

      default:
        return <span className="text-sm">Widget {type}</span>
    }
  }

  return (
    <Card>
      <CardContent className="p-3">{renderContent()}</CardContent>
    </Card>
  )
}
