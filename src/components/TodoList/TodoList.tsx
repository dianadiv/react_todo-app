import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoContext } from '../../Contexts/Context';
import { ContextType } from '../../types/ContextType';

export const TodoList: React.FC = () => {
  const { todos } = React.useContext(TodoContext) as ContextType;

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(item => (
        <TodoItem
          todo={item}
          key={item.id}
        />
      ))}
    </ul>
  );
};
