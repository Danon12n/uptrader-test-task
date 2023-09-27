import { Link, useLocation } from 'react-router-dom';
import ColumnCard from '../card/column-card';
import './column.scss';
type Props = {
  title?: string;
};

export default function Column({ title = 'no title' }: Props) {
  const location = useLocation();

  return (
    <div className='column'>
      <p className='column__title'>{title}</p>
      <Link
        to={{
          pathname: 'card/1',
        }}
        state={{ background: location }}
        relative='path'
      >
        <ColumnCard />
      </Link>
      <Link to={'/card/2'} state={{ background: location }}>
        <ColumnCard />
      </Link>
      <Link to={'/card/3'}>
        <ColumnCard />
      </Link>
      <div>Add more cards</div>
    </div>
  );
}
