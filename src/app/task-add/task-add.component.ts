import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskStatus } from '../enum/task-status.enum';
import { Task } from '../model/task-model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  @Output() saveTask = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  description = '';
  status: TaskStatus = TaskStatus.New;
  TaskStatus = TaskStatus;

  save() {
    if (this.title.trim()) {
      this.saveTask.emit({
        id: Date.now(),
        title: this.title,
        description: this.description,
        status: this.status
      });
      this.resetForm();
    }
  }

  cancelForm() {
    this.cancel.emit();
    this.resetForm();
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.status = TaskStatus.New;
  }
}
