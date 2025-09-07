import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";

interface CreateTaskRequest {
  text: string;
}

interface CreateTaskResponse {
  task: Task;
}

export class CreateTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ text }: CreateTaskRequest): Promise<CreateTaskResponse> {
    const task = await this.tasksRepository.create({ text });

    return {
      task,
    };
  }
}
