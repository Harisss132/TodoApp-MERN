import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from "../controllers/todoController.js";
import { validateTodoStatus, validateTodoTask } from "../middleware/todoMiddleware.js";


const router = Router();

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', validateTodoTask, createTodo);
router.put('/:id', validateTodoStatus, updateTodo);
router.delete('/:id', deleteTodo);

export default router;