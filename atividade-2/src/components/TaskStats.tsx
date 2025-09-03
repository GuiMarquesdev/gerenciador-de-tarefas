import { Task } from "./TaskItem";
import { CheckCircle, XCircle, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
          <div className="p-2 bg-gray-500 rounded-lg">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm  text-primary font-bold">Total</p>
            <p className="text-2xl font-bold text-foreground">{totalCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-[var(--shadow-task)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2  bg-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-primary font-bold">Concluídas</p>
            <p className="text-2xl font-bold text-foreground">
              {completedCount}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-[var(--shadow-task)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-700 rounded-lg">
            <XCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-primary font-bold">Pendentes</p>
            <p className="text-2xl font-bold text-foreground">
              {totalCount - completedCount}
            </p>
          </div>
        </div>
      </div>

      {totalCount > 0 && (
        <div className="md:col-span-3 bg-card border border-border rounded-lg p-4 shadow-[var(--shadow-task)]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-primary ">Progresso</p>
            <p className="text-sm font-medium text-primary">
              {completionRate}%
            </p>
          </div>
          <Progress value={completionRate} className="h-2 bg-muted" />
        </div>
        /* apenas importamos o componente progress para subistituir o css da div class name
         */
      )}
    </div>
  );
};
