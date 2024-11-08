// @ts-check

/**
 *
 * @param {Array<{id: string, title: string, completed: boolean}>} todos
 * @returns {string}
 */
export function buildTodosList(todos) {
  // Just to prevent reordering after an update
  const sortedTodos = todos.sort((a, b) => a.title.localeCompare(b.title));

  return sortedTodos.reduce((accumulator, todo) => {
    accumulator += /*html*/ `
      <li>
        <input
          type="checkbox"
          id="todo_${todo.id}"
          ${todo.completed ? "checked" : ""}
          hx-put="http://localhost:3000/todos/${todo.id}"
          hx-trigger="click"
          hx-target="#todo-list"
        />
        <label for="todo_${todo.id}">${todo.title}</label>
        <button
          hx-delete="http://localhost:3000/todos/${todo.id}"
          hx-trigger="click"
          hx-target="#todo-list"
        >
          &cross;
        </button>
      </li>
    `;

    return accumulator;
  }, "");
}
