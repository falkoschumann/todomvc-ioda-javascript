// @ts-check

import { save } from 'todos-backend';

export function postSave(todosRepository) {
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
    if (req.body.newTitle == null) {
      res.status(400).send('Missing property "newTitle" in request body.');
      return;
    }

    const status = await save(todosRepository, req.body);
    res.send(status);
  };
}
