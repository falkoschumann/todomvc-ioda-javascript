// @ts-check

import { SelectTodosQueryResult } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 */
export function createSelectTodosHandler(todosRepository) {
  /**
   * @param {import('todos-contract').SelectTodosQuery} query
   */
  return async (/* eslint-disable no-unused-vars */ query) => {
    let todos = await todosRepository.loadTodos();
    return new SelectTodosQueryResult(todos);
  };
}
