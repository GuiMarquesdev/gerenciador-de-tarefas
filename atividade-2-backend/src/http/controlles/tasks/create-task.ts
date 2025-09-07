import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateTaskService } from "../../../services/factore/makeTaskServices";
import { text } from "stream/consumers";

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z.object({
    text: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be less than 255 characters"),
  });

  try {
    const { text } = createTaskBodySchema.parse(request.body);

    const createTaskService = makeCreateTaskService();

    const { task } = await createTaskService.execute({
      text,
    });

    return reply.status(201).send({
      task: {
        id: task.id,
        title: task.text,
        completed: task.completed,
        createdAt: task.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        issues: error.format(),
      });
    }

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    return reply.status(500).send({
      message: "Internal server error",
    });
  }
}
