import { Task } from "./TaskItem";
import { CheckCircle, Circle, Target } from "lucide-react";

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-card border border-border rounded-lg p-4 shadow-[var(--shadow-task)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">{totalCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-[var(--shadow-task)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <CheckCircle className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Concluídas</p>
            <p className="text-2xl font-bold text-foreground">
              {completedCount}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-[var(--shadow-task)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-lg">
            <Circle className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pendentes</p>
            <p className="text-2xl font-bold text-foreground">
              {totalCount - completedCount}
            </p>
          </div>
        </div>
      </div>

      {totalCount > 0 && (
        <div className="md:col-span-3 bg-card border border-border rounded-lg p-4 shadow-[var(--shadow-task)]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Progresso</p>
            <p className="text-sm font-medium text-primary">
              {completionRate}%
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-[var(--gradient-accent)] h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
