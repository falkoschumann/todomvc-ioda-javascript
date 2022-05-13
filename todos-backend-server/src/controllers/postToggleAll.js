// @ts-check

import { toggleAll } from 'todos-backend';

export function postToggleAll(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    const status = await toggleAll(todosRepository, req.body);
    res.send(status);
  };
}
