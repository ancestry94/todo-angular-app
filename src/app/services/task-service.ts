import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from '../model/task-model';
import {TaskStatus} from '../enum/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {id: 1, title: 'Первая задача', description: 'Описание первой задачи', status: TaskStatus.New},
    {id: 2, title: 'Вторая задача', description: 'Описание второй задачи', status: TaskStatus.InProgress}
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  // Метод для получения Observable с задачами
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next([...this.tasks]);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = {...updatedTask};
      this.tasksSubject.next(this.tasks);
    }
  }
}
