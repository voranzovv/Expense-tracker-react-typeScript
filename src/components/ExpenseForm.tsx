import Categories from "../catergories"; // Importing the Categories array or object from the specified path.
import { z } from "zod"; // Importing Zod for schema validation.
import { zodResolver } from "@hookform/resolvers/zod"; // Importing the Zod resolver to integrate Zod with React Hook Form.
import { useForm } from "react-hook-form"; // Importing React Hook Form for form handling.

// The zodResolver function is used to integrate Zod with React Hook Form.
// npm i @hookform/resolvers zod react-hook-form

// Define a schema using Zod for form validation.
const schema = z.object({
    description: z.string()
        .min(3, { message: "Description must be at least 3 characters long" }) // Minimum length validation for description.
        .max(50), // Maximum length validation for description.
    amount: z.number()
        .min(0.01, { message: "Amount must be least 0.01" }), // Minimum value validation for amount.
    category: z.enum(Categories, { errorMap: () => ({ message: "Invalid category" }) }),
    // The z.enum function validates that the category is one of the predefined values in Categories.
    // The errorMap function customizes the error message for invalid categories.
});

// Infer the TypeScript type from the Zod schema.
// This allows TypeScript to understand the structure of the data that will be submitted through the form.
// The inferred type will have the same shape as the schema defined above.
// This is useful for type-checking and ensuring that the data conforms to the expected structure.
type ExpenseFormData = z.infer<typeof schema>;

interface Props {
    onSubmit: (data: ExpenseFormData) => void; // Function to handle form submission, passed as a prop.
}

const ExpenseForm = ({ onSubmit }: Props) => {
    // useForm hook initializes the form with validation using the Zod schema.
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormData>({
        resolver: zodResolver(schema), // Integrates Zod schema with React Hook Form.
    });

    return (
        <form
            onSubmit={handleSubmit(
                (data) => {
                    onSubmit(data); // Calls the onSubmit function passed as a prop with the form data.
                    reset(); // Resets the form after successful submission.
                    
                }
            )}
        >
            {/* Description Input Field */}
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                    {...register('description')} // Registers the input field with React Hook Form.
                    type="text"
                    className="form-control"
                    id="description"
                />
                {errors.description && <div className="text-danger">{errors.description.message}</div>}
                {/* Displays validation error for description if it exists. */}
            </div>

            {/* Amount Input Field */}
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input
                    {...register('amount', { valueAsNumber: true })} // Registers the input field and parses the value as a number.
                    className="form-control"
                />
                {errors.amount && <div className="text-danger">{errors.amount.message}</div>}
                {/* Displays validation error for amount if it exists. */}
            </div>

            {/* Category Dropdown */}
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                    {...register('category')} // Registers the select field with React Hook Form.
                    className="form-select"
                >
                    <option value="">Select Category</option>
                    {/* Default option for the dropdown. */}
                    {
                        Categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))
                        // Dynamically generates options from the Categories array or object.
                    }
                </select>
                {errors.category && <div className="text-danger">{errors.category.message}</div>}
                {/* Displays validation error for category if it exists. */}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;