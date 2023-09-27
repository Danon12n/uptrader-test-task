// type Props = {}

import './project.scss';
import Column from '../components/column/column';

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
        <p>Home</p>
        <p>Project Title</p>
        <p>Current time</p>
      </div>
      <div className='columns__container'>
        <Column title='Queue' />
        <Column title='Development' />
        <Column title='Done' />
      </div>
    </div>
  );
}
