import { useEffect, useRef, useState } from 'react';

export default function NeonCursor() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, clientY: 0 });
  const animationRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const lastActiveRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Check if mouse is in the content area (below viewport)
    const checkMousePosition = () => {
      const scrollY = window.scrollY;
      const mouseYPositionInPage = mouseRef.current.clientY + scrollY;
      const splineHeight = window.innerHeight; // First section is 100vh
      
      // Activate if mouse is below the spline section
      const shouldBeActive = mouseYPositionInPage > splineHeight;
      
      // Only update state if it changed
      if (shouldBeActive !== lastActiveRef.current) {
        setIsActive(shouldBeActive);
        lastActiveRef.current = shouldBeActive;
        
        // Clear points when deactivating for smooth transition
        if (!shouldBeActive) {
          pointsRef.current = [];
        }
      }
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { 
        x: e.clientX, 
        y: e.clientY,
        clientY: e.clientY 
      };
      
      // Check position on every mouse move
      checkMousePosition();
      
      // Only add points when active
      if (lastActiveRef.current) {
        // Add new point
        pointsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0,
          maxAge: 30
        });

        // Limit points array
        if (pointsRef.current.length > 40) {
          pointsRef.current.shift();
        }
      }
    };

    // Scroll handler - check position continuously during scroll
    const handleScroll = () => {
      checkMousePosition();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Always check if we should draw, based on lastActiveRef for smoother transitions
      if (lastActiveRef.current && pointsRef.current.length > 0) {
        // Update and draw points
        pointsRef.current = pointsRef.current.filter(point => {
          point.age++;
          
          if (point.age >= point.maxAge) return false;

          const progress = point.age / point.maxAge;
          const opacity = 1 - progress;
          const size = 8 * (1 - progress);

          // Draw glow layers with blue/cyan colors
          for (let i = 3; i > 0; i--) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, size * i * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(120, 180, 255, ${opacity * 0.1 * (4 - i)})`;
            ctx.fill();
          }

          // Draw core with brighter cyan
          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 200, 255, ${opacity})`;
          ctx.fill();

          return true;
        });

        // Draw connecting line with cyan
        if (pointsRef.current.length > 1) {
          ctx.beginPath();
          ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);
          
          for (let i = 1; i < pointsRef.current.length; i++) {
            const point = pointsRef.current[i];
            const progress = point.age / point.maxAge;
            const opacity = (1 - progress) * 0.5;
            
            ctx.lineTo(point.x, point.y);
            ctx.strokeStyle = `rgba(130, 190, 255, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
          }
        }

        // Draw main cursor glow with blue/cyan
        const { x, y } = mouseRef.current;
        if (x && y) {
          // Outer glow
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
          gradient.addColorStop(0, 'rgba(150, 200, 255, 0.8)');
          gradient.addColorStop(0.3, 'rgba(120, 180, 255, 0.4)');
          gradient.addColorStop(1, 'rgba(100, 160, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(x, y, 30, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Inner core with bright cyan
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(180, 220, 255, 1)';
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        cursor: isActive ? 'none' : 'auto'
      }}
    />
  );
}