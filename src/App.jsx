import { useState, useEffect } from "react";
import CanvasScene from "./components/CanvasScene";
import NeonCursor from "./components/NeonCursor";
import PortalTransition from "./components/PortalTransition";
import AboutMeSection from "./components/AboutMeSection";
import SplineRobot from "./components/SplineRobot";

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Bar - Fixed at top */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: '20px 40px',
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        transition: 'all 0.3s ease',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Logo */}
          <div style={{
            fontSize: '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}>
          Sophia Bianca Aloria
          </div>

          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
          }}>
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '8px 0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                {item}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '0%',
                  height: '2px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  transition: 'width 0.3s ease',
                }} />
              </a>
            ))}
            
            {/* Contact Button */}
            <button style={{
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
            }}>
              Let's Talk
            </button>
          </div>
        </div>
      </nav>

      {/* Section 1: Welcome/Hero - FIXED WITH INTERACTIVE ROBOT */}
      <section id="home" style={{ 
        width: "100vw", 
        height: "100vh", 
        position: "relative",
        overflow: "hidden" 
      }}>
        <CanvasScene />
        <PortalTransition />
        
        {/* Hero Content Container */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5,
        }}>
          
          {/* Left Side: Text Content */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            transform: 'translateY(-50%)',
            width: '45%',
            maxWidth: '700px',
            color: 'white',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            zIndex: 10,
          }}>
            <h1 style={{
              fontSize: 'clamp(72px, 8vw, 120px)',
              fontWeight: '800',
              marginBottom: '10px',
              background: 'linear-gradient(135deg, #ffffff 30%, #667eea 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.03em',
              lineHeight: '0.9',
            }}>
              Creative<br />Vision.
            </h1>
            <p style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: '300',
              color: '#cccccc',
              marginBottom: '40px',
              lineHeight: '1.3',
            }}>
              Bringing ideas to life through<br />audiovisual storytelling
            </p>
            
            {/* View My Work Button */}
            <button style={{
              padding: '18px 48px',
              fontSize: '18px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.5px',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
            }}>
              View My Work
            </button>
          </div>
          
          {/* Right Side: Interactive Robot */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60%',
            height: '100%',
            zIndex: 1,
          }}>
            <SplineRobot />
          </div>
          
          {/* Gradient overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.8) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }} />
        </div>
        
        {/* Scroll Down Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          color: '#667eea',
          fontSize: '14px',
          fontWeight: '500',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}>
          SCROLL DOWN
          <div style={{
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to bottom, #667eea, transparent)',
            animation: 'scrollPulse 2s infinite',
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
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        {/* Grid background */}
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
          backgroundSize: '60px 60px',
          opacity: 0.3,
          zIndex: 1
        }} />

        <div style={{ 
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          <h1 style={{ 
            fontSize: "clamp(48px, 6vw, 72px)", 
            marginBottom: "20px",
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "800",
            letterSpacing: "-0.02em"
          }}>
            My Projects
          </h1>
          <p style={{ 
            fontSize: "20px", 
            maxWidth: "800px", 
            margin: "0 auto 60px",
            lineHeight: "1.8",
            textAlign: "center",
            color: "#b4c8e0"
          }}>
            🎬 Explore my work as an audiovisual producer
          </p>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            marginBottom: "80px",
          }}>
            {[
              {
                title: "Documentary Project",
                description: "Documentary about local culture with innovative visual approach.",
                tags: ["Documentary", "Camera", "Editing"],
                type: "🎥",
                year: "2023"
              },
              {
                title: "Advertising Campaign",
                description: "Complete video campaign for local fashion brand.",
                tags: ["Advertising", "Branding", "Post-production"],
                type: "📺",
                year: "2022"
              },
              {
                title: "Corporate Event",
                description: "Complete coverage of business event with multiple cameras.",
                tags: ["Event", "Multi-camera", "Live"],
                type: "🎪",
                year: "2023"
              },
              {
                title: "Photography Session",
                description: "Professional photography session for artistic portfolio.",
                tags: ["Photography", "Lighting", "Retouching"],
                type: "📸",
                year: "2022"
              },
              {
                title: "Music Video",
                description: "Production and editing of music video for emerging artist.",
                tags: ["Music", "Rhythm", "Color grading"],
                type: "🎵",
                year: "2023"
              },
              {
                title: "Digital Content",
                description: "Content creation for social media and digital platforms.",
                tags: ["Social Media", "Short-form", "Viral"],
                type: "📱",
                year: "2023"
              },
            ].map((project, index) => (
              <div key={index} style={{
                backgroundColor: "rgba(20, 20, 30, 0.7)",
                padding: "40px",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.borderColor = "rgba(102, 126, 234, 0.3)";
                e.currentTarget.style.backgroundColor = "rgba(20, 20, 30, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.backgroundColor = "rgba(20, 20, 30, 0.7)";
              }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                    {project.type}
                  </div>
                  <span style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#cccccc',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {project.year}
                  </span>
                </div>
                
                <h3 style={{ 
                  fontSize: "24px", 
                  marginBottom: "15px",
                  color: "#ffffff",
                  fontWeight: "700",
                  letterSpacing: "-0.01em"
                }}>
                  {project.title}
                </h3>
                <p style={{ 
                  lineHeight: "1.6", 
                  color: "#cccccc",
                  fontSize: "16px",
                  marginBottom: "20px"
                }}>
                  {project.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {project.tags.map((tag, idx) => (
                    <span key={idx} style={{
                      padding: '6px 12px',
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      color: '#667eea',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section id="contact" style={{
        minHeight: "60vh",
        backgroundColor: "#0a0a0a",
        padding: "100px 40px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        {/* Grid background */}
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
          backgroundSize: '60px 60px',
          opacity: 0.3,
          zIndex: 1
        }} />

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
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Let's Create Something Amazing
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#b4c8e0',
            marginBottom: '50px',
            lineHeight: '1.8',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Have a project in mind? Let's collaborate and bring your vision to life through compelling audiovisual storytelling.
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.8)';
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Call Me
              </a>
            </div>
            
            <div style={{
              color: '#667eea',
              fontSize: '14px',
              fontWeight: '500',
              marginTop: '20px',
            }}>
              or reach me at: +57 314 290 8120
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#050505',
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
            fontSize: '20px',
            fontWeight: '800',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Oscar Fernando
          </div>
          <p style={{
            color: '#888888',
            fontSize: '14px',
            marginBottom: '30px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Audiovisual Producer • Videographer • Editor • Photographer
          </p>
          <div style={{
            color: '#666666',
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '0.5px',
          }}>
            © {new Date().getFullYear()} Oscar Fernando. All rights reserved.
          </div>
        </div>
      </footer>

      <NeonCursor />
    </>
  );
}

export default App;