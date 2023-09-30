import { combineReducers } from 'redux';
import { TTodosState, todos } from './todos';

export type TStore = {
  todos: TTodosState;
};

export const rootReducer = combineReducers({
  todos: todos,
});
