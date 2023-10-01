import { boundTodoActions } from '../../../services/redux/action/todos';
import { TTodoCard } from '../../../utils/types';
import './column-card.scss';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';
import { FiType } from '@react-icons/all-files/fi/FiType';
import { FiMessageSquare } from '@react-icons/all-files/fi/FiMessageSquare';
import { FiFile } from '@react-icons/all-files/fi/FiFile';
import { FiList } from '@react-icons/all-files/fi/FiList';

type Props = { card: TTodoCard };

export default function ColumnCard({ card }: Props) {
  return (
    <div className='column__card'>
      <p className='column__card__title'>{card.title}</p>
      <div className='column__card__signsList'>
        {card.priority === 'medium' && <>!</>}
        {card.priority === 'high' && <>!!!</>}
        {card.description && <FiType size={25} />}
        {card.comments.length !== 0 && <FiMessageSquare size={25} />}
        {card.attachedFiles && <FiFile size={25} />}
        {card.subTodos.length !== 0 && <FiList size={25} />}
      </div>
      <p>{card.creationDate.toLocaleDateString()}</p>
      <p>
        <FiTrash
          size={25}
          onClick={(e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('delete card');
            boundTodoActions.deleteTodo(card.number);
          }}
        />
      </p>
    </div>
  );
}
