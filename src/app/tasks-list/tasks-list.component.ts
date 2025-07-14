import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Task} from '../model/task-model';
import {TaskService} from '../services/task-service';
import {TaskAddComponent} from '../task-add/task-add.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {MatInputModule, MatLabel} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    TaskAddComponent,
    FormsModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns = ['title', 'description', 'status', 'actions'];
  showAddForm = false;
  filterText = '';

  constructor(private taskService: TaskService, private router: Router) {
    this.taskService.getTasks()
      .pipe(takeUntilDestroyed())
      .subscribe(tasks => {
        this.dataSource.data = tasks ?? [];
      });
  }

  ngOnInit() {
  }

  applyFilter() {
    const filterValue = this.filterText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  openDetails(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
    this.showAddForm = false;
  }
}
