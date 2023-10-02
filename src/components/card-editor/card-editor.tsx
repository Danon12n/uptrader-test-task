import { useParams } from 'react-router';
import './card-editor.scss';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/redux/reducers';
import { TTodosState } from '../../services/redux/reducers/todos';
import { TTodoCard } from '../../utils/types';

import SubTodos from './sub-todos/sub-todos';
import Comments from './comments/comments';
import PriorityEditor from './priority-editor/priority-editor';
import TitleEditor from './title-editor/title-editor';
import DescriptionEditor from './description-editor/description-editor';
import FilesEditor from './files-editor/files-editor';
import { timeOptions } from '../../utils/constants';

type Props = {};

export default function CardEditor({}: Props) {
  const { number } = useParams();
  if (!number) return <>Card Number wasn't found</>;

  const { todos } = useSelector<TStore, TTodosState>((state) => state.todos);
  const currentTodo: TTodoCard = { ...todos.find((todo) => todo.number === +number) } as TTodoCard;
  console.log(currentTodo);
  if (!currentTodo || Object.keys(currentTodo).length === 0) return <h1>loading...</h1>;

  const getWorkTime = () => {
    // Тут жалуется на вычитание дат
    if (currentTodo.status === 'Done') {
      return (
        // @ts-ignore:
        (new Date(currentTodo.completeDate) - new Date(currentTodo.creationDate)) /
        (60 * 60 * 24 * 1000)
      );
    }
    // @ts-ignore:
    return (new Date() - new Date(currentTodo.creationDate)) / (60 * 60 * 24 * 1000);
  };

  return (
    <div className='cardEditor__container'>
      <TitleEditor todoNumber={currentTodo.number} todoTitle={currentTodo.title} />
      <p className='cardEditor__subtitle'>in {currentTodo.status}</p>
      <DescriptionEditor todoNumber={currentTodo.number} description={currentTodo.description} />
      <PriorityEditor priority={currentTodo.priority} todoNumber={currentTodo.number} />
      <p>
        <strong>Creation Date:</strong>{' '}
        {new Date(currentTodo.creationDate).toLocaleDateString([], timeOptions)}
      </p>
      <p>
        <strong>Time in work:</strong> {`${Math.floor(getWorkTime())} days`}
      </p>
      {currentTodo.completeDate && (
        <p>
          <strong>Complete Date:</strong>
          {new Date(currentTodo.completeDate).toLocaleDateString([], timeOptions)}
        </p>
      )}

      <FilesEditor attachedFiles={currentTodo.attachedFiles} todoNumber={currentTodo.number} />

      <SubTodos todoNumber={currentTodo.number} subtodos={currentTodo.subTodos} />
      <Comments todoNumber={currentTodo.number} comments={currentTodo.comments} />
    </div>
  );
}
