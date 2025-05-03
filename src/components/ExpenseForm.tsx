import Categories from "../catergories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// The zodResolver function is used to integrate Zod with React Hook Form.

// npm i npm i @hookform/resolvers zod react-hook-form 


const schema = z.object({
    description: z.string().min(3, { message: "Description must be at least 3 characters long" }).max(50),
    amount: z.number().min(0.01, { message: "Amount must be least 0.01" }),
    category: z.enum(Categories, { errorMap: () => ({ message: "Invalid category" }) }),
    // The z.enum function is used to create a Zod schema that validates against a set of string literals.
    // The errorMap function is used to customize the error message for the enum validation.
    // The errorMap function takes a single argument, which is an object that contains the error information.
    // The function returns an object with a message property that contains the error message.
    // The message property is used to customize the error message for the enum validation.

}
)

type ExpenseFormData = z.infer<typeof schema>
// The z.infer function is used to infer the TypeScript type from a Zod schema.

interface Props {
    onSubmit: (data: ExpenseFormData) => void
}

const ExpenseForm = ({ onSubmit }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) }) // This will use the schema to validate the form data
    return (
        <form
            onSubmit={handleSubmit(
                // (data) => console.log(data)
                (data) => { onSubmit(data); reset() } // This will call the onSubmit function passed as a prop and reset the form after submission

            )}>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input {...register('description')} type="text" className="form-control" id="description" />
                {errors.description && <div className="text-danger">{errors.description.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input {...register('amount', { valueAsNumber: true })} type="number" className="form-control" id="amount" />
                {errors.amount && <div className="text-danger">{errors.amount.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select {...register('category')} className="form-select" id="category">
                    <option value="">Select Category</option>
                    {
                        Categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))
                    }
                </select>
                {errors.category && <div className="text-danger">{errors.category.message}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Add Expense</button>
        </form>
    )
}

export default ExpenseForm