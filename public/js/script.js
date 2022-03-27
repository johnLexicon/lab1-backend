const todosSectionElem = document.getElementById('todos');

const removeTodo = async (todoId) => {
  try {
    await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE'
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

const toggleTodo = async (todoId, completed) => {
  try {
    await fetch(`/api/todos/${todoId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ completed: !completed })
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

todosSectionElem.addEventListener('click', (e) => {
  const action =
    e.target.dataset['action'] || e.target.parentElement.dataset['action'];

  if (!action) return;

  const todoId = e.target.closest('.todo-wrapper').id;
  if (action === 'delete') {
    removeTodo(todoId);
  } else if (action === 'complete') {
    toggleTodo(todoId, JSON.parse(e.target.dataset['status']));
  }
});
