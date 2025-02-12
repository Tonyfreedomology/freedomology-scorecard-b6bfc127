
import { useEffect, useState } from 'react';
import { Database } from "@/integrations/supabase/types";
import { getPillarIcon } from "@/lib/getPillarIcon";
import { useInView } from 'react-intersection-observer';

type ScoreLineProps = {
  score: number;
  label: string;
  color: string;
  delay?: number;
};

const ScoreLine = ({ score, label, color, delay = 0 }: ScoreLineProps) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [arrowPosition, setArrowPosition] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      const scoreTimer = setTimeout(() => {
        const duration = 2000;
        const steps = 100;
        
        const easeInOutQuad = (t: number) => {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };
        
        let step = 0;
        const timer = setInterval(() => {
          if (step < steps) {
            const progress = easeInOutQuad(step / steps);
            const current = score * progress;
            setCurrentScore(Math.round(current));
            setArrowPosition((current / 100) * 100);
            step++;
          } else {
            clearInterval(timer);
            setCurrentScore(score);
            setArrowPosition(score);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }, delay);

      return () => clearTimeout(scoreTimer);
    }
  }, [score, delay, inView]);

  return (
    <div className="relative py-6" ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white/80 text-sm">{label}</span>
      </div>
      
      <div className="relative">
        <div className="h-0.5 w-full bg-white/20 rounded-full" />
        
        <div 
          className="absolute top-0 left-0 h-0.5 rounded-full transition-all duration-300"
          style={{ 
            width: `${arrowPosition}%`,
            backgroundColor: color
          }} 
        />
        
        <div 
          className="absolute -top-8 transition-all duration-300"
          style={{ 
            left: `${arrowPosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="text-3xl font-bold text-white">{currentScore}</span>
        </div>

        <div 
          className="absolute -bottom-2 w-0 h-0 transition-all duration-300"
          style={{ 
            left: `${arrowPosition}%`,
            transform: 'translateX(-50%)',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `8px solid ${color}`
          }}
        />
      </div>
    </div>
  );
};

type PillarScoresProps = {
  title: string;
  scores: { label: string; score: number; }[];
  color: string;
};

const PillarScores = ({ title, scores, color }: PillarScoresProps) => (
  <div className="space-y-6">
    <div className="flex items-center justify-center gap-3">
      {getPillarIcon(title)}
      <h3 className="text-3xl font-heading font-bold text-white tracking-tighter lowercase">{title}</h3>
    </div>
    <div className="space-y-8">
      {scores.map((score, index) => (
        <ScoreLine
          key={score.label}
          label={score.label}
          score={score.score}
          color={color}
          delay={index * 200}
        />
      ))}
    </div>
  </div>
);

type Category = Database['public']['Tables']['assessment_categories']['Row'] & {
  questions: Database['public']['Tables']['assessment_questions']['Row'][];
};

// Create a normalized mapping that handles variations in category names
const categoryToPillarMapping: Record<string, { pillar: string; displayName: string; alternateNames?: string[] }> = {
  'Mental Health': { pillar: 'Health', displayName: 'Mental Health' },
  'Physical Health': { pillar: 'Health', displayName: 'Physical Health' },
  'Environmental Health': { pillar: 'Health', displayName: 'Environmental Health' },
  'Income': { pillar: 'Financial', displayName: 'Income' },
  'Independence': { 
    pillar: 'Financial', 
    displayName: 'Independence',
    alternateNames: ['Independence & Flexibility']  // Add alternate name mapping
  },
  'Impact': { pillar: 'Financial', displayName: 'Impact' },
  'Relationships with Others': { pillar: 'Relationships', displayName: 'Relationships with Others' },
  'Relationship with Self': { pillar: 'Relationships', displayName: 'Relationship with Self' },
  'Relationship with God': { pillar: 'Relationships', displayName: 'Relationship with God' }
};

export const ScoreLineChart = ({ answers, categories }: { 
  answers: Record<string, number>;
  categories: Category[];
}) => {
  const groupedCategories = categories.reduce((acc, category) => {
    const categoryName = category.display_name;
    console.log('Processing category:', categoryName);
    
    // Find matching entry by checking both main name and alternate names
    const matchingEntry = categoryToPillarMapping[categoryName] || 
      Object.values(categoryToPillarMapping).find(mapping => 
        mapping.alternateNames?.includes(categoryName)
      );
    
    if (matchingEntry) {
      const { pillar, displayName } = matchingEntry;
      
      if (!acc[pillar]) {
        acc[pillar] = [];
      }
      
      const totalQuestions = category.questions.length;
      const totalScore = category.questions.reduce((sum, q) => {
        const answer = answers[q.id] || 0;
        console.log(`Question ${q.id} (${q.question_text}) answer:`, answer);
        return sum + answer;
      }, 0);
      
      // Guard against division by zero
      const score = totalQuestions > 0 
        ? Math.round((totalScore / (totalQuestions * 5)) * 100)
        : 0;
        
      console.log(`Category ${categoryName} - Total: ${totalScore}, Questions: ${totalQuestions}, Final Score: ${score}`);
      
      acc[pillar].push({
        label: displayName,
        score
      });
    } else {
      console.warn('No matching entry found for category:', categoryName);
    }
    
    return acc;
  }, {} as Record<string, { label: string; score: number; }[]>);

  const pillarColors = {
    'Health': '#EDB88B',
    'Financial': '#17BEBB',
    'Relationships': '#EF3E36'
  };

  const pillarOrder = ['Health', 'Financial', 'Relationships'];

  return (
    <div className="grid gap-16">
      {pillarOrder.map(pillar => 
        groupedCategories[pillar] && (
          <PillarScores
            key={pillar}
            title={pillar}
            scores={groupedCategories[pillar]}
            color={pillarColors[pillar as keyof typeof pillarColors]}
          />
        )
      )}
    </div>
  );
};
