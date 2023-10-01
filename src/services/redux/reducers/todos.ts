import { TComment, TSubComment, TTodoCard } from '../../../utils/types';
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
      creationDate: new Date(1695559452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 2,
      title: 'new Card2',
      description: '',
      status: 'Done',
      priority: 'medium',
      creationDate: new Date(1695669452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 3,
      title: 'new Card3',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(1695779452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 4,
      title: 'new Card4',
      description: '',
      status: 'Done',
      priority: 'low',
      creationDate: new Date(1695889452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 5,
      title: 'new Card5',
      description: '',
      status: 'Development',
      priority: 'medium',
      creationDate: new Date(1695999452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 6,
      title: 'new Card6',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(1695479452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 7,
      title: 'new Card7',
      description: '',
      status: 'Queue',
      priority: 'low',
      creationDate: new Date(1694459452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 8,
      title: 'new Card8',
      description: '',
      status: 'Development',
      priority: 'medium',
      creationDate: new Date(1693359452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 9,
      title: 'new Card9',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(1692259452232),
      subTodos: [],
      comments: [],
    },
    {
      number: 10,
      title: 'new Card10',
      description: '',
      status: 'Development',
      priority: 'high',
      creationDate: new Date(1691159452232),
      subTodos: [],
      comments: [],
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

      return {
        ...state,
        todos: [...newTodos],
      };
    case 'ADD_SUBTODO':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.subTodos.push(action.payload.subtodo);
            }
            return todo;
          }),
        ],
      };
    case 'UPDATE_SUBTODO_TITLE':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.subTodos[action.payload.index].title = action.payload.title;
            }
            return todo;
          }),
        ],
      };
    case 'UPDATE_SUBTODO_STATUS':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.subTodos[action.payload.index].done = !todo.subTodos[action.payload.index].done;
            }
            return todo;
          }),
        ],
      };
    case 'DELETE_SUBTODO':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.subTodos.splice(action.payload.index, 1);
            }
            return todo;
          }),
        ],
      };

    case 'ADD_COMMENT':
      const newComment: TComment = {
        text: action.payload.text,
        date: new Date(),
        subComments: [],
      };
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.comments.push({ ...newComment });
            }
            return todo;
          }),
        ],
      };
    case 'UPDATE_COMMENT':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.comments[action.payload.index].text = action.payload.text;
            }
            return todo;
          }),
        ],
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.comments.splice(action.payload.index, 1);
            }
            return todo;
          }),
        ],
      };
    case 'ADD_SUBCOMMENT':
      const newSubComment: TSubComment = {
        text: action.payload.text,
        date: new Date(),
      };
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.comments = todo.comments.map((comment, index) => {
                if (index === action.payload.commentIndex) {
                  comment.subComments.push(newSubComment);
                }
                return comment;
              });
            }
            return todo;
          }),
        ],
      };
    case 'UPDATE_SUBCOMMENT':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.comments = todo.comments.map((comment, index) => {
                if (index === action.payload.commentIndex) {
                  comment.subComments[action.payload.subCommentIndex].text = action.payload.text;
                  comment.subComments[action.payload.subCommentIndex].date = new Date();
                }
                return comment;
              });
            }
            return todo;
          }),
        ],
      };

    case 'DELETE_SUBCOMMENT':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.comments = todo.comments.map((comment, index) => {
                if (index === action.payload.commentIndex) {
                  console.log(comment.subComments);

                  comment.subComments.splice(action.payload.subCommentIndex, 1);
                }
                return comment;
              });
            }
            return todo;
          }),
        ],
      };
    default:
      return state;
  }
}
