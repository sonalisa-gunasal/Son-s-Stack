import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

export const login = (password) => API.post('/login', { password });
export const getCategories = () => API.get('/categories');
export const addCategory = (name) => API.post('/categories', { name });
export const editCategory = (id, name) => API.put(`/categories/${id}`, { name });
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
// Fetch questions for a given technology (tech stack) by technologyId
export const getQuestions = (techstackId) => API.get(`/questions/technology/${techstackId}`);
export const addQuestion = (category_id, question, answer) => API.post('/questions', { category_id, question, answer });
export const editQuestion = (id, question, answer) => API.put(`/questions/${id}`, { question, answer });
// TECHNOLOGIES API
export const getTechnologies = (categoryId = null) => {
	if (categoryId) {
		return API.get(`/technologies/category/${categoryId}`);
	}
	return API.get('/technologies');
};
export const addTechnology = (name, category_id = null, description = '') => API.post('/technologies', { name, category_id, description });
export const editTechnology = (id, name, category_id = null, description = '') => API.put(`/technologies/${id}`, { name, category_id, description });
export const deleteTechnology = (id) => API.delete(`/technologies/${id}`);

export default API;
