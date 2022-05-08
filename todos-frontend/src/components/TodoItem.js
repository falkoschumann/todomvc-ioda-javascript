// @ts-check

import { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { usePrevious } from './utils';

/**
 * @param {{
 *     editing: boolean,
 *     todo: import('todos-contract').Todo,
 *     onCancel(): void,
 *     onDestroy(): void,
 *     onEdit(): void,
 *     onSave(newTitle: string): void,
 *     onToggle(): void,
 * }} props
 */
function TodoItem({ editing, todo, onCancel, onDestroy, onEdit, onSave, onToggle }) {
  const [editText, setEditText] = useState(todo.title);

  function handleEdit() {
    onEdit();
    setEditText(todo.title);
  }

  function handleSubmit() {
    const value = editText.trim();
    if (value) {
      onSave(value);
      setEditText(value);
    } else {
      onDestroy();
    }
  }

  /**
   * @param {import('react').ChangeEvent<HTMLInputElement>} event
   */
  function handleChange(event) {
    if (!editing) {
      return;
    }

    setEditText(event.target.value);
  }

  /**
   * @param {import('react').KeyboardEvent} event
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

  const editFieldRef = useRef(null);
  const prevEditing = usePrevious(editing);
  useEffect(() => {
    if (prevEditing || !editing) {
      return;
    }

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
