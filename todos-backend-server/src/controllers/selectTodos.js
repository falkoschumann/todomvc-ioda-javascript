// @ts-check

import { SelectTodosQuery } from 'todos-contract';

/**
 * @param {(query: SelectTodosQuery) => Promise<import('todos-contract').SelectTodosQueryResult>} selectTodos
 */
export function createSelectTodosController(selectTodos) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    const result = await selectTodos(new SelectTodosQuery());
    res.send(result);
  };
}
