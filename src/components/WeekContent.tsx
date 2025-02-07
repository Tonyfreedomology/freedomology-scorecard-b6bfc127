
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type WeekContentProps = {
  number: string;
  title: string;
  description: string;
  color: string;
  isOpen: boolean;
  index: number;
};

export const WeekContent = ({ number, title, description, color, isOpen, index }: WeekContentProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-4 transition-all duration-700 text-center",
        isOpen && inView && "opacity-100 translate-y-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-heading font-bold tracking-tighter lowercase text-foreground px-4">
          <span className={`text-${color}/60`}>WEEK {number}: </span>
          {title}
        </h3>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4">{description}</p>
      </div>
    </div>
  );
};
