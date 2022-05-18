// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 */
export function createToggleAllHandler(todosRepository) {
  /**
   * @param {import('todos-contract').ToggleAllCommand} command
   */
  return async ({ checked }) => {
    let todos = await todosRepository.loadTodos();
    todos = doToggleAll(todos, checked);
    await todosRepository.storeTodos(todos);
    return CommandStatus.success();
  };
}

/**
 * @param {import('todos-contract').Todo[]} todos
 * @param {boolean} checked
 */
function doToggleAll(todos, checked) {
  return todos.map((todo) => ({ ...todo, completed: checked }));
}
