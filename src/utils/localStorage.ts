import { LOCALSTORAGE_PROJECTS_IDS_KEY } from './constants';
import { TPorjectMeta, TProject } from './types';

export const getProjectsMeta = () => {
  const projectsIDs = localStorage.getItem(LOCALSTORAGE_PROJECTS_IDS_KEY);

  if (projectsIDs) return JSON.parse(projectsIDs);
  else localStorage.setItem(LOCALSTORAGE_PROJECTS_IDS_KEY, JSON.stringify([]));
  return [];
};

export const addProjectMeta = (projectID: string, title: string) => {
  const projectsIDs = localStorage.getItem(LOCALSTORAGE_PROJECTS_IDS_KEY);

  if (projectsIDs) {
    const res: TPorjectMeta[] = JSON.parse(projectsIDs);
    res.push({ id: projectID, title: title });
    localStorage.setItem(LOCALSTORAGE_PROJECTS_IDS_KEY, JSON.stringify(res));
  } else return undefined;
};

export const deleteProjectMeta = (projectID: string) => {
  const projectsIDs = localStorage.getItem(LOCALSTORAGE_PROJECTS_IDS_KEY);

  if (projectsIDs) {
    const res = JSON.parse(projectsIDs).filter((proj: TPorjectMeta) => proj.id !== projectID);
    localStorage.setItem(LOCALSTORAGE_PROJECTS_IDS_KEY, JSON.stringify(res));
  } else return undefined;
};

export const getProject = (id: string) => {
  const project = localStorage.getItem(`project_${id}`);

  if (project) {
    return JSON.parse(project);
  }
  return undefined;
};

export const saveProject = (id: string, newProject: TProject) => {
  localStorage.setItem(`project_${id}`, JSON.stringify(newProject));
};

export const deleteProject = (id: string) => {
  localStorage.removeItem(`project_${id}`);
};
