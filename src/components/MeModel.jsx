// components/MeModel.jsx
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef } from 'react';

export default function MeModel() {
  const gltf = useLoader(GLTFLoader, '/me.glb');
  const modelRef = useRef();
  
  return (
    <primitive 
      ref={modelRef}
      object={gltf.scene}
      scale={4} // Adjust based on your model size
      position={[0, -1, 0]} // Adjust based on your model
      rotation={[0, Math.PI, 0]} // Adjust rotation if needed
    />
  );
}