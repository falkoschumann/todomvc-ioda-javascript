// @ts-check

import { destroy } from 'todos-backend';

export function postDestroy(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    const status = await destroy(todosRepository, req.body);
    res.send(status);
  };
}
