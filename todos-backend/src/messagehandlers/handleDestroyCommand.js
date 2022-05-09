// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 * @param {import('todos-contract').DestroyCommand} command
 * @returns {Promise<CommandStatus>}
 */
export async function handleDestroyCommand(todosRepository, { todoId }) {
  let todos = await todosRepository.loadTodos();
  todos = destroy(todos, todoId);
  await todosRepository.storeTodos(todos);
  return CommandStatus.success();
}

/**
 * @param {import('todos-contract').Todo[]} todos
 * @param {import('todos-contract').TodoId} todoId
 */
function destroy(todos, todoId) {
  return todos.filter((todo) => todo.id !== todoId);
}
