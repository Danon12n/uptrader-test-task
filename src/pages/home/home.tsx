// type Props = {};
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './home.scss';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/ui/button/my-button';
import { boundProjectsActions } from '../../services/redux/action/projects';
import {
  addProjectMeta,
  deleteProject,
  deleteProjectMeta,
  getProjectsMeta,
  saveProject,
} from '../../utils/localStorage';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/redux/reducers';
import { TProjectsState } from '../../services/redux/reducers/projects';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';

export default function HomePage() {
  const [showProjCreator, setShowProjCreator] = useState(false);
  const { projetsMeta } = useSelector<TStore, TProjectsState>((state) => state.projects);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    boundProjectsActions.loadProjectsMeta(getProjectsMeta());
  }, []);

  return (
    <div className='projects'>
      <div className='projects__title'>Welcome to TodoList!</div>
      <div className='projects__list'>
        {projetsMeta.length === 0 ? (
          <h1>No Projects created</h1>
        ) : (
          <>
            {projetsMeta.map((proj) => {
              return (
                <div className='projects__list__item'>
                  <Link className='projects__list__link' to={`/project/${proj.id}`}>
                    {proj.title}
                  </Link>
                  <FiTrash
                    onClick={() => {
                      deleteProjectMeta(proj.id);
                      deleteProject(proj.id);
                      boundProjectsActions.loadProjectsMeta(getProjectsMeta());
                    }}
                    size={25}
                  />
                </div>
              );
            })}
          </>
        )}
        {showProjCreator ? (
          <div className='projectCreator'>
            <input ref={inputRef} placeholder='Enter Project name...' />
            <Button
              onClick={() => {
                if (inputRef.current) {
                  const newProjectId = uuidv4();
                  addProjectMeta(newProjectId, inputRef.current.value);
                  saveProject(newProjectId, {
                    todos: [],
                    freeTodoNumbers: [],
                    isTodoLoaded: false,
                  });
                  boundProjectsActions.loadProjectsMeta(getProjectsMeta());
                  setShowProjCreator(false);
                }
              }}
            >
              Create
            </Button>
            <Button
              onClick={() => {
                setShowProjCreator(false);
              }}
            >
              Back
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setShowProjCreator(true);
            }}
          >
            Create new project
          </Button>
        )}
      </div>
    </div>
  );
}
