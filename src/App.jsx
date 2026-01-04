import { useState, useEffect, useRef } from "react";
import CanvasScene from "./components/CanvasScene";
import NeonCursor from "./components/NeonCursor";
import PortalTransition from "./components/PortalTransition";
import AboutMeSection from "./components/AboutMeSection";
import SplineRobot from "./components/SplineRobot";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const particlesRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to generate random particles - OPTIMIZED
  const generateParticles = () => {
    const particles = [];
    const particleCount = 40; // Reduced for performance
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.2 + 0.1,
        color: Math.random() > 0.7 ? '#764ba2' : '#667eea',
      });
    }
    particlesRef.current = particles;
  };

  useEffect(() => {
    generateParticles();
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: '20px 40px',
        background: scrolled ? 'rgba(10, 10, 10, 0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(15px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.2)' : 'none',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <div style={{
            fontSize: '26px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
            textShadow: '0 0 30px rgba(102, 126, 234, 0.3)',
          }}>
            Sophia Bianca Aloria
          </div>

          <div style={{
            display: 'flex',
            gap: '35px',
            alignItems: 'center',
          }}>
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '10px 0',
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f093fb';
                  e.currentTarget.querySelector('span').style.width = '100%';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.querySelector('span').style.width = '0%';
                }}
              >
                {item}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '0%',
                  height: '2px',
                  background: 'linear-gradient(90deg, #667eea, #f093fb)',
                  transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: '2px',
                }} />
              </a>
            ))}
            
            <button style={{
              padding: '12px 30px',
              fontSize: '15px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.8px',
              boxShadow: '0 5px 25px rgba(102, 126, 234, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 35px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 5px 25px rgba(102, 126, 234, 0.4)';
            }}>
              <span style={{
                position: 'relative',
                zIndex: 2,
              }}>
                Let's Talk
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Section 1: Welcome/Hero - OPTIMIZED */}
      <section id="home" style={{ 
        width: "100vw", 
        height: "100vh", 
        position: "relative",
        overflow: "hidden",
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2a 50%, #0a0a1a 100%)',
      }}>
        <CanvasScene />
        
        {/* PortalTransition - BEHIND ROBOT */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1, // Lower than robot
          pointerEvents: 'none', // Won't block interactions
        }}>
          <PortalTransition />
        </div>
        
        {/* Subtle Particle Background - OPTIMIZED */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          {particlesRef.current.map((particle) => (
            <div
              key={particle.id}
              style={{
                position: 'absolute',
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: '50%',
                animation: `floatParticle ${Math.random() * 20 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>
        
        {/* ROBOT - HIGHEST Z-INDEX, INTERACTIVE */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '70%',
          height: '100%',
          zIndex: 10, // Highest for interactivity
          pointerEvents: 'auto',
        }}>
          <SplineRobot />
        </div>
        
        {/* Text Content - SEPARATE CONTAINER */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5, // Above background, below robot
          pointerEvents: 'none', // Container doesn't block robot
        }}>
          
          {/* Left gradient overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.4) 50%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          
          {/* Text Content - Interactive elements only */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '8%',
            transform: 'translateY(-50%)',
            width: '45%',
            maxWidth: '750px',
            color: 'white',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            pointerEvents: 'auto', // Text area is interactive
          }}>
            <h1 style={{
              fontSize: 'clamp(80px, 9vw, 140px)',
              fontWeight: '900',
              marginBottom: '15px',
              background: 'linear-gradient(135deg, #ffffff 20%, #667eea 45%, #f093fb 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.04em',
              lineHeight: '0.85',
              textShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
            }}>
              CREATIVE<br />VISION.
            </h1>
            <p style={{
              fontSize: 'clamp(22px, 2.8vw, 32px)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '50px',
              lineHeight: '1.4',
              letterSpacing: '0.5px',
              maxWidth: '600px',
            }}>
              Bringing your ideas into reality <br />through my creativity
            </p>
            
            <button style={{
              padding: '22px 55px',
              fontSize: '18px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '1px',
              boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
            }}>
              VIEW MY WORK →
            </button>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          color: '#f093fb',
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          opacity: 0.9,
          pointerEvents: 'auto',
        }}>
          SCROLL DOWN
          <div style={{
            width: '2px',
            height: '80px',
            background: 'linear-gradient(to bottom, #667eea, #f093fb, transparent)',
            animation: 'scrollPulse 2.5s infinite',
            borderRadius: '2px',
          }} />
        </div>
      </section>

      {/* Section 2: About Me */}
      <section id="about">
        <AboutMeSection />
      </section>

      {/* Section 3: Projects */}
      <section id="projects" style={{ 
        minHeight: "100vh", 
        backgroundColor: "#0a0a0a",
        padding: "120px 40px",
        color: "white",
        position: "relative",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{ 
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
          
          {/* Coding Projects Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              padding: '10px 25px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '50px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
            }}>
              <span style={{
                color: '#667eea',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '2px',
              }}>
                CODING PROJECTS
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: "clamp(52px, 7vw, 84px)", 
              marginBottom: "25px",
              background: "linear-gradient(135deg, #667eea, #f093fb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: "900",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}>
              Development Projects
            </h1>
            <p style={{ 
              fontSize: "20px", 
              maxWidth: "700px", 
              margin: "0 auto",
              lineHeight: "1.8",
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "300",
            }}>
              Showcasing creative and technical projects in coding
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "30px",
            marginBottom: "80px",
          }}>
            {[
              {
                title: "WildcatsIHUB",
                description: "The Wildcats' iHub is a centralized web platform for IT and CS student projects.",
                tags: ["Web System", "Repository", "IT Solution"],
                type: "🧠",
                year: "2025",
                accentColor: "#667eea",
                repoLink: "https://github.com/sophie546/WildcatsIHUB", 
                deployLink: "https://wildcatsihub-z029.onrender.com", 
              },
              {
                title: "PQMS",
                description: "A web-based system that digitizes patient registration, queues, and consultations for clinics and barangay health centers.",
                tags: ["Health System", "Queue Management", "Web System"],
                type: "🩺",
                year: "2025",
                accentColor: "#f093fb",
                repoLink: "https://github.com/sophie546/PQMS", 
              },
              {
                title: "Vortex",
                description: "A pixelated game with multiple levels across different universes, With three characters that you can play.",
                tags: ["Pixel Game", "Platformer", "Multi-Level"],
                type: "🎮",
                year: "2023",
                accentColor: "#764ba2",
                repoLink: "https://github.com/Desiigner101/Vortex", 
              },
              {
                title: "E-Bingo: The CatGo Edition",
                description: "A fun online bingo platform with unique game codes, real-time game board, and card management.",
                tags: ["Game Platform", "Web App", "Real-Time"],
                type: "🎮",
                year: "2025",
                accentColor: "#667eea",
                repoLink: "https://github.com/sophie546/Bingo-", 
              },
              {
                title: "STEPSS",
                description: "A Kotlin-based app that tracks your steps, focusing exclusively on walking activity.",
                tags: ["Health App", "Kotlin", "Step Tracker"],
                type: "👟",
                year: "2024",
                accentColor: "#f093fb",
                repoLink: "https://github.com/sophie546/STEPSS-real-", 

              },
              {
                title: "Vortex - (Text Based)",
                description: "A terminal-based text game with different universe or levels, it is like a cyberpunk style",
                tags: ["Text Game", "Terminal Based Game", "Interactive"],
                type: "🎮",
                year: "2024",
                accentColor: "#764ba2",
                repoLink: "https://github.com/Desiigner101/OOP_JAVAGAME-GG-", 
              },
            ].map((project, index) => (
  <div 
    key={index}
    style={{
      backgroundColor: "rgba(15, 15, 25, 0.7)",
      padding: "30px",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-10px)";
      e.currentTarget.style.borderColor = `${project.accentColor}40`;
      e.currentTarget.style.backgroundColor = "rgba(15, 15, 25, 0.9)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
      e.currentTarget.style.backgroundColor = "rgba(15, 15, 25, 0.7)";
    }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '15px',
        background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}80)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'white',
      }}>
        {project.type}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}>
        <span style={{
          padding: '6px 12px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#cccccc',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
        }}>
          {project.year}
        </span>
      </div>
    </div>
    
    <h3 style={{ 
      fontSize: "24px", 
      marginBottom: "15px",
      color: "#ffffff",
      fontWeight: "700",
    }}>
      {project.title}
    </h3>
    <p style={{ 
      lineHeight: "1.6", 
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "16px",
      marginBottom: "20px",
    }}>
      {project.description}
    </p>
    
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    }}>
      {project.tags.map((tag, idx) => (
        <span 
          key={idx}
          style={{
            padding: '6px 12px',
            backgroundColor: 'rgba(102, 126, 234, 0.12)',
            color: project.accentColor,
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Project Links */}
    {(project.repoLink || project.deployLink) && (
      <div style={{
        display: 'flex',
        gap: '10px',
        marginTop: '25px',
        flexWrap: 'wrap',
      }}>
        {project.repoLink && (
          <a 
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: 'rgba(102, 126, 234, 0.15)',
              color: '#667eea',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Repository
          </a>
        )}
        
        {project.deployLink && (
          <a 
            href={project.deployLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: 'rgba(86, 204, 157, 0.15)',
              color: '#56cc9d',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              border: '1px solid rgba(86, 204, 157, 0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(86, 204, 157, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(86, 204, 157, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Live Demo
          </a>
        )}
      </div>
    )}
  </div>
))}
          </div>

          {/* Video Editing Projects Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            marginTop: '120px',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              padding: '10px 25px',
              background: 'rgba(240, 147, 251, 0.1)',
              borderRadius: '50px',
              border: '1px solid rgba(240, 147, 251, 0.2)',
            }}>
              <span style={{
                color: '#f093fb',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '2px',
              }}>
                CREATIVE MEDIA
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: "clamp(52px, 7vw, 84px)", 
              marginBottom: "25px",
              background: "linear-gradient(135deg, #f093fb, #667eea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: "900",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}>
              Video Editing Projects
            </h1>
            <p style={{ 
              fontSize: "20px", 
              maxWidth: "700px", 
              margin: "0 auto",
              lineHeight: "1.8",
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "300",
            }}>
              Professional video editing, motion graphics, and visual storytelling projects
            </p>
          </div>

          {/* Video Projects Grid - Coming Soon Placeholder */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "30px",
            marginBottom: "80px",
          }}>
            {/* Placeholder for Future Video Projects */}
            <div style={{
              backgroundColor: "rgba(15, 15, 25, 0.5)",
              padding: "40px",
              borderRadius: "24px",
              border: "2px dashed rgba(240, 147, 251, 0.3)",
              textAlign: 'center',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(240, 147, 251, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '32px',
                color: '#f093fb',
              }}>
                🎬
              </div>
              <h3 style={{ 
                fontSize: "22px", 
                marginBottom: "10px",
                color: "#ffffff",
                fontWeight: "700",
              }}>
                Coming Soon
              </h3>
              <p style={{ 
                lineHeight: "1.6", 
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "16px",
              }}>
                Video projects will be uploaded here soon
              </p>
            </div>

            <div style={{
              backgroundColor: "rgba(15, 15, 25, 0.5)",
              padding: "40px",
              borderRadius: "24px",
              border: "2px dashed rgba(240, 147, 251, 0.3)",
              textAlign: 'center',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(240, 147, 251, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '32px',
                color: '#f093fb',
              }}>
                🎥
              </div>
              <h3 style={{ 
                fontSize: "22px", 
                marginBottom: "10px",
                color: "#ffffff",
                fontWeight: "700",
              }}>
                More Videos
              </h3>
              <p style={{ 
                lineHeight: "1.6", 
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "16px",
              }}>
                Additional projects coming soon
              </p>
            </div>

            <div style={{
              backgroundColor: "rgba(15, 15, 25, 0.5)",
              padding: "40px",
              borderRadius: "24px",
              border: "2px dashed rgba(240, 147, 251, 0.3)",
              textAlign: 'center',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(240, 147, 251, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '32px',
                color: '#f093fb',
              }}>
                ✨
              </div>
              <h3 style={{ 
                fontSize: "22px", 
                marginBottom: "10px",
                color: "#ffffff",
                fontWeight: "700",
              }}>
                Stay Tuned
              </h3>
              <p style={{ 
                lineHeight: "1.6", 
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "16px",
              }}>
                Creative content in production
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section id="contact" style={{
        minHeight: "60vh",
        backgroundColor: "#050505",
        padding: "100px 40px",
        position: "relative",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: '800',
            marginBottom: '30px',
            background: 'linear-gradient(135deg, #667eea, #f093fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Ready to Bring Your Vision to Life?
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '50px',
            lineHeight: '1.8',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Have a project in mind? Let's collaborate and create something extraordinary.
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <a 
                href="mailto:ofserna2519@gmail.com"
                style={{
                  padding: '16px 40px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                }}
              >
                Email Me
              </a>
              
              <a 
                href="tel:+573142908120"
                style={{
                  padding: '16px 40px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'transparent',
                  border: '2px solid rgba(240, 147, 251, 0.3)',
                  borderRadius: '50px',
                  color: '#f093fb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#f093fb';
                  e.currentTarget.style.background = 'rgba(240, 147, 251, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(240, 147, 251, 0.3)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Call Me
              </a>
            </div>
            
            <div style={{
              color: '#f093fb',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              +57 314 290 8120
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#030303',
        padding: '40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '900',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea, #f093fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Sophia Bianca Aloria
          </div>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            marginBottom: '30px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Visual Storyteller • Creative Director • Multimedia Artist
          </p>
          
          <div style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '12px',
            fontWeight: '500',
          }}>
            © {new Date().getFullYear()} Sophia Bianca Aloria. All rights reserved.
          </div>
        </div>
      </footer>

      <NeonCursor />
    </>
  );
}

export default App;