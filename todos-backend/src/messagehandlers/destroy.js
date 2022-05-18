// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 */
export function createDestroyHandler(todosRepository) {
  /**
   * @param {import('todos-contract').DestroyCommand} command
   */
  return async ({ todoId }) => {
    let todos = await todosRepository.loadTodos();
    todos = doDestroy(todos, todoId);
    await todosRepository.storeTodos(todos);
    return CommandStatus.success();
  };
}

/**
 * @param {import('todos-contract').Todo[]} todos
 * @param {import('todos-contract').TodoId} todoId
 */
function doDestroy(todos, todoId) {
  return todos.filter((todo) => todo.id !== todoId);
}
