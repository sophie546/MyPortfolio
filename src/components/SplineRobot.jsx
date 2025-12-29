// src/components/SplineRobot.jsx
export default function SplineRobot() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: '#000000' // Pure black
    }}>
      <iframe 
        src='https://my.spline.design/genkubgreetingrobot-4Lax1Vhtf4326ID6OiqnQDSh/' 
        frameBorder='0'
        width='100%'
        height='100%'
        style={{ 
          display: 'block', 
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'transparent'
        }}
        title='3D Greeting Robot'
        allow='fullscreen'
        allowtransparency="true"
      />
      
      {/* Update ALL background colors to #000000 */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '160px',
        height: '45px',
        backgroundColor: '#000000', // Pure black
        zIndex: 2
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '160px',
        width: '50px',
        height: '45px',
        background: 'linear-gradient(to left, #000000 0%, transparent 100%)', // Pure black
        zIndex: 2
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '45px',
        right: '0',
        width: '160px',
        height: '20px',
        backgroundColor: '#000000', // Pure black
        zIndex: 2
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '45px',
        right: '160px',
        width: '50px',
        height: '20px',
        background: 'linear-gradient(to left, #000000 0%, transparent 100%)', // Pure black
        zIndex: 2
      }} />
    </div>
  );
} 