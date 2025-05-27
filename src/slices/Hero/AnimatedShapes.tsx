'use client';

import { ContactShadows, Environment, Float } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Suspense, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

export default function AnimatedShapes() {
  const container = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={container}
      className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0"
    >
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={40} blur={1} far={9} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

type Geometry3D = {
  position: [number, number, number];
  rate: number;
  geometry: THREE.BufferGeometry;
};

const geometries: Geometry3D[] = [
  {
    position: [0, 0, 0],
    rate: 0.3,
    geometry: new THREE.IcosahedronGeometry(3), //Gem
  },
  {
    position: [1, -0.75, 4],
    rate: 0.4,
    geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), //Pill
  },
  {
    position: [-1.4, 2, -4],
    rate: 0.6,
    geometry: new THREE.DodecahedronGeometry(1.5), //Football
  },
  {
    position: [-0.8, -0.75, 5],
    rate: 0.5,
    geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), //Donut
  },
  {
    position: [1.6, 1.6, -4],
    rate: 0.7,
    geometry: new THREE.OctahedronGeometry(1.5), //Diamond
  },
];

const materials = [
  new THREE.MeshNormalMaterial(),
  new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
  new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
  new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
  new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
  new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
  new THREE.MeshStandardMaterial({ metalness: 0.5, color: 0x2980b9, roughness: 0 }),
  new THREE.MeshStandardMaterial({ metalness: 0.5, color: 0x2c3e50, roughness: 0.1 }),
];

function Geometries() {
  return geometries.map(({ position, rate, geometry }, index) => (
    <Geometry
      key={`${index} - ${JSON.stringify(position)}`}
      rate={rate}
      position={new THREE.Vector3(...position.map((v) => v * 2))}
      geometry={geometry}
      materials={materials}
    />
  ));
}

type GeometryProps = {
  rate: number;
  position: THREE.Vector3;
  geometry: THREE.BufferGeometry;
  materials: THREE.Material[];
};

function Geometry({ rate, position, geometry, materials }: GeometryProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);

  // Initialize audio elements on the client side
  useEffect(() => {
    const sounds = [
      new Audio('/sounds/knock-1.ogg'),
      new Audio('/sounds/knock-2.ogg'),
      new Audio('/sounds/knock-3.ogg'),
      new Audio('/sounds/knock-4.ogg'),
    ];
    setAudioElements(sounds);
  }, []);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial(): THREE.Material {
    return gsap.utils.random(materials);
  }

  function handleClick(e: ThreeEvent<MouseEvent>) {
    const mesh = e.object as THREE.Mesh;

    // Only play sound if audio elements are available
    if (audioElements.length > 0) {
      gsap.utils.random(audioElements).play();
    }

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: 'elastic.out(1,0.3)',
      yoyo: true,
      onStart: () => {
        // Update material in animation callback to avoid React warnings
        mesh.material = getRandomMaterial();
      },
    });

    // The mesh.material direct assignment could trigger React warnings
    // mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  useGSAP(
    () => {
      if (!meshRef.current) return;
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        delay: 0.3,
        ease: 'elastic.out(1,0.3)',
      });
    },
    { scope: meshRef },
  );

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * rate} rotationIntensity={6 * rate} floatIntensity={5 * rate}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}
