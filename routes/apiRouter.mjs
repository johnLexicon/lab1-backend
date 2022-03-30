import { Router } from 'express';
import {
  createTodo,
  readAllTodos,
  readTodo,
  deleteTodo,
  patchTodo
} from '../repositories/lowdbService.mjs';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  try {
    const todos = readAllTodos();
    res.status(200).json(todos);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

apiRouter.get('/:id', (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = readTodo(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

apiRouter.post('/', async (req, res) => {
  try {
    const addedTodo = await createTodo(req.body);
    res.status(201).json(addedTodo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

apiRouter.patch('/:id', async (req, res) => {
  try {
    const updatedTodo = await patchTodo(req.params.id, req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).json(updatedTodo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

apiRouter.delete('/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    await deleteTodo(todoId);
    res.status(204).json({ message: `Deleted todo: ${todoId}` });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

export default apiRouter;
