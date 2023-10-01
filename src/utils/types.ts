export type TTodoCard = {
  number: number;
  title: string;
  description: string;
  status: TStatus;
  priority: 'low' | 'medium' | 'high';
  creationDate: Date;
  completeDate?: Date;
  subTodos?: [];
  comments?: string[];
};

export type TStatus = 'Queue' | 'Development' | 'Done';
