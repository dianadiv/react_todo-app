import React from 'react';
import cn from 'classnames';

import { Status } from '../../types/Status';
import { TodoContext } from '../../Contexts/Context';
import { ContextType } from '../../types/ContextType';

interface Props {
  nameOfFilter: Status;
  href: string;
}

export const Filters: React.FC<Props> = ({
  nameOfFilter, href,
}) => {
  const { filter, handleFilter } = React.useContext(TodoContext) as ContextType;

  return (
    <li>
      <a
        href={href}
        className={cn({ selected: nameOfFilter === filter })}
        onClick={() => handleFilter(nameOfFilter)}
      >
        {nameOfFilter}
      </a>
    </li>
  );
};
