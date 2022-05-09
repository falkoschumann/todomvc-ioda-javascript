// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 * @param {import('todos-contract').ToggleAllCommand} command
 * @returns {Promise<CommandStatus>}
 */
export async function handleToggleAllCommand(todosRepository, { checked }) {
  let todos = await todosRepository.loadTodos();
  todos = toggleAll(todos, checked);
  await todosRepository.storeTodos(todos);
  return CommandStatus.success();
}

/**
 * @param {import('todos-contract').Todo[]} todos
 * @param {boolean} checked
 */
function toggleAll(todos, checked) {
  return todos.map((todo) => ({ ...todo, completed: checked }));
}
