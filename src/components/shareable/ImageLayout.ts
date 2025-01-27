import { Canvas as FabricCanvas, Image, Text } from "fabric";
import { createTextElement } from "./TextElement";

export const createImageLayout = (
  canvas: FabricCanvas,
  overallScore: number,
  pillarScores: Array<{ name: string; score: number }>,
  canvasWidth = 1200,
  canvasHeight = 630
) => {
  console.log('Starting image layout creation...', { overallScore, pillarScores });
  
  // Clear any existing content
  canvas.clear();
  
  // Set canvas background color while image loads
  canvas.backgroundColor = '#293230';
  canvas.renderAll();
  
  // Load and check if League Spartan font is available
  const checkFont = () => {
    const testText = new Text('Test', {
      fontFamily: 'League Spartan',
    });
    return testText.fontFamily === 'League Spartan';
  };

  if (!checkFont()) {
    console.warn('League Spartan font not loaded, falling back to system font');
  }

  // Set background image using the new Fabric.js v6 API
  return new Promise<void>((resolve) => {
    Image.fromURL(
      '/lovable-uploads/1eec1686-e3f5-4287-8ab7-7de36d47fd73.png',
      { crossOrigin: 'anonymous' }
    ).then((img) => {
      console.log('Background image loaded successfully');
      
      // Scale the image to fit canvas
      const scaleX = canvasWidth / img.width!;
      const scaleY = canvasHeight / img.height!;
      img.scale(Math.max(scaleX, scaleY));
      
      // Center the image
      img.center();
      
      // Set as background
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

      // Scale factors for responsive layout
      const scaleFactor = Math.min(canvasWidth / 1200, canvasHeight / 630);
      
      // Add overall score
      const overallScoreText = createTextElement({
        text: `${Math.round(overallScore)}`,
        options: {
          left: canvasWidth / 2,
          top: 150 * scaleFactor,
          fontSize: 96 * scaleFactor,
          fill: "#FFFFFF",
          fontWeight: '700'
        }
      });

      canvas.add(overallScoreText);
      console.log('Added overall score:', overallScore);

      // Add pillar scores
      const BOX_Y = 350 * scaleFactor;
      const BOX_SPACING = 320 * scaleFactor;

      pillarScores.forEach((pillar, index) => {
        const x = (canvasWidth / 2) + (index - 1) * BOX_SPACING;
        
        // Pillar score
        const scoreText = createTextElement({
          text: `${Math.round(pillar.score)}`,
          options: {
            left: x,
            top: BOX_Y,
            fontSize: 64 * scaleFactor,
            fill: "#FFFFFF",
            fontWeight: '700'
          }
        });

        canvas.add(scoreText);
        console.log(`Added pillar score for ${pillar.name}:`, pillar.score);
      });

      canvas.renderAll();
      console.log('Image layout created successfully');
      resolve();
    }).catch(error => {
      console.error('Error loading background image:', error);
      // Still resolve but with a basic background
      canvas.backgroundColor = '#293230';
      canvas.renderAll();
      resolve();
    });
  });
};