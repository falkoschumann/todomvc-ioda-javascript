// @ts-check

import { CommandStatus } from 'todos-contract';

export class DestroyCommandHandler {
  #todosRepository;

  /**
   * @param {import('../adapters').TodosRepository} todosRepository
   */
  constructor(todosRepository) {
    this.#todosRepository = todosRepository;
  }

  /**
   * @param {import('todos-contract').DestroyCommand} command
   * @returns {Promise<CommandStatus>}
   */
  async handle({ todoId }) {
    let todos = await this.#todosRepository.loadTodos();
    todos = this.#destroy(todos, todoId);
    await this.#todosRepository.storeTodos(todos);
    return CommandStatus.success();
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   * @param {import('todos-contract').TodoId} todoId
   */
  #destroy(todos, todoId) {
    return todos.filter((todo) => todo.id !== todoId);
  }
}
