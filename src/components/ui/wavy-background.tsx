import { useCallback, useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export interface WavyBackgroundProps {
  colors?: string[];
  waveOpacity?: number;
  blur?: number;
  speed?: "slow" | "medium" | "fast";
  waveWidth?: number;
  backgroundFill?: string;
  containerClassName?: string;
  className?: string;
}

export function WavyBackground({
  colors = ["#FF105F", "#FF4080", "#FF80B0"],
  waveOpacity = 0.8,
  blur = 10,
  speed = "medium",
  waveWidth = 25,
  backgroundFill = "white",
  containerClassName = "",
  className = "",
}: WavyBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise3D = useRef<(x: number, y: number, z: number) => number>();
  const animationRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Convert speed string to number of frames to skip
  const getSpeedFactor = useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.008; // Slower movement
      case "fast":
        return 0.03;
      case "medium":
      default:
        return 0.015;
    }
  }, [speed]);

  // Initialize the canvas and start the animation
  useEffect(() => {
    noise3D.current = createNoise3D();
    
    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    if (!canvas || !container) return;
    
    // Create a resize observer to adjust canvas size when container changes
    resizeObserverRef.current = new ResizeObserver(() => {
      if (canvas && container) {
        const { width, height } = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set canvas dimensions accounting for device pixel ratio
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        // Set display size
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    });
    
    // Start observing container size changes
    resizeObserverRef.current.observe(container);
    
    // Initial draw
    drawWaves();
    
    return () => {
      // Clean up
      resizeObserverRef.current?.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Draw the wavy background
  const drawWaves = useCallback(() => {
    if (!canvasRef.current || !noise3D.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    // Clear the canvas with background fill
    ctx.fillStyle = backgroundFill;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);
    
    const { width, height } = canvas.getBoundingClientRect();
    const speedFactor = getSpeedFactor();
    const time = frameRef.current * speedFactor;
    
    // Create an internal margin to keep waves from touching edges
    const marginX = width * 0.12; // 12% margin on left and right
    const marginY = height * 0.15; // 15% margin on top and bottom
    const innerWidth = width - (marginX * 2);
    const innerHeight = height - (marginY * 2);
    
    // More wave lines for better definition
    const waveCount = 12; // Fewer, more distinct waves
    
    // Draw individual wave lines with higher contrast and less opacity
    for (let i = 0; i < waveCount; i++) {
      // Calculate wave parameters with offset to center within margins
      const baseY = marginY + ((innerHeight) / (waveCount + 1)) * (i + 1);
      const amplitude = innerHeight * 0.05; // Reduced amplitude for less overlap
      const frequency = 0.012; // Increased frequency for more waves
      
      // Select color from the provided array with more variation
      const colorIndex = Math.floor((i / waveCount) * colors.length);
      const color = colors[Math.min(colorIndex, colors.length - 1)];
      
      // Create path for the wave
      ctx.beginPath();
      
      // Generate the wave path with finer detail
      for (let x = marginX; x <= marginX + innerWidth; x += 2) { // Smaller step size for smoother curves
        // Use 3D noise for organic waves
        const noiseX = x * frequency;
        const noiseY = baseY * frequency * 0.5;
        const noiseValue = noise3D.current(noiseX, noiseY, time);
        
        // Calculate y position
        const y = baseY + noiseValue * amplitude * 3;
        
        if (x === marginX) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      // Use thinner stroke for the wave lines with controlled transparency
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5; // Even thinner lines for better definition
      ctx.globalAlpha = 0.7; // Higher opacity for individual lines
      ctx.stroke();
    }
    
    // Only draw minimal fills to avoid the blob effect
    ctx.globalAlpha = 0.08; // Very low opacity for the fills
    
    // Draw each filled wave area with larger spacing, skipping more for less density
    for (let i = 0; i < waveCount - 1; i += 3) { // Skip more lines to reduce fill density
      // Calculate parameters for two adjacent waves
      const baseY1 = marginY + ((innerHeight) / (waveCount + 1)) * (i + 1);
      const baseY2 = marginY + ((innerHeight) / (waveCount + 1)) * (i + 4); // More spacing
      const amplitude = innerHeight * 0.05;
      const frequency = 0.012;
      
      // Select color
      const colorIndex = Math.floor((i / waveCount) * colors.length);
      const color = colors[Math.min(colorIndex, colors.length - 1)];
      
      // Create path for the area between waves
      ctx.beginPath();
      
      // First wave (top boundary)
      const points: [number, number][] = [];
      
      for (let x = marginX; x <= marginX + innerWidth; x += 10) { // Larger step size for fills
        const noiseX = x * frequency;
        const noiseY1 = baseY1 * frequency * 0.5;
        const noiseValue1 = noise3D.current(noiseX, noiseY1, time);
        const y1 = baseY1 + noiseValue1 * amplitude * 3;
        
        if (x === marginX) {
          ctx.moveTo(x, y1);
        } else {
          ctx.lineTo(x, y1);
        }
        
        points.push([x, y1]);
      }
      
      // Second wave (bottom boundary) - in reverse to create closed shape
      for (let x = marginX + innerWidth; x >= marginX; x -= 10) {
        const noiseX = x * frequency;
        const noiseY2 = baseY2 * frequency * 0.5;
        const noiseValue2 = noise3D.current(noiseX, noiseY2, time);
        const y2 = baseY2 + noiseValue2 * amplitude * 3;
        
        ctx.lineTo(x, y2);
      }
      
      ctx.closePath();
      
      // Fill with gradient
      const gradient = ctx.createLinearGradient(0, baseY1, 0, baseY2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, colors[(colorIndex + 2) % colors.length]); // More color variation
      
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Reset global alpha
    ctx.globalAlpha = 1;
    
    // Increment frame counter
    frameRef.current++;
    
    // Continue animation
    animationRef.current = requestAnimationFrame(drawWaves);
  }, [colors, waveWidth, waveOpacity, backgroundFill, getSpeedFactor]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full overflow-hidden ${containerClassName}`}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${className}`}
        style={{
          filter: `blur(${blur}px)`,
          opacity: 1,
        }}
      />
    </div>
  );
}
