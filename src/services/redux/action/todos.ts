import { bindActionCreators } from 'redux';
import { TSubTodo, TTodoCard } from '../../../utils/types';
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  ADD_SUBTODO,
  UPDATE_SUBTODO_STATUS,
  UPDATE_SUBTODO_TITLE,
  DELETE_SUBTODO,
} from '../action-types/todos';
import { store } from '../store';

export interface IAddTodo {
  readonly type: typeof ADD_TODO;
  readonly payload: TTodoCard;
}
export interface IUpdateTodo {
  readonly type: typeof UPDATE_TODO;
  readonly payload: { number: number; todo: TTodoCard };
}
export interface IDeleteTodo {
  readonly type: typeof DELETE_TODO;
  readonly payload: number;
}
export interface IAddSubTodo {
  readonly type: typeof ADD_SUBTODO;
  readonly payload: { number: number; subtodo: TSubTodo };
}
export interface IUpdateSubTodoTitle {
  readonly type: typeof UPDATE_SUBTODO_TITLE;
  readonly payload: { number: number; index: number; title: string };
}
export interface IUpdateSubTodoStatus {
  readonly type: typeof UPDATE_SUBTODO_STATUS;
  readonly payload: { number: number; index: number };
}
export interface IDeleteSubTodo {
  readonly type: typeof DELETE_SUBTODO;
  readonly payload: { number: number; index: number };
}

export type TTodoAction =
  | IAddTodo
  | IUpdateTodo
  | IDeleteTodo
  | IAddSubTodo
  | IUpdateSubTodoStatus
  | IUpdateSubTodoTitle
  | IDeleteSubTodo;

const doAddTodo = (todo: TTodoCard) => ({
  type: ADD_TODO,
  payload: todo,
});
const doUpdateTodo = (number: number, todo: TTodoCard) => ({
  type: UPDATE_TODO,
  payload: { number, todo },
});
const doDeleteTodo = (number: number) => ({
  type: DELETE_TODO,
  payload: number,
});
const doAddSubTodo = (number: number, subtodo: TSubTodo) => ({
  type: ADD_SUBTODO,
  payload: { number, subtodo },
});
const doUpdateSubTodoTitle = (number: number, index: number, title: string) => ({
  type: UPDATE_SUBTODO_TITLE,
  payload: { number, index, title },
});
const doUpdateSubTodoStatus = (number: number, index: number) => ({
  type: UPDATE_SUBTODO_STATUS,
  payload: { number, index },
});
const doDeleteSubTodo = (number: number, index: number) => ({
  type: DELETE_SUBTODO,
  payload: { number, index },
});

export const boundTodoActions = bindActionCreators(
  {
    addTodo: doAddTodo,
    updateTodo: doUpdateTodo,
    deleteTodo: doDeleteTodo,
    addSubTodo: doAddSubTodo,
    updateSubTodoTitle: doUpdateSubTodoTitle,
    updateSubTodoStatus: doUpdateSubTodoStatus,
    deleteSubTodo: doDeleteSubTodo,
  },
  store.dispatch
);
