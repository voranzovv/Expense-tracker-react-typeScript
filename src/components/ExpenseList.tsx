import Expense from "../ExpenseInterface"

// interface Expense {
//     id: number, // A unique identifier for the expense.
//     description: string, // A brief description of the expense.
//     amount: number, // The monetary value of the expense.
//     category: string // The category to which the expense belongs (e.g., Food, Travel).
// }

interface Props {
    expenses: Expense[],
    onDelete: (id: string) => void
}
const ExpenseList = ({ expenses, onDelete }: Props) => {
    if (expenses.length === 0) {
        return <p>No expenses found.</p>
    }
    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(expense.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>
                        {/* Display the total amount of all expenses */}
                        {/* The reduce function iterates over each expense and accumulates the total amount. */}
                        {/* It starts with an initial value of 0 for the accumulator (acc). */}
                        {/* The current expense's amount is added to the accumulator for each iteration. */}
                        {expenses.reduce((acc, expense) => acc + expense.amount, 0)}
                         {/* This will calculate the total amount of all expenses
                         The reduce function takes two arguments: the accumulator (acc) and the current expense (expense).
                         The accumulator is initialized to 0. */}
                        </td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}

export default ExpenseList