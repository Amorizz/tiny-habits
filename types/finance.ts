export interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  type: "income" | "expense"
  needWant?: "need" | "want"
  notes?: string
}

export interface Budget {
  id: string
  category: string
  amount: number
  period: "daily" | "weekly" | "monthly"
  spent: number
  color: string
}

export interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline?: string
  image?: string
  priority: number
}

export interface Widget {
  id: string
  type:
    | "balance"
    | "expenses"
    | "categories"
    | "calendar"
    | "goals"
    | "alerts"
    | "challenges"
    | "tips"
    | "coffee"
    | "avoid"
    | "decisions"
  title: string
  position: number
  visible: boolean
  size: "small" | "medium" | "large"
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}
