// src/app/(test)/contador/page.tsx
"use client";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Task, TaskItem, TaskHistoryEntry } from "@/components/TaskItem";
import { TaskStats } from "@/components/TaskStats";
import { Button } from "@/components/ui/button";
import { CheckSquare, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { TaskHistory } from "@/components/TaskHistory"; // Importamos o novo componente aqui

export default function ContadorPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [history, setHistory] = useState<TaskHistoryEntry[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);

    const newHistoryEntry: TaskHistoryEntry = {
      action: "add",
      task: newTask,
      timestamp: new Date(),
    };
    setHistory((prev) => [newHistoryEntry, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const toggledTask = { ...task, completed: !task.completed };
          const newHistoryEntry: TaskHistoryEntry = {
            action: "toggle",
            task: toggledTask,
            timestamp: new Date(),
          };
          setHistory((prev) => [newHistoryEntry, ...prev]);
          return toggledTask;
        }
        return task;
      })
    );
  };

  const editTask = (id: string, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);

    const editedTask = updatedTasks.find((task) => task.id === id);
    if (editedTask) {
      const newHistoryEntry: TaskHistoryEntry = {
        action: "edit",
        task: editedTask,
        timestamp: new Date(),
      };
      setHistory((prev) => [newHistoryEntry, ...prev]);
    }
  };

  const deleteTask = (id: string) => {
    const deletedTask = tasks.find((task) => task.id === id);
    if (deletedTask) {
      const newHistoryEntry: TaskHistoryEntry = {
        action: "delete",
        task: deletedTask,
        timestamp: new Date(),
      };
      setHistory((prev) => [newHistoryEntry, ...prev]);
    }
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompletedTasks = () => {
    const completed = tasks.filter((task) => task.completed);
    if (completed.length > 0) {
      const newHistoryEntry: TaskHistoryEntry = {
        action: "clearCompleted",
        task: {
          ...completed[0],
          text: `${completed.length} tarefas concluídas`,
        },
        timestamp: new Date(),
      };
      setHistory((prev) => [newHistoryEntry, ...prev]);
    }
    setTasks((prev) => prev.filter((task) => !task.completed));
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
              <CheckSquare className="w-8 h-8  text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-primary">TaskFlow do Dia</h1>
            <Sparkles className="w-6 h-6 text-primary " />
          </div>
          <p className="text-lg max-w-2xl mx-auto text-primary font-bold">
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

        {/* Botão de limpar tarefas concluídas */}
        {completedTasks.length > 0 && (
          <div className="text-right mb-4">
            <Button
              variant="destructive"
              onClick={clearCompletedTasks}
              className="hover:shadow-[var(--shadow-glow-destructive)] transition-all duration-300 hover:scale-105"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Concluídas
            </Button>
          </div>
        )}

        {/* Tasks List */}
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna para Tarefas Pendentes */}
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
                      onDelete={deleteTask}
                      onEdit={editTask}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Coluna para Tarefas Concluídas */}
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
                      onDelete={deleteTask}
                      onEdit={editTask}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Estado Vazio */
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Nenhuma tarefa ainda
            </h3>
            <p className="text-xl font-semibold mb-2 text-foreground">
              Comece adicionando sua primeira tarefa acima!
            </p>
          </div>
        )}

        {/* Renderiza o novo componente de histórico */}
        <TaskHistory history={history} />
      </div>
    </div>
  );
}
