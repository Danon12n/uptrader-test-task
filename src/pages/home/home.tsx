// type Props = {};

import { Link } from 'react-router-dom';
import './home.scss';

export default function HomePage() {
  return (
    <div className='projects__list'>
      <Link className='projects__list__link' to={'/project/1'}>
        Project 1
      </Link>
      <Link className='projects__list__link' to={'/project/1'}>
        Project 2
      </Link>
      <Link className='projects__list__link' to={'/project/1'}>
        Project 3
      </Link>
    </div>
  );
}
