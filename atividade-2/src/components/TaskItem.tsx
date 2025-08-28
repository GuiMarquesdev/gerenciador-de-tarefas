import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Check, Trash2, Edit3, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  //   onDelete: (id: string) => void;
  //   onEdit: (id: string, newText: string) => void;
}

export const TaskItem = ({
  task,
  onToggle,
}: //   onDelete,
//   onEdit,
TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  //   const handleEdit = () => {
  //     if (editText.trim()) {
  //       onEdit(task.id, editText.trim());
  //       setIsEditing(false);
  //     }
  //   };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  //   const handleKeyPress = (e: React.KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       handleEdit();
  //     } else if (e.key === "Escape") {
  //       handleCancel();
  //     }
  //   };

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
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="w-5 h-5 rounded-full border-2 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              //   onKeyDown={handleKeyPress}
              className="flex-1 h-8 border-primary/50 focus:border-primary"
              autoFocus
            />
            <Button
              size="sm"
              //   onClick={handleEdit}
              className="h-8 w-8 p-0 bg-accent hover:bg-accent-glow"
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
          // onClick={() => onDelete(task.id)}
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
