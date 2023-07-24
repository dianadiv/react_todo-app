import React, { useRef, useState } from 'react';

import cn from 'classnames';

import { TodoList } from '../TodoList/TodoList';
import { TodoContext } from '../../Contexts/Context';
import { ContextType } from '../../types/ContextType';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp: React.FC = () => {
  const [value, setValue] = useState('');
  const ref = useRef(false);

  const { allTodos, todos, setTodos } = React.useContext(TodoContext) as ContextType;

  const deleteCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);

    setTodos(newTodos);
  };

  const areChecked = () => {
    return todos.every((todo) => todo.completed);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (value.trim()) {
        setTodos((allTodos) => [
          ...allTodos,
          {
            id: +new Date(),
            title: value.trim(),
            completed: false,
          },
        ]);

        setValue("");
      }
    }
  };

  const setAllChecked = () => {
    if (!ref.current) {
      ref.current = !ref.current;

      setTodos((allTodos) =>
        allTodos.map((el) => ({
          ...el,
          completed: true,
        }))
      );
    } else {
      ref.current = !ref.current;

      setTodos((allTodos) =>
        allTodos.map((el) => ({
          ...el,
          completed: false,
        }))
      );
    }
  };

  const activeTodos = allTodos.filter((todo) => !todo.completed);

  const anyCompleted = todos.some((todo) => todo.completed);

  return (
    <div className='todoapp'>
      <header className='header'>
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
      </header>

      <section className={cn("main", { hidden: todos.length === 0 })}>
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
              onClick={() => deleteCompleted()}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
