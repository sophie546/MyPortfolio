// src/components/CanvasScene.jsx - SIMPLIFIED
import SplineRobot from './SplineRobot';

export default function CanvasScene() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      background: '#0a0a1a'
    }}>
      <SplineRobot />
    </div>
  );
}