'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Html, Float, OrbitControls, Sparkles, useAnimations, useGLTF } from '@react-three/drei';
import { Suspense, useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

function HeroFallback() {
  return (
    <Html center>
      <div className="text-center max-w-sm rounded-2xl border border-gold/25 bg-background/70 px-6 py-5 shadow-2xl shadow-black/40 backdrop-blur-md">
        <p className="font-display text-2xl text-gold mb-2">Loading Hero Scene</p>
        <p className="font-body text-sm text-foreground/70">
          Initializing character model and cinematic lighting.
        </p>
      </div>
    </Html>
  );
}

function HeroModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/assets/models/character.glb');
  const { actions } = useAnimations(animations, groupRef);

  const animationAction = useMemo(() => actions[animations[0]?.name], [actions, animations]);

  useEffect(() => {
    if (animationAction) {
      animationAction.reset().fadeIn(0.5).play();
      return () => {
        animationAction.fadeOut(0.25);
      };
    }
  }, [animationAction]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const swayX = state.mouse.x * 0.18;
    const swayY = state.mouse.y * 0.12;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, swayX, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, swayY - 0.18, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.22, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.02 + state.mouse.y * 0.05, 0.04);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.sin(state.clock.elapsedTime * 0.8) * 0.02, 0.02);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, Math.sin(state.clock.elapsedTime * 0.9) * 0.08, 0.03);
    groupRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.02);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const material = mesh.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial | THREE.MeshBasicMaterial | undefined;
        if (material && 'envMapIntensity' in material) {
          material.envMapIntensity = 1.8;
        }
      }
    });

    scene.rotation.y += delta * 0.03;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.45}>
      <group ref={groupRef} position={[0, -1.2, 0]} rotation={[0, Math.PI, 0]} scale={1.08}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload('/assets/models/character.glb');

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,162,39,0.12),transparent_40%),radial-gradient(circle_at_50%_65%,rgba(255,255,255,0.05),transparent_30%),linear-gradient(180deg,rgba(3,3,3,0.1),rgba(3,3,3,0.82))]" />
      <Canvas camera={{ position: [0, 0.25, 3.25], fov: 42 }} shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 3.5, 12]} />
        <ambientLight intensity={0.32} />
        <directionalLight position={[3, 6, 5]} intensity={1.4} color={0xffe3a3} />
        <pointLight position={[-3, 2, 2]} intensity={1.2} color={0xc9a227} />
        <Suspense fallback={<HeroFallback />}>
          <HeroModel />
        </Suspense>
        <ContactShadows opacity={0.45} scale={10} blur={2.4} far={4.5} resolution={512} color="#000000" />
        <Sparkles count={40} speed={0.4} size={2.4} color="#c9a227" scale={[4, 3, 2]} opacity={0.25} />
        <Environment files="/assets/hdri/studio.hdr" background={false} blur={0.45} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.18} />
      </Canvas>
    </div>
  );
}
