// @ts-check

import { TodosRepository } from './TodosRepository.js';

export class LocalStorageTodosRepository extends TodosRepository {
  /**
   *
   * @returns {Promise<import('todos-contract').Todo[]>}
   */
  async loadTodos() {
    const json = localStorage.getItem('todos');
    return json ? JSON.parse(json) : [];
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  async storeTodos(todos) {
    const json = JSON.stringify(todos);
    localStorage.setItem('todos', json);
  }
}
