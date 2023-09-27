import ColumnCard from './card/column-card';
import './column.scss';
type Props = {
  title?: string;
};

export default function Column({ title = 'no title' }: Props) {
  return (
    <div className='column'>
      <p className='column__title'>{title}</p>
      <ColumnCard />
      <ColumnCard />
      <ColumnCard />
      <div>Add more cards</div>
    </div>
  );
}
