// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 */
export function createClearCompletedHandler(todosRepository) {
  /**
   * @param {import('todos-contract').ClearCompletedCommand} command
   */
  return async (/* eslint-disable no-unused-vars */ command) => {
    let todos = await todosRepository.loadTodos();
    todos = doClearCompleted(todos);
    await todosRepository.storeTodos(todos);
    return CommandStatus.success();
  };
}

/**
 * @param {import('todos-contract').Todo[]} todos
 */
function doClearCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}
