// @ts-check

import { ToggleAllCommand } from 'todos-contract';

/**
 * @param {(command: ToggleAllCommand) => Promise<import('todos-contract').CommandStatus>} toggleAll
 */
export function createToggleAllController(toggleAll) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(415).send('Content type must be application/json.');
      return;
    }
    if (req.body.checked == null) {
      res.status(422).send('Missing property "checked" in request body.');
      return;
    }
    if (typeof req.body.checked !== 'boolean') {
      res.status(422).send('Property "checked" in request body must be boolean value.');
      return;
    }

    const status = await toggleAll(new ToggleAllCommand(req.body.checked));
    res.send(status);
  };
}
