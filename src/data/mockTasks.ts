import type { Task } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Finish take-home setup',
    description: 'Set up Expo Router, TypeScript types, and Git feature branches.',
    status: 'pending',
  },
  {
    id: 'task-2',
    title: 'Build Task List screen',
    description: 'Render tasks with title, description, and status in a list.',
    status: 'pending',
  },
  {
    id: 'task-3',
    title: 'Add edit/delete/toggle',
    description: 'Implement basic CRUD behaviors using React hooks state.',
    status: 'completed',
  },
];
