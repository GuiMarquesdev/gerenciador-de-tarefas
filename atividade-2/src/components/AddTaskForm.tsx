import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 bg-card border border-border rounded-lg shadow-[var(--shadow-task)]"
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicionar nova tarefa..."
        className="flex-1 border-border focus:border-primary focus:ring-primary/20"
      />
      <Button
        type="submit"
        className="bg-[var(--gradient-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar
      </Button>
    </form>
  );
};
