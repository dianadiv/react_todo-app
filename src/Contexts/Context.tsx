import React, {
  createContext, useEffect, useState,
} from 'react';

import { ContextType } from '../types/ContextType';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const TodoContext = createContext<ContextType | null>(null);

interface Props {
  children: JSX.Element;
}

export function useLocalStorage<T>(key: string, startValue: T): [T, (value: Todo[]) => void] {
  const [ value, setValue ] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue
    }

    try{
      return JSON.parse(data)
    } catch(e) {
      localStorage.removeItem(key);
      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export const Context: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [filter, setFilter] = useState(Status.all);

  const filterTodos = (nameOfFilter: string) => {
    switch (nameOfFilter) {
      case Status.all:
      default:
        return [...todos];
      case Status.active:
        return [...todos].filter((todo) => !todo.completed);
      case Status.completed:
        return [...todos].filter((todo) => todo.completed);
    }
  };

  const filteredTodos = filterTodos(filter);

  const params = {
    allTodos: todos,
    todos: filteredTodos,
    setTodos,
    filter,
    setFilter,
  };

  return <TodoContext.Provider value={params}>{children}</TodoContext.Provider>;
};
