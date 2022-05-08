// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { ToggleCommandHandler } from '../messagehandlers/ToggleCommandHandler';

describe('Toggle', () => {
  let todosRepository, handler;
  beforeEach(() => {
    todosRepository = new MemoryTodosRepository();
    handler = new ToggleCommandHandler(todosRepository);
  });

  it('marks the todo as completed', async () => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const status = await handler.handle({ todoId: 2 });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('marks the todo as active', async () => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const status = await handler.handle({ todoId: 1 });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});
