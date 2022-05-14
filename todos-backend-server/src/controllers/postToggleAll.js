// @ts-check

import { toggleAll } from 'todos-backend';

export function postToggleAll(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    if (req.body.checked == null) {
      res.status(400).send('Missing property "checked" in request body.');
      return;
    }
    if (typeof req.body.checked !== 'boolean') {
      res.status(400).send('Property "checked" in request body must be boolean value.');
      return;
    }

    const status = await toggleAll(todosRepository, req.body);
    res.send(status);
  };
}
