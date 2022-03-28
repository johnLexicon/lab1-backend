import { Router } from 'express';
import { readAllTodos, createTodo } from '../repositories/lowdbService.mjs';

const todoRouter = Router();

todoRouter.get('/home', (_, res) => {
  try {
    const todos = readAllTodos();
    res.render('index', { todos, page: 'home' });
  } catch (err) {
    console.log(err.message);
  }
});

todoRouter.get('/about', (_, res) => {
  try {
    res.render('about', { page: 'about' });
  } catch (err) {
    console.log(err.message);
  }
});

todoRouter.post('/todos/new', async (req, res) => {
  try {
    await createTodo({ title: req.body.title });
    res.redirect('/home');
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errMessage: err.message });
  }
});

export default todoRouter;
