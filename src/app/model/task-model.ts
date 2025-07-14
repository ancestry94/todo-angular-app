import {TaskStatus} from '../enum/task-status.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
