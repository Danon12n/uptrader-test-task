import { Link, useLocation } from 'react-router-dom';
import ColumnCard from './card/column-card';
import './column.scss';
import { TStatus, TTodoCard } from '../../utils/types';
import { useSelector } from 'react-redux';
import { TTodosState } from '../../services/redux/reducers/todos';
import { TStore } from '../../services/redux/reducers';
import { boundTodoActions } from '../../services/redux/action/todos';
type Props = {
  title: TStatus;
};

export default function Column({ title = 'Queue' }: Props) {
  const location = useLocation();

  const { todos } = useSelector<TStore, TTodosState>((store) => store.todos);

  const CreateTodo = () => {
    const newCard: TTodoCard = {
      number: 1,
      title: 'new Card',
      description: 'asdasd',
      status: title,
      priority: 'medium',
      creationDate: new Date(),
      comments: [{ text: 'hey bitch', date: new Date(12321312323), subComments: [] }],
      attachedFiles: ['cool file'],
      subTodos: [
        { title: 'job1', done: false },
        { title: 'job2', done: true },
        { title: 'job3', done: false },
      ],
    };
    boundTodoActions.addTodo(newCard);
  };

  return (
    <div className='column'>
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
  );
}
