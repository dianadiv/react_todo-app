import { Action } from './Action';
import { Status } from './Status';
import { Todo } from './Todo';

export interface ContextType{
  allTodos: Todo[],
  todos: Todo[],
  value: string,
  filter: Status,
  handleFilter: (name: Status) => void,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleKeyDown: (event: React.KeyboardEvent) => void,
  dispatch: ({ type }: Action) => void,
}
