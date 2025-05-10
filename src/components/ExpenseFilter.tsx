import Categories from "../catergories"

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
            {
                Categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))
            }

        </select>
    )
}

export default ExpenseFilter