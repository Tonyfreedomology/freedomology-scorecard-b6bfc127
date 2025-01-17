import { cn } from "@/lib/utils";

type LikertScaleProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  options?: { value: number; label: string }[];
};

export const LikertScale = ({ value, onChange, className, options }: LikertScaleProps) => {
  const defaultOptions = [1, 2, 3, 4, 5];
  const displayOptions = options || defaultOptions;

  return (
    <div className={cn("flex justify-between gap-4 w-full max-w-2xl mx-auto", className)}>
      {displayOptions.map((option) => {
        const optionValue = typeof option === 'number' ? option : option.value;
        const optionLabel = typeof option === 'number' ? option.toString() : option.label;
        const isSelected = value === optionValue;
        
        return (
          <button
            key={optionValue}
            onClick={() => onChange(optionValue)}
            className={cn(
              "min-w-[120px] py-4 px-6 rounded-full transition-all duration-300",
              "text-base font-medium flex items-center justify-center text-center",
              "hover:bg-[#F9FAFB] hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
              isSelected ? [
                "border-2 border-[#3ECF8E]",
                "bg-gradient-to-b from-[#F0FFF4] to-white",
                "shadow-[0_2px_8px_rgba(62,207,142,0.15)]",
                "scale-105"
              ] : [
                "bg-white/80 border-2 border-transparent",
                "shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
              ]
            )}
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
};