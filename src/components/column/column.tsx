import { Link, useLocation } from 'react-router-dom';
import ColumnCard from './card/column-card';
import './column.scss';
import { TStatus, TTodoCard } from '../../utils/types';
import { useSelector } from 'react-redux';
import { TTodosState } from '../../services/redux/reducers/todos';
import { TStore } from '../../services/redux/reducers';
import { boundTodoActions } from '../../services/redux/action/todos';
import { Droppable } from 'react-beautiful-dnd';

type Props = {
  title: TStatus;
};

export default function Column({ title = 'Queue' }: Props) {
  const location = useLocation();

  const { todos } = useSelector<TStore, TTodosState>((store) => store.todos);

  const CreateTodo = () => {
    const newCard: TTodoCard = {
      number: 1,
      title: 'New card',
      description: '',
      status: title,
      priority: 'low',
      creationDate: new Date(),
      comments: [],
      attachedFiles: [],
      subTodos: [],
    };
    if (title === 'Done') newCard.completeDate = new Date();
    boundTodoActions.addTodo(newCard);
  };

  return (
    <Droppable key={title} droppableId={title}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className='column'>
          <p className='column__title'>{title}</p>
          <div className='column__cardList'>
            {todos.map((todo) => {
              if (todo.status === title) {
                return (
                  <Link
                    className='column__link'
                    to={`card/${todo.number}`}
                    state={{ background: location }}
                  >
                    <ColumnCard card={todo} />
                  </Link>
                );
              }
            })}
          </div>
          <button className='column__button' onClick={CreateTodo}>
            Add todo
          </button>
        </div>
      )}
    </Droppable>
  );
}
