// @ts-check

import { toggle } from 'todos-backend';

export function postToggle(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    const status = await toggle(todosRepository, req.body);
    res.send(status);
  };
}
