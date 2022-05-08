// @ts-check

import { Filter } from './utils.js';

export class TodosState {
  /**
   * @param {Filter} nowShowing
   * @param {import('todos-contract').TodoId} editing
   * @param {string} newTodo
   * @param {import('todos-contract').Todo[]} todos
   * @param {import('todos-contract').Todo[]} shownTodos
   * @param {number} activeTodoCount
   * @param {number} completedCount
   */
  constructor(nowShowing, editing, newTodo, todos, shownTodos, activeTodoCount, completedCount) {
    this.nowShowing = nowShowing;
    this.editing = editing;
    this.newTodo = newTodo;
    this.todos = todos;
    this.shownTodos = shownTodos;
    this.activeTodoCount = activeTodoCount;
    this.completedCount = completedCount;
  }
}

/** @type {TodosState} */
export const initialState = {
  nowShowing: Filter.ALL_TODOS,
  editing: null,
  newTodo: '',
  todos: [],
  shownTodos: [],
  activeTodoCount: 0,
  completedCount: 0,
};

export class TodosLoadedAction {
  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  constructor(todos) {
    this.type = 'TODOS_LOADED';
    this.todos = todos;
  }
}

export class LocationChangedAction {
  /**
   * @param {string} pathname
   */
  constructor(pathname) {
    this.type = 'LOCATION_CHANGED';
    this.pathname = pathname;
  }
}

export class UpdateNewTodoAction {
  /**
   * @param {string} text
   */
  constructor(text) {
    this.type = 'UPDATE_NEW_TODO';
    this.text = text;
  }
}
export class TodoAddedAction {
  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  constructor(todos) {
    this.type = 'TODO_ADDED';
    this.todos = todos;
  }
}

export class ToggledAllAction {
  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  constructor(todos) {
    this.type = 'TOGGLED_ALL';
    this.todos = todos;
  }
}

export class ToggledAction {
  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  constructor(todos) {
    this.type = 'TOGGLED';
    this.todos = todos;
  }
}

export class DestroyedAction {
  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  constructor(todos) {
    this.type = 'DESTROYED';
    this.todos = todos;
  }
}

export class EditAction {
  /**
   * @param {import('todos-contract').TodoId} todoId
   */
  constructor(todoId) {
    this.type = 'EDIT';
    this.todoId = todoId;
  }
}

export class SavedAction {
  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  constructor(todos) {
    this.type = 'SAVED';
    this.todos = todos;
  }
}

export class CancelAction {
  constructor() {
    this.type = 'CANCEL';
  }
}
export class ClearedCompletedAction {
  /**
   * @param {import('todos-contract').Todo[]} todos
   */
  constructor(todos) {
    this.type = 'CLEARED_COMPLETED';
    this.todos = todos;
  }
}

/**
 * @typedef {
 *     | TodosLoadedAction
 *     | LocationChangedAction
 *     | UpdateNewTodoAction
 *     | TodoAddedAction
 *     | ToggledAllAction
 *     | ToggledAction
 *     | DestroyedAction
 *     | EditAction
 *     | SavedAction
 *     | CancelAction
 *     | ClearedCompletedAction
 * } TodosAction
 */

/**
 * @param {TodosState} state
 * @param {TodosAction} action
 * @returns {TodosState}
 */
export function reducer(state, action) {
  switch (action.type) {
    case 'LOCATION_CHANGED': {
      const nowShowing = getShowingForPathname(action.pathname);
      return { ...state, nowShowing, ...getShownTodos(state.todos, nowShowing) };
    }
    case 'UPDATE_NEW_TODO':
      return { ...state, newTodo: action.text };
    case 'TODO_ADDED':
      return {
        ...state,
        todos: action.todos,
        newTodo: '',
        ...getShownTodos(action.todos, state.nowShowing),
      };
    case 'TODOS_LOADED':
    case 'TOGGLED_ALL':
    case 'TOGGLED':
    case 'DESTROYED':
    case 'CLEARED_COMPLETED':
      return { ...state, todos: action.todos, ...getShownTodos(action.todos, state.nowShowing) };
    case 'EDIT':
      return { ...state, editing: action.todoId };
    case 'SAVED':
      return {
        ...state,
        todos: action.todos,
        editing: null,
        ...getShownTodos(action.todos, state.nowShowing),
      };
    case 'CANCEL':
      return { ...state, editing: null };
    default:
      throw new Error('Unreachable code');
  }
}

/**
 * @param {string} pathname
 */
function getShowingForPathname(pathname) {
  switch (pathname) {
    case '/active':
      return Filter.ACTIVE_TODOS;
    case '/completed':
      return Filter.COMPLETED_TODOS;
    default:
      return Filter.ALL_TODOS;
  }
}

/**
 * @param {import('todos-contract').Todo[]} todos
 * @param {Filter} nowShowing
 */
function getShownTodos(todos, nowShowing) {
  const shownTodos = todos.filter((todo) => {
    switch (nowShowing) {
      case Filter.ACTIVE_TODOS:
        return !todo.completed;
      case Filter.COMPLETED_TODOS:
        return todo.completed;
      case Filter.ALL_TODOS:
      default:
        return true;
    }
  });
  const activeTodoCount = todos.reduce((count, todo) => {
    return todo.completed ? count : count + 1;
  }, 0);
  const completedCount = todos.length - activeTodoCount;
  return { shownTodos, activeTodoCount, completedCount };
}
