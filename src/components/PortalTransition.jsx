import { useEffect, useRef } from 'react';

export default function PortalTransition() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size - simpler resolution
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 60;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Simplified ribbon drawing
    const drawRibbon = (offset, color, thickness, yOffset) => {
      ctx.beginPath();
      
      const width = canvas.width;
      const centerY = canvas.height / 2 + yOffset;
      const step = 8; // Larger steps = better performance
      
      // Generate wave points with fewer calculations
      for (let x = 0; x <= width; x += step) {
        const wave = Math.sin((x * 0.004) + timeRef.current + offset) * 12;
        const y = centerY + wave;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      // Simple stroke only, no fills
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.stroke();
    };

    // Animation loop with throttling
    const animate = () => {
      timeRef.current += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only 3 ribbons for better performance
      drawRibbon(0, 'rgba(100, 180, 255, 0.8)', 3, -8);
      drawRibbon(2, 'rgba(180, 120, 255, 0.7)', 4, 0);
      drawRibbon(4, 'rgba(120, 200, 255, 0.8)', 3, 8);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: '100vh',
      left: 0,
      width: '100%',
      height: '60px',
      transform: 'translateY(-30px)',
      zIndex: 10,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '60px',
          display: 'block'
        }}
      />
      
      {/* Top gradient fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent)',
        pointerEvents: 'none'
      }} />
      
      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to top, rgba(11, 11, 15, 1), transparent)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}