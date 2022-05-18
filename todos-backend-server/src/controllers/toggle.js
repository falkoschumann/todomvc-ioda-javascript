// @ts-check

import { ToggleCommand } from 'todos-contract';

/**
 * @param {(command: ToggleCommand) => Promise<import('todos-contract').CommandStatus>} toggle
 */
export function createToggleController(toggle) {
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

    const status = await toggle(new ToggleCommand(req.body.todoId));
    res.send(status);
  };
}
