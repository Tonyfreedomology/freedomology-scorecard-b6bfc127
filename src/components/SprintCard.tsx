import { sprintContent } from "@/lib/sprintContent";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";
import { useInView } from "react-intersection-observer";
import { SignupForm } from "./SignupForm";
import { getPillarIcon } from "@/lib/getPillarIcon";

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

  // Split the content body at the specific line
  const splitBody = content.body.split("<p>Here's what we cover:</p>");
  const introText = splitBody[0];

  if (!program) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg text-foreground">
      <div className="flex flex-col items-center space-y-6">
        <img src={getLogo()} alt={`${lowestPillar} Sprint Logo`} className="h-24 object-contain" />
        <h2 className="text-3xl font-serif text-foreground">{content.heading}</h2>
        
        {/* Introduction text - left aligned */}
        <div className="text-lg text-left w-full space-y-4 text-foreground" 
          dangerouslySetInnerHTML={{ __html: introText }} 
        />
        
        {/* Weeks section */}
        <h3 className="text-4xl font-serif font-bold text-foreground mt-8 text-center">
          THE SIX WEEKS
        </h3>

        {/* Pillar Icon */}
        <div className="w-16 h-16">
          {getPillarIcon(lowestPillar)}
        </div>
        
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
          <SignupForm defaultSprint={lowestPillar} />
        </div>
      </div>
    </div>
  );
};