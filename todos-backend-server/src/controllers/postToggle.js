// @ts-check

import { toggle } from 'todos-backend';

export function postToggle(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    if (req.body.todoId == null) {
      res.status(400).send('Missing property "todoId" in request body.');
      return;
    }
    if (typeof req.body.todoId !== 'number') {
      res.status(400).send('Property "todoId" in request body must be number value.');
      return;
    }

    const status = await toggle(todosRepository, req.body);
    res.send(status);
  };
}
