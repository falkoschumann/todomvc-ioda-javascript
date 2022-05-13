// @ts-check

import fs from 'fs';
import path from 'path';

import { TodosRepository } from 'todos-backend';

export class FileTodosRepository extends TodosRepository {
  #file;

  constructor(file = './data/todos.json') {
    super();
    this.#file = file;
  }

  /**
   * @returns {Promise<import('todos-contract').Todo[]>}
   */
  async loadTodos() {
    if (!fs.existsSync(this.#file)) {
      return [];
    }

    const json = fs.readFileSync(this.#file, 'utf8');
    return JSON.parse(json);
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  async storeTodos(todos) {
    const dir = path.dirname(this.#file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const json = JSON.stringify(todos);
    fs.writeFileSync(this.#file, json, 'utf8');
  }
}
