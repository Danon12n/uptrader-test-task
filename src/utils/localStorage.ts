import { LOCALSTORAGE_PROJECTS_IDS_KEY } from './constants';
import { TPorjectMeta, TProject } from './types';

export const getProjectsMeta: () => TPorjectMeta[] = () => {
  const projectsIDs = localStorage.getItem(LOCALSTORAGE_PROJECTS_IDS_KEY);

  if (projectsIDs) return JSON.parse(projectsIDs);
  else localStorage.setItem(LOCALSTORAGE_PROJECTS_IDS_KEY, JSON.stringify([]));
  return [];
};

export const addProjectMeta: (projectID: string, title: string) => boolean = (projectID, title) => {
  const projectsIDs = localStorage.getItem(LOCALSTORAGE_PROJECTS_IDS_KEY);

  if (projectsIDs) {
    const res: TPorjectMeta[] = JSON.parse(projectsIDs);
    res.push({ id: projectID, title: title });
    localStorage.setItem(LOCALSTORAGE_PROJECTS_IDS_KEY, JSON.stringify(res));
    return true;
  }
  return false;
};

export const deleteProjectMeta: (projectID: string) => boolean = (projectID: string) => {
  const projectsIDs = localStorage.getItem(LOCALSTORAGE_PROJECTS_IDS_KEY);

  if (projectsIDs) {
    const res = JSON.parse(projectsIDs).filter((proj: TPorjectMeta) => proj.id !== projectID);
    localStorage.setItem(LOCALSTORAGE_PROJECTS_IDS_KEY, JSON.stringify(res));
    return true;
  } else return false;
};

export const getProject: (id: string) => TProject = (id: string) => {
  const project = localStorage.getItem(`project_${id}`);

  if (project) {
    return JSON.parse(project);
  }
  const cleanProject: TProject = { todos: [], isTodoLoaded: false, freeTodoNumbers: [] };
  localStorage.setItem(`project_${id}`, JSON.stringify(cleanProject));
  return cleanProject;
};

export const saveProject = (id: string, newProject: TProject) => {
  try {
    localStorage.setItem(`project_${id}`, JSON.stringify(newProject));
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = (id: string) => {
  try {
    localStorage.removeItem(`project_${id}`);
  } catch (error) {
    console.log(error);
  }
};
