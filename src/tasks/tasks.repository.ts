import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

// Need to be the Task Entity
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    
}