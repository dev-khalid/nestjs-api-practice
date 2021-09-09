import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { Request } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //if there is any query string then
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(
        `There is not task found with this id: ${id}`,
      );
    } else {
      return task;
    }
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body('status') updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto; //destructuring er jonne type implecitly bole dewar proyojon hoy na
    return this.tasksService.updateTaskById(id, status);
  }
  @Post()
  createPost(
    @Body() createTaskDto: CreateTaskDto,
    // @Body() body, //this is the way to get all the body data in json formate.
    // @Body('title') title: string,
    // @Body('description') description: string,
  ): Task {
    // console.log('Body data: ', body);
    return this.tasksService.createTask(createTaskDto);
  }
}
