import { TPorjectMeta } from '../../../utils/types';
import { TProjectsAction } from '../action/projects';

export type TProjectsState = {
  projetsMeta: TPorjectMeta[];
};

const initialState: TProjectsState = {
  projetsMeta: [],
};

export function projects(state = initialState, action: TProjectsAction) {
  switch (action.type) {
    case 'ADD_PROJECT':
      return state;
    case 'UPDATE_PROJECT':
      return state;
    case 'DELETE_PROJECT':
      return state;
    case 'LOAD_PROJECTS_META':
      return {
        ...state,
        projetsMeta: [...action.payload.projetsMeta],
      };
    default:
      return state;
  }
}
