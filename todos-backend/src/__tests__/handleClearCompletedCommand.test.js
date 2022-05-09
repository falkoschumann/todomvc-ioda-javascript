// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { handleClearCompletedCommand } from '../messagehandlers/handleClearCompletedCommand';

describe('Clear completed', () => {
  it('removes completed todos', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const status = await handleClearCompletedCommand(todosRepository, {});

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});
