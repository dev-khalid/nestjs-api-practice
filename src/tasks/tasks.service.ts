import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    console.log(status, search);
    let tasks;
    if (status) {
      tasks = this.tasks.filter((t) => t.status === status);
    }
    if (search)
      tasks = this.tasks.filter((t) => {
        if (t.title.includes(search) || t.description.includes(search)) {
          return true;
        }
        return false;
      });
    return tasks;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string) {
    this.tasks.filter((t) => t.id !== id);
  }
}
