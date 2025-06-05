"use client"

import { useState } from "react"
import type { Transaction, Budget, FinancialGoal, Widget, Category } from "../types/finance"

const defaultCategories: Category[] = [
  { id: "1", name: "Food", icon: "🍽️", color: "bg-red-500" },
  { id: "2", name: "Transport", icon: "🚗", color: "bg-blue-500" },
  { id: "3", name: "Entertainment", icon: "🎬", color: "bg-green-500" },
  { id: "4", name: "Shopping", icon: "🛍️", color: "bg-purple-500" },
  { id: "5", name: "Health", icon: "🏥", color: "bg-pink-500" },
  { id: "6", name: "Income", icon: "💰", color: "bg-yellow-500" },
]

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    description: "Grocery Store",
    amount: -85.5,
    category: "Food",
    date: "2025-01-15",
    type: "expense",
    needWant: "need",
  },
  { id: "2", description: "Salary", amount: 3200.0, category: "Income", date: "2025-01-15", type: "income" },
  {
    id: "3",
    description: "Coffee Shop",
    amount: -12.75,
    category: "Food",
    date: "2025-01-14",
    type: "expense",
    needWant: "want",
  },
  {
    id: "4",
    description: "Gas Station",
    amount: -45.2,
    category: "Transport",
    date: "2025-01-14",
    type: "expense",
    needWant: "need",
  },
  {
    id: "5",
    description: "Netflix",
    amount: -15.99,
    category: "Entertainment",
    date: "2025-01-13",
    type: "expense",
    needWant: "want",
  },
]

const defaultBudgets: Budget[] = [
  { id: "1", category: "Food", amount: 400, period: "monthly", spent: 300, color: "bg-red-500" },
  { id: "2", category: "Transport", amount: 200, period: "monthly", spent: 145, color: "bg-blue-500" },
  { id: "3", category: "Entertainment", amount: 150, period: "monthly", spent: 90, color: "bg-green-500" },
  { id: "4", category: "Shopping", amount: 200, period: "monthly", spent: 150, color: "bg-purple-500" },
]

const defaultGoals: FinancialGoal[] = [
  { id: "1", name: "Emergency Fund", targetAmount: 5000, currentAmount: 2300, deadline: "2025-12-31", priority: 1 },
  { id: "2", name: "Vacation", targetAmount: 2000, currentAmount: 450, deadline: "2025-08-15", priority: 2 },
  { id: "3", name: "New Laptop", targetAmount: 1500, currentAmount: 800, priority: 3 },
]

const defaultWidgets: Widget[] = [
  { id: "1", type: "balance", title: "Current Balance", position: 1, visible: true, size: "large" },
  { id: "2", type: "expenses", title: "Monthly Expenses", position: 2, visible: true, size: "medium" },
  { id: "3", type: "categories", title: "Category Breakdown", position: 3, visible: true, size: "medium" },
  { id: "4", type: "goals", title: "Savings Goals", position: 4, visible: true, size: "medium" },
  { id: "5", type: "alerts", title: "Budget Alerts", position: 5, visible: true, size: "small" },
  { id: "6", type: "tips", title: "Daily Tip", position: 6, visible: true, size: "small" },
  { id: "7", type: "coffee", title: "Coffee Counter", position: 7, visible: true, size: "small" },
  { id: "8", type: "decisions", title: "Good Decisions", position: 8, visible: true, size: "small" },
]

export function useFinanceData() {
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions)
  const [budgets, setBudgets] = useState<Budget[]>(defaultBudgets)
  const [goals, setGoals] = useState<FinancialGoal[]>(defaultGoals)
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets)
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [coffeeCount, setCoffeeCount] = useState(23)
  const [goodDecisions, setGoodDecisions] = useState(12)

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    }
    setCategories((prev) => [...prev, newCategory])
  }

  const updateWidget = (widgetId: string, updates: Partial<Widget>) => {
    setWidgets((prev) => prev.map((widget) => (widget.id === widgetId ? { ...widget, ...updates } : widget)))
  }

  const reorderWidgets = (newWidgets: Widget[]) => {
    setWidgets(newWidgets)
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const balance = totalIncome - totalExpenses

  return {
    transactions,
    budgets,
    goals,
    widgets,
    categories,
    coffeeCount,
    goodDecisions,
    balance,
    totalIncome,
    totalExpenses,
    addTransaction,
    addCategory,
    updateWidget,
    reorderWidgets,
    setCoffeeCount,
    setGoodDecisions,
  }
}
