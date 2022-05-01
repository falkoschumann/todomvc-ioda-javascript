// @ts-check

import * as domain from './domain.js';
import { loadTodos, storeTodos } from './data.js';

/**
 * @typedef {import('./domain.js').TodoId} TodoId
 * @typedef {import('./domain.js').Todo} Todo
 */

/**
 * @param {string} title
 */
export function addTodo(title) {
  let todos = loadTodos();
  todos = domain.addTodo(todos, title);
  storeTodos(todos);
}

/**
 * @param {boolean} checked
 */
export function toggleAll(checked) {
  let todos = loadTodos();
  todos = domain.toggleAll(todos, checked);
  storeTodos(todos);
}

/**
 * @param {TodoId} todoId
 */
export function toggle(todoId) {
  let todos = loadTodos();
  todos = domain.toggle(todos, todoId);
  storeTodos(todos);
}

/**
 * @param {TodoId} todoId
 */
export function destroy(todoId) {
  let todos = loadTodos();
  todos = todos.filter((todo) => todo.id !== todoId);
  storeTodos(todos);
}

/**
 * @param {TodoId} todoId
 * @param {string} newTitle
 */
export function save(todoId, newTitle) {
  let todos = loadTodos();
  todos = domain.save(todos, todoId, newTitle);
  storeTodos(todos);
}

export function clearCompleted() {
  let todos = loadTodos();
  todos = domain.clearCompleted(todos);
  storeTodos(todos);
}

/**
 * @returns {Todo[]}
 */
export function selectTodos() {
  let todos = loadTodos();
  return [...todos];
}
