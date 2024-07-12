export type Task = {
  id: string;
  title: string;
  description: string;
  storyPoints: 3 | 5 | 8 | 13 | 21;
  state: 'todo' | 'inProgress' | 'onHold' | 'done'
};


