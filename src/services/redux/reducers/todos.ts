import { TTodoCard } from '../../../utils/types';
import { TTodoAction } from '../action/todos';

export type TTodosState = {
  todos: TTodoCard[];
};

const freeTodoNumbers: number[] = [];
const initialState: TTodosState = {
  todos: [
    {
      number: 1,
      title: 'new Card1',
      description: '',
      status: 'Queue',
      priority: 'low',
      creationDate: new Date(2453473452224),
    },
    {
      number: 2,
      title: 'new Card2',
      description: '',
      status: 'Done',
      priority: 'medium',
      creationDate: new Date(3453473452224),
    },
    {
      number: 3,
      title: 'new Card3',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(13534734522324),
    },
    {
      number: 4,
      title: 'new Card4',
      description: '',
      status: 'Done',
      priority: 'low',
      creationDate: new Date(2453473452224),
    },
    {
      number: 5,
      title: 'new Card5',
      description: '',
      status: 'Development',
      priority: 'medium',
      creationDate: new Date(3453473452224),
    },
    {
      number: 6,
      title: 'new Card6',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(13534734522324),
    },
    {
      number: 7,
      title: 'new Card7',
      description: '',
      status: 'Queue',
      priority: 'low',
      creationDate: new Date(2453473452224),
    },
    {
      number: 8,
      title: 'new Card8',
      description: '',
      status: 'Development',
      priority: 'medium',
      creationDate: new Date(3453473452224),
    },
    {
      number: 9,
      title: 'new Card9',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(13534734522324),
    },
    {
      number: 10,
      title: 'new Card10',
      description: '',
      status: 'Development',
      priority: 'high',
      creationDate: new Date(13534734522324),
    },
  ],
};

export function todos(state = initialState, action: TTodoAction) {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo = { ...action.payload };
      if (freeTodoNumbers.length === 0) {
        newTodo.number = state.todos.length + 1;
      } else {
        newTodo.number = freeTodoNumbers[0];
        freeTodoNumbers.shift();
      }
      return { ...state, todos: [...state.todos, newTodo] };
    case 'UPDATE_TODO':
      const updatedTodos = [...state.todos].filter((todo) => todo.number !== action.payload.number);
      updatedTodos.push(action.payload.todo);
      return {
        ...state,
        todos: [...updatedTodos],
      };
    case 'DELETE_TODO':
      const newTodos = [...state.todos].filter((todo) => {
        if (todo.number === action.payload) {
          freeTodoNumbers.push(action.payload);
        } else {
          return todo;
        }
      });
      console.log(newTodos);

      return {
        ...state,
        todos: [...newTodos],
      };
    default:
      return state;
  }
}
