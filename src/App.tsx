
import { useState } from 'react'
import './App.css'
import ExpenseList from './components/ExpenseList'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseForm from './components/ExpenseForm'
import Expense from './ExpenseInterface'



function App() {

  const [expenses, setExpenses] = useState<Expense[]>([
    // { id: 1, description: 'Groceries', amount: 50, category: 'Food' },
    // { id: 2, description: 'Rent', amount: 1000, category: 'Housing' },
    // { id: 3, description: 'Utilities', amount: 200, category: 'Housing' },
    // { id: 4, description: 'Transportation', amount: 100, category: 'Transport' },
    // { id: 5, description: 'Entertainment', amount: 150, category: 'Leisure' }
  ])
  const [filteredCategory, setFilteredCategory] = useState('')

  const visibleExpenses = filteredCategory ?
    expenses.filter(e => e.category === filteredCategory)
    : expenses

  return (
    <>
      <div className="mb-5">
        <ExpenseForm onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])} />
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelectCategory={(category) => { setFilteredCategory(category) }} />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter(e => e.id !== id))} />
    </>
  )
}

export default App
