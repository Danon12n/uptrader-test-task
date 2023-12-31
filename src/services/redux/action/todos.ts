import { bindActionCreators } from 'redux';
import { TPriority, TProject, TStatus, TSubTodo, TTodoCard } from '../../../utils/types';
import {
  ADD_TODO,
  DELETE_TODO,
  ADD_SUBTODO,
  UPDATE_SUBTODO_STATUS,
  UPDATE_SUBTODO_TITLE,
  DELETE_SUBTODO,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_SUBCOMMENT,
  DELETE_SUBCOMMENT,
  UPDATE_SUBCOMMENT,
  CHANGE_TODO_PRIORITY,
  CHANGE_TODO_TITLE,
  CHANGE_TODO_DESCRIPTION,
  CHANGE_TODO_STATUS,
  ADD_ATTACHED_FILE,
  DELETE_ATTACHED_FILE,
  SET_TODOS,
  LOAD_TODO,
} from '../action-types/todos';
import { store } from '../store';

export interface ILoadTodo {
  readonly type: typeof LOAD_TODO;
  readonly payload: { isActive: boolean };
}
const doLoadTodo = (isActive: boolean) => ({
  type: LOAD_TODO,
  payload: { isActive },
});
export interface ISetTodos {
  readonly type: typeof SET_TODOS;
  readonly payload: { project: TProject };
}
const doSetTodos = (project: TProject) => ({
  type: SET_TODOS,
  payload: { project },
});

export interface IAddAttachedFile {
  readonly type: typeof ADD_ATTACHED_FILE;
  readonly payload: { number: number; url: string };
}
export interface IDeleteAttachedFile {
  readonly type: typeof DELETE_ATTACHED_FILE;
  readonly payload: { number: number; index: number };
}

const doAddAttachedFile = (number: number, url: string) => ({
  type: ADD_ATTACHED_FILE,
  payload: { number, url },
});
const doDeleteAttachedFile = (number: number, index: number) => ({
  type: DELETE_ATTACHED_FILE,
  payload: { number, index },
});

export interface IChangeTodoStatus {
  readonly type: typeof CHANGE_TODO_STATUS;
  readonly payload: { number: number; status: TStatus };
}

const doChangeTodoStatus = (number: number, status: TStatus) => ({
  type: CHANGE_TODO_STATUS,
  payload: { number, status },
});

export interface IChangeTodoDescription {
  readonly type: typeof CHANGE_TODO_DESCRIPTION;
  readonly payload: { number: number; description: string };
}

const doChangeTodoDescription = (number: number, description: string) => ({
  type: CHANGE_TODO_DESCRIPTION,
  payload: { number, description },
});

export interface IChangeTodoPriority {
  readonly type: typeof CHANGE_TODO_PRIORITY;
  readonly payload: { number: number; priority: TPriority };
}

const doChangeTodoPriority = (number: number, priority: TPriority) => ({
  type: CHANGE_TODO_PRIORITY,
  payload: { number, priority },
});

export interface IChangeTodoTitle {
  readonly type: typeof CHANGE_TODO_TITLE;
  readonly payload: { number: number; title: string };
}

const doChangeTodoTitle = (number: number, title: string) => ({
  type: CHANGE_TODO_TITLE,
  payload: { number, title },
});

export interface IAddTodo {
  readonly type: typeof ADD_TODO;
  readonly payload: TTodoCard;
}

export interface IDeleteTodo {
  readonly type: typeof DELETE_TODO;
  readonly payload: number;
}

const doAddTodo = (todo: TTodoCard) => ({
  type: ADD_TODO,
  payload: todo,
});

const doDeleteTodo = (number: number) => ({
  type: DELETE_TODO,
  payload: number,
});

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

export interface IAddComment {
  readonly type: typeof ADD_COMMENT;
  readonly payload: { number: number; text: string };
}
export interface IUpdateComment {
  readonly type: typeof UPDATE_COMMENT;
  readonly payload: { number: number; index: number; text: string };
}
export interface IDeleteComment {
  readonly type: typeof DELETE_COMMENT;
  readonly payload: { number: number; index: number };
}

const doAddComment = (number: number, text: string) => ({
  type: ADD_COMMENT,
  payload: { number, text },
});
const doUpdateComment = (number: number, index: number, text: string) => ({
  type: UPDATE_COMMENT,
  payload: { number, index, text },
});
const doDeleteComment = (number: number, index: number) => ({
  type: DELETE_COMMENT,
  payload: { number, index },
});

export interface IAddSubComment {
  readonly type: typeof ADD_SUBCOMMENT;
  readonly payload: { number: number; commentIndex: number; text: string };
}
export interface IUpdateSubComment {
  readonly type: typeof UPDATE_SUBCOMMENT;
  readonly payload: { number: number; commentIndex: number; subCommentIndex: number; text: string };
}
export interface IDeleteSubComment {
  readonly type: typeof DELETE_SUBCOMMENT;
  readonly payload: { number: number; commentIndex: number; subCommentIndex: number };
}

const doAddSubComment = (number: number, commentIndex: number, text: string) => ({
  type: ADD_SUBCOMMENT,
  payload: { number, commentIndex, text },
});
const doUpdateSubComment = (
  number: number,
  commentIndex: number,
  subCommentIndex: number,
  text: string
) => ({
  type: UPDATE_SUBCOMMENT,
  payload: { number, commentIndex, subCommentIndex, text },
});
const doDeleteSubComment = (number: number, commentIndex: number, subCommentIndex: number) => ({
  type: DELETE_SUBCOMMENT,
  payload: { number, commentIndex, subCommentIndex },
});

export type TTodoAction =
  | IAddTodo
  | IDeleteTodo
  | IAddSubTodo
  | IUpdateSubTodoStatus
  | IUpdateSubTodoTitle
  | IDeleteSubTodo
  | IAddComment
  | IUpdateComment
  | IDeleteComment
  | IAddSubComment
  | IUpdateSubComment
  | IDeleteSubComment
  | IChangeTodoPriority
  | IChangeTodoTitle
  | IChangeTodoDescription
  | IChangeTodoStatus
  | IAddAttachedFile
  | IDeleteAttachedFile
  | ISetTodos
  | ILoadTodo;

export const boundTodoActions = bindActionCreators(
  {
    addTodo: doAddTodo,
    deleteTodo: doDeleteTodo,
    addSubTodo: doAddSubTodo,

    updateSubTodoTitle: doUpdateSubTodoTitle,
    updateSubTodoStatus: doUpdateSubTodoStatus,
    deleteSubTodo: doDeleteSubTodo,

    addComment: doAddComment,
    updateComment: doUpdateComment,
    deleteComment: doDeleteComment,

    addSubComment: doAddSubComment,
    updateSubComment: doUpdateSubComment,
    deleteSubComment: doDeleteSubComment,

    changeTodoPriority: doChangeTodoPriority,
    changeTodoTitle: doChangeTodoTitle,
    changeTodoDescription: doChangeTodoDescription,
    changeTodoStatus: doChangeTodoStatus,

    addAttachedFile: doAddAttachedFile,
    deleteAttachedFile: doDeleteAttachedFile,

    setTodos: doSetTodos,
    doLoadTodo: doLoadTodo,
  },
  store.dispatch
);
