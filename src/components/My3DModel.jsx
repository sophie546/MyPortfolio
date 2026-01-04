// components/My3DModel.jsx
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Model({ rotation = 0 }) { // Add rotation prop here
  const { scene } = useGLTF('/me.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={4.3} 
      position={[0, 0.1, 0]} 
      rotation={[0, rotation * (Math.PI / 180), 0]} // Convert degrees to radians
    />
  );
}

export default function My3DModel({ rotation = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        
        <Model rotation={rotation} /> {/* Pass rotation to Model */}
        
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}