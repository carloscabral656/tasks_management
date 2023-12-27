import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { filter } from 'rxjs';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description, finishBy } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            finishBy,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if(status) {
            tasks = tasks.filter((task: Task) => task.status === status);
        }

        if(search){
            tasks = tasks.filter((task: Task) => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
                return false;
            });
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find((task: Task) => task.id === id);
        return task;
    }

    deleteTask(id: string){
        const index = this.tasks.findIndex((task: Task) => task.id === id);
        const task = this.tasks.splice(index, 1);
        return !!task;
    }

    updateStatusTask(id: string, status: TaskStatus) :Task {
        const task = this.tasks.find((task: Task) => task.id === id);
        task.status = status;
        return task;
    }

}
