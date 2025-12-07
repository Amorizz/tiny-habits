"use client"

import { useState } from "react"
import { Plus, Home, CreditCard, PieChart, User, Search, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { useFinanceData } from "./hooks/useFinanceData"
import { CustomizableDashboard } from "./components/CustomizableDashboard"
import { EnhancedTransactionForm } from "./components/EnhancedTransactionForm"

export default function EnhancedFinanceTracker() {
  const [activeTab, setActiveTab] = useState("home")
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [transactionFilter, setTransactionFilter] = useState({
    category: "",
    type: "",
    search: "",
  })

  const {
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
    updateWidget,
    reorderWidgets,
    refreshCategories,
  } = useFinanceData()  

  const filteredTransactions = transactions.filter((transaction) => {
  const matchesCategory =
    !transactionFilter.category || transactionFilter.category === "all" || transaction.category === transactionFilter.category

  const matchesType =
    !transactionFilter.type || transactionFilter.type === "all" || transaction.type === transactionFilter.type

  const matchesSearch =
    !transactionFilter.search ||
    transaction.description.toLowerCase().includes(transactionFilter.search.toLowerCase())

  return matchesCategory && matchesType && matchesSearch
})


  const renderHome = () => (
    <CustomizableDashboard
      widgets={widgets}
      onReorderWidgets={reorderWidgets}
      onUpdateWidget={updateWidget}
      balance={balance}
      totalIncome={totalIncome}
      totalExpenses={totalExpenses}
      budgets={budgets}
      goals={goals}
      coffeeCount={coffeeCount}
      goodDecisions={goodDecisions}
    />
  )

  const renderTransactions = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
  <h2 className="text-xl font-bold">Transactions</h2>
  <div className="flex gap-2">
    <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Ajouter une transaction</DialogTitle>
        <EnhancedTransactionForm
          categories={categories}
          onAddTransaction={addTransaction}
          onClose={() => setIsAddTransactionOpen(false)}
        />
      </DialogContent>
    </Dialog>

    <Button size="sm" variant="outline" onClick={refreshCategories}>
      <RefreshCw className="h-4 w-4 mr-2" />
      Actualiser
    </Button>
  </div>
</div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher une transaction..."
              value={transactionFilter.search}
              onChange={(e) => setTransactionFilter((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={transactionFilter.category}
              onValueChange={(value) => setTransactionFilter((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={transactionFilter.type}
              onValueChange={(value) => setTransactionFilter((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="income">Revenus</SelectItem>
                <SelectItem value="expense">Dépenses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <span className="text-lg">
                      {categories.find((c) => c.name === transaction.category)?.icon || "💰"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      {transaction.needWant && (
                        <Badge variant={transaction.needWant === "need" ? "default" : "outline"} className="text-xs">
                          {transaction.needWant === "need" ? "Besoin" : "Envie"}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">{transaction.date}</span>
                    </div>
                    {transaction.notes && <p className="text-xs text-gray-600 mt-1">{transaction.notes}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "income" ? "+" : ""}
                    {transaction.amount.toFixed(2)} €
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
      <h2 className="text-xl font-bold">Budgets & Objectifs</h2>

      {/* Budget Overview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Budgets Mensuels</h3>
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.amount) * 100
          const isOverBudget = percentage > 100

          return (
            <Card key={budget.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${budget.color}`} />
                    <h3 className="font-medium">{budget.category}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {budget.spent.toFixed(2)} € / {budget.amount.toFixed(2)} €
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage < 70 ? "bg-green-500" : percentage < 90 ? "bg-orange-500" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={isOverBudget ? "text-red-600" : "text-gray-600"}>
                      {isOverBudget
                        ? `Dépassement de ${(budget.spent - budget.amount).toFixed(2)} €`
                        : `Reste ${(budget.amount - budget.spent).toFixed(2)} €`}
                    </span>
                    <span className="text-gray-500">{percentage.toFixed(0)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Financial Goals */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Objectifs Financiers</h3>
        {goals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100
          const remaining = goal.targetAmount - goal.currentAmount

          return (
            <Card key={goal.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{goal.name}</h3>
                      {goal.deadline && <p className="text-sm text-gray-500">Échéance: {goal.deadline}</p>}
                    </div>
                    <Badge variant="outline">Priorité {goal.priority}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{goal.currentAmount.toFixed(2)} €</span>
                      <span className="text-gray-500">{goal.targetAmount.toFixed(2)} €</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Plus que {remaining.toFixed(2)} € à économiser</span>
                      <span className="text-gray-500">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Profil & Paramètres</h2>

      <Card>
        <CardHeader>
          <CardTitle>Informations Personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nom</label>
            <Input defaultValue="Jean Dupont" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue="jean.dupont@example.com" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Préférences de Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Alertes de dépassement de budget</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Rappels d'objectifs d'épargne</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Conseils financiers quotidiens</span>
            <input type="checkbox" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des Catégories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                <Button variant="ghost" size="sm">
                  Modifier
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une catégorie
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold text-center">Tiny Habits</h1>
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
            <span className="text-xs">Accueil</span>
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
            <span className="text-xs">Profil</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
