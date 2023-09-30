import { Link, useLocation } from 'react-router-dom';
import ColumnCard from '../card/column-card';
import './column.scss';
import { TTodoCard } from '../../utils/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TTodosState } from '../../services/redux/reducers/todos';
import { TStore } from '../../services/redux/reducers';
type Props = {
  title?: string;
};

export default function Column({ title = 'no title' }: Props) {
  const location = useLocation();

  const columnCards = useSelector<TStore, TTodosState>((store) => store.todos);

  const CreateCard = () => {
    const newCard: TTodoCard = {
      number: 1,
      title: 'new Card',
      description: '',
      status: 'Queue',
      priority: 'low',
      creationDate: new Date(),
    };

    // setColumnCards([...columnCards, newCard]);
  };

  return (
    <div className='column'>
      <p className='column__title'>{title}</p>
      {columnCards.map((card) => {
        return (
          <Link to={`card/${card.number}`} state={{ background: location }}>
            <ColumnCard card={card} />
          </Link>
        );
      })}
      <button onClick={CreateCard}>Add more cards</button>
    </div>
  );
}
