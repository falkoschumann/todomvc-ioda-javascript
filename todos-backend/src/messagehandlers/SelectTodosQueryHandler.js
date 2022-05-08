// @ts-check

export class SelectTodosQueryHandler {
  #todosRepository;

  /**
   * @param {import('../adapters').TodosRepository} todosRepository
   */
  constructor(todosRepository) {
    this.#todosRepository = todosRepository;
  }

  /**
   * @param {import('todos-contract').SelectTodosQuery} query
   * @returns {Promise<import('todos-contract').SelectTodosQueryResult>}
   */
  // eslint-disable-next-line no-unused-vars
  async handle(query) {
    let todos = await this.#todosRepository.loadTodos();
    return { todos };
  }
}
