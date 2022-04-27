// @ts-check

import { addTodo, clearCompleted, destroy, save, toggle, toggleAll } from './domain.js';

describe('Add todo', () => {
  it('saves new todo and return it with created id', () => {
    let todos = [{ id: 1, title: 'Taste JavaScript', completed: true }];

    todos = addTodo(todos, 'Buy a Unicorn');

    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('does nothing if title is empty', () => {
    let todos = [{ id: 1, title: 'Taste JavaScript', completed: true }];

    todos = addTodo(todos, '');

    expect(todos).toEqual([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });
});

describe('Toggle all', () => {
  it('set all todos completed', () => {
    let todos = [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ];

    todos = toggleAll(todos, true);

    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('set all todos active', () => {
    let todos = [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ];

    todos = toggleAll(todos, false);

    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Toggle', () => {
  it('marks the todo as completed', () => {
    let todos = [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ];

    todos = toggle(todos, 2);

    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('marks the todo as active', () => {
    let todos = [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ];

    todos = toggle(todos, 1);

    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Destroy', () => {
  it('removes the todo', async () => {
    let todos = [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ];

    todos = destroy(todos, 1);

    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});

describe('Save', () => {
  it('changes the todos title', async () => {
    let todos = [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ];

    todos = save(todos, 1, 'Taste TypeScript');

    expect(todos).toEqual([
      { id: 1, title: 'Taste TypeScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Clear completed', () => {
  it('removes completed todos', async () => {
    let todos = [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ];

    todos = clearCompleted(todos);

    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});
