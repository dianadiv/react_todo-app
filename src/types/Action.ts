export type Action =
| { type: 'delete'; payload: number }
| { type: 'add'; payload: string }
| { type: 'setChecked'; payload: number }
| { type: 'setAllChecked' }
| { type: 'deleteCompleted' }
| { type: 'edit'; payload: { name: string, todoId: number } };
