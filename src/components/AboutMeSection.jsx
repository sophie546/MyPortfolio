import { useEffect, useRef, useState } from 'react';

export default function AboutMeSection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when section enters viewport, 1 when section is centered
      const start = windowHeight;
      const end = windowHeight / 2 - sectionHeight / 2;
      const progress = Math.max(0, Math.min(1, (start - sectionTop) / (start - end)));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotation
  const rotation = scrollProgress * 360;

  // Text emergence with fade: starts hidden inside body, slides out
  // Position: 0 = inside body center, 1 = fully extended to sides
  const leftTextX = scrollProgress * -350; // Moves left
  const rightTextX = scrollProgress * 350; // Moves right
  
  // Opacity: fade in as it emerges (0 to 1)
  const textOpacity = Math.min(1, scrollProgress * 1.5);

  return (
    <div 
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 20px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Modern grid background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(90deg, rgba(30, 30, 30, 0.1) 1px, transparent 1px),
          linear-gradient(rgba(30, 30, 30, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.2,
        zIndex: 0
      }} />

      {/* Character Shape - Center, Bigger, Glowing (Modern version) */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '520px',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s linear',
          zIndex: 3
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          filter: 'drop-shadow(0 0 60px rgba(102, 126, 234, 0.8))'
        }}>
          {/* Head - Modern */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
            border: '3px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 50px rgba(102, 126, 234, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.4)'
          }} />
          
          {/* Neck - Modern */}
          <div style={{
            position: 'absolute',
            top: '112px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '40px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
            borderLeft: '3px solid rgba(255, 255, 255, 0.7)',
            borderRight: '3px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }} />
          
          {/* Torso - Modern */}
          <div style={{
            position: 'absolute',
            top: '152px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '250px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
            border: '4px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '30px 30px 15px 15px',
            boxShadow: '0 0 50px rgba(102, 126, 234, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.3)'
          }} />
          
          {/* Left Arm - Modern */}
          <div style={{
            position: 'absolute',
            top: '180px',
            left: '15px',
            width: '50px',
            height: '160px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
            border: '3px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '30px',
            transform: 'rotate(-15deg)',
            transformOrigin: 'top center',
            boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }} />
          
          {/* Right Arm - Modern */}
          <div style={{
            position: 'absolute',
            top: '180px',
            right: '15px',
            width: '50px',
            height: '160px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
            border: '3px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '30px',
            transform: 'rotate(15deg)',
            transformOrigin: 'top center',
            boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }} />
          
          {/* Left Leg - Modern */}
          <div style={{
            position: 'absolute',
            top: '402px',
            left: '120px',
            width: '60px',
            height: '118px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
            border: '3px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '20px',
            boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }} />
          
          {/* Right Leg - Modern */}
          <div style={{
            position: 'absolute',
            top: '402px',
            right: '120px',
            width: '60px',
            height: '118px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
            border: '3px solid rgba(255, 255, 255, 0.7)',
            borderRadius: '20px',
            boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }} />
        </div>
      </div>

      {/* Left Text Panel - About Me */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${leftTextX}px), -50%)`,
          maxWidth: '450px',
          opacity: textOpacity,
          transition: 'opacity 0.2s ease-out',
          zIndex: 2,
          padding: '40px',
          backgroundColor: 'rgba(15, 15, 25, 0.85)',
          borderRadius: '24px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(102, 126, 234, 0.1)'
        }}
      >
        <h2 style={{
          fontSize: '56px',
          fontWeight: '800',
          marginBottom: '30px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.5px',
          textTransform: 'uppercase',
          lineHeight: '1.1'
        }}>
          Who<br/>Am I?
        </h2>
        
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{
            fontSize: '20px',
            color: '#667eea',
            marginBottom: '12px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            My Experience
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#d0e0f0',
            marginBottom: '15px'
          }}>
            I am an audiovisual producer with over 3 years of experience as a videographer, video editor, and photographer.
          </p>
        </div>

        <div>
          <h3 style={{
            fontSize: '20px',
            color: '#764ba2',
            marginBottom: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            EDUCATION
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#c0d8f0'
          }}>
            <strong style={{ color: '#ffffff' }}>Salesian Polytechnic University</strong><br />
            Communication and Advertising<br />
            <span style={{ color: '#a0c0e0', fontSize: '14px' }}>Guayaquil, Ecuador</span>
          </p>
        </div>
      </div>

      {/* Right Text Panel - Skills & Contact */}
      <div
        style={{
          position: 'absolute',
          right: '50%',
          top: '50%',
          transform: `translate(calc(50% + ${rightTextX}px), -50%)`,
          maxWidth: '450px',
          opacity: textOpacity,
          transition: 'opacity 0.2s ease-out',
          textAlign: 'left',
          zIndex: 2,
          padding: '40px',
          backgroundColor: 'rgba(15, 15, 25, 0.85)',
          borderRadius: '24px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(102, 126, 234, 0.1)'
        }}
      >
        <h3 style={{
          fontSize: '28px',
          fontWeight: '800',
          marginBottom: '25px',
          background: 'linear-gradient(135deg, #764ba2, #667eea)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          CONTACT
        </h3>
        
        <div style={{ marginBottom: '30px' }}>
          <p style={{
            fontSize: '16px',
            color: '#a0c8f0',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ color: '#667eea' }}>📞</span> +57 314 290 8120
          </p>
          <p style={{
            fontSize: '16px',
            color: '#a0c8f0',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ color: '#764ba2' }}>✉️</span> ofserna2519@gmail.com
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h4 style={{
            fontSize: '20px',
            color: '#667eea',
            marginBottom: '18px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            Skills & Competencies
          </h4>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
            {['Pr', 'Ai', 'Ps', 'Lr'].map((skill) => (
              <div key={skill} style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'rgba(102, 126, 234, 0.25)',
                border: '2px solid rgba(102, 126, 234, 0.6)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#667eea',
                boxShadow: '0 0 15px rgba(102, 126, 234, 0.3)'
              }}>
                {skill}
              </div>
            ))}
          </div>
          <ul style={{
            fontSize: '15px',
            lineHeight: '2',
            color: '#d0e0f0',
            listStyle: 'none',
            padding: 0
          }}>
            <li style={{ marginBottom: '10px' }}>• Camera operation</li>
            <li style={{ marginBottom: '10px' }}>• Lighting management</li>
            <li style={{ marginBottom: '10px' }}>• Video recording and editing knowledge</li>
            <li>• Creativity</li>
          </ul>
        </div>

        <div>
          <h4 style={{
            fontSize: '20px',
            color: '#764ba2',
            marginBottom: '12px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            My Work
          </h4>
          <a href="https://surl.li/wkwduf" target="_blank" rel="noopener noreferrer" style={{
            fontSize: '16px',
            color: '#96d0ff',
            textDecoration: 'none',
            borderBottom: '2px solid rgba(150, 208, 255, 0.4)',
            paddingBottom: '2px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#c8e8ff';
            e.currentTarget.style.borderBottomColor = 'rgba(200, 232, 255, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#96d0ff';
            e.currentTarget.style.borderBottomColor = 'rgba(150, 208, 255, 0.4)';
          }}>
            https://surl.li/wkwduf
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        color: '#667eea',
        fontSize: '14px',
        fontWeight: '500',
        letterSpacing: '1px',
        opacity: 0.7,
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '10px' }}>▼</div>
        <div>EXPLORE MY WORK</div>
      </div>
    </div>
  );
}