// @ts-check

import { TodosRepository } from './TodosRepository.js';

export class MemoryTodosRepository extends TodosRepository {
  #todos;

  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  constructor(todos = []) {
    super();
    this.#todos = todos;
  }

  loadTodos() {
    return Promise.resolve(this.#todos);
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  storeTodos(todos) {
    this.#todos = todos;
    return Promise.resolve();
  }
}
