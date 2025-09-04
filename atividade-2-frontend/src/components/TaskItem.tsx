import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Trash2, Edit3, X, CheckCircle, XCircle } from "lucide-react";
import { Input } from "./ui/input";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskHistoryEntry {
  action: "add" | "edit" | "delete" | "toggle" | "clearCompleted";
  task: Task;
  timestamp: Date;
} // Nova interface para o histórico

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isButtonHovered, setIsButtonHovered] = useState(false); // Novo estado

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-4 rounded-lg transition-all duration-300",
        "bg-card border border-border shadow-[var(--shadow-task)]",
        "hover:shadow-[var(--shadow-card)] hover:scale-[1.01]",
        "animate-slide-in",
        task.completed && "opacity-60"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "shrink-0 p-2 rounded-lg transition-colors duration-300",
          isButtonHovered || task.completed ? "bg-green-800" : "bg-red-700"
        )}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        {isButtonHovered || task.completed ? (
          <CheckCircle className="w-5 h-5 text-accent-foreground" />
        ) : (
          <XCircle className="w-5 h-5 text-accent-foreground" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 h-8 border-primary/50 focus:border-primary"
              autoFocus
            />
            <Button
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <p
            className={cn(
              "text-sm font-medium transition-all duration-300",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.text}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isEditing && !task.completed && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
