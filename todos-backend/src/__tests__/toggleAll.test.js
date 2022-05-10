// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { toggleAll } from '../messagehandlers/toggleAll';

describe('Toggle all', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new MemoryTodosRepository();
  });

  it('set all todos completed', async () => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const status = await toggleAll(todosRepository, { checked: true });

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

    const status = await toggleAll(todosRepository, { checked: false });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});
