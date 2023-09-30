import { TTodoCard } from '../../../utils/types';

export type TTodosState = TTodoCard[];

const initialState: TTodosState = [
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
    status: 'Queue',
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
];

export function todos(state = initialState, action: any) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat(action.text);
    default:
      return state;
  }
}
