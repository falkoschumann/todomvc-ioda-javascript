// @ts-check

import { CommandStatus } from 'todos-contract';

export class ToggleCommandHandler {
  #todosRepository;

  /**
   * @param {import('../adapters').TodosRepository} todosRepository
   */
  constructor(todosRepository) {
    this.#todosRepository = todosRepository;
  }

  /**
   * @param {import('todos-contract').ToggleCommand} command
   * @returns {Promise<CommandStatus>}
   */
  async handle({ todoId }) {
    let todos = await this.#todosRepository.loadTodos();
    todos = this.#toggle(todos, todoId);
    await this.#todosRepository.storeTodos(todos);
    return CommandStatus.success();
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   * @param {import('todos-contract').TodoId} todoId
   */
  #toggle(todos, todoId) {
    return todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
  }
}
