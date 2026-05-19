'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Html, useGLTF } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

type CarModelProps = { progress: number };

function LoaderFallback({ progress }: { progress: number }) {
  return (
    <Html center>
      <div className="text-center text-gold/80 font-body tracking-[0.3em] uppercase text-xs">
        <div className="mb-2">Loading Car Asset</div>
        <div>{Math.floor(progress)}%</div>
      </div>
    </Html>
  );
}

function CarModel({ progress }: CarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const { scene } = useGLTF('/assets/models/car.glb');
  // clone the loaded scene so we can safely modify materials and transforms
  const cloned = useMemo(() => (scene ? (scene.clone(true) as THREE.Group) : null), [scene]);

  const targetZ = useMemo(() => THREE.MathUtils.lerp(7.5, 0.2, Math.min(Math.max(progress / 100, 0), 1)), [progress]);
  const targetY = useMemo(() => THREE.MathUtils.lerp(-0.95, -0.15, Math.min(Math.max(progress / 100, 0), 1)), [progress]);
  const targetScale = useMemo(() => THREE.MathUtils.lerp(0.9, 1.12, Math.min(Math.max(progress / 100, 0), 1)), [progress]);

  // apply material tweaks once to the cloned scene (safe to mutate)
  if (cloned) {
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const material = mesh.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial | THREE.MeshBasicMaterial | undefined;
        if (material && 'metalness' in material) {
          material.metalness = 0.82;
          material.roughness = 0.28;
          // envMapIntensity may not exist on all material types — set if present
          if ('envMapIntensity' in material) {
            (material as THREE.MeshStandardMaterial & { envMapIntensity?: number }).envMapIntensity = 1.6;
          }
        }
      }
    });
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const swayX = state.mouse.x * 0.15;
    const swayY = state.mouse.y * 0.08;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, swayX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + swayY, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * -0.12, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.05 + state.mouse.y * 0.03, 0.04);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.04);

    if (lightRef.current) {
      lightRef.current.intensity = 1400 + progress * 32;
    }

    // rotate the wrapping group instead of mutating the hook-returned scene
    groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, -0.9, 7.5]} rotation={[0, Math.PI, 0]} scale={0.92}>
      {cloned ? <primitive object={cloned} /> : <primitive object={scene} />}
      <spotLight ref={lightRef} position={[0, 3, 5]} angle={0.38} penumbra={1} distance={30} color={0xffe8bb} intensity={1400} />
      <pointLight position={[0, 0.5, 2]} distance={14} color={0xffd48a} intensity={2.2} />
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.08, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={0x060606} roughness={1} metalness={0} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/assets/models/car.glb');

export default function LoaderScene({ progress }: { progress: number }) {
  return (
    <Canvas camera={{ position: [0, 0.2, 10], fov: 46 }} shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={['#030303']} />
      <fog attach="fog" args={['#030303', 4, 20]} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[4, 8, 6]} intensity={1.4} color={0xfff0cf} />
      <Suspense fallback={<LoaderFallback progress={progress} />}>
        <CarModel progress={progress} />
      </Suspense>
      <Environment files="/assets/hdri/studio.hdr" background={false} blur={0.5} />
    </Canvas>
  );
}
