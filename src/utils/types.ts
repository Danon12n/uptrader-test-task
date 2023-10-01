export type TTodoCard = {
  number: number;
  title: string;
  description: string;
  status: TStatus;
  priority: TPriority;
  creationDate: Date;
  completeDate?: Date;
  subTodos: TSubTodo[];
  comments: TComment[];
  attachedFiles?: string[];
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
