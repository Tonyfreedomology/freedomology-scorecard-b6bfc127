
import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Image, Circle, Text } from "fabric";
import { calculateCategoryScore, calculateOverallScore } from "@/lib/services/assessmentService";
import { Database } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { fetchAssessmentData } from "@/lib/services/assessmentService";
import { createPillarTitle } from "./shareable/PillarTitle";
import { createScoreRow } from "./shareable/ScoreRow";
import { createScorePanel } from "./shareable/ScorePanel";

type ShareableImageProps = {
  answers: Record<string, number>;
  onImageGenerated: (dataUrl: string) => void;
  width?: number;
  height?: number;
};

export const ShareableImage = ({ 
  answers,
  onImageGenerated,
  width = 1200,
  height = 630 
}: ShareableImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { data: assessmentData } = useQuery({
    queryKey: ['assessment'],
    queryFn: fetchAssessmentData
  });

  useEffect(() => {
    if (!canvasRef.current || !assessmentData) return;

    console.log('Initializing canvas...');
    const canvas = new FabricCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#293230'
    });

    Image.fromURL(
      'https://static.wixstatic.com/media/af616c_22e0ac03919447c8adb4424b1dca5fce~mv2.jpg',
      {
        crossOrigin: 'anonymous',
        signal: new AbortController().signal
      }
    ).then((img) => {
      console.log('Background image loaded successfully');
      
      const scaleX = width / img.width!;
      const scaleY = height / img.height!;
      const scale = Math.min(scaleX, scaleY);
      
      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0
      });
      
      canvas.backgroundImage = img;

      // Add overall score ring
      const overallScore = calculateOverallScore(assessmentData, answers);
      const radius = 70;
      const centerX = width * 0.25 + 50; // Moved 50px to the right
      const centerY = height - 120; // Position towards the bottom

      // Background circle (gray ring)
      const backgroundCircle = new Circle({
        left: centerX - radius,
        top: centerY - radius,
        radius: radius,
        fill: 'transparent',
        stroke: 'rgba(255,255,255,0.2)',
        strokeWidth: 8,
      });
      canvas.add(backgroundCircle);

      // Score circle with gradient (foreground ring)
      const scoreCircle = new Circle({
        left: centerX - radius,
        top: centerY - radius,
        radius: radius,
        fill: 'transparent',
        stroke: '#17BEBB',
        strokeWidth: 8,
        strokeDashArray: [Math.PI * radius * 2],
        strokeDashOffset: Math.PI * radius * 2 * (1 - overallScore / 100),
      });
      canvas.add(scoreCircle);

      // Score text
      const scoreText = new Text(Math.round(overallScore).toString(), {
        left: centerX,
        top: centerY,
        fontSize: 48,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        fill: 'white',
        originX: 'center',
        originY: 'center',
      });
      canvas.add(scoreText);

      const pillars = [
        { name: 'HEALTH', color: '#EDB88B', categories: ['Mental', 'Physical', 'Environmental'] },
        { name: 'FINANCES', color: '#17BEBB', categories: ['Income', 'Independence', 'Impact'] },
        { name: 'RELATIONSHIPS', color: '#EF3E36', categories: ['Others', 'Self', 'God'] }
      ];

      const startY = 120;
      const lineWidth = 200;
      const pillarSpacing = 350;
      const categorySpacing = 100;
      const startX = (width - (pillarSpacing * 2 + lineWidth)) / 2 - 50;
      const panelHeight = categorySpacing * 3;
      const headingOffset = 100;
      const panelWidth = lineWidth + 80;

      pillars.forEach((pillar, pillarIndex) => {
        const x = startX + pillarIndex * pillarSpacing;

        // Create and add panel
        const panel = createScorePanel({
          x: x + 40,
          y: startY - 50,
          width: panelWidth,
          height: panelHeight + 20
        });
        canvas.add(panel);

        // Create and add title
        const title = createPillarTitle({
          text: pillar.name,
          x,
          y: startY - headingOffset,
          panelWidth: panelWidth
        });
        canvas.add(title);

        // Create and add score rows
        pillar.categories.forEach((categoryName, categoryIndex) => {
          const y = startY + categoryIndex * categorySpacing;
          
          const category = assessmentData.find(c => 
            c.display_name.toLowerCase().includes(categoryName.toLowerCase())
          );
          
          const score = category 
            ? calculateCategoryScore(category.questions, answers)
            : 0;

          const rowElements = createScoreRow({
            categoryName,
            score,
            x,
            y,
            lineWidth,
            color: pillar.color
          });

          rowElements.forEach(element => canvas.add(element));
        });
      });

      canvas.renderAll();
      
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2
      });
      
      console.log('Image generated successfully');
      onImageGenerated(dataUrl);
      canvas.dispose();
    });

  }, [onImageGenerated, width, height, answers, assessmentData]);

  return (
    <canvas 
      ref={canvasRef}
      className="hidden"
    />
  );
};
