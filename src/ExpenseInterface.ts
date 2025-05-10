export default interface Expense {
    id: number, // A unique identifier for the expense.
    description: string, // A brief description of the expense.
    amount: number, // The monetary value of the expense.
    category: string // The category to which the expense belongs (e.g., Food, Travel).
  }