// @ts-check

import { Filter } from './utils.js';

/**
 * @typedef {import('./TodoItem').TodoId} TodoId
 * @typedef {import('./TodoItem').Todo} Todo
 */

/**
 * @typedef {object} TodosState
 * @property {Filter} nowShowing
 * @property {TodoId} editing
 * @property {string} newTodo
 * @property {Todo[]} todos
 * @property {Todo[]} shownTodos
 * @property {number} activeTodoCount
 * @property {number} completedCount
 *
 * @typedef {object} TodosLoadedAction
 * @property {'TODOS_LOADED'} type
 * @property {Todo[]} todos
 *
 * @typedef {object} LocationChangedAction
 * @property {'LOCATION_CHANGED'} type
 * @property {string} pathname
 *
 * @typedef {object} UpdateNewTodoAction
 * @property {'UPDATE_NEW_TODO'} type
 * @property {string} text
 *
 * @typedef {object} TodoAddedAction
 * @property {'TODO_ADDED'} type
 * @property {Todo[]} todos
 *
 * @typedef {object} ToggledAllAction
 * @property {'TOGGLED_ALL'} type
 * @property {Todo[]} todos
 *
 * @typedef {object} ToggledAction
 * @property {'TOGGLED'} type
 * @property {Todo[]} todos
 *
 * @typedef {object} DestroyedAction
 * @property {'DESTROYED'} type
 * @property {Todo[]} todos
 *
 * @typedef {object} EditAction
 * @property {'EDIT'} type
 * @property {TodoId} todoId
 *
 * @typedef {object} SavedAction
 * @property {'SAVED'} type
 * @property {Todo[]} todos
 *
 * @typedef {object} CancelAction
 * @property {'CANCEL'} type
 *
 * @typedef {object} ClearedCompletedAction
 * @property {'CLEARED_COMPLETED'} type
 * @property {Todo[]} todos
 *
 * @typedef {TodosLoadedAction
 *   | LocationChangedAction
 *   | UpdateNewTodoAction
 *   | TodoAddedAction
 *   | ToggledAllAction
 *   | ToggledAction
 *   | DestroyedAction
 *   | EditAction
 *   | SavedAction
 *   | CancelAction
 *   | ClearedCompletedAction} TodosAction
 */

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
