export const CategoriesList = ({categories, setCategories}) => {

    const handleDelete = () => {
        return;
    }
    return (
        <div>
            <h2>Categories</h2>
            {categories.length === 0 ? ( 
                <p>There are no categories yet.</p> // Id there are no notes
            ) : (
                <ul>
                {categories.map((category) => ( // For each note show ,title, content, edit button that redirects to edit page, delete button and archived/unarchived button
                    <li key={category.id}>
                    <p>{category.name}</p>
                    <button onClick={() => handleDelete(category.id)}>-</button>              
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}