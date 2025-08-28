import { useState, useEffect } from 'react';

interface CounterDisplayProps {
  value: number;
}

const CounterDisplay = ({ value }: CounterDisplayProps) => {
  const [previousValue, setPreviousValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== previousValue) {
      setIsAnimating(true);
      setPreviousValue(value);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  return (
    <div className="text-center mb-8">
      <div className="card-gradient card-glow p-8 rounded-2xl">
        <p className="text-muted-foreground text-lg mb-2 font-medium">Contador Atual</p>
        <div 
          className={`counter-display transition-all duration-300 ${
            isAnimating ? 'animate-bounce-in scale-110' : ''
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default CounterDisplay;