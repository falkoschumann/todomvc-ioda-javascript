// @ts-check

import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';
import { handleSaveCommand } from '../messagehandlers/handleSaveCommand';

describe('Save', () => {
  it('changes the todos title', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);

    const status = await handleSaveCommand(todosRepository, {
      todoId: 1,
      newTitle: 'Taste TypeScript',
    });

    expect(status).toEqual({ success: true });
    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste TypeScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});
