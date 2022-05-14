// @ts-check

import { addTodo } from 'todos-backend';

export function postAddTodo(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    if (req.body.title == null) {
      res.status(400).send('Missing property "title" in request body.');
      return;
    }

    const status = await addTodo(todosRepository, req.body);
    res.send(status);
  };
}
