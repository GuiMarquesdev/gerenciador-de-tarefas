import { Prisma, Task } from "@prisma/client";
import { TasksRepository } from "../tasks-repository";
import { prisma } from "../../lib/prisma";
export class PrismaTaskRepository implements TasksRepository {
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await prisma.task.create({
      data,
    });
    return task;
  }
}
