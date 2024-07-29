import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Instalar Angular CLI',
      completed: false
    },
    {
      id: 2,
      title: 'Crear Proyecto',
      completed: false
    },
  ]);

  addTask(title: string) {
    const newTask = {
      id: this.tasks().length + 1,
      title,
      completed: false
    };
    this.tasks.update((tasks) => [...tasks, newTask])
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask)
    input.value = ''
  };

  deleteTask(index: number) {
    this.tasks.update((tasks) => (
      tasks.filter((task, position) => position !== index)
    ));
  };

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          };
        };
        return task;
      });
    });
  }; 
}
