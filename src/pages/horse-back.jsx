import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';

const Models = [
  //{ title: 'Hammer', url: './models/roan.glb' },
  { title: 'Hammer', url: './models/TEST2.glb' },
  //{ title: 'Drill', url: './models/roan.glb' },
  //{ title: 'Tape Measure', url: './models/roan.glb' },
];

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Horse() {
  const { title } = useControls({
    title: {
      options: Models.map(({ title }) => title),
    },
  });

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas flat linear camera={{ position: [5, 0, 0.02], near: 0.05 }}>
        {/*
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
       
        <Environment files="./img/workshop_1k.hdr" background />
  */}

        <group>
          <Model url={Models[Models.findIndex((m) => m.title === title)].url} />
        </group>

        <OrbitControls autoRotate />

        {/*
        <Stats />
*/}
      </Canvas>

      <span id="info">The {title} is selected.</span>
    </div>
  );
}
