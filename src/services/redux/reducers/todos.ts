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
      title: 'Eat',
      description: '',
      status: 'Queue',
      priority: 'low',
      creationDate: new Date(1695559452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 2,
      title: 'Sleep',
      description: '',
      status: 'Done',
      priority: 'medium',
      creationDate: new Date(1695669452232),
      completeDate: new Date(1696769452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 3,
      title: 'Work',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(1695779452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 4,
      title: 'More Work',
      description: '',
      status: 'Done',
      priority: 'low',
      creationDate: new Date(1695889452232),
      completeDate: new Date(1696769452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 5,
      title: 'More Eat',
      description: '',
      status: 'Development',
      priority: 'medium',
      creationDate: new Date(1695999452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 6,
      title: 'More Sleep',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(1695479452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 7,
      title: 'Work and Sleep',
      description: '',
      status: 'Queue',
      priority: 'low',
      creationDate: new Date(1694459452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 8,
      title: 'sleep and sleep',
      description: '',
      status: 'Development',
      priority: 'medium',
      creationDate: new Date(1693359452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 9,
      title: 'Eat and Eat',
      description: '',
      status: 'Queue',
      priority: 'high',
      creationDate: new Date(1692259452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
    },
    {
      number: 10,
      title: 'Do some foood',
      description: '',
      status: 'Development',
      priority: 'high',
      creationDate: new Date(1691159452232),
      subTodos: [],
      comments: [],
      attachedFiles: [],
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
    case 'CHANGE_TODO_PRIORITY':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.priority = action.payload.priority;
            }
            return todo;
          }),
        ],
      };
    case 'CHANGE_TODO_TITLE':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.title = action.payload.title;
            }
            return todo;
          }),
        ],
      };
    case 'CHANGE_TODO_DESCRIPTION':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.description = action.payload.description;
            }
            return todo;
          }),
        ],
      };
    case 'CHANGE_TODO_STATUS':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.status = action.payload.status;
              if (action.payload.status === 'Done') {
                todo.completeDate = new Date();
              } else {
                todo.completeDate = undefined;
              }
            }
            return todo;
          }),
        ],
      };
    case 'ADD_ATTACHED_FILE':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.attachedFiles.push(action.payload.url);
            }
            return todo;
          }),
        ],
      };
    case 'DELETE_ATTACHED_FILE':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.number === action.payload.number) {
              todo.attachedFiles.splice(action.payload.index, 1);
            }
            return todo;
          }),
        ],
      };
    default:
      return state;
  }
}
