// @ts-check

import { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { usePrevious } from './utils';

/**
 * @typedef {import('react').ChangeEvent<HTMLInputElement>} InputChangeEvent
 * @typedef {import('react').KeyboardEvent} KeyboardEvent
 * @typedef {import('react').ReactElement} ReactElement
 */

/**
 * @typedef {number} TodoId
 *
 * @typedef {Object} Todo
 * @property {TodoId} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @param {object} props
 * @param {boolean} props.editing
 * @param {Todo} props.todo
 * @param {() => void} props.onCancel
 * @param {() => void} props.onDestroy
 * @param {() => void} props.onEdit
 * @param {(newTitle: string) => void} props.onSave
 * @param {() => void} props.onToggle
 * @returns {ReactElement}
 */
function TodoItem({ editing, todo, onCancel, onDestroy, onEdit, onSave, onToggle }) {
  const [editText, setEditText] = useState(todo.title);

  function handleSubmit() {
    const value = editText.trim();
    if (value) {
      onSave(value);
      setEditText(value);
    } else {
      onDestroy();
    }
  }

  function handleEdit() {
    onEdit();
    setEditText(todo.title);
  }

  /**
   * @param {KeyboardEvent} event
   */
  function handleKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        handleSubmit();
        break;
      case 'Escape':
        setEditText(todo.title);
        onCancel();
        break;
      default:
        break;
    }
  }

  /**
   * @param {InputChangeEvent} event
   */
  function handleChange(event) {
    if (!editing) return;

    setEditText(event.target.value);
  }

  const editFieldRef = useRef(null);
  const prevEditing = usePrevious(editing);

  useEffect(() => {
    if (prevEditing || !editing) return;

    const editField = editFieldRef.current;
    editField.focus();
    editField.setSelectionRange(0, editField.value.length);
  }, [editing, prevEditing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input className="toggle" type="checkbox" checked={todo.completed} onChange={onToggle} />
        <label onDoubleClick={handleEdit}>{todo.title}</label>
        <button className="destroy" onClick={onDestroy}></button>
      </div>
      {editing ? (
        <input
          ref={editFieldRef}
          className="edit"
          value={editText}
          onBlur={handleSubmit}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : null}
    </li>
  );
}

export default memo(TodoItem);
