import { Todo } from './Todo';

export interface ContextType{
  todos: Todo[],
  value: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleKeyDown: (event: React.KeyboardEvent) => void,
  setTodoChecked: (x: number) => void,
  setAllChecked: () => void,
  handleDelete: (x: number) => void,
}
