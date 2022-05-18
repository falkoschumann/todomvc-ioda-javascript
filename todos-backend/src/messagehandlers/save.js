// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 */
export function createSaveHandler(todosRepository) {
  /**
   * @param {import('todos-contract').SaveCommand} command
   */
  return async ({ todoId, newTitle }) => {
    let todos = await todosRepository.loadTodos();
    todos = doSave(todos, todoId, newTitle);
    await todosRepository.storeTodos(todos);
    return CommandStatus.success();
  };
}

/**
 * @param {import('todos-contract').Todo[]} todos
 * @param {import('todos-contract').TodoId} todoId
 * @param {string} newTitle
 */
function doSave(todos, todoId, newTitle) {
  return todos.map((todo) => (todo.id === todoId ? { ...todo, title: newTitle } : todo));
}
