// @ts-check

import { ClearCompletedCommand } from 'todos-contract';

/**
 * @param {(command: ClearCompletedCommand) => Promise<import('todos-contract').CommandStatus>} clearCompleted
 */
export function createClearCompletedController(clearCompleted) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(415).send('Content type must be application/json.');
      return;
    }

    const status = await clearCompleted(new ClearCompletedCommand());
    res.send(status);
  };
}
