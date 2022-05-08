// @ts-check

import { AddTodoCommandHandler } from '../messagehandlers/AddTodoCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

describe('Add todo', () => {
  let todosRepository, handler;
  beforeEach(() => {
    todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
    ]);
    handler = new AddTodoCommandHandler(todosRepository);
  });

  it('saves new todo', async () => {
    const status = await handler.handle({ title: 'Buy a Unicorn' });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('does nothing if title is empty', async () => {
    const status = await handler.handle({ title: '' });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });
});
