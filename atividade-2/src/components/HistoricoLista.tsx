import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { RegistroHistorico, FiltroTipo } from "@/types/counter";
import { TrendingUp, TrendingDown, RotateCcw } from "lucide-react";

interface HistoricoListaProps {
  historico: RegistroHistorico[];
  filtro: FiltroTipo;
}

const HistoricoLista = ({ historico, filtro }: HistoricoListaProps) => {
  const historicoFiltrado = historico.filter((registro) => {
    if (filtro === "todos") return true;
    return registro.tipo === filtro;
  });

  const getIconeETipo = (tipo: "incremento" | "decremento" | "reset") => {
    switch (tipo) {
      case "incremento":
        return {
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-success",
          bgColor: "bg-success/10",
        };
      case "decremento":
        return {
          icon: <TrendingDown className="w-4 h-4" />,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
        };
      case "reset":
        return {
          icon: <RotateCcw className="w-4 h-4" />,
          color: "text-warning",
          bgColor: "bg-warning/10",
        };
    }
  };

  return (
    <div className="card-gradient p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-foreground">Histórico</h3>
        <span className="text-sm text-muted-foreground">
          {historicoFiltrado.length}{" "}
          {historicoFiltrado.length === 1 ? "ação" : "ações"}
        </span>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2 custom-scrollbar">
        {historicoFiltrado.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma ação encontrada
          </p>
        ) : (
          historicoFiltrado.map((registro) => {
            const { icon, color, bgColor } = getIconeETipo(registro.tipo);

            return (
              <div
                key={registro.id}
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50 animate-slide-up"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${bgColor}`}>
                    <span className={color}>{icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {registro.tipo}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(registro.timestamp, "HH:mm:ss", { locale: ptBR })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-sm font-bold ${color}`}>
                    {registro.valorAnterior} → {registro.valor}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HistoricoLista;
