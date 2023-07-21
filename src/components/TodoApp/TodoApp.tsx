import React from 'react';

import cn from 'classnames';

import { TodoList } from '../TodoList/TodoList';
import { TodoContext } from '../../Contexts/Context';
import { ContextType } from '../../types/ContextType';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp: React.FC = () => {
  const {
    todos,
    value,
    handleChange,
    handleKeyDown,
    setAllChecked,
  } = React.useContext(TodoContext) as ContextType;

  function areChecked() {
    return todos.every(todo => todo.completed);
  }

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

      <section className={cn('main', { hidden: todos.length === 0 })}>
        <input
          type="checkbox"
          id="toggle-all"
          checked={areChecked()}
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => setAllChecked()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.length} items left`}
          </span>

          <TodosFilter />

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      )}
    </div>
  );
};
