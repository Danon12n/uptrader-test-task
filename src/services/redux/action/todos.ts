import { bindActionCreators } from 'redux';
import { TTodoCard } from '../../../utils/types';
import { ADD_TODO, DELETE_TODO } from '../action-types/todos';
import { store } from '../store';

export interface IAddTodo {
  readonly type: typeof ADD_TODO;
  readonly payload: TTodoCard;
}
export interface IDeleteTodo {
  readonly type: typeof DELETE_TODO;
  readonly payload: number;
}

export type TTodoAction = IAddTodo | IDeleteTodo;

const doAddTodo = (todo: TTodoCard) => ({
  type: ADD_TODO,
  payload: todo,
});
const doDeleteTodo = (number: number) => ({
  type: DELETE_TODO,
  payload: number,
});

export const boundTodoActions = bindActionCreators(
  {
    addTodo: doAddTodo,
    deleteTodo: doDeleteTodo,
  },
  store.dispatch
);
