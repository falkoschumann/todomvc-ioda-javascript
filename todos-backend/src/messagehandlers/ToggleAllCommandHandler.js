// @ts-check

import { CommandStatus } from 'todos-contract';

export class ToggleAllCommandHandler {
  #todosRepository;

  /**
   * @param {import('../adapters').TodosRepository} todosRepository
   */
  constructor(todosRepository) {
    this.#todosRepository = todosRepository;
  }

  /**
   * @param {import('todos-contract').ToggleAllCommand} command
   * @returns {Promise<CommandStatus>}
   */
  async handle({ checked }) {
    let todos = await this.#todosRepository.loadTodos();
    todos = this.#toggleAll(todos, checked);
    await this.#todosRepository.storeTodos(todos);
    return CommandStatus.success();
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   * @param {boolean} checked
   */
  #toggleAll(todos, checked) {
    return todos.map((todo) => ({ ...todo, completed: checked }));
  }
}
