import { combineReducers } from 'redux';
import { TTodosState, todos } from './todos';
import { TProjectsState, projects } from './projects';

export type TStore = {
  todos: TTodosState;
  projects: TProjectsState;
};

export const rootReducer = combineReducers({
  todos: todos,
  projects: projects,
});
