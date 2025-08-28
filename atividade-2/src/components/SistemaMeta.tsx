import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle } from 'lucide-react';

interface SistemaMetaProps {
  valorAtual: number;
}

const SistemaMeta = ({ valorAtual }: SistemaMetaProps) => {
  const [meta, setMeta] = useState<number>(10);
  const [metaInput, setMetaInput] = useState<string>('10');
  const [metaAtingida, setMetaAtingida] = useState(false);

  const progresso = Math.min((valorAtual / meta) * 100, 100);
  const progressoFormatado = Math.round(progresso);

  useEffect(() => {
    const novaMetaAtingida = valorAtual >= meta && meta > 0;
    if (novaMetaAtingida && !metaAtingida) {
      setMetaAtingida(true);
      // Resetar após 3 segundos para permitir nova celebração
      setTimeout(() => setMetaAtingida(false), 3000);
    }
  }, [valorAtual, meta, metaAtingida]);

  const handleMetaChange = (value: string) => {
    setMetaInput(value);
    const novoValor = parseInt(value) || 0;
    setMeta(novoValor);
  };

  return (
    <div className="card-gradient p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Sistema de Metas</h3>
        {valorAtual >= meta && meta > 0 && (
          <CheckCircle className="w-5 h-5 text-success animate-bounce-in" />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Definir Meta
          </label>
          <Input
            type="number"
            value={metaInput}
            onChange={(e) => handleMetaChange(e.target.value)}
            className="bg-card border-border/50"
            placeholder="Digite sua meta..."
            min="0"
          />
        </div>

        {meta > 0 && (
          <>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progresso</span>
                <span className="text-sm font-bold text-primary">
                  {progressoFormatado}%
                </span>
              </div>
              <Progress 
                value={progresso} 
                className="h-3 bg-muted"
              />
            </div>

            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Atual / Meta</p>
              <p className="text-2xl font-bold">
                <span className="text-primary">{valorAtual}</span>
                <span className="text-muted-foreground mx-2">/</span>
                <span className="text-foreground">{meta}</span>
              </p>
              
              {valorAtual >= meta ? (
                <p className="text-success font-medium mt-2 animate-bounce-in">
                  🎉 Meta atingida! Parabéns!
                </p>
              ) : (
                <p className="text-muted-foreground text-sm mt-2">
                  Faltam {meta - valorAtual} para atingir a meta
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SistemaMeta;