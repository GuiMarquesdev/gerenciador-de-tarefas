import { cn } from "@/lib/utils";
import type { BotaoProps } from "@/types/counter";

const CounterButton = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className,
}: BotaoProps) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    increment: "btn-increment",
    decrement: "btn-decrement",
    primary: "btn-primary-glow",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
};

export default CounterButton;
