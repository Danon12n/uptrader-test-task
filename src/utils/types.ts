export type TTodoCard = {
    number: number;
    title: string;
    description: string;
    status: 'Queue' | 'Development' | 'Done';
    priority: 'low' | 'medium' | 'high';
    creationDate: Date;
    completeDate?: Date;
    subTodos?: [];
    comments?: string[];
  };