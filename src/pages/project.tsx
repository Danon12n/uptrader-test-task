// type Props = {}

import './project.scss';
import Column from '../components/column/column';
import { Link } from 'react-router-dom';

type TTodo = {
  number: number;
  title: string;
  description: string;
  status: 'Queue' | 'Development' | 'Done';
  priority: 'low' | 'medium' | 'high';
  creationDate: number;
  workingTime: number;
  completeDate?: number;
  subTodos: [];
  comments: string[];
};

export default function ProjectPage() {
  return (
    <div>
      <div className='topMenu__container'>
        <Link to={'/'}>
          <p>Home</p>
        </Link>
        <p>Project Title</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
      <div className='columns__container'>
        <Column title='Queue' />
        <Column title='Development' />
        <Column title='Done' />
      </div>
    </div>
  );
}
