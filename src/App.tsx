/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { Context } from './Contexts/Context';

export const App: React.FC = () => {
  return (
    <Context>
      <TodoApp />
    </Context>
  );
};
