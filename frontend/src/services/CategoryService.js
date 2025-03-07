import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/categories'; 

export const createCategory = async (category) => {
    try {
        const response = await axios.post(apiUrl, category);
        return response.data;
      } catch (error) {
        console.error('Error when creating a category:', error);
        throw error;
      }
}

export const getCategories = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
      } catch (error) {
        console.error('Error when retrieving all the categories:', error);
        throw error;
      }
}