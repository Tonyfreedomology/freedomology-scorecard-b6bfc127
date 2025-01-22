import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  color?: string;
  className?: string;
  variant?: 'line' | 'circle';
  size?: number;
};

export const ProgressBar = ({ 
  value, 
  color, 
  className, 
  variant = 'line',
  size = 120 
}: ProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      if (current < value) {
        current += increment;
        setAnimatedValue(Math.min(current, value));
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  if (variant === 'circle') {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = ((100 - animatedValue) / 100) * circumference;

    return (
      <div 
        className={cn(
          "relative transition-transform duration-300 hover:scale-105", 
          className
        )} 
        style={{ width: size, height: size }}
      >
        <svg
          className="transform -rotate-90 drop-shadow-lg"
          width={size}
          height={size}
          viewBox="0 0 100 100"
        >
          <circle
            className="text-secondary/30"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <circle
            className="transition-all duration-1000 ease-out"
            strokeWidth="8"
            stroke={color}
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full h-3 bg-secondary/30 rounded-full overflow-hidden",
      className
    )}>
      <div
        className="h-full transition-all duration-1000 ease-out rounded-full"
        style={{
          width: `${animatedValue}%`,
          background: `linear-gradient(to right, ${color}, ${color}CC)`,
        }}
      />
    </div>
  );
};