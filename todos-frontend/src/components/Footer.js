// @ts-check

import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Filter, pluralize } from './utils';

/**
 * @param {{
 *     activeTodoCount: number,
 *     completedCount: number,
 *     nowShowing: Filter,
 *     onClearCompleted(): void,
 * }} props
 */
function Footer({ activeTodoCount, completedCount, nowShowing, onClearCompleted }) {
  if (activeTodoCount === 0 && completedCount === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong> {pluralize(activeTodoCount, 'item')} left
      </span>
      <ul className="filters">
        <li>
          <Link to="/" className={classNames({ selected: nowShowing === Filter.ALL_TODOS })}>
            All
          </Link>
        </li>
        <li>
          <Link
            to="/active"
            className={classNames({ selected: nowShowing === Filter.ACTIVE_TODOS })}
          >
            Active
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={classNames({ selected: nowShowing === Filter.COMPLETED_TODOS })}
          >
            Completed
          </Link>
        </li>
      </ul>
      {completedCount > 0 ? (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}

export default Footer;
