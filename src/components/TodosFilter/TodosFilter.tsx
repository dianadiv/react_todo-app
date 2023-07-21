import React, { useState } from 'react';

import cn from 'classnames';

enum Status{
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const TodosFilter: React.FC = () => {
  const [filter, setFilter] = useState(Status.all);

  function handleFiltering(filterField: Status) {
    setFilter(filterField);
  }

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: filter === Status.all })}
          onClick={() => handleFiltering(Status.all)}
        >
          {Status.all}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filter === Status.active })}
          onClick={() => handleFiltering(Status.active)}
        >
          {Status.active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filter === Status.completed })}
          onClick={() => handleFiltering(Status.completed)}
        >
          {Status.completed}
        </a>
      </li>
    </ul>
  );
};
