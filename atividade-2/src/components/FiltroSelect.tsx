import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FiltroTipo } from "@/types/counter";

interface FiltroSelectProps {
  filtro: FiltroTipo;
  onFiltroChange: (filtro: FiltroTipo) => void;
}

const FiltroSelect = ({ filtro, onFiltroChange }: FiltroSelectProps) => {
  return (
    <div className="mb-6">
      <label className="text-sm font-medium text-muted-foreground mb-2 block">
        Filtrar Histórico
      </label>
      <Select value={filtro} onValueChange={onFiltroChange}>
        <SelectTrigger className="w-full bg-card border-border/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="todos">Todas as Ações</SelectItem>
          <SelectItem value="incremento">Apenas Incrementos</SelectItem>
          <SelectItem value="decremento">Apenas Decrementos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FiltroSelect;
