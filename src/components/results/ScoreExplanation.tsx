import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const ScoreExplanation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto text-white">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold mb-6 text-center">
            Your Score Explained
          </h2>
          
          <p className="text-lg">
            Your Freedomology Score measures your well-being across Finance, Health (physical and mental), and Relationships.
          </p>

          <CollapsibleTrigger className="flex items-center justify-center w-full gap-2 text-white/80 hover:text-white transition-colors">
            <span className="text-sm font-medium">
              {isOpen ? "Show less" : "Read more"}
            </span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-6 text-lg mt-6">
          <p>
            Our culture pushes the hustle and grind mindset as the path to success, but we see it differently.
          </p>
          
          <p>
            We've worked with over 11,000 people in the past 15 years and learned that <span className="font-bold italic">balance</span> is the key to building a beautiful life.
          </p>
          
          <p>
            Balance is a superpower, and hustle culture is a disease. When your finances, health, and relationships work in harmony, life becomes more free, fulfilling, and fun.
          </p>
          
          <p>
            So how did we arrive at your score?
          </p>
          
          <p>
            Each pillar gets a rating from 0 to 100, based on questions about key areas—like debt, investments, generosity, mental health, and your connection to the people around you.
          </p>
          
          <p>
            If certain areas slip below a healthy level (like generosity or mental well-being), your overall score gets capped. That's because true freedom is about more than just being personally successful—it's about building a life that helps you thrive and also uplifts the people around you.
          </p>
          
          <p>
            Below, you'll find our suggestions for how to boost your score and live a more balanced life. Whether you need more financial independence, better health habits, or stronger relationships, we've got a 40-day sprint to help you grow where it counts.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};