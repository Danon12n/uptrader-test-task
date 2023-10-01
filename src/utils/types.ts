export type TTodoCard = {
  number: number;
  title: string;
  description: string;
  status: TStatus;
  priority: 'low' | 'medium' | 'high';
  creationDate: Date;
  completeDate?: Date;
  subTodos: TSubTodo[];
  comments?: string[];
  attachedFiles?: string[];
};

export type TSubTodo = {
  title: string;
  done: boolean;
};

export type TStatus = 'Queue' | 'Development' | 'Done';
