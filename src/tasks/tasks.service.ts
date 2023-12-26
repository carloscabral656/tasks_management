import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

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

    getTaskById(id: string): Task {
        const task = this.tasks.find((task: Task) => task.id === id);
        return task;
    }

}
