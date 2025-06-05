"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Settings, Eye, EyeOff } from "lucide-react"
import type { Widget } from "../types/finance"
import { BalanceWidget } from "./widgets/BalanceWidget"
import { ExpensesWidget } from "./widgets/ExpensesWidget"
import { CategoriesWidget } from "./widgets/CategoriesWidget"
import { GoalsWidget } from "./widgets/GoalsWidget"
import { SmallWidget } from "./widgets/SmallWidgets"

interface CustomizableDashboardProps {
  widgets: Widget[]
  onReorderWidgets: (widgets: Widget[]) => void
  onUpdateWidget: (widgetId: string, updates: Partial<Widget>) => void
  balance: number
  totalIncome: number
  totalExpenses: number
  budgets: any[]
  goals: any[]
  coffeeCount: number
  goodDecisions: number
}

export function CustomizableDashboard({
  widgets,
  onReorderWidgets,
  onUpdateWidget,
  balance,
  totalIncome,
  totalExpenses,
  budgets,
  goals,
  coffeeCount,
  goodDecisions,
}: CustomizableDashboardProps) {
  const [isEditMode, setIsEditMode] = useState(false)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedWidgets = items.map((widget, index) => ({
      ...widget,
      position: index + 1,
    }))

    onReorderWidgets(updatedWidgets)
  }

  const renderWidget = (widget: Widget) => {
    if (!widget.visible && !isEditMode) return null

    const commonProps = { size: widget.size }

    switch (widget.type) {
      case "balance":
        return (
          <BalanceWidget balance={balance} totalIncome={totalIncome} totalExpenses={totalExpenses} {...commonProps} />
        )
      case "expenses":
        return <ExpensesWidget budgets={budgets} {...commonProps} />
      case "categories":
        return <CategoriesWidget budgets={budgets} {...commonProps} />
      case "goals":
        return <GoalsWidget goals={goals} {...commonProps} />
      default:
        return (
          <SmallWidget
            type={widget.type}
            title={widget.title}
            coffeeCount={coffeeCount}
            goodDecisions={goodDecisions}
          />
        )
    }
  }

  const visibleWidgets = widgets.filter((w) => w.visible || isEditMode)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Tableau de Bord</h2>
        <Button variant={isEditMode ? "default" : "outline"} size="sm" onClick={() => setIsEditMode(!isEditMode)}>
          <Settings className="h-4 w-4 mr-2" />
          {isEditMode ? "Terminer" : "Personnaliser"}
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-4">
              {visibleWidgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index} isDragDisabled={!isEditMode}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative ${widget.size === "large" ? "col-span-2" : ""} ${
                        snapshot.isDragging ? "opacity-50" : ""
                      } ${isEditMode ? "ring-2 ring-blue-300 ring-opacity-50" : ""}`}
                    >
                      {isEditMode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 z-10 h-6 w-6 p-0"
                          onClick={() => onUpdateWidget(widget.id, { visible: !widget.visible })}
                        >
                          {widget.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                      )}
                      {renderWidget(widget)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
