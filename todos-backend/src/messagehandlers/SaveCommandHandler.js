// @ts-check

import { CommandStatus } from 'todos-contract';

export class SaveCommandHandler {
  #todosRepository;

  /**
   * @param {import('../adapters').TodosRepository} todosRepository
   */
  constructor(todosRepository) {
    this.#todosRepository = todosRepository;
  }

  /**
   * @param {import('todos-contract').SaveCommand} command
   * @returns {Promise<CommandStatus>}
   */
  async handle({ todoId, newTitle }) {
    let todos = await this.#todosRepository.loadTodos();
    todos = this.#save(todos, todoId, newTitle);
    await this.#todosRepository.storeTodos(todos);
    return CommandStatus.success();
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   * @param {import('todos-contract').TodoId} todoId
   * @param {string} newTitle
   */
  #save(todos, todoId, newTitle) {
    return todos.map((todo) => (todo.id === todoId ? { ...todo, title: newTitle } : todo));
  }
}
