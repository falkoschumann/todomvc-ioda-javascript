// @ts-check

import { DestroyCommand } from 'todos-contract';

/**
 * @param {(command: DestroyCommand) => Promise<import('todos-contract').CommandStatus>} destroy
 */
export function createDestroyController(destroy) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(415).send('Content type must be application/json.');
      return;
    }
    if (req.body.todoId == null) {
      res.status(422).send('Missing property "todoId" in request body.');
      return;
    }
    if (typeof req.body.todoId !== 'number') {
      res.status(422).send('Property "todoId" in request body must be number value.');
      return;
    }

    const status = await destroy(new DestroyCommand(req.body.todoId));
    res.send(status);
  };
}
