// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 * @param {import('todos-contract').ClearCompletedCommand} command
 * @returns {Promise<CommandStatus>}
 */
export async function handleClearCompletedCommand(
  todosRepository,
  /* eslint-disable no-unused-vars */ command
) {
  let todos = await todosRepository.loadTodos();
  todos = clearCompleted(todos);
  await todosRepository.storeTodos(todos);
  return CommandStatus.success();
}

/**
 * @param {import('todos-contract').Todo[]} todos
 */
function clearCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}
