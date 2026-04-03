import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (password) => API.post('/login', { password });
export const getCategories = () => API.get('/categories');
export const addCategory = (name) => API.post('/categories', { name });
export const editCategory = (id, name) => API.put(`/categories/${id}`, { name });
export const getQuestions = (categoryId) => API.get(`/questions/${categoryId}`);
export const addQuestion = (category_id, question, answer) => API.post('/questions', { category_id, question, answer });
export const editQuestion = (id, question, answer) => API.put(`/questions/${id}`, { question, answer });

export default API;
