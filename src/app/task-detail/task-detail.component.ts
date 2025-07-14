import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {TaskService} from '../services/task-service';
import {Task} from '../model/task-model';
import {MatButtonModule} from '@angular/material/button';
import {TaskStatus} from '../enum/task-status.enum';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatFormField, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatOption, MatSelect, MatLabel, MatFormField, MatSelect],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;
  editedStatus: TaskStatus | undefined;
  taskStatuses = Object.values(TaskStatus);

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      this.task = this.taskService.getTaskById(id);
      this.editedStatus = this.task?.status;
    }

    if (!this.task) {
      this.router.navigate(['/tasks']);
    }
  }

  save() {
    if (this.task && this.editedStatus && this.editedStatus !== this.task.status) {
      this.task.status = this.editedStatus;
      this.taskService.updateTask(this.task);
    }
  }

  cancel() {
    this.editedStatus = this.task?.status;
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
