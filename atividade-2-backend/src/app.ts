import fastify from "fastify";
import { tasksRoutes } from "./http/controlles/tasks/routes";
export const app = fastify();
app.register(tasksRoutes, {
  prefix: "/tasks",
});
