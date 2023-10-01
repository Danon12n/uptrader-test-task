import { boundTodoActions } from '../../services/redux/action/todos';
import { TTodoCard } from '../../utils/types';
import './column-card.scss';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';

type Props = { card: TTodoCard };

export default function ColumnCard({ card }: Props) {
  return (
    <div className='column__card'>
      <p>{card.title}</p>
      <p>Priority: {card.priority}</p>
      <p>{card.description}</p>
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
