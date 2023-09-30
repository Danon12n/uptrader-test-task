import { TTodoCard } from '../../utils/types';
import './column-card.scss';

type Props = { card: TTodoCard };

export default function ColumnCard({ card }: Props) {
  return (
    <div className='column__card'>
      <p>{card.title}</p>
      <p>Priority: {card.priority}</p>
      <p>{card.description}</p>
      <p>{card.creationDate.toLocaleDateString()}</p>
    </div>
  );
}
