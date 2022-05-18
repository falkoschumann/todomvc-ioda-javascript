// @ts-check

import { SaveCommand } from 'todos-contract';

/**
 * @param {(command: SaveCommand) => Promise<import('todos-contract').CommandStatus>} save
 */
export function createSaveController(save) {
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
    if (req.body.newTitle == null) {
      res.status(422).send('Missing property "newTitle" in request body.');
      return;
    }

    const status = await save(new SaveCommand(req.body.todoId, req.body.newTitle));
    res.send(status);
  };
}
