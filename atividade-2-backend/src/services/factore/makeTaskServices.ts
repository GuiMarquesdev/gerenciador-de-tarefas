import { PrismaTaskRepository } from "../../repositories/prisma/prisma-taskrepository";
import { CreateTaskService } from "../create-task";

export function makeCreateTaskService() {
  const tasksRepository = new PrismaTaskRepository();

  return new CreateTaskService(tasksRepository);
}
