import express from 'express';
import cors from 'cors';
import {
  createTodo,
  readAllTodos,
  readTodo,
  updateTodo,
  deleteTodo
} from './repositories/lowdbService.mjs';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/todos', (req, res) => {
  try {
    const todos = readAllTodos();
    res.status(200).json(todos);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

app.get('/todos/:id', (req, res) => {
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

app.post('/todos', async (req, res) => {
  try {
    const addedTodo = await createTodo(req.body);
    res.status(201).json(addedTodo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

app.put('/todos', async (req, res) => {
  try {
    const updatedTodo = await updateTodo(req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).json(updatedTodo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    await deleteTodo(todoId);
    res.status(201).json({ message: `Deleted todo with id: ${todoId}` });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMessage: err.message });
  }
});

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
