import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import './project.scss';
import Column from '../../components/column/column';
import { Link, useParams } from 'react-router-dom';
import { boundTodoActions } from '../../services/redux/action/todos';
import { timeOptions } from '../../utils/constants';
import { TPorjectMeta, TStatus } from '../../utils/types';
import CardSearch from '../../components/card-search/card-search';
import { useEffect } from 'react';
import { getProject, getProjectsMeta, saveProject } from '../../utils/localStorage';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/redux/reducers';
import { TTodosState } from '../../services/redux/reducers/todos';

export default function ProjectPage() {
  const { id } = useParams();
  const { todos, freeTodoNumbers, isTodoLoaded } = useSelector<TStore, TTodosState>(
    (state) => state.todos
  );

  const currentProject = getProjectsMeta().find((project: TPorjectMeta) => project.id === id);

  useEffect(() => {
    if (id && !isTodoLoaded) {
      boundTodoActions.doLoadTodo(true);
      boundTodoActions.setTodos(getProject(id));
    }
  }, []);

  useEffect(() => {
    if (id) {
      saveProject(id, { todos, freeTodoNumbers, isTodoLoaded });
    }
  }, [todos, freeTodoNumbers]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      boundTodoActions.changeTodoStatus(source.index, destination.droppableId as TStatus);
    } else {
    }
  };
  return (
    <>
      <div className='topMenu__container'>
        <Link
          className='link'
          to={'/'}
          onClick={() => {
            boundTodoActions.doLoadTodo(false);
          }}
        >
          <p>Home</p>
        </Link>
        <p>{currentProject?.title ? currentProject.title : 'No title found'}</p>
        <p>{new Date().toLocaleString([], timeOptions)}</p>
      </div>
      <CardSearch />
      <div className='columns__container'>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Column title='Queue' />
          <Column title='Development' />
          <Column title='Done' />
        </DragDropContext>
      </div>
    </>
  );
}
