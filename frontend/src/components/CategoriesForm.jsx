import { useState } from "react";

export const CategoriesForm = () => {
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category) return;
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