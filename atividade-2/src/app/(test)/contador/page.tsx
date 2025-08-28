"use client";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Task, TaskItem } from "@/components/TaskItem";
import { TaskStats } from "@/components/TaskStats";
import { Button } from "@/components/ui/button";
import { CheckSquare, Sparkles } from "lucide-react";
import { useState } from "react";
export default function ContadorPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-[var(--gradient-primary)] rounded-2xl shadow-[var(--shadow-glow)]">
              <CheckSquare className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organize suas tarefas de forma simples e eficiente. Mantenha o foco
            no que realmente importa.
          </p>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Add Task Form */}
        <div className="mb-8">
          <AddTaskForm onAddTask={addTask} />
        </div>

        {/* Tasks List */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Pendentes ({pendingTasks.length})
              </h2>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    // onDelete={deleteTask}
                    // onEdit={editTask}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Concluídas ({completedTasks.length})
              </h2>
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    // onDelete={deleteTask}
                    // onEdit={editTask}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {tasks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Nenhuma tarefa ainda
              </h3>
              <p className="text-muted-foreground">
                Comece adicionando sua primeira tarefa acima!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
