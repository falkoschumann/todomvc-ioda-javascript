// @ts-check

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 * @param {import('todos-contract').SelectTodosQuery} query
 * @returns {Promise<import('todos-contract').SelectTodosQueryResult>}
 */
export async function handleSelectTodosQuery(
  todosRepository,
  /* eslint-disable no-unused-vars */ query
) {
  let todos = await todosRepository.loadTodos();
  return { todos };
}
