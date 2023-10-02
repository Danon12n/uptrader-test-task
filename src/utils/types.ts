import { TTodosState } from '../services/redux/reducers/todos';

export type TTodoCard = {
  number: number;
  title: string;
  description: string;
  status: TStatus;
  priority: TPriority;
  creationDate: string;
  completeDate?: string;
  subTodos: TSubTodo[];
  comments: TComment[];
  attachedFiles: string[];
};

export type TPriority = 'low' | 'medium' | 'high';

export type TComment = {
  text: string;
  date: Date;
  subComments: TSubComment[];
};

export type TSubComment = {
  text: string;
  date: Date;
};

export type TSubTodo = {
  title: string;
  done: boolean;
};

export type TStatus = 'Queue' | 'Development' | 'Done';

export type TPorjectMeta = {
  id: string;
  title: string;
};
export type TProject = TTodosState;
