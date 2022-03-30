# Laboration 1 Backend

A server rendered Todo application. The application fetches the whole page everytime a change is made e.g when adding a todo, toggling complete and deleting a todo.
Todos are save in a development db (Lowdb) via a REST-API with endpoints:
-Get all: /api/todos
-Get one: /api/todos/:id
-Post one: /api/todos
-Patch one: /api/todos/:id
-Delete one: /api/todos/:id

Technologies used

- Express.js
- Lowdb
- EJS
- Bootstrap
