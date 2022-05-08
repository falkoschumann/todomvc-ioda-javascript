// @ts-check

/**
 * @interface
 */
export class TodosRepository {
  /**
   * @returns {Promise<import('todos-contract').Todo[]>}
   */
  loadTodos() {
    throw new Error('not implemented');
  }

  /**
   *
   * @param {import('todos-contract').Todo[]} todos
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line no-unused-vars
  storeTodos(todos) {
    throw new Error('not implemented');
  }
}
