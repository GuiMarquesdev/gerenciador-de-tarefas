import type { CardEstatisticaProps } from "@/types/counter";

const CardEstatistica = ({
  titulo,
  valor,
  tipo,
  icon,
}: CardEstatisticaProps) => {
  const getCardStyle = (tipo: string) => {
    switch (tipo) {
      case "incrementos":
        return "border-success/20 bg-gradient-to-br from-success/10 to-success/5";
      case "decrementos":
        return "border-destructive/20 bg-gradient-to-br from-destructive/10 to-destructive/5";
      case "atual":
        return "border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5";
      default:
        return "border-border/20 bg-gradient-to-br from-card to-muted/20";
    }
  };

  const getValueColor = (tipo: string) => {
    switch (tipo) {
      case "incrementos":
        return "text-success";
      case "decrementos":
        return "text-destructive";
      case "atual":
        return "text-primary";
      default:
        return "text-foreground";
    }
  };

  const getIconColor = (tipo: string) => {
    switch (tipo) {
      case "incrementos":
        return "text-success bg-success/10";
      case "decrementos":
        return "text-destructive bg-destructive/10";
      case "atual":
        return "text-primary bg-primary/10";
      default:
        return "text-muted-foreground bg-muted/30";
    }
  };

  return (
    <div
      className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${getCardStyle(
        tipo
      )}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getIconColor(tipo)}`}>{icon}</div>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {titulo}
        </p>
        <p className={`text-3xl font-bold ${getValueColor(tipo)}`}>{valor}</p>
      </div>
    </div>
  );
};

export default CardEstatistica;
