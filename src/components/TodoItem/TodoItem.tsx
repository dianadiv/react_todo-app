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
  const { dispatch } = React.useContext(TodoContext) as ContextType;

  const handleSave = () => {
    if (editingValue.trim().length > 0) {
      dispatch({
        type: 'edit',
        payload: { name: editingValue, todoId: todo.id },
      });
    } else {
      dispatch({
        type: 'delete',
        payload: todo.id,
      });
    }

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
              onChange={() => (
                dispatch({ type: 'setChecked', payload: todo.id })
              )}
            />
            <label>{todo.title}</label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="delete"
              onClick={() => (
                dispatch({ type: 'delete', payload: todo.id })
              )}
            />
          </div>
        )}
    </li>
  );
};

/* <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-view">asdfghj</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */
