import { sprintContent } from "@/lib/sprintContent";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";
import { useInView } from "react-intersection-observer";
import { SignupForm } from "./SignupForm";

type SprintCardProps = {
  lowestPillar: string;
};

export const SprintCard = ({ lowestPillar }: SprintCardProps) => {
  const content = sprintContent[lowestPillar];
  const program = programs[lowestPillar];
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const getLogo = () => {
    switch (lowestPillar) {
      case "Relationships":
        return "https://static.wixstatic.com/media/c32598_2430f4e26a1d4123b1b40978409d938e~mv2.png";
      case "Health":
        return "https://static.wixstatic.com/media/c32598_562d75c90e6646bfb30ae54a5e0267af~mv2.png";
      case "Financial":
        return "https://static.wixstatic.com/media/c32598_42c88deef1e04279ab8800669ac7e634~mv2.png";
      default:
        return "";
    }
  };

  const splitBodyContent = () => {
    if (!content?.body) return { intro: "", weeks: "" };
    
    const body = content.body;
    const splitPoint = body.indexOf("Here's what we cover in the 6 weeks:");
    if (splitPoint === -1) return { intro: body, weeks: "" };
    
    return {
      intro: body.substring(0, splitPoint).trim(),
      weeks: body.substring(splitPoint).trim()
    };
  };

  if (!program || !content) return null;

  const { intro } = splitBodyContent();

  const getSprintType = () => {
    switch (lowestPillar) {
      case "Relationships":
        return "R40";
      case "Health":
        return "H40";
      case "Financial":
        return "F40";
      default:
        return "F40";
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg text-foreground">
      <div className="flex flex-col items-center space-y-6">
        <img 
          src={getLogo()} 
          alt={`${lowestPillar} Sprint Logo`} 
          className="h-24 object-contain"
          loading="lazy"
        />
        <h2 className="text-3xl font-serif text-foreground text-center">{content.heading}</h2>
        <div 
          className="text-lg max-w-2xl space-y-4 text-foreground text-left" 
          dangerouslySetInnerHTML={{ __html: intro }} 
        />
        
        <h3 className="text-3xl font-serif font-bold text-foreground text-center mt-8">THE SIX WEEKS</h3>
        
        <div ref={ref} className="w-full space-y-12">
          {program.weeks.map((week, index) => (
            <WeekContent
              key={week.number}
              {...week}
              color={program.color}
              isOpen={true}
              index={index}
            />
          ))}
        </div>

        <div className="w-full max-w-md mx-auto mt-12">
          <SignupForm defaultSprintType={getSprintType()} />
        </div>
      </div>
    </div>
  );
};