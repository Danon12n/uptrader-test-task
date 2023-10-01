import { boundTodoActions } from '../../../services/redux/action/todos';
import { TPriority } from '../../../utils/types';
import './priority-editor.scss';

type Props = { todoNumber: number; priority: TPriority };

export default function PriorityEditor({ todoNumber, priority }: Props) {
  return (
    <div className='priorityEditor'>
      <h3>Priority:</h3>
      <select
        onChange={(e) => {
          boundTodoActions.changeTodoPriority(todoNumber, e.target.value as TPriority);
        }}
      >
        <option selected={priority === 'low'} value={'low'}>
          low
        </option>
        <option selected={priority === 'medium'} value={'medium'}>
          medium
        </option>
        <option selected={priority === 'high'} value={'high'}>
          high
        </option>
      </select>
    </div>
  );
}
