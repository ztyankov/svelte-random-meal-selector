const API_URL = 'http://localhost:5000';

export const getAllMeals = async () => {
    return await fetch(`${API_URL}/meals`);
}