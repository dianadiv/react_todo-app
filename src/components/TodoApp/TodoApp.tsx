import React from 'react';

import cn from 'classnames';

import { TodoList } from '../TodoList/TodoList';
import { TodoContext } from '../../Contexts/Context';
import { ContextType } from '../../types/ContextType';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp: React.FC = () => {
  const {
    allTodos, value, handleChange, handleKeyDown, dispatch,
  } = React.useContext(TodoContext) as ContextType;

  function areChecked() {
    return allTodos.every((todo) => todo.completed);
  }

  const activeTodos = allTodos.filter((todo) => !todo.completed);

  const anyCompleted = allTodos.some((todo) => todo.completed);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </form>
      </header>

      <section className={cn('main', { hidden: allTodos.length === 0 })}>
        <input
          type="checkbox"
          id="toggle-all"
          checked={areChecked()}
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => dispatch({ type: 'setAllChecked' })}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      {allTodos.length > 0 && (
        <footer className="footer" data-cy="todosFilter">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodos.length} items left`}
          </span>

          <TodosFilter />

          {anyCompleted && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => dispatch({ type: 'deleteCompleted' })}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
