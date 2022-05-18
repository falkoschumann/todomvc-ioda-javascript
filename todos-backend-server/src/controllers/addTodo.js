// @ts-check

import { AddTodoCommand } from 'todos-contract';

/**
 * @param {(command: AddTodoCommand) => Promise<import('todos-contract').CommandStatus>} addTodo
 */
export function createAddTodoController(addTodo) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(415).send('Content type must be application/json.');
      return;
    }
    if (req.body.title == null) {
      res.status(422).send('Missing property "title" in request body.');
      return;
    }

    const status = await addTodo(new AddTodoCommand(req.body.title));
    res.send(status);
  };
}
