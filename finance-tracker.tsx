"use client"

import { useState } from "react"
import {
  Plus,
  Home,
  CreditCard,
  PieChart,
  User,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const transactions = [
  { id: 1, description: "Grocery Store", amount: -85.5, category: "Food", date: "2024-01-15", type: "expense" },
  { id: 2, description: "Salary", amount: 3200.0, category: "Income", date: "2024-01-15", type: "income" },
  { id: 3, description: "Coffee Shop", amount: -12.75, category: "Food", date: "2024-01-14", type: "expense" },
  { id: 4, description: "Gas Station", amount: -45.2, category: "Transport", date: "2024-01-14", type: "expense" },
  { id: 5, description: "Netflix", amount: -15.99, category: "Entertainment", date: "2024-01-13", type: "expense" },
  { id: 6, description: "Freelance Work", amount: 500.0, category: "Income", date: "2024-01-12", type: "income" },
]

const budgets = [
  { category: "Food", spent: 298.25, budget: 400, color: "bg-red-500" },
  { category: "Transport", spent: 145.2, budget: 200, color: "bg-blue-500" },
  { category: "Entertainment", spent: 89.99, budget: 150, color: "bg-green-500" },
  { category: "Shopping", spent: 234.5, budget: 300, color: "bg-purple-500" },
]

export default function FinanceTracker() {
  const [activeTab, setActiveTab] = useState("home")
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const balance = totalIncome - totalExpenses

  const renderHome = () => (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-blue-100 text-sm">Total Balance</p>
            <h2 className="text-3xl font-bold">${balance.toFixed(2)}</h2>
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Income</span>
              </div>
              <p className="font-semibold">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm">Expenses</span>
              </div>
              <p className="font-semibold">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Plus className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Add Transaction</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>Add a new income or expense transaction.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddTransactionOpen(false)}>
                Add Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <PieChart className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm font-medium">View Reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderTransactions = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Transactions</h2>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderBudgets = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Budget Overview</h2>

      <div className="space-y-4">
        {budgets.map((budget) => (
          <Card key={budget.category}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{budget.category}</h3>
                <span className="text-sm text-gray-500">
                  ${budget.spent.toFixed(2)} / ${budget.budget.toFixed(2)}
                </span>
              </div>
              <Progress value={(budget.spent / budget.budget) * 100} className="h-2 mb-2" />
              <div className="flex justify-between text-sm">
                <span className={budget.spent > budget.budget ? "text-red-600" : "text-gray-600"}>
                  {budget.spent > budget.budget ? "Over budget" : "Remaining"}: $
                  {Math.abs(budget.budget - budget.spent).toFixed(2)}
                </span>
                <span className="text-gray-500">{((budget.spent / budget.budget) * 100).toFixed(0)}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-gray-500">john.doe@example.com</p>
      </div>

      <div className="space-y-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-600" />
              <span>Account Settings</span>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span>Export Data</span>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-600" />
              <span>Privacy Settings</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold text-center">Finance Tracker</h1>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {activeTab === "home" && renderHome()}
        {activeTab === "transactions" && renderTransactions()}
        {activeTab === "budgets" && renderBudgets()}
        {activeTab === "profile" && renderProfile()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("home")}
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant={activeTab === "transactions" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("transactions")}
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">Transactions</span>
          </Button>
          <Button
            variant={activeTab === "budgets" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("budgets")}
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <PieChart className="h-5 w-5" />
            <span className="text-xs">Budgets</span>
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("profile")}
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
