import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { Request } from '@nestjs/common';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
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
