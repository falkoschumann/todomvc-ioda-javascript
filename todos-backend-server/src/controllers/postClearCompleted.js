// @ts-check

import { clearCompleted } from 'todos-backend';

export function postClearCompleted(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    const status = await clearCompleted(todosRepository, req.body);
    res.send(status);
  };
}
