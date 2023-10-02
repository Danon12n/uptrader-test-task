// type Props = {}
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import './project.scss';
import Column from '../../components/column/column';
import { Link } from 'react-router-dom';
import { boundTodoActions } from '../../services/redux/action/todos';
import { timeOptions } from '../../utils/constants';
import { TStatus } from '../../utils/types';
import CardSearch from '../../components/card-search/card-search';

export default function ProjectPage() {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      console.log('diffent columns');
      boundTodoActions.changeTodoStatus(source.index, destination.droppableId as TStatus);
    } else {
      console.log('same column');
    }
  };
  return (
    <>
      <div className='topMenu__container'>
        <Link className='link' to={'/'}>
          <p>Home</p>
        </Link>
        <p>Project Title</p>
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
