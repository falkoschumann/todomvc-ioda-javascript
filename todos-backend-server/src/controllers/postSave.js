// @ts-check

import { save } from 'todos-backend';

export function postSave(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    const status = await save(todosRepository, req.body);
    res.send(status);
  };
}
