import React from 'react';

import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoContext } from '../../Contexts/Context';
import { ContextType } from '../../types/ContextType';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    setTodoChecked, handleDelete,
  } = React.useContext(TodoContext) as ContextType;

  return (
    <li className={cn({ completed: todo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id="toggle-editing"
          onChange={() => setTodoChecked(todo.id)}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
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
