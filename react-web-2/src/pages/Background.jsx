import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const Background = () => {
  return (
    <Canvas camera={{ zIndex: -1, width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <Stars />
      <OrbitControls />
    </Canvas>
  );
};

export default Background;