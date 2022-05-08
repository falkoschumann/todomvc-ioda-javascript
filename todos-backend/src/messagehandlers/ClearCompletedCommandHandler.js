// @ts-check

import { CommandStatus } from 'todos-contract';

export class ClearCompletedCommandHandler {
  #todosRepository;

  /**
   * @param {import('../adapters').TodosRepository} todosRepository
   */
  constructor(todosRepository) {
    this.#todosRepository = todosRepository;
  }

  /**
   * @param {import('todos-contract').ClearCompletedCommand} command
   * @returns {Promise<CommandStatus>}
   */
  // eslint-disable-next-line no-unused-vars
  async handle(command) {
    let todos = await this.#todosRepository.loadTodos();
    todos = this.#clearCompleted(todos);
    await this.#todosRepository.storeTodos(todos);
    return CommandStatus.success();
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  #clearCompleted(todos) {
    return todos.filter((todo) => !todo.completed);
  }
}
