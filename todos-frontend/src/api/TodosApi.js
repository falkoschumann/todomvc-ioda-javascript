// @ts-check

import ApiUtils from './ApiUtils';

const baseUrl = 'http://localhost:3001/api/todos';

/**
 * @param {import('todos-contract').SelectTodosQuery} query
 * @returns {Promise<import('todos-contract').SelectTodosQueryResult>}
 */
async function selectTodos(/* eslint-disable no-unused-vars */ query) {
  return ApiUtils.getJson(`${baseUrl}/select-todos`);
}

/**
 * @param {import('todos-contract').AddTodoCommand} command
 * @returns {Promise<import('todos-contract').CommandStatus>}
 */
async function addTodo(command) {
  return ApiUtils.postJson(`${baseUrl}/add-todo`, command);
}

/**
 * @param {import('todos-contract').ClearCompletedCommand} command
 * @returns {Promise<import('todos-contract').CommandStatus>}
 */
async function clearCompleted(command) {
  return ApiUtils.postJson(`${baseUrl}/clear-completed`, command);
}

/**
 * @param {import('todos-contract').DestroyCommand} command
 * @returns {Promise<import('todos-contract').CommandStatus>}
 */
async function destroy(command) {
  return ApiUtils.postJson(`${baseUrl}/destroy`, command);
}

/**
 * @param {import('todos-contract').SaveCommand} command
 * @returns {Promise<import('todos-contract').CommandStatus>}
 */
async function save(command) {
  return ApiUtils.postJson(`${baseUrl}/save`, command);
}

/**
 * @param {import('todos-contract').ToggleCommand} command
 * @returns {Promise<import('todos-contract').CommandStatus>}
 */
async function toggle(command) {
  return ApiUtils.postJson(`${baseUrl}/toggle`, command);
}

/**
 * @param {import('todos-contract').ToggleAllCommand} command
 * @returns {Promise<import('todos-contract').CommandStatus>}
 */
async function toggleAll(command) {
  return ApiUtils.postJson(`${baseUrl}/toggle-all`, command);
}

const TodosApi = {
  selectTodos,
  addTodo,
  clearCompleted,
  destroy,
  save,
  toggle,
  toggleAll,
};

export default TodosApi;
