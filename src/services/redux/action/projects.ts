import { bindActionCreators } from 'redux';
import {
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  LOAD_PROJECTS_META,
} from '../action-types/projects';
import { store } from '../store';
import { TPorjectMeta, TTodoCard } from '../../../utils/types';

export interface IAddProject {
  readonly type: typeof ADD_PROJECT;
  readonly payload: TTodoCard;
}
export interface IUpdateProject {
  readonly type: typeof UPDATE_PROJECT;
  readonly payload: { number: number; todo: TTodoCard };
}
export interface IDeleteProject {
  readonly type: typeof DELETE_PROJECT;
  readonly payload: number;
}

const doAddProject = (todo: TTodoCard) => ({
  type: ADD_PROJECT,
  payload: todo,
});
const doUpdateProject = (number: number, todo: TTodoCard) => ({
  type: UPDATE_PROJECT,
  payload: { number, todo },
});
const doDeleteProject = (number: number) => ({
  type: DELETE_PROJECT,
  payload: number,
});

export interface ILoadProjectsMeta {
  readonly type: typeof LOAD_PROJECTS_META;
  readonly payload: { projetsMeta: TPorjectMeta[] };
}
const doLoadProjectsMeta = (projetsMeta: TPorjectMeta[]) => ({
  type: LOAD_PROJECTS_META,
  payload: { projetsMeta },
});

export type TProjectsAction = IAddProject | IUpdateProject | IDeleteProject | ILoadProjectsMeta;

export const boundProjectsActions = bindActionCreators(
  {
    addProject: doAddProject,
    updateProject: doUpdateProject,
    deleteProject: doDeleteProject,
    loadProjectsMeta: doLoadProjectsMeta,
  },
  store.dispatch
);
