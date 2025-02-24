
import { HelpCircle } from "lucide-react";
import { FreedomologyLogo } from "../FreedomologyLogo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ResultsHeader = ({ overallScore }: { overallScore: number }) => {
  return (
    <>
      <FreedomologyLogo variant="9gauge" />
      
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter lowercase">
            9-Gauge Score
          </h1>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  type="button"
                  className="hover:opacity-80 transition-opacity"
                >
                  <HelpCircle className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                align="center"
                className="max-w-xs bg-white text-foreground p-3 rounded-lg shadow-lg"
              >
                <p>Your 9-Gauge Score represents your overall well-being across Financial, Health, and Relationship dimensions. A higher score indicates greater freedom and balance in these key life areas.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xl text-white/90 font-medium">
          You're on the path to thriving freedom. Keep growing!
        </p>
      </div>
    </>
  );
};

