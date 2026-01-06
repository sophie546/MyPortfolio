import { useEffect, useRef, useState } from 'react';
import My3DModel from './My3DModel'; // Import the 3D model component

export default function AboutMeSection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverEffect, setHoverEffect] = useState(false);

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

    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Rotation - KEEP YOUR EXISTING ROTATION
  const rotation = 480 + (scrollProgress * 180);

  // Glow intensity based on scroll
  const glowIntensity = scrollProgress * 1.5;

  // Text emergence with fade: starts hidden inside body, slides out
  const leftTextX = scrollProgress * -350;
  const rightTextX = scrollProgress * 350;
  
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
      {/* Animated gradient background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #0a0a0a 0%, #0f0f1a 50%, #0a0a0a 100%)',
        zIndex: 0
      }} />

      {/* Modern grid background with animation */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(90deg, rgba(102, 126, 234, 0.1) 1px, transparent 1px),
          linear-gradient(rgba(102, 126, 234, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite',
        opacity: 0.3,
        zIndex: 0
      }} />

      {/* Glowing orb behind model */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, 
          rgba(102, 126, 234, ${0.2 + glowIntensity * 0.1}) 0%,
          rgba(118, 75, 162, ${0.15 + glowIntensity * 0.05}) 30%,
          rgba(15, 15, 25, 0) 70%)`,
        filter: `blur(${40 + glowIntensity * 20}px)`,
        zIndex: 1,
        transition: 'all 0.3s ease-out'
      }} />

      {/* Particle effect dots */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            backgroundColor: `rgba(102, 126, 234, ${0.3 + Math.random() * 0.4})`,
            borderRadius: '50%',
            filter: 'blur(1px)',
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.7
          }} />
        ))}
      </div>

      {/* 3D Model Container with enhanced styling - KEEP YOUR DIMENSIONS */}
      <div 
        style={{
          position: 'absolute',
          width: '400px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          zIndex: 3,
          pointerEvents: 'none',
          borderRadius: '15px',
          overflow: 'hidden',
          border: `1px solid rgba(102, 126, 234, ${0.2 + glowIntensity * 0.3})`,
          boxShadow: `
            0 0 ${60 + glowIntensity * 40}px rgba(102, 126, 234, ${0.3 + glowIntensity * 0.2}),
            inset 0 0 ${40 + glowIntensity * 20}px rgba(102, 126, 234, ${0.1 + glowIntensity * 0.1})
          `,
          transition: 'all 0.3s ease-out'
        }}
        onMouseEnter={() => setHoverEffect(true)}
        onMouseLeave={() => setHoverEffect(false)}
      >
        {/* Inner glow border */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '15px',
          border: `2px solid rgba(102, 126, 234, ${0.1})`,
          boxShadow: `inset 0 0 20px rgba(102, 126, 234, ${0.15})`,
          pointerEvents: 'none',
          zIndex: 4
        }} />

        <My3DModel 
          rotation={rotation} 
          hoverEffect={hoverEffect}
          glowIntensity={glowIntensity}
        />
      </div>

      {/* Floating info badge */}
      <div style={{
        position: 'absolute',
        top: '25%',
        right: 'calc(50% + 250px)',
        backgroundColor: 'rgba(15, 15, 25, 0.9)',
        padding: '12px 20px',
        borderRadius: '12px',
        border: '1px solid rgba(102, 126, 234, 0.3)',
        backdropFilter: 'blur(10px)',
        transform: `translateX(${scrollProgress * 50}px)`,
        opacity: textOpacity * 0.8,
        transition: 'all 0.3s ease-out',
        zIndex: 2,
        display: isMobile ? 'none' : 'block'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            backgroundColor: '#667eea',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      </div>

      {/* Left Text Panel - About Me - KEEP YOUR EXACT CONTENT */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${leftTextX}px), -50%)`,
          maxWidth: '450px',
          opacity: textOpacity,
          transition: 'all 0.3s ease-out',
          zIndex: 2,
          padding: '40px',
          backgroundColor: 'rgba(15, 15, 25, 0.9)',
          borderRadius: '24px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          backdropFilter: 'blur(15px)',
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.5),
            0 0 60px rgba(102, 126, 234, 0.1),
            inset 0 0 30px rgba(102, 126, 234, 0.1)
          `,
          width: isMobile ? '90%' : 'auto'
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
            I am an audiovisual producer with over 3 years of experience as a video editor, and web, softW coder.
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
            <strong style={{ color: '#ffffff' }}>CIT-U Cebu Institute Technology University</strong><br />
            Information technology<br />
            <span style={{ color: '#a0c0e0', fontSize: '14px' }}>3rd Yr Student</span>
          </p>
        </div>
      </div>

      {/* Right Text Panel - Skills & Contact - KEEP YOUR EXACT CONTENT */}
      <div
        style={{
          position: 'absolute',
          right: '50%',
          top: '50%',
          transform: `translate(calc(50% + ${rightTextX}px), -50%)`,
          maxWidth: '450px',
          opacity: textOpacity,
          transition: 'all 0.3s ease-out',
          textAlign: 'left',
          zIndex: 2,
          padding: '40px',
          backgroundColor: 'rgba(15, 15, 25, 0.9)',
          borderRadius: '24px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          backdropFilter: 'blur(15px)',
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.5),
            0 0 60px rgba(102, 126, 234, 0.1),
            inset 0 0 30px rgba(102, 126, 234, 0.1)
          `,
          width: isMobile ? '90%' : 'auto'
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
            +0975 076 8513
          </p>
          <p style={{
            fontSize: '16px',
            color: '#a0c8f0',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            sophie.aloria@gmail.com
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
            {['Ae', 'Am', 'Ps', 'Lr'].map((skill) => (
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
            <li style={{ marginBottom: '10px' }}>• Software, Web Coding</li>
            <li style={{ marginBottom: '10px' }}>• UI/UX designer</li>
            <li style={{ marginBottom: '10px' }}>• Video recording and editing knowledge</li>
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
            My Github Profile
          </h4>
          <a href="https://github.com/sophie546" target="_blank" rel="noopener noreferrer" style={{
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
            https://github.com/sophie546
          </a>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
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
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(to bottom, #667eea, transparent)',
            borderRadius: '1px'
          }} />
          <div style={{
            width: '2px',
            height: '20px',
            background: 'linear-gradient(to bottom, #667eea, transparent)',
            borderRadius: '1px',
            opacity: 0.7
          }} />
        </div>
        <div style={{
          padding: '10px 20px',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '20px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          backdropFilter: 'blur(5px)'
        }}>
          EXPLORE MY WORK
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}