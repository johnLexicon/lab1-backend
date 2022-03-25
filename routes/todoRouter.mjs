import { Router } from 'express';
import { readAllTodos, createTodo } from '../repositories/lowdbService.mjs';

const todoRouter = Router();

todoRouter.get('/todos', (req, res) => {
  try {
    const todos = readAllTodos();
    console.log(todos);
    res.render('index', { todos });
  } catch (err) {
    console.log(err.message);
  }
});

todoRouter.post('/todos/new', async (req, res) => {
  try {
    console.log(req.body.title);
    await createTodo({ title: req.body.title });
    res.redirect('/todos');
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errMessage: err.message });
  }
});

export default todoRouter;
