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
      private gradient: CanvasGradient;
      private angle: number;
      private colors: string[];

      constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.angle = 0;
        // Using the theme colors
        this.colors = ['hsl(271, 100%, 50%)', 'hsl(262, 80%, 15%)', 'hsl(45, 100%, 51%)', 'hsl(262, 80%, 5%)'];
        this.gradient = this.createGradient();
      }
      
      createGradient() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        const step = 1 / (this.colors.length - 1);
        this.colors.forEach((color, i) => {
            gradient.addColorStop(i * step, color);
        });
        return gradient;
      }

      update() {
        this.angle += 0.002;
        
        const x1 = this.width / 2 + Math.cos(this.angle) * this.width / 2;
        const y1 = this.height / 2 + Math.sin(this.angle) * this.height / 2;
        const x2 = this.width / 2 + Math.cos(this.angle + Math.PI) * this.width / 2;
        const y2 = this.height / 2 + Math.sin(this.angle + Math.PI) * this.height / 2;

        this.gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
        const step = 1 / (this.colors.length - 1);
        this.colors.forEach((color, i) => {
            const offset = (i * step + this.angle / (2 * Math.PI)) % 1;
            this.gradient.addColorStop(offset, color);
        });
      }

      draw() {
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
      }
    }

    const gradientAnimation = new GradientAnimation(context, canvas.width, canvas.height);

    function animate() {
      gradientAnimation.update();
      gradientAnimation.draw();
      requestAnimationFrame(animate);
    }

    animate();
    
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gradientAnimation = new GradientAnimation(context!, canvas.width, canvas.height);
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
