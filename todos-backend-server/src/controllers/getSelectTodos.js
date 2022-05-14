// @ts-check

import { selectTodos } from 'todos-backend';

export function getSelectTodos(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    const result = await selectTodos(todosRepository, req.query);
    res.send(result);
  };
}
