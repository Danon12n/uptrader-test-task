import { TSubTodo } from '../../utils/types';
import './sub-todos.scss';
import { boundTodoActions } from '../../services/redux/action/todos';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';

type Props = { todoNumber: number; subtodos: TSubTodo[] };

export default function SubTodos({ todoNumber, subtodos }: Props) {
  const addSubTodo = () => {
    const newSubTodo: TSubTodo = { title: 'New Subtodo', done: false };
    boundTodoActions.addSubTodo(todoNumber, newSubTodo);
  };

  return (
    <div className='subTodos__container'>
      <h3>SubTodos:</h3>
      {subtodos.map((subtodo, index) => {
        return (
          <div className='subTodo'>
            <input
              type='text'
              value={subtodo.title}
              onChange={(e) => {
                boundTodoActions.updateSubTodoTitle(todoNumber, index, e.target.value);
              }}
              className='subTodo__title'
            />
            <p
              onClick={() => {
                boundTodoActions.updateSubTodoStatus(todoNumber, index);
              }}
              className={subtodo.done ? 'green' : 'red'}
            >
              {subtodo.done ? 'Done' : 'Not Done'}
            </p>
            <FiTrash
              onClick={() => {
                boundTodoActions.deleteSubTodo(todoNumber, index);
              }}
              size={25}
            />
          </div>
        );
      })}
      <button onClick={addSubTodo}>add SubTodo</button>
    </div>
  );
}
