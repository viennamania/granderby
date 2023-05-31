import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

//import { Environment } from '@react-three/drei'

import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei';

import { Html, useProgress } from '@react-three/drei';

import Model from './model';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Horse2() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        flat
        linear
        className="border"
        camera={{ position: [5, 0, 0.02], near: 0.05 }}
      >
        <pointLight position={[50, 50, 150]} />
        {/*
        <Suspense fallback={null}>
  */}

        <Suspense fallback={<Loader />}>
          <Model />

          <OrbitControls autoRotate />

          {/*
          <Environment preset="sunset" background />
        </Suspense>
        */}
        </Suspense>
      </Canvas>
    </div>
  );
}
