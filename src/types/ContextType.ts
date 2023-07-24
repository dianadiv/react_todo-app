import { Status } from './Status';
import { Todo } from './Todo';

export interface ContextType{
  allTodos: Todo[],
  todos: Todo[],
  setTodos: (value: Todo[]) => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<Status>>;
}
