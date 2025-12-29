import CanvasScene from "./components/CanvasScene";
import NeonCursor from "./components/NeonCursor";
import PortalTransition from "./components/PortalTransition";

function App() {
  return (
    <>
      {/* Spline Robot Section - Full viewport height */}
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <CanvasScene />
        <PortalTransition />
      </div>

      {/* Content Section - This is where cursor effect will activate */}
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: "#0b0b0f",
        padding: "80px 40px",
        color: "white"
      }}>
        <h1 style={{ 
          fontSize: "48px", 
          marginBottom: "20px",
          textAlign: "center" 
        }}>
          Scroll Test Section
        </h1>
        <p style={{ 
          fontSize: "20px", 
          maxWidth: "800px", 
          margin: "0 auto 40px",
          lineHeight: "1.8",
          textAlign: "center"
        }}>
          🎨 The neon cursor effect is now active! Move your mouse around to see the white glow trail.
        </p>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} style={{
              backgroundColor: "#1a1a1a",
              padding: "40px",
              borderRadius: "10px",
              border: "1px solid #333"
            }}>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>
                Card {item}
              </h3>
              <p style={{ lineHeight: "1.6", color: "#ccc" }}>
                Test the cursor effect here! The white neon glow should follow your mouse movements.
              </p>
            </div>
          ))}
        </div>
      </div>

      <NeonCursor />
    </>
  );
}

export default App;