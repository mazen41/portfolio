// src/components/assistant/MazRobot3D.jsx
// RobotExpressive.glb — Tomas Laulhe, modified by Don McCurdy — CC0 (public domain).
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const ACCENT_COLOR = '#2af6ff';

function Robot({ waveSignal, reduced }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/robot.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // recolor body to the site's accent color, leave face/trim materials alone
    scene.traverse((o) => {
      if (o.isMesh && o.material && o.material.name === 'Main') {
        o.material = o.material.clone();
        o.material.color = new THREE.Color(ACCENT_COLOR);
      }
    });
  }, [scene]);

  useEffect(() => {
    const idle = actions['Idle'];
    if (idle) idle.reset().fadeIn(0.3).play();
    return () => idle && idle.fadeOut(0.2);
  }, [actions]);

  // wave once whenever waveSignal changes (skip the initial mount value of 0)
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!waveSignal || reduced) return;
    const wave = actions['Wave'];
    const idle = actions['Idle'];
    if (!wave) return;
    wave.reset().setLoop(THREE.LoopOnce, 1);
    wave.clampWhenFinished = true;
    idle && idle.fadeOut(0.2);
    wave.fadeIn(0.2).play();
    const mixer = wave.getMixer();
    const done = (e) => {
      if (e.action !== wave) return;
      wave.fadeOut(0.3);
      idle && idle.reset().fadeIn(0.3).play();
      mixer.removeEventListener('finished', done);
    };
    mixer.addEventListener('finished', done);
    return () => mixer.removeEventListener('finished', done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveSignal]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (!reduced) {
      group.current.position.y = Math.sin(t * 1.6) * 0.08;
      const px = state.pointer.x;
      const py = state.pointer.y;
      const targetY = px * 0.5;
      const targetX = -py * 0.25;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.08);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.08);
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={1.55} position={[0, -1.15, 0]} />
    </group>
  );
}

export default function MazRobot3D({ waveSignal, reduced }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, 3.1], fov: 28 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 3]} intensity={1.3} />
      <directionalLight position={[-2, -1, -2]} intensity={0.35} />
      <Robot waveSignal={waveSignal} reduced={reduced} />
    </Canvas>
  );
}

useGLTF.preload('/models/robot.glb');
