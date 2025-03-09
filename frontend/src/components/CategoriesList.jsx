import { deleteCategory } from "../services/CategoryService";

export const CategoriesList = ({categories, setCategories}) => {

    const handleDelete = async (id) => {
         try {
              await deleteCategory(id);
              setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
            } catch (error) {
              console.error('Error when deleting the note:', error);
            }
    }

    return (
        <div>
            <h2>Categories</h2>
            {categories.length === 0 ? ( 
                <p>There are no categories yet.</p> // Id there are no notes
            ) : (
                <ul >
                {categories.map((category) => ( // For each note show ,title, content, edit button that redirects to edit page, delete button and archived/unarchived button
                    <li key={category.id} className="categories-li">
                    <p>{category.name}</p>
                    <button onClick={() => handleDelete(category.id)}>x</button>              
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}