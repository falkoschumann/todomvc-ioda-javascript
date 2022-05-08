// @ts-check

export class SelectTodosQueryResult {
  /**
   * @param {import('../data').Todo[]} todos
   */
  constructor(todos) {
    this.todos = todos;
  }
}
