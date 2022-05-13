// @ts-check

import { addTodo } from 'todos-backend';

export function postAddTodo(todosRepository) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  return async (req, res) => {
    const status = await addTodo(todosRepository, req.body);
    res.send(status);
  };
}
