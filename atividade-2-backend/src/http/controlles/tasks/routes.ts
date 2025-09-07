import { FastifyInstance } from "fastify";
import { createTask } from "./create-task";

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/", createTask);
}
