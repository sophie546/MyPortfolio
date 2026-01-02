export default function SplineRobot() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: 'transparent'
    }}>
      {/* BIGGER Position container for better HD rendering */}
      <div style={{
        position: 'absolute',
        top: '45%',
        right: '-25%', // Move further right to accommodate larger size
        transform: 'translateY(-50%)',
        width: '140%', // Increased from 120%
        height: '140%', // Increased from 120%
        minWidth: '1200px', // Increased from 1000px
        minHeight: '1200px', // Increased from 1000px
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
            backgroundColor: 'transparent',
            // Optional: Add slight rotation for dynamic look
            transform: 'rotate(-5deg)',
          }}
          title='3D Greeting Robot'
          allow='fullscreen'
          allowTransparency="true"
          loading="eager"
        />
      </div>
      
      {/* Optional: Add a subtle glow */}
      <div style={{
        position: 'absolute',
        top: '45%',
        right: '5%', // Adjusted for larger robot
        transform: 'translateY(-50%)',
        width: '70%', // Increased
        height: '90%', // Increased
        background: 'radial-gradient(ellipse at center, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: -1,
      }} />
    </div>
  );
}