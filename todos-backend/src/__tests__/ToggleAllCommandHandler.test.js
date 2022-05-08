// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { ToggleAllCommandHandler } from '../messagehandlers/ToggleAllCommandHandler';

describe('Toggle all', () => {
  let todosRepository, handler;
  beforeEach(() => {
    todosRepository = new MemoryTodosRepository();
    handler = new ToggleAllCommandHandler(todosRepository);
  });

  it('set all todos completed', async () => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const status = await handler.handle({ checked: true });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('set all todos active', async () => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const status = await handler.handle({ checked: false });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});
