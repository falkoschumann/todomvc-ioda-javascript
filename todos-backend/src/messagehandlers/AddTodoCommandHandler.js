// @ts-check

import { CommandStatus } from 'todos-contract';

export class AddTodoCommandHandler {
  #todosRepository;

  /**
   * @param {import('../adapters').TodosRepository} todosRepository
   */
  constructor(todosRepository) {
    this.#todosRepository = todosRepository;
  }

  /**
   * @param {import('todos-contract').AddTodoCommand} command
   * @returns {Promise<CommandStatus>}
   */
  async handle({ title }) {
    let todos = await this.#todosRepository.loadTodos();
    todos = this.#addTodo(todos, title);
    await this.#todosRepository.storeTodos(todos);
    return CommandStatus.success();
  }

  /**
   * @param {import('todos-contract').Todo[]} todos
   * @param {string} title
   */
  #addTodo(todos, title) {
    if (!title) {
      return todos;
    }

    let id = todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 0);
    id++;
    const newTodo = { id, title, completed: false };
    return [...todos, newTodo];
  }
}
