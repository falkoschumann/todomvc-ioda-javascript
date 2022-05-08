// @ts-check

import { ClearCompletedCommandHandler } from '../messagehandlers/ClearCompletedCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

describe('Clear completed', () => {
  it('removes completed todos', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    const handler = new ClearCompletedCommandHandler(todosRepository);

    const status = await handler.handle({});

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});
