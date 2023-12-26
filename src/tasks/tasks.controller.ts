import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get } from '@nestjs/common';
import { Task } from './task.model';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Query } from '@nestjs/common';
import { Param } from '@nestjs/common';

@Controller('/tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
       return this.tasksService.createTask(createTaskDto); 
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }
}
