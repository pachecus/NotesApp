import { useState, useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext";



export const CategoriesForm = () => {
    const [category, setCategory] = useState('');
    const { addCategory } = useContext(CategoriesContext); // addNote adds a new note to the context and to the database

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category) return;
        addCategory({category});
        setCategory('');
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                <h1 htmlFor="title">Category Name</h1>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                </div>
                <button type="submit">Save Category</button>
            </form>
        </div>
    )
}