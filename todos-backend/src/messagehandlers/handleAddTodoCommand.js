// @ts-check

import { CommandStatus, Todo } from 'todos-contract';

/**
 * @param {import('../adapters').TodosRepository} todosRepository
 * @param {import('todos-contract').AddTodoCommand} command
 * @returns {Promise<CommandStatus>}
 */
export async function handleAddTodoCommand(todosRepository, { title }) {
  let todos = await todosRepository.loadTodos();
  todos = addTodo(todos, title);
  await todosRepository.storeTodos(todos);
  return CommandStatus.success();
}

/**
 * @param {Todo[]} todos
 * @param {string} title
 */
function addTodo(todos, title) {
  if (!title) {
    return todos;
  }

  let id = todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 0);
  id++;
  const newTodo = new Todo(id, title, false);
  return [...todos, newTodo];
}
