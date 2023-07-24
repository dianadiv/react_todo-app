import React, { useRef, useState } from 'react';

import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoContext } from '../../Contexts/Context';
import { ContextType } from '../../types/ContextType';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { todos, setTodos } = React.useContext(TodoContext) as ContextType;

  const handleSave = () => {
    if (editingValue.trim().length > 0) {
      setTodos((prevTodos) => {
        return prevTodos.map(prevTodo => {
          if (prevTodo.id === todo.id) {
            return {
              ...prevTodo,
              title: editingValue.trim(),
            };
          }

          return prevTodo;
        });
      })
    } else {
      setTodos(prevTodos => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id))
    };

    setEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    event.preventDefault();

    if (event.key === 'Escape') {
      setEditing(false);
    }

    if (event.key === 'Enter') {
      handleSave();
    }
  };

  const setCheckedItem = () => {
     setTodos(prevTodos => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === todo.id) {
          return {
            ...prevTodo,
            completed: !todo.completed,
          };
        }

        return prevTodo;
      });
    })
  }


  const handleDelete = () => {
    setTodos(prevTodos => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id))
  }

  console.log(todos)

  return (
    <li
      className={cn({ completed: todo.completed, editing })}
      onDoubleClick={() => {
        setEditing(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }}
    >
      {editing
        ? (
          <input
            ref={inputRef}
            type="text"
            className="edit"
            defaultValue={todo.title}
            onChange={(event) => setEditingValue(event.target.value)}
            onKeyUp={handleKeyUp}
            onBlur={handleSave}
          />
        )
        : (
          <div className="view">
            <input
              type="checkbox"
              checked={todo.completed}
              className="toggle"
              id="toggle-editing"
              onChange={() => setCheckedItem()}
            />
            <label>{todo.title}</label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="delete"
              onClick={handleDelete}
            />
          </div>
        )}
    </li>
  );
};
