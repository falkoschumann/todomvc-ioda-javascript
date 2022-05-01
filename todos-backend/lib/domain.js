// @ts-check

/**
 * @typedef {number} TodoId
 *
 * @typedef {Object} Todo
 * @property {TodoId} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @param {Todo[]} todos
 * @param {string} title
 */
export function addTodo(todos, title) {
  if (!title) return todos;

  let id = todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 0);
  id++;
  const newTodo = { id, title, completed: false };
  return [...todos, newTodo];
}

/**
 * @param {Todo[]} todos
 * @param {boolean} checked
 */
export function toggleAll(todos, checked) {
  return todos.map((todo) => ({ ...todo, completed: checked }));
}

/**
 * @param {Todo[]} todos
 * @param {TodoId} todoId
 */
export function toggle(todos, todoId) {
  return todos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo));
}

/**
 * @param {Todo[]} todos
 * @param {TodoId} todoId
 */
export function destroy(todos, todoId) {
  return todos.filter((todo) => todo.id !== todoId);
}

/**
 * @param {Todo[]} todos
 * @param {TodoId} todoId
 * @param {string} newTitle
 */
export function save(todos, todoId, newTitle) {
  return todos.map((todo) => (todo.id === todoId ? { ...todo, title: newTitle } : todo));
}

/**
 * @param {Todo[]} todos
 */
export function clearCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}
