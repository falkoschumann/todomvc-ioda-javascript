// @ts-check

import { CommandStatus } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 * @param {import('todos-contract').SaveCommand} command
 * @returns {Promise<CommandStatus>}
 */
export async function handleSaveCommand(todosRepository, { todoId, newTitle }) {
  let todos = await todosRepository.loadTodos();
  todos = save(todos, todoId, newTitle);
  await todosRepository.storeTodos(todos);
  return CommandStatus.success();
}

/**
 * @param {import('todos-contract').Todo[]} todos
 * @param {import('todos-contract').TodoId} todoId
 * @param {string} newTitle
 */
function save(todos, todoId, newTitle) {
  return todos.map((todo) => (todo.id === todoId ? { ...todo, title: newTitle } : todo));
}
