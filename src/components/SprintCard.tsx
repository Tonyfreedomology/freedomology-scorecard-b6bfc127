import { sprintContent } from "@/lib/sprintContent";
import { programs } from "@/lib/programContent";
import { WeekContent } from "./WeekContent";
import { useInView } from "react-intersection-observer";
import { WaitlistForm } from "./WaitlistForm";
import { SprintHeader } from "./SprintHeader";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParallax } from "@/lib/animations/scrollEffects";
import ParticleBackground from "./ParticleBackground";
import TextHighlight from "./TextHighlight";
import { useRef, useState, useEffect } from "react";
import { shineEffectVariants } from "@/lib/animations/textEffects";
import { getBenefits } from "@/lib/benefits";

import { SprintType } from "@/types";

type SprintCardProps = {
  lowestPillar: string;
};

export const SprintCard = ({ lowestPillar }: SprintCardProps) => {
  const capitalizedPillar = lowestPillar.charAt(0).toUpperCase() + lowestPillar.slice(1);
  const content = sprintContent[capitalizedPillar];
  const program = programs[capitalizedPillar];
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const getLogo = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return "https://static.wixstatic.com/media/af616c_6c7bc94cb73e40feb249900ca0af3168~mv2.png";
      case "Health":
        return "https://static.wixstatic.com/media/af616c_3876dd4492b3420c990b2a899ba9d956~mv2.png";
      case "Financial":
        return "https://static.wixstatic.com/media/af616c_671c8d7017224371a68ca6b057793509~mv2.png";
      default:
        return "";
    }
  };

  const getPillarIcon = () => {
    switch (capitalizedPillar) {
      case "Health":
        return "https://static.wixstatic.com/media/af616c_f62b572d573e46df91187a19b34fe8c8~mv2.png";
      case "Financial":
        return "https://static.wixstatic.com/media/af616c_ea23e3c04acd44cfb52510865397e02a~mv2.png";
      case "Relationships":
        return "https://static.wixstatic.com/media/af616c_2da59b3c020c49e396d0a151b69b6c17~mv2.png";
      default:
        return "";
    }
  };

  const getIcon = () => {
    const iconUrl = getPillarIcon();
    return (
      <motion.img 
        src={iconUrl} 
        alt={`${capitalizedPillar} Pillar Icon`} 
        className="h-8 w-8 object-contain"
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5 }}
      />
    );
  };

  const getCardStyle = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return {
          background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,240,245,0.97) 100%)",
          boxShadow: "0 15px 35px rgba(255,16,95,0.15), 0 5px 15px rgba(0,0,0,0.05)",
          borderTop: "4px solid #FF105F"
        };
      case "Health":
        return {
          background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(235,255,255,0.97) 100%)",
          boxShadow: "0 15px 35px rgba(27,235,231,0.15), 0 5px 15px rgba(0,0,0,0.05)",
          borderTop: "4px solid #1BEBE7"
        };
      case "Financial":
        return {
          background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(230,255,240,0.97) 100%)",
          boxShadow: "0 15px 35px rgba(0,232,169,0.15), 0 5px 15px rgba(0,0,0,0.05)",
          borderTop: "4px solid #00E8A9"
        };
      default:
        return {};
    }
  };

  const getPillColor = () => {
    const colors = getSprintColors(capitalizedPillar);
    return {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      boxShadow: `0 4px 12px rgba(0,0,0,0.2)`
    };
  };

  const getBackgroundTint = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return "rgba(255,16,95,0.03)"; // Very subtle pink tint
      case "Health":
        return "rgba(27,235,231,0.03)"; // Very subtle cyan tint
      case "Financial":
        return "rgba(0,232,169,0.03)"; // Very subtle green tint
      default:
        return "rgba(255,255,255,0)";
    }
  };

  const getGradientColors = () => {
    switch (capitalizedPillar) {
      case "Relationships":
        return {
          from: "rgba(255,255,255,0.9)",
          to: "rgba(255,240,245,0.85)"
        };
      case "Health":
        return {
          from: "rgba(255,255,255,0.9)",
          to: "rgba(235,255,255,0.85)"
        };
      case "Financial":
        return {
          from: "rgba(255,255,255,0.9)",
          to: "rgba(230,255,240,0.85)"
        };
      default:
        return {
          from: "rgba(255,255,255,0.9)",
          to: "rgba(255,255,255,0.85)"
        };
    }
  };

  const getSprintColors = (pillar: string) => {
    switch (pillar) {
      case "Relationships":
        return {
          primary: "#D10045",
          secondary: "#9E0030",
          darkAccent: "#780032",
          lightAccent: "rgba(209, 0, 69, 0.1)",
        };
      case "Health":
        return {
          primary: "#1BEBE7",
          secondary: "#60F5F3",
          darkAccent: "#00C5C3",
          lightAccent: "rgba(27, 235, 231, 0.1)",
        };
      case "Financial":
        return {
          primary: "#00E8A9",
          secondary: "#00A57D",
          darkAccent: "#006647",
          lightAccent: "rgba(0, 232, 169, 0.1)",
        };
      default:
        return {
          primary: "#888888",
          secondary: "#AAAAAA",
          darkAccent: "#666666",
          lightAccent: "rgba(136, 136, 136, 0.1)",
        };
    }
  };

  const getPillarBorderColor = () => {
    const colors = getSprintColors(capitalizedPillar);
    return colors.primary;
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set up parallax effect for the background
  const { elementRef: bgParallaxRef, style: bgParallaxStyle } = useParallax({
    speed: 0.1,
    direction: 'up'
  });
  
  // Set up scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress into visual effects
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4], [0.6, 0.9, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [20, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.3], [30, 0]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!content || !program) return null;

  // Safely extract intro text
  const introText = content.body; // Use the whole body as introText if there's no separator

  return (
    <motion.div 
      ref={containerRef}
      className="backdrop-blur-sm p-3 sm:p-4 md:p-8 text-foreground overflow-hidden relative w-full sm:rounded-2xl"
      style={{
        ...getCardStyle(),
        width: isSmallScreen ? '100vw' : 'auto',
        marginLeft: isSmallScreen ? 'calc(-50vw + 50%)' : 0,
        borderRadius: isSmallScreen ? 0 : undefined
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Particle background */}
      <ParticleBackground 
        color={program.color as SprintType} 
        intensity="low" 
        className="opacity-40" 
      />
      
      {/* Background parallax effect */}
      <motion.div 
        ref={bgParallaxRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          ...bgParallaxStyle,
          background: `radial-gradient(circle at center, ${getBackgroundTint()} 0%, rgba(255,255,255,0) 70%)`
        }}
      />
      
      <div className="flex flex-col items-center space-y-6 relative z-10">
        <motion.div 
          ref={headerRef}
          style={{ 
            opacity: headerOpacity,
            scale: headerScale,
            y: headerY
          }}
          className="mb-8"
        >
          <SprintHeader 
            title={content.heading} 
            color={program.color as SprintType}
            description={content.description || ""}  
          />
        </motion.div>
        
        {/* HTML content explaining the sprint with enhanced typography */}
        <motion.div 
          className="text-base md:text-lg text-center w-full text-foreground [&>p]:mb-3 last:[&>p]:mb-0 prose prose-p:my-2 max-w-none" 
          dangerouslySetInnerHTML={{ __html: introText }} 
          style={{ y: contentY }}
        />
        
        {/* Logo */}
        <motion.img 
          src={getLogo()} 
          alt={`${capitalizedPillar} Sprint Logo`} 
          className="h-24 object-contain mx-auto my-4 relative z-10"
        />
        
        {/* Enhanced program content with animations */}
        <div className="w-full" ref={ref}>
          {inView && (
            <motion.div 
              className="rounded-xl p-5 mb-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)`,
                backdropFilter: 'blur(8px)',
                boxShadow: `0 10px 25px rgba(0,0,0,0.05), 0 5px 10px ${getPillarBorderColor()}15`
              }}
            >
              <div className="text-center mb-6">
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold relative inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="relative z-10">Your 6-Week Journey</span>
                  <motion.div 
                    className="absolute -bottom-2 left-0 right-0 h-3 z-0 rounded-full opacity-30"
                    style={{ background: getPillarBorderColor() }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  />
                </motion.h2>
                <motion.p 
                  className="text-gray-600 mt-2 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  A comprehensive program designed to transform your {capitalizedPillar.toLowerCase()} in just six weeks
                </motion.p>
              </div>
            </motion.div>
          )}
          
          {/* Program content weeks with enhanced styling */}
          <div className="mt-8 space-y-6">
            {inView && program.weeks.map((week, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
              >
                <WeekContent
                  title={week.title}
                  content={week.description}
                  color={program.color}
                  week={index + 1}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mt-12">
          <WaitlistForm defaultSprint={capitalizedPillar} />
        </div>
      </div>
    </motion.div>
  );
};
