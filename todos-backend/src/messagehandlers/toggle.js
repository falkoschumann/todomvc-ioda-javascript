// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 */
export function createToggleHandler(todosRepository) {
  /**
   * @param {import('todos-contract').ToggleCommand} command
   */
  return async ({ todoId }) => {
    let todos = await todosRepository.loadTodos();
    todos = doToggle(todos, todoId);
    await todosRepository.storeTodos(todos);
    return CommandStatus.success();
  };
}

/**
 * @param {import('todos-contract').Todo[]} todos
 * @param {import('todos-contract').TodoId} todoId
 */
function doToggle(todos, todoId) {
  return todos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo));
}
