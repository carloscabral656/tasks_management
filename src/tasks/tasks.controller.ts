import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get } from '@nestjs/common';
import { Task } from './task.model';

@Controller('/tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }
}
