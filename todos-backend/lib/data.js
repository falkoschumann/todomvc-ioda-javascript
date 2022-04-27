// @ts-check

/**
 * @typedef {import('./domain.js').Todo} Todo
 */

/**
 * @type {Todo[]}
 */
let storedTodos = [];

export function loadTodos() {
  return storedTodos;
}

/**
 * @param {Todo[]} todos
 */
export function storeTodos(todos) {
  storedTodos = todos;
}
