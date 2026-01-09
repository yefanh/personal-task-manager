export type TaskStatus = 'pending' | 'completed';

export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  description: string;
  status: TaskStatus;
}
