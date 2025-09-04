// src/components/TaskHistory.tsx
import * as React from "react";
import { format } from "date-fns";
import { History } from "lucide-react";
import { TaskHistoryEntry } from "./TaskItem"; // Importamos a interface do arquivo TaskItem

interface TaskHistoryProps {
  history: TaskHistoryEntry[];
}

export const TaskHistory = ({ history }: TaskHistoryProps) => {
  return (
    <>
      {history.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Histórico de Ações
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {history.map((entry, index) => (
              <li
                key={index}
                className="bg-card border border-border rounded-md p-3 shadow-sm"
              >
                <span className="font-medium text-foreground">
                  [{format(entry.timestamp, "dd/MM/yyyy HH:mm:ss")}]
                </span>{" "}
                Ação: <span className="font-semibold">{entry.action}</span> -
                Tarefa: <span className="italic">"{entry.task.text}"</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
