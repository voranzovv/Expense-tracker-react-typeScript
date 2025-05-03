interface Props {
    onSelectCategory: (category: string) => void
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
    return (
        <select
            className="form-select"
            onChange={(e) => onSelectCategory(e.target.value)}
        >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Transport">Transport</option>
            <option value="Leisure">Leisure</option>
            <option value="Other">Other</option>
        </select>
    )
}

export default ExpenseFilter