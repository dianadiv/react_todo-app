import React from 'react';

import { Status } from '../../types/Status';
import { Filters } from '../Filters/Filters';

export const TodosFilter: React.FC = () => {
  return (
    <ul className="filters">
      <Filters
        nameOfFilter={Status.all}
        href="#/"
      />
      <Filters
        nameOfFilter={Status.active}
        href="#/active"
      />
      <Filters
        nameOfFilter={Status.completed}
        href="#/completed"
      />
    </ul>
  );
};
