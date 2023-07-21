import React, { useState } from 'react';

import { Todo } from '../types/Todo';
import { ContextType } from '../types/ContextType';

export const TodoContext = React.createContext<ContextType | null>(null);

interface Props{
  children: JSX.Element;
}

export const Context: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (value.trim()) {
        setTodos([
          ...todos,
          {
            id: +new Date(),
            title: value.trim(),
            completed: false,
          },
        ]);

        setValue('');
      }
    }
  };

  const setTodoChecked = (todoId: number) => {
    const newTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return (
          {
            ...todo,
            completed: !todo.completed,
          }
        );
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const setAllChecked = () => {
    const allChecked = todos.map(todo => (
      {
        ...todo,
        completed: !todo.completed,
      }
    ));

    setTodos(allChecked);
  };

  const handleDelete = (todoId: number) => {
    setTodos(allTodos => allTodos.filter(todo => todo.id !== todoId));
  };

  const params = {
    todos,
    value,
    handleChange,
    handleKeyDown,
    setTodoChecked,
    setAllChecked,
    handleDelete,
  };

  return (
    <TodoContext.Provider value={params}>
      {children}
    </TodoContext.Provider>
  );
};
