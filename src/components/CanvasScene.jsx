// src/components/CanvasScene.jsx - SIMPLIFIED BACKGROUND
export default function CanvasScene() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2a 100%)'
    }}>
      {/* Optional subtle background effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)',
      }} />
    </div>
  );
}