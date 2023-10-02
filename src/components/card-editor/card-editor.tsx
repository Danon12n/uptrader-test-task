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

type Props = {};

export default function CardEditor({}: Props) {
  const { number } = useParams();
  if (!number) return <>Card Number wasn't found</>;

  const { todos } = useSelector<TStore, TTodosState>((state) => state.todos);
  const currentTodo: TTodoCard = { ...todos.find((todo) => todo.number === +number) } as TTodoCard;

  if (!currentTodo) return <h1>Todo wasnt found!</h1>;

  const getWorkTime = () => {
    // Тут жалуется на вычитание дат
    // @ts-ignore:
    return (new Date() - currentTodo.creationDate) / (60 * 60 * 24 * 1000);
  };

  return (
    <div className='cardEditor__container'>
      <TitleEditor todoNumber={currentTodo.number} todoTitle={currentTodo.title} />
      <p className='cardEditor__subtitle'>in {currentTodo.status}</p>
      <DescriptionEditor todoNumber={currentTodo.number} description={currentTodo.description} />
      <PriorityEditor priority={currentTodo.priority} todoNumber={currentTodo.number} />
      <p>
        <strong>Creation Date:</strong> {currentTodo.creationDate.toLocaleDateString()}
      </p>
      <p>
        <strong>Time in work:</strong> {`${Math.floor(getWorkTime())} days`}
      </p>
      <FilesEditor attachedFiles={currentTodo.attachedFiles} todoNumber={currentTodo.number} />

      <SubTodos todoNumber={currentTodo.number} subtodos={currentTodo.subTodos} />
      <Comments todoNumber={currentTodo.number} comments={currentTodo.comments} />
    </div>
  );
}
