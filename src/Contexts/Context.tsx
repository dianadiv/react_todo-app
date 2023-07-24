import React, { createContext, useReducer, useRef, useState } from 'react';

import { Todo } from '../types/Todo';
import { ContextType } from '../types/ContextType';
import { Action } from '../types/Action';
import { Status } from '../types/Status';

export const TodoContext = createContext<ContextType | null>(null);

interface Props {
  children: JSX.Element;
}

export const Context: React.FC<Props> = ({ children }) => {
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState(Status.all);

  const ref = useRef(false);

  const reducer = (state: Todo[], action: Action) => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          {
            id: +new Date(),
            title: action.payload,
            completed: false,
          },
        ];
      case 'delete':
        return state.filter((todo) => todo.id !== action.payload);
      case 'deleteCompleted':
        return state.filter((todo) => !todo.completed);
      case 'setAllChecked': {
        if (!ref.current) {
          ref.current = !ref.current;

          return state.map((el) => ({
            ...el,
            completed: true,
          }));
        }

        ref.current = !ref.current;

        return state.map((el) => ({
          ...el,
          completed: false,
        }));
      }

      case 'setChecked':
        return state.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        });
      case 'edit':
        return state.map(todo => {
          if (todo.id === action.payload.todoId) {
            return {
              ...todo,
              title: action.payload.name,
            };
          }

          return todo;
        });
      default:
        return state;
    }
  };

  const [todosState, dispatch] = useReducer(reducer, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (value.trim()) {
        dispatch({ type: 'add', payload: value.trim() });

        setValue('');
      }
    }
  };

  const handleFilter = (name: Status) => {
    setFilter(name);
  };

  const filterTodos = (nameOfFilter: string) => {
    switch (nameOfFilter) {
      case Status.all:
      default:
        return todosState;
      case Status.active:
        return todosState.filter((todo) => !todo.completed);
      case Status.completed:
        return todosState.filter((todo) => todo.completed);
    }
  };

  const filteredTodos = filterTodos(filter);

  const params = {
    allTodos: todosState,
    todos: filteredTodos,
    value,
    filter,
    handleFilter,
    handleChange,
    handleKeyDown,
    dispatch,
  };

  return <TodoContext.Provider value={params}>{children}</TodoContext.Provider>;
};
