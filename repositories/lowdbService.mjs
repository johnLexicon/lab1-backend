import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
db.data ||= { todos: [] };

const createTodo = async (todo) => {
  const { todos } = db.data;
  const todoCopy = { ...todo, id: nanoid() };
  todos.push(todoCopy);
  await db.write();
  return todoCopy;
};

const readAllTodos = () => {
  const todos = db.data.todos;
  return todos;
};

const readTodo = (todoId) => {
  const { todos } = db.data;
  const foundTodo = todos.find((todo) => todo.id === todoId);
  return foundTodo;
};

const updateTodo = async (todo) => {
  const exists = db.data.todos.some((t) => t.id === todo.id);
  if (!exists) {
    return null;
  }

  const updatedTodos = db.data.todos.map((t) => {
    if (t.id === todo.id) return todo;
    return t;
  });
  db.data.todos = updatedTodos;
  await db.write();

  return todo;
};

const deleteTodo = async (todoId) => {
  const filteredTodos = db.data.todos.filter((todo) => todo.id !== todoId);
  db.data.todos = filteredTodos;
  await db.write();
};

export { createTodo, readAllTodos, readTodo, deleteTodo, updateTodo };
