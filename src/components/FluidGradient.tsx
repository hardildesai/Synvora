'use client';
import { useEffect, useRef } from 'react';

export default function FluidGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class GradientAnimation {
      private ctx: CanvasRenderingContext2D;
      private width: number;
      private height: number;
      private time: number;
      private colors: string[];

      constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.time = 0;
        // Using the theme colors
        this.colors = ['hsl(271, 100%, 50%)', 'hsl(262, 80%, 15%)', 'hsl(45, 100%, 51%)', 'hsl(262, 80%, 5%)'];
      }
      
      createGradient() {
        const x1 = this.width * (0.5 + 0.5 * Math.cos(this.time * 0.0015));
        const y1 = this.height * (0.5 + 0.5 * Math.sin(this.time * 0.0012));
        const x2 = this.width * (0.5 + 0.5 * Math.cos(this.time * 0.0008 + Math.PI));
        const y2 = this.height * (0.5 + 0.5 * Math.sin(this.time * 0.001 + Math.PI));
        
        const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
        const step = 1 / (this.colors.length - 1);
        this.colors.forEach((color, i) => {
            gradient.addColorStop(i * step, color);
        });
        return gradient;
      }

      update() {
        this.time++;
      }

      draw() {
        const gradient = this.createGradient();
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
      }
    }

    let gradientAnimation = new GradientAnimation(context, canvas.width, canvas.height);

    function animate() {
      gradientAnimation.update();
      gradientAnimation.draw();
      requestAnimationFrame(animate);
    }

    animate();
    
    const handleResize = () => {
        if (!canvasRef.current || !context) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        gradientAnimation = new GradientAnimation(context, canvasRef.current.width, canvasRef.current.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ filter: 'blur(100px) saturate(1.5)' }}
    />
  );
}
