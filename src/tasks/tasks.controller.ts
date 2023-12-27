import { Controller, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Get } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Query } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { filter } from 'rxjs';

@Controller('/tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {

        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }else{
            return this.tasksService.getAllTasks();
        }
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
       return this.tasksService.createTask(createTaskDto); 
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    /** 
     * DTOs in just one argument are not supported.
     * 
    */
    @Patch('/:id/status')
    updateStatusTask(@Param('id') id: string, @Body('status') status: TaskStatus): Task{
        return this.tasksService.updateStatusTask(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string){
        return this.tasksService.deleteTask(id);
    }
}

