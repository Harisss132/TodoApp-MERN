import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4004/api/todo',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getTodos = () => API.get('/');
export const createTodo = (task) => API.post('/', { task });
export const updateTodoStatus = (id, status) => API.put(`/${id}`, { status });
export const deleteTodo = (id) => API.delete(`/${id}`);